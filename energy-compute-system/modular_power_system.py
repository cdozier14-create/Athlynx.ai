#!/usr/bin/env python3
"""
ATHLYNX MODULAR POWER & AI COMPUTE SYSTEM
==========================================
Simulation for containerized power stations capturing stranded gas/flare energy
to power mobile AI data centers.

Author: ATHLYNX Engineering
Version: 1.0.0
"""

import json
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime, timedelta
import math

# ============================================
# DATA MODELS
# ============================================

@dataclass
class GasFlareSource:
    """Represents a gas flare or stranded energy source"""
    id: str
    name: str
    location: tuple  # (latitude, longitude)
    state: str
    daily_gas_volume_mcf: float  # thousand cubic feet per day
    gas_composition: Dict[str, float]  # methane %, ethane %, etc.
    current_status: str  # "flaring", "venting", "available"
    land_owner: str
    estimated_years_remaining: float
    
    @property
    def daily_energy_potential_kwh(self) -> float:
        """Calculate daily energy potential in kWh"""
        # 1 MCF of natural gas ≈ 293 kWh
        methane_content = self.gas_composition.get("methane", 0.85)
        efficiency = 0.40  # Gas turbine efficiency
        return self.daily_gas_volume_mcf * 293 * methane_content * efficiency
    
    @property
    def monthly_revenue_potential(self) -> float:
        """Estimate monthly revenue from compute"""
        # AI compute revenue: ~$0.10-0.30 per kWh of compute
        daily_kwh = self.daily_energy_potential_kwh
        compute_rate = 0.15  # $/kWh revenue from AI compute
        return daily_kwh * 30 * compute_rate


@dataclass
class ModularPowerUnit:
    """Containerized power generation unit"""
    id: str
    model: str
    capacity_kw: float
    fuel_type: str  # "natural_gas", "flare_gas", "dual_fuel"
    container_size: str  # "20ft", "40ft", "53ft"
    weight_tons: float
    deployment_time_hours: float
    maintenance_interval_hours: float
    efficiency: float
    cost_usd: float
    
    # Operational state
    current_location: Optional[tuple] = None
    hours_operated: float = 0
    status: str = "available"  # "available", "deployed", "maintenance"
    
    def calculate_output(self, gas_volume_mcf: float) -> float:
        """Calculate actual power output given gas input"""
        # 1 MCF ≈ 293 kWh theoretical
        theoretical_kwh = gas_volume_mcf * 293
        actual_output = min(theoretical_kwh * self.efficiency, self.capacity_kw * 24)
        return actual_output


@dataclass
class MobileDataCenter:
    """Container-based AI compute pod"""
    id: str
    name: str
    container_size: str
    gpu_count: int
    gpu_model: str
    power_requirement_kw: float
    cooling_type: str  # "air", "immersion", "hybrid"
    compute_capacity_tflops: float
    cost_usd: float
    
    # Operational state
    current_location: Optional[tuple] = None
    status: str = "available"
    uptime_percent: float = 99.9
    
    @property
    def daily_compute_revenue(self) -> float:
        """Estimate daily revenue from AI compute services"""
        # High-end GPU compute: $2-5 per GPU-hour
        gpu_hour_rate = 3.0
        hours_per_day = 24 * (self.uptime_percent / 100)
        return self.gpu_count * gpu_hour_rate * hours_per_day
    
    @property
    def daily_power_cost_at_grid(self) -> float:
        """What it would cost at grid prices"""
        grid_rate = 0.12  # $/kWh average
        return self.power_requirement_kw * 24 * grid_rate


@dataclass
class DeploymentSite:
    """A deployed modular power + compute installation"""
    id: str
    name: str
    gas_source: GasFlareSource
    power_units: List[ModularPowerUnit]
    data_centers: List[MobileDataCenter]
    deployment_date: datetime
    land_lease_monthly: float
    
    @property
    def total_power_capacity_kw(self) -> float:
        return sum(pu.capacity_kw for pu in self.power_units)
    
    @property
    def total_compute_capacity_tflops(self) -> float:
        return sum(dc.compute_capacity_tflops for dc in self.data_centers)
    
    @property
    def daily_revenue(self) -> float:
        return sum(dc.daily_compute_revenue for dc in self.data_centers)
    
    @property
    def daily_operating_cost(self) -> float:
        # Maintenance, monitoring, land lease per day
        maintenance = len(self.power_units) * 50 + len(self.data_centers) * 100
        land = self.land_lease_monthly / 30
        return maintenance + land
    
    @property
    def daily_profit(self) -> float:
        return self.daily_revenue - self.daily_operating_cost
    
    @property
    def monthly_profit(self) -> float:
        return self.daily_profit * 30


# ============================================
# SIMULATION ENGINE
# ============================================

class ATHLYNXEnergySimulator:
    """Main simulation engine for the modular power + AI compute system"""
    
    def __init__(self):
        self.gas_sources: List[GasFlareSource] = []
        self.power_units: List[ModularPowerUnit] = []
        self.data_centers: List[MobileDataCenter] = []
        self.deployments: List[DeploymentSite] = []
        
    def add_gas_source(self, source: GasFlareSource):
        self.gas_sources.append(source)
        
    def add_power_unit(self, unit: ModularPowerUnit):
        self.power_units.append(unit)
        
    def add_data_center(self, dc: MobileDataCenter):
        self.data_centers.append(dc)
    
    def find_optimal_sites(self, min_daily_kwh: float = 10000) -> List[GasFlareSource]:
        """Find gas sources that meet minimum energy requirements"""
        return [s for s in self.gas_sources 
                if s.daily_energy_potential_kwh >= min_daily_kwh 
                and s.current_status == "available"]
    
    def calculate_deployment_roi(self, 
                                  gas_source: GasFlareSource,
                                  power_units: List[ModularPowerUnit],
                                  data_centers: List[MobileDataCenter],
                                  land_lease_monthly: float = 5000) -> Dict:
        """Calculate ROI for a potential deployment"""
        
        # Capital costs
        power_capex = sum(pu.cost_usd for pu in power_units)
        compute_capex = sum(dc.cost_usd for dc in data_centers)
        deployment_cost = 50000  # Logistics, setup, permits
        total_capex = power_capex + compute_capex + deployment_cost
        
        # Monthly revenue
        monthly_compute_revenue = sum(dc.daily_compute_revenue * 30 for dc in data_centers)
        
        # Monthly costs
        monthly_maintenance = len(power_units) * 1500 + len(data_centers) * 3000
        monthly_land = land_lease_monthly
        monthly_opex = monthly_maintenance + monthly_land
        
        # Profit
        monthly_profit = monthly_compute_revenue - monthly_opex
        annual_profit = monthly_profit * 12
        
        # ROI metrics
        payback_months = total_capex / monthly_profit if monthly_profit > 0 else float('inf')
        annual_roi = (annual_profit / total_capex) * 100 if total_capex > 0 else 0
        
        # Comparison to grid power
        grid_power_cost = sum(dc.daily_power_cost_at_grid * 30 for dc in data_centers)
        energy_savings = grid_power_cost  # We pay $0 for stranded gas
        
        return {
            "site_name": gas_source.name,
            "location": gas_source.location,
            "daily_energy_kwh": gas_source.daily_energy_potential_kwh,
            "total_capex": total_capex,
            "monthly_revenue": monthly_compute_revenue,
            "monthly_opex": monthly_opex,
            "monthly_profit": monthly_profit,
            "annual_profit": annual_profit,
            "payback_months": payback_months,
            "annual_roi_percent": annual_roi,
            "monthly_energy_savings": energy_savings,
            "power_units": len(power_units),
            "data_centers": len(data_centers),
            "total_gpus": sum(dc.gpu_count for dc in data_centers),
            "compute_tflops": sum(dc.compute_capacity_tflops for dc in data_centers)
        }
    
    def simulate_network(self, months: int = 12) -> Dict:
        """Simulate the entire network over time"""
        results = {
            "months": [],
            "total_revenue": 0,
            "total_profit": 0,
            "total_compute_hours": 0,
            "co2_offset_tons": 0
        }
        
        for month in range(1, months + 1):
            monthly_revenue = sum(d.daily_revenue * 30 for d in self.deployments)
            monthly_profit = sum(d.monthly_profit for d in self.deployments)
            
            # CO2 offset: flaring 1 MCF releases ~0.05 tons CO2
            # By capturing it, we prevent that + generate clean compute
            monthly_gas_captured = sum(
                d.gas_source.daily_gas_volume_mcf * 30 
                for d in self.deployments
            )
            co2_offset = monthly_gas_captured * 0.05
            
            results["months"].append({
                "month": month,
                "revenue": monthly_revenue,
                "profit": monthly_profit,
                "co2_offset_tons": co2_offset
            })
            
            results["total_revenue"] += monthly_revenue
            results["total_profit"] += monthly_profit
            results["co2_offset_tons"] += co2_offset
        
        return results


# ============================================
# SAMPLE DATA & DEMO
# ============================================

def create_sample_simulation():
    """Create a sample simulation with realistic data"""
    
    sim = ATHLYNXEnergySimulator()
    
    # Add sample gas flare sources (based on real Permian Basin data)
    sources = [
        GasFlareSource(
            id="GF001",
            name="Permian Basin Site Alpha",
            location=(31.8457, -102.3676),
            state="Texas",
            daily_gas_volume_mcf=500,
            gas_composition={"methane": 0.87, "ethane": 0.06, "propane": 0.04},
            current_status="available",
            land_owner="Private Ranch",
            estimated_years_remaining=15
        ),
        GasFlareSource(
            id="GF002",
            name="Bakken Formation Site Beta",
            location=(47.9253, -103.4590),
            state="North Dakota",
            daily_gas_volume_mcf=750,
            gas_composition={"methane": 0.85, "ethane": 0.08, "propane": 0.05},
            current_status="available",
            land_owner="State Land",
            estimated_years_remaining=20
        ),
        GasFlareSource(
            id="GF003",
            name="Eagle Ford Site Gamma",
            location=(28.7041, -99.1057),
            state="Texas",
            daily_gas_volume_mcf=400,
            gas_composition={"methane": 0.90, "ethane": 0.05, "propane": 0.03},
            current_status="available",
            land_owner="Oil Company Lease",
            estimated_years_remaining=12
        ),
    ]
    
    for source in sources:
        sim.add_gas_source(source)
    
    # Add modular power units
    power_units = [
        ModularPowerUnit(
            id="MPU001",
            model="ATHLYNX PowerPod 500",
            capacity_kw=500,
            fuel_type="flare_gas",
            container_size="40ft",
            weight_tons=15,
            deployment_time_hours=48,
            maintenance_interval_hours=2000,
            efficiency=0.42,
            cost_usd=350000
        ),
        ModularPowerUnit(
            id="MPU002",
            model="ATHLYNX PowerPod 1000",
            capacity_kw=1000,
            fuel_type="dual_fuel",
            container_size="53ft",
            weight_tons=25,
            deployment_time_hours=72,
            maintenance_interval_hours=2500,
            efficiency=0.45,
            cost_usd=650000
        ),
    ]
    
    for unit in power_units:
        sim.add_power_unit(unit)
    
    # Add mobile data centers
    data_centers = [
        MobileDataCenter(
            id="MDC001",
            name="ATHLYNX ComputePod A100",
            container_size="40ft",
            gpu_count=64,
            gpu_model="NVIDIA A100",
            power_requirement_kw=400,
            cooling_type="immersion",
            compute_capacity_tflops=1248,  # 64 * 19.5 TFLOPS
            cost_usd=2500000
        ),
        MobileDataCenter(
            id="MDC002",
            name="ATHLYNX ComputePod H100",
            container_size="40ft",
            gpu_count=32,
            gpu_model="NVIDIA H100",
            power_requirement_kw=350,
            cooling_type="immersion",
            compute_capacity_tflops=1920,  # 32 * 60 TFLOPS
            cost_usd=3500000
        ),
    ]
    
    for dc in data_centers:
        sim.add_data_center(dc)
    
    return sim


def run_demo():
    """Run a demonstration of the simulation"""
    
    print("=" * 60)
    print("ATHLYNX MODULAR POWER & AI COMPUTE SYSTEM")
    print("Energy Independence Simulation")
    print("=" * 60)
    print()
    
    sim = create_sample_simulation()
    
    # Find optimal sites
    print("📍 AVAILABLE GAS FLARE SITES:")
    print("-" * 40)
    for source in sim.gas_sources:
        print(f"\n{source.name}")
        print(f"  Location: {source.state} ({source.location[0]:.4f}, {source.location[1]:.4f})")
        print(f"  Daily Gas: {source.daily_gas_volume_mcf:,.0f} MCF")
        print(f"  Daily Energy Potential: {source.daily_energy_potential_kwh:,.0f} kWh")
        print(f"  Monthly Revenue Potential: ${source.monthly_revenue_potential:,.0f}")
    
    print("\n")
    print("💡 MODULAR POWER UNITS:")
    print("-" * 40)
    for unit in sim.power_units:
        print(f"\n{unit.model}")
        print(f"  Capacity: {unit.capacity_kw} kW")
        print(f"  Container: {unit.container_size}")
        print(f"  Efficiency: {unit.efficiency * 100:.0f}%")
        print(f"  Cost: ${unit.cost_usd:,.0f}")
    
    print("\n")
    print("🖥️ MOBILE DATA CENTERS:")
    print("-" * 40)
    for dc in sim.data_centers:
        print(f"\n{dc.name}")
        print(f"  GPUs: {dc.gpu_count}x {dc.gpu_model}")
        print(f"  Compute: {dc.compute_capacity_tflops:,.0f} TFLOPS")
        print(f"  Power: {dc.power_requirement_kw} kW")
        print(f"  Daily Revenue: ${dc.daily_compute_revenue:,.0f}")
        print(f"  Cost: ${dc.cost_usd:,.0f}")
    
    print("\n")
    print("📊 DEPLOYMENT ROI ANALYSIS:")
    print("-" * 40)
    
    # Calculate ROI for deploying at the first site
    roi = sim.calculate_deployment_roi(
        gas_source=sim.gas_sources[0],
        power_units=sim.power_units[:1],  # 1 power unit
        data_centers=sim.data_centers[:1],  # 1 data center
        land_lease_monthly=3000
    )
    
    print(f"\nSite: {roi['site_name']}")
    print(f"Daily Energy: {roi['daily_energy_kwh']:,.0f} kWh")
    print(f"\nCAPITAL EXPENDITURE:")
    print(f"  Total CapEx: ${roi['total_capex']:,.0f}")
    print(f"\nMONTHLY FINANCIALS:")
    print(f"  Revenue: ${roi['monthly_revenue']:,.0f}")
    print(f"  OpEx: ${roi['monthly_opex']:,.0f}")
    print(f"  Profit: ${roi['monthly_profit']:,.0f}")
    print(f"  Energy Savings vs Grid: ${roi['monthly_energy_savings']:,.0f}")
    print(f"\nROI METRICS:")
    print(f"  Payback Period: {roi['payback_months']:.1f} months")
    print(f"  Annual ROI: {roi['annual_roi_percent']:.1f}%")
    print(f"  Annual Profit: ${roi['annual_profit']:,.0f}")
    print(f"\nCOMPUTE CAPACITY:")
    print(f"  GPUs: {roi['total_gpus']}")
    print(f"  TFLOPS: {roi['compute_tflops']:,.0f}")
    
    print("\n")
    print("=" * 60)
    print("🌋 ENERGY INDEPENDENCE ACHIEVED")
    print("Zero grid dependency. Zero power company bills.")
    print("Capturing stranded energy. Powering AI compute.")
    print("=" * 60)
    
    # Export results to JSON
    results = {
        "simulation_date": datetime.now().isoformat(),
        "gas_sources": [
            {
                "name": s.name,
                "location": s.location,
                "daily_energy_kwh": s.daily_energy_potential_kwh,
                "monthly_revenue_potential": s.monthly_revenue_potential
            }
            for s in sim.gas_sources
        ],
        "deployment_roi": roi,
        "summary": {
            "total_sites_available": len(sim.gas_sources),
            "total_power_units": len(sim.power_units),
            "total_data_centers": len(sim.data_centers),
            "total_potential_monthly_revenue": sum(s.monthly_revenue_potential for s in sim.gas_sources)
        }
    }
    
    with open("/home/ubuntu/athlynx-perfect-storm/energy-compute-system/simulation_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("\n✅ Results exported to simulation_results.json")
    
    return results


if __name__ == "__main__":
    run_demo()
