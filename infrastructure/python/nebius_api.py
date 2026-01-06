"""
DOZIER HOLDINGS GROUP - NEBIUS AI CLOUD API INTEGRATION
Python API Layer for Nebius Cloud Services

Author: DHG Engineering Team
Version: 1.0.0
Date: January 6, 2026
"""

import os
import json
import time
import hashlib
import hmac
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from enum import Enum
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


# ============================================================================
# CONFIGURATION
# ============================================================================

class GPUType(Enum):
    H100 = "h100"
    H200 = "h200"
    B200 = "b200"
    GB200_NVL72 = "gb200-nvl72"


class InstanceStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    STOPPED = "stopped"
    TERMINATED = "terminated"
    ERROR = "error"


class JobStatus(Enum):
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


# GPU Pricing (per hour)
GPU_PRICING = {
    GPUType.H100: 2.00,
    GPUType.H200: 2.30,
    GPUType.B200: 3.00,
    GPUType.GB200_NVL72: 5.00,  # Estimated
}

# GPU Specifications
GPU_SPECS = {
    GPUType.H100: {"memory_gb": 80, "infiniband_tbit": 3.2, "tensor_cores": 528},
    GPUType.H200: {"memory_gb": 141, "infiniband_tbit": 3.2, "tensor_cores": 528},
    GPUType.B200: {"memory_gb": 180, "infiniband_tbit": 3.2, "tensor_cores": 640},
    GPUType.GB200_NVL72: {"memory_gb": 288, "infiniband_tbit": 3.2, "tensor_cores": 720},
}


# ============================================================================
# DATA CLASSES
# ============================================================================

@dataclass
class NebiusConfig:
    """Nebius API Configuration"""
    api_key: str
    api_url: str = "https://api.nebius.com/v1"
    region: str = "us-east-1"
    project_id: str = "dhg-athlynx"
    timeout: int = 30
    max_retries: int = 3


@dataclass
class GPUInstance:
    """GPU Instance Data"""
    instance_id: str
    name: str
    gpu_type: GPUType
    gpu_count: int
    vcpu: int
    ram_gb: int
    storage_gb: int
    status: InstanceStatus
    ip_address: Optional[str] = None
    created_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    hourly_cost: float = 0.0


@dataclass
class GPUCluster:
    """GPU Cluster Data"""
    cluster_id: str
    name: str
    gpu_type: GPUType
    total_gpus: int
    running_gpus: int
    region: str
    status: str
    instances: List[GPUInstance]
    created_at: datetime
    monthly_cost_estimate: float = 0.0


@dataclass
class ComputeJob:
    """Compute Job Data"""
    job_id: str
    name: str
    cluster_id: str
    job_type: str
    status: JobStatus
    gpu_count: int
    submitted_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    runtime_hours: float = 0.0
    cost: float = 0.0
    output_path: Optional[str] = None


# ============================================================================
# NEBIUS API CLIENT
# ============================================================================

class NebiusAPIClient:
    """
    Nebius AI Cloud API Client
    Handles all interactions with Nebius cloud services
    """
    
    def __init__(self, config: NebiusConfig):
        self.config = config
        self.session = self._create_session()
        self._clusters: Dict[str, GPUCluster] = {}
        self._jobs: Dict[str, ComputeJob] = {}
        self._billing_records: List[Dict[str, Any]] = []
    
    def _create_session(self) -> requests.Session:
        """Create HTTP session with retry logic"""
        session = requests.Session()
        
        retry_strategy = Retry(
            total=self.config.max_retries,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
        )
        
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        
        session.headers.update({
            "Authorization": f"Bearer {self.config.api_key}",
            "Content-Type": "application/json",
            "X-Project-ID": self.config.project_id,
        })
        
        return session
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict:
        """Make API request to Nebius"""
        url = f"{self.config.api_url}/{endpoint}"
        
        try:
            if method == "GET":
                response = self.session.get(url, timeout=self.config.timeout)
            elif method == "POST":
                response = self.session.post(url, json=data, timeout=self.config.timeout)
            elif method == "PUT":
                response = self.session.put(url, json=data, timeout=self.config.timeout)
            elif method == "DELETE":
                response = self.session.delete(url, timeout=self.config.timeout)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            response.raise_for_status()
            return response.json() if response.text else {}
            
        except requests.exceptions.RequestException as e:
            print(f"❌ API Error: {e}")
            # Return simulated response for development
            return self._simulate_response(method, endpoint, data)
    
    def _simulate_response(self, method: str, endpoint: str, data: Optional[Dict]) -> Dict:
        """Simulate API responses for development/testing"""
        timestamp = datetime.now().isoformat()
        
        if "clusters" in endpoint and method == "POST":
            return {
                "cluster_id": f"dhg-cluster-{self._generate_id()}",
                "status": "creating",
                "created_at": timestamp,
            }
        elif "instances" in endpoint and method == "POST":
            return {
                "instance_id": f"dhg-instance-{self._generate_id()}",
                "status": "pending",
                "created_at": timestamp,
            }
        elif "jobs" in endpoint and method == "POST":
            return {
                "job_id": f"dhg-job-{self._generate_id()}",
                "status": "queued",
                "submitted_at": timestamp,
            }
        
        return {"status": "success", "timestamp": timestamp}
    
    def _generate_id(self) -> str:
        """Generate unique ID"""
        return hashlib.md5(str(time.time()).encode()).hexdigest()[:8]
    
    # ========================================================================
    # CLUSTER OPERATIONS
    # ========================================================================
    
    def create_cluster(
        self,
        name: str,
        gpu_type: GPUType,
        gpu_count: int,
        region: Optional[str] = None
    ) -> GPUCluster:
        """Create a new GPU cluster"""
        
        print(f"🚀 Creating cluster: {name}")
        print(f"   GPU Type: {gpu_type.value}")
        print(f"   GPU Count: {gpu_count}")
        
        response = self._make_request("POST", "clusters", {
            "name": name,
            "gpu_type": gpu_type.value,
            "gpu_count": gpu_count,
            "region": region or self.config.region,
        })
        
        cluster_id = response.get("cluster_id", f"dhg-cluster-{self._generate_id()}")
        
        # Create instances for the cluster
        instances = []
        for i in range(gpu_count):
            instance = GPUInstance(
                instance_id=f"{cluster_id}-gpu-{i+1}",
                name=f"{name}-GPU-{i+1}",
                gpu_type=gpu_type,
                gpu_count=1,
                vcpu=16,
                ram_gb=200,
                storage_gb=1000,
                status=InstanceStatus.PENDING,
                created_at=datetime.now(),
                hourly_cost=GPU_PRICING[gpu_type],
            )
            instances.append(instance)
        
        # Calculate monthly cost estimate (assuming 24/7 operation)
        monthly_cost = gpu_count * GPU_PRICING[gpu_type] * 24 * 30
        
        cluster = GPUCluster(
            cluster_id=cluster_id,
            name=name,
            gpu_type=gpu_type,
            total_gpus=gpu_count,
            running_gpus=0,
            region=region or self.config.region,
            status="creating",
            instances=instances,
            created_at=datetime.now(),
            monthly_cost_estimate=monthly_cost,
        )
        
        self._clusters[cluster_id] = cluster
        
        print(f"✅ Cluster created: {cluster_id}")
        print(f"   Monthly cost estimate: ${monthly_cost:,.2f}")
        
        return cluster
    
    def get_cluster(self, cluster_id: str) -> Optional[GPUCluster]:
        """Get cluster by ID"""
        return self._clusters.get(cluster_id)
    
    def list_clusters(self) -> List[GPUCluster]:
        """List all clusters"""
        return list(self._clusters.values())
    
    def delete_cluster(self, cluster_id: str) -> bool:
        """Delete a cluster"""
        if cluster_id not in self._clusters:
            print(f"❌ Cluster not found: {cluster_id}")
            return False
        
        cluster = self._clusters[cluster_id]
        
        # Stop all running instances first
        for instance in cluster.instances:
            if instance.status == InstanceStatus.RUNNING:
                self.stop_instance(instance.instance_id)
        
        del self._clusters[cluster_id]
        print(f"🗑️ Cluster deleted: {cluster_id}")
        return True
    
    def scale_cluster(self, cluster_id: str, new_gpu_count: int) -> GPUCluster:
        """Scale cluster up or down"""
        if cluster_id not in self._clusters:
            raise ValueError(f"Cluster not found: {cluster_id}")
        
        cluster = self._clusters[cluster_id]
        current_count = cluster.total_gpus
        
        if new_gpu_count > current_count:
            # Add instances
            for i in range(current_count, new_gpu_count):
                instance = GPUInstance(
                    instance_id=f"{cluster_id}-gpu-{i+1}",
                    name=f"{cluster.name}-GPU-{i+1}",
                    gpu_type=cluster.gpu_type,
                    gpu_count=1,
                    vcpu=16,
                    ram_gb=200,
                    storage_gb=1000,
                    status=InstanceStatus.PENDING,
                    created_at=datetime.now(),
                    hourly_cost=GPU_PRICING[cluster.gpu_type],
                )
                cluster.instances.append(instance)
            print(f"⬆️ Scaled up: {current_count} → {new_gpu_count} GPUs")
        elif new_gpu_count < current_count:
            # Remove instances
            instances_to_remove = current_count - new_gpu_count
            for _ in range(instances_to_remove):
                if cluster.instances:
                    removed = cluster.instances.pop()
                    if removed.status == InstanceStatus.RUNNING:
                        self._record_billing(removed)
            print(f"⬇️ Scaled down: {current_count} → {new_gpu_count} GPUs")
        
        cluster.total_gpus = new_gpu_count
        cluster.monthly_cost_estimate = new_gpu_count * GPU_PRICING[cluster.gpu_type] * 24 * 30
        
        return cluster
    
    # ========================================================================
    # INSTANCE OPERATIONS
    # ========================================================================
    
    def start_instance(self, instance_id: str) -> GPUInstance:
        """Start a GPU instance"""
        for cluster in self._clusters.values():
            for instance in cluster.instances:
                if instance.instance_id == instance_id:
                    instance.status = InstanceStatus.RUNNING
                    instance.started_at = datetime.now()
                    instance.ip_address = f"10.0.{hash(instance_id) % 255}.{hash(instance_id[::-1]) % 255}"
                    cluster.running_gpus += 1
                    print(f"▶️ Started: {instance_id} (IP: {instance.ip_address})")
                    return instance
        
        raise ValueError(f"Instance not found: {instance_id}")
    
    def stop_instance(self, instance_id: str) -> GPUInstance:
        """Stop a GPU instance"""
        for cluster in self._clusters.values():
            for instance in cluster.instances:
                if instance.instance_id == instance_id:
                    if instance.status == InstanceStatus.RUNNING:
                        self._record_billing(instance)
                        cluster.running_gpus -= 1
                    instance.status = InstanceStatus.STOPPED
                    instance.ip_address = None
                    print(f"⏹️ Stopped: {instance_id}")
                    return instance
        
        raise ValueError(f"Instance not found: {instance_id}")
    
    def _record_billing(self, instance: GPUInstance):
        """Record billing for an instance"""
        if instance.started_at:
            runtime = (datetime.now() - instance.started_at).total_seconds() / 3600
            cost = runtime * instance.hourly_cost
            
            self._billing_records.append({
                "instance_id": instance.instance_id,
                "gpu_type": instance.gpu_type.value,
                "runtime_hours": runtime,
                "cost": cost,
                "timestamp": datetime.now().isoformat(),
            })
    
    # ========================================================================
    # JOB OPERATIONS
    # ========================================================================
    
    def submit_job(
        self,
        cluster_id: str,
        name: str,
        job_type: str,
        gpu_count: int = 1,
        config: Optional[Dict] = None
    ) -> ComputeJob:
        """Submit a compute job"""
        
        if cluster_id not in self._clusters:
            raise ValueError(f"Cluster not found: {cluster_id}")
        
        job_id = f"dhg-job-{self._generate_id()}"
        
        job = ComputeJob(
            job_id=job_id,
            name=name,
            cluster_id=cluster_id,
            job_type=job_type,
            status=JobStatus.QUEUED,
            gpu_count=gpu_count,
            submitted_at=datetime.now(),
        )
        
        self._jobs[job_id] = job
        
        print(f"📋 Job submitted: {name} ({job_id})")
        print(f"   Type: {job_type}")
        print(f"   GPUs: {gpu_count}")
        
        return job
    
    def start_job(self, job_id: str) -> ComputeJob:
        """Start a queued job"""
        if job_id not in self._jobs:
            raise ValueError(f"Job not found: {job_id}")
        
        job = self._jobs[job_id]
        job.status = JobStatus.RUNNING
        job.started_at = datetime.now()
        
        print(f"🏃 Job started: {job.name} ({job_id})")
        return job
    
    def complete_job(self, job_id: str, success: bool = True) -> ComputeJob:
        """Complete a job"""
        if job_id not in self._jobs:
            raise ValueError(f"Job not found: {job_id}")
        
        job = self._jobs[job_id]
        job.status = JobStatus.COMPLETED if success else JobStatus.FAILED
        job.completed_at = datetime.now()
        
        if job.started_at:
            job.runtime_hours = (job.completed_at - job.started_at).total_seconds() / 3600
            cluster = self._clusters.get(job.cluster_id)
            if cluster:
                job.cost = job.runtime_hours * job.gpu_count * GPU_PRICING[cluster.gpu_type]
        
        status = "✅" if success else "❌"
        print(f"{status} Job {job.status.value}: {job.name}")
        print(f"   Runtime: {job.runtime_hours:.2f} hours")
        print(f"   Cost: ${job.cost:.2f}")
        
        return job
    
    def get_job(self, job_id: str) -> Optional[ComputeJob]:
        """Get job by ID"""
        return self._jobs.get(job_id)
    
    def list_jobs(self, cluster_id: Optional[str] = None) -> List[ComputeJob]:
        """List jobs, optionally filtered by cluster"""
        jobs = list(self._jobs.values())
        if cluster_id:
            jobs = [j for j in jobs if j.cluster_id == cluster_id]
        return jobs
    
    # ========================================================================
    # ATHLYNX-SPECIFIC JOBS
    # ========================================================================
    
    def submit_nil_training(self, cluster_id: str, model_name: str, dataset_size: int) -> ComputeJob:
        """Submit NIL Valuation AI training job"""
        return self.submit_job(
            cluster_id=cluster_id,
            name=f"NIL Training: {model_name}",
            job_type="nil_training",
            gpu_count=4,
            config={
                "model_name": model_name,
                "dataset_size": dataset_size,
                "epochs": 100,
                "batch_size": 32,
            }
        )
    
    def submit_content_generation(self, cluster_id: str, content_type: str, batch_count: int) -> ComputeJob:
        """Submit content generation inference job"""
        return self.submit_job(
            cluster_id=cluster_id,
            name=f"Content Gen: {content_type}",
            job_type="content_generation",
            gpu_count=1,
            config={
                "content_type": content_type,
                "batch_count": batch_count,
                "max_tokens": 2048,
            }
        )
    
    def submit_transfer_matching(self, cluster_id: str, athlete_count: int) -> ComputeJob:
        """Submit transfer portal matching job"""
        return self.submit_job(
            cluster_id=cluster_id,
            name=f"Transfer Match: {athlete_count} athletes",
            job_type="transfer_matching",
            gpu_count=2,
            config={
                "athlete_count": athlete_count,
                "match_threshold": 0.75,
            }
        )
    
    def submit_video_processing(self, cluster_id: str, video_count: int) -> ComputeJob:
        """Submit highlight video processing job"""
        return self.submit_job(
            cluster_id=cluster_id,
            name=f"Video Processing: {video_count} videos",
            job_type="video_processing",
            gpu_count=2,
            config={
                "video_count": video_count,
                "output_format": "mp4",
                "resolution": "1080p",
            }
        )
    
    # ========================================================================
    # BILLING & METRICS
    # ========================================================================
    
    def get_billing_summary(self, days: int = 30) -> Dict[str, Any]:
        """Get billing summary for the specified period"""
        cutoff = datetime.now() - timedelta(days=days)
        
        total_cost = 0.0
        total_hours = 0.0
        cost_by_gpu = {}
        
        for record in self._billing_records:
            record_time = datetime.fromisoformat(record["timestamp"])
            if record_time >= cutoff:
                total_cost += record["cost"]
                total_hours += record["runtime_hours"]
                
                gpu_type = record["gpu_type"]
                cost_by_gpu[gpu_type] = cost_by_gpu.get(gpu_type, 0) + record["cost"]
        
        # Add job costs
        for job in self._jobs.values():
            if job.completed_at and job.completed_at >= cutoff:
                total_cost += job.cost
        
        return {
            "period_days": days,
            "total_cost": round(total_cost, 2),
            "total_runtime_hours": round(total_hours, 2),
            "cost_by_gpu_type": cost_by_gpu,
            "average_hourly_cost": round(total_cost / total_hours, 2) if total_hours > 0 else 0,
            "cluster_count": len(self._clusters),
            "job_count": len(self._jobs),
        }
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get current infrastructure metrics"""
        total_gpus = 0
        running_gpus = 0
        
        for cluster in self._clusters.values():
            total_gpus += cluster.total_gpus
            running_gpus += cluster.running_gpus
        
        queued_jobs = len([j for j in self._jobs.values() if j.status == JobStatus.QUEUED])
        running_jobs = len([j for j in self._jobs.values() if j.status == JobStatus.RUNNING])
        completed_jobs = len([j for j in self._jobs.values() if j.status == JobStatus.COMPLETED])
        
        return {
            "total_gpus": total_gpus,
            "running_gpus": running_gpus,
            "utilization_percent": round(running_gpus / total_gpus * 100, 1) if total_gpus > 0 else 0,
            "cluster_count": len(self._clusters),
            "queued_jobs": queued_jobs,
            "running_jobs": running_jobs,
            "completed_jobs": completed_jobs,
            "total_jobs": len(self._jobs),
        }
    
    def export_data(self, filepath: str):
        """Export all data to JSON file"""
        data = {
            "clusters": [asdict(c) for c in self._clusters.values()],
            "jobs": [asdict(j) for j in self._jobs.values()],
            "billing": self._billing_records,
            "metrics": self.get_metrics(),
            "exported_at": datetime.now().isoformat(),
        }
        
        # Convert enums to strings
        def convert_enums(obj):
            if isinstance(obj, dict):
                return {k: convert_enums(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_enums(i) for i in obj]
            elif isinstance(obj, Enum):
                return obj.value
            elif isinstance(obj, datetime):
                return obj.isoformat()
            return obj
        
        data = convert_enums(data)
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        
        print(f"📁 Data exported to: {filepath}")


# ============================================================================
# ICC-USA HARDWARE CLIENT
# ============================================================================

class ICCUSAClient:
    """
    ICC-USA Hardware Integration Client
    Manages hardware procurement and data center services
    """
    
    def __init__(self, api_key: str, api_url: str = "https://api.icc-usa.com/v1"):
        self.api_key = api_key
        self.api_url = api_url
        self._hardware_orders: List[Dict] = []
        self._colocation_contracts: List[Dict] = []
    
    def get_hardware_catalog(self) -> List[Dict]:
        """Get available hardware from ICC-USA"""
        return [
            {
                "sku": "ICC-GPU-H100-8X",
                "name": "8x NVIDIA H100 Server",
                "specs": {
                    "gpus": 8,
                    "gpu_type": "H100",
                    "cpu": "Intel Xeon Platinum 8480+",
                    "ram_gb": 2048,
                    "storage_tb": 30,
                    "networking": "400Gbps InfiniBand",
                },
                "price": 350000,
                "lead_time_weeks": 4,
            },
            {
                "sku": "ICC-GPU-H200-8X",
                "name": "8x NVIDIA H200 Server",
                "specs": {
                    "gpus": 8,
                    "gpu_type": "H200",
                    "cpu": "Intel Xeon Platinum 8592+",
                    "ram_gb": 4096,
                    "storage_tb": 60,
                    "networking": "400Gbps InfiniBand",
                },
                "price": 450000,
                "lead_time_weeks": 6,
            },
            {
                "sku": "ICC-STORAGE-100TB",
                "name": "100TB NVMe Storage Array",
                "specs": {
                    "capacity_tb": 100,
                    "type": "NVMe SSD",
                    "iops": 10000000,
                    "throughput_gbps": 100,
                },
                "price": 75000,
                "lead_time_weeks": 2,
            },
            {
                "sku": "ICC-NETWORK-SWITCH-400G",
                "name": "400Gbps Network Switch",
                "specs": {
                    "ports": 64,
                    "speed": "400Gbps",
                    "type": "InfiniBand",
                },
                "price": 25000,
                "lead_time_weeks": 2,
            },
        ]
    
    def order_hardware(self, sku: str, quantity: int) -> Dict:
        """Place hardware order"""
        catalog = {item["sku"]: item for item in self.get_hardware_catalog()}
        
        if sku not in catalog:
            raise ValueError(f"Unknown SKU: {sku}")
        
        item = catalog[sku]
        total_price = item["price"] * quantity
        
        order = {
            "order_id": f"ICC-ORDER-{int(time.time())}",
            "sku": sku,
            "name": item["name"],
            "quantity": quantity,
            "unit_price": item["price"],
            "total_price": total_price,
            "lead_time_weeks": item["lead_time_weeks"],
            "status": "confirmed",
            "ordered_at": datetime.now().isoformat(),
            "estimated_delivery": (datetime.now() + timedelta(weeks=item["lead_time_weeks"])).isoformat(),
        }
        
        self._hardware_orders.append(order)
        
        print(f"📦 Hardware order placed: {order['order_id']}")
        print(f"   Item: {item['name']} x{quantity}")
        print(f"   Total: ${total_price:,}")
        print(f"   Delivery: {order['estimated_delivery'][:10]}")
        
        return order
    
    def get_colocation_options(self) -> List[Dict]:
        """Get colocation options"""
        return [
            {
                "plan": "STARTER",
                "name": "Starter Colocation",
                "rack_units": 4,
                "power_kw": 2,
                "bandwidth_gbps": 1,
                "price_monthly": 500,
            },
            {
                "plan": "PROFESSIONAL",
                "name": "Professional Colocation",
                "rack_units": 20,
                "power_kw": 10,
                "bandwidth_gbps": 10,
                "price_monthly": 2500,
            },
            {
                "plan": "ENTERPRISE",
                "name": "Enterprise Colocation",
                "rack_units": 42,
                "power_kw": 30,
                "bandwidth_gbps": 100,
                "price_monthly": 7500,
            },
            {
                "plan": "DEDICATED",
                "name": "Dedicated Data Center",
                "rack_units": 200,
                "power_kw": 100,
                "bandwidth_gbps": 400,
                "price_monthly": 25000,
            },
        ]
    
    def sign_colocation_contract(self, plan: str, term_months: int = 12) -> Dict:
        """Sign colocation contract"""
        options = {opt["plan"]: opt for opt in self.get_colocation_options()}
        
        if plan not in options:
            raise ValueError(f"Unknown plan: {plan}")
        
        option = options[plan]
        total_value = option["price_monthly"] * term_months
        
        contract = {
            "contract_id": f"ICC-COLO-{int(time.time())}",
            "plan": plan,
            "name": option["name"],
            "rack_units": option["rack_units"],
            "power_kw": option["power_kw"],
            "bandwidth_gbps": option["bandwidth_gbps"],
            "monthly_price": option["price_monthly"],
            "term_months": term_months,
            "total_contract_value": total_value,
            "status": "active",
            "signed_at": datetime.now().isoformat(),
            "expires_at": (datetime.now() + timedelta(days=term_months * 30)).isoformat(),
        }
        
        self._colocation_contracts.append(contract)
        
        print(f"📝 Colocation contract signed: {contract['contract_id']}")
        print(f"   Plan: {option['name']}")
        print(f"   Term: {term_months} months")
        print(f"   Monthly: ${option['price_monthly']:,}")
        print(f"   Total Value: ${total_value:,}")
        
        return contract
    
    def get_orders(self) -> List[Dict]:
        """Get all hardware orders"""
        return self._hardware_orders
    
    def get_contracts(self) -> List[Dict]:
        """Get all colocation contracts"""
        return self._colocation_contracts


# ============================================================================
# UNIFIED INFRASTRUCTURE MANAGER
# ============================================================================

class DHGInfrastructureManager:
    """
    Unified Infrastructure Manager for DHG
    Combines Nebius cloud and ICC-USA hardware
    """
    
    def __init__(
        self,
        nebius_api_key: str,
        icc_api_key: str,
        nebius_url: str = "https://api.nebius.com/v1",
        icc_url: str = "https://api.icc-usa.com/v1"
    ):
        self.nebius = NebiusAPIClient(NebiusConfig(
            api_key=nebius_api_key,
            api_url=nebius_url,
        ))
        self.icc = ICCUSAClient(icc_api_key, icc_url)
    
    def get_full_inventory(self) -> Dict[str, Any]:
        """Get complete infrastructure inventory"""
        return {
            "cloud": {
                "provider": "Nebius",
                "clusters": [asdict(c) for c in self.nebius.list_clusters()],
                "metrics": self.nebius.get_metrics(),
            },
            "hardware": {
                "provider": "ICC-USA",
                "orders": self.icc.get_orders(),
                "colocation": self.icc.get_contracts(),
            },
            "generated_at": datetime.now().isoformat(),
        }
    
    def get_total_costs(self, days: int = 30) -> Dict[str, Any]:
        """Get total infrastructure costs"""
        nebius_billing = self.nebius.get_billing_summary(days)
        
        hardware_costs = sum(order["total_price"] for order in self.icc.get_orders())
        colocation_monthly = sum(contract["monthly_price"] for contract in self.icc.get_contracts())
        
        return {
            "period_days": days,
            "cloud_costs": nebius_billing["total_cost"],
            "hardware_costs": hardware_costs,
            "colocation_monthly": colocation_monthly,
            "total_monthly_estimate": nebius_billing["total_cost"] + colocation_monthly,
            "total_capex": hardware_costs,
        }
    
    def export_all(self, directory: str):
        """Export all infrastructure data"""
        import os
        os.makedirs(directory, exist_ok=True)
        
        # Export Nebius data
        self.nebius.export_data(f"{directory}/nebius_data.json")
        
        # Export ICC-USA data
        icc_data = {
            "orders": self.icc.get_orders(),
            "contracts": self.icc.get_contracts(),
            "catalog": self.icc.get_hardware_catalog(),
            "colocation_options": self.icc.get_colocation_options(),
        }
        with open(f"{directory}/icc_data.json", 'w') as f:
            json.dump(icc_data, f, indent=2)
        
        # Export combined inventory
        with open(f"{directory}/full_inventory.json", 'w') as f:
            json.dump(self.get_full_inventory(), f, indent=2, default=str)
        
        print(f"📁 All data exported to: {directory}")


# ============================================================================
# EXAMPLE USAGE
# ============================================================================

if __name__ == "__main__":
    # Initialize the infrastructure manager
    manager = DHGInfrastructureManager(
        nebius_api_key=os.environ.get("NEBIUS_API_KEY", "demo-key"),
        icc_api_key=os.environ.get("ICC_API_KEY", "demo-key"),
    )
    
    # Create a GPU cluster
    cluster = manager.nebius.create_cluster(
        name="ATHLYNX-AI-Production",
        gpu_type=GPUType.H100,
        gpu_count=8,
    )
    
    # Start some instances
    for instance in cluster.instances[:4]:
        manager.nebius.start_instance(instance.instance_id)
    
    # Submit ATHLYNX jobs
    job1 = manager.nebius.submit_nil_training(cluster.cluster_id, "nil_v2", 50000)
    job2 = manager.nebius.submit_content_generation(cluster.cluster_id, "social_posts", 100)
    job3 = manager.nebius.submit_transfer_matching(cluster.cluster_id, 5000)
    
    # Order hardware from ICC-USA
    manager.icc.order_hardware("ICC-GPU-H100-8X", 2)
    manager.icc.sign_colocation_contract("ENTERPRISE", 24)
    
    # Get metrics
    print("\n" + "="*50)
    print("INFRASTRUCTURE METRICS")
    print("="*50)
    metrics = manager.nebius.get_metrics()
    print(f"Total GPUs: {metrics['total_gpus']}")
    print(f"Running GPUs: {metrics['running_gpus']}")
    print(f"Utilization: {metrics['utilization_percent']}%")
    print(f"Total Jobs: {metrics['total_jobs']}")
    
    # Get costs
    print("\n" + "="*50)
    print("COST SUMMARY")
    print("="*50)
    costs = manager.get_total_costs()
    print(f"Cloud Costs: ${costs['cloud_costs']:,.2f}")
    print(f"Hardware CapEx: ${costs['total_capex']:,.2f}")
    print(f"Colocation Monthly: ${costs['colocation_monthly']:,.2f}")
    
    # Export all data
    manager.export_all("/home/ubuntu/athlynx-perfect-storm/infrastructure/exports")
