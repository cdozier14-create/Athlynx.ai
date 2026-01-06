"""
DOZIER HOLDINGS GROUP - GPU-AS-A-SERVICE BILLING SYSTEM
Revenue Generation Platform for Infrastructure Services

Author: DHG Engineering Team
Version: 1.0.0
Date: January 6, 2026
"""

import os
import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict, field
from enum import Enum
from decimal import Decimal, ROUND_HALF_UP


# ============================================================================
# PRICING TIERS
# ============================================================================

class PricingTier(Enum):
    """Customer pricing tiers"""
    STARTER = "starter"
    PROFESSIONAL = "professional"
    ENTERPRISE = "enterprise"
    CUSTOM = "custom"


class GPUProduct(Enum):
    """GPU products available for resale"""
    H100_HOUR = "h100_hour"
    H200_HOUR = "h200_hour"
    B200_HOUR = "b200_hour"
    GB200_HOUR = "gb200_hour"
    TRAINING_JOB = "training_job"
    INFERENCE_ENDPOINT = "inference_endpoint"
    STORAGE_GB = "storage_gb"


# Base costs (what we pay Nebius)
BASE_COSTS = {
    GPUProduct.H100_HOUR: Decimal("2.00"),
    GPUProduct.H200_HOUR: Decimal("2.30"),
    GPUProduct.B200_HOUR: Decimal("3.00"),
    GPUProduct.GB200_HOUR: Decimal("5.00"),
    GPUProduct.TRAINING_JOB: Decimal("10.00"),  # Per job base
    GPUProduct.INFERENCE_ENDPOINT: Decimal("50.00"),  # Per endpoint/month
    GPUProduct.STORAGE_GB: Decimal("0.10"),  # Per GB/month
}

# Markup percentages by tier
TIER_MARKUPS = {
    PricingTier.STARTER: Decimal("0.50"),      # 50% markup
    PricingTier.PROFESSIONAL: Decimal("0.40"),  # 40% markup
    PricingTier.ENTERPRISE: Decimal("0.30"),    # 30% markup
    PricingTier.CUSTOM: Decimal("0.25"),        # 25% markup (negotiated)
}

# Volume discounts (usage per month)
VOLUME_DISCOUNTS = {
    100: Decimal("0.05"),    # 5% off for 100+ GPU hours
    500: Decimal("0.10"),    # 10% off for 500+ GPU hours
    1000: Decimal("0.15"),   # 15% off for 1000+ GPU hours
    5000: Decimal("0.20"),   # 20% off for 5000+ GPU hours
    10000: Decimal("0.25"),  # 25% off for 10000+ GPU hours
}


# ============================================================================
# DATA CLASSES
# ============================================================================

@dataclass
class Customer:
    """Customer account"""
    customer_id: str
    name: str
    email: str
    company: str
    tier: PricingTier
    stripe_customer_id: Optional[str] = None
    credit_balance: Decimal = Decimal("0.00")
    created_at: datetime = field(default_factory=datetime.now)
    is_active: bool = True
    custom_markup: Optional[Decimal] = None  # For custom tier


@dataclass
class UsageRecord:
    """Single usage record"""
    record_id: str
    customer_id: str
    product: GPUProduct
    quantity: Decimal
    unit_price: Decimal
    total_price: Decimal
    description: str
    timestamp: datetime
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class Invoice:
    """Customer invoice"""
    invoice_id: str
    customer_id: str
    period_start: datetime
    period_end: datetime
    line_items: List[Dict[str, Any]]
    subtotal: Decimal
    discount: Decimal
    tax: Decimal
    total: Decimal
    status: str  # draft, pending, paid, overdue, cancelled
    due_date: datetime
    created_at: datetime = field(default_factory=datetime.now)
    paid_at: Optional[datetime] = None
    stripe_invoice_id: Optional[str] = None


@dataclass
class Subscription:
    """Recurring subscription"""
    subscription_id: str
    customer_id: str
    plan_name: str
    products: List[Dict[str, Any]]  # List of products and quantities
    monthly_price: Decimal
    status: str  # active, paused, cancelled
    billing_cycle_day: int  # Day of month for billing
    created_at: datetime = field(default_factory=datetime.now)
    next_billing_date: datetime = field(default_factory=lambda: datetime.now() + timedelta(days=30))


# ============================================================================
# BILLING ENGINE
# ============================================================================

class GPUBillingEngine:
    """
    GPU-as-a-Service Billing Engine
    Handles pricing, usage tracking, invoicing, and revenue reporting
    """
    
    def __init__(self, stripe_api_key: Optional[str] = None):
        self.stripe_api_key = stripe_api_key
        self._customers: Dict[str, Customer] = {}
        self._usage_records: List[UsageRecord] = []
        self._invoices: Dict[str, Invoice] = {}
        self._subscriptions: Dict[str, Subscription] = {}
    
    # ========================================================================
    # PRICING CALCULATIONS
    # ========================================================================
    
    def calculate_price(
        self,
        product: GPUProduct,
        quantity: Decimal,
        tier: PricingTier,
        custom_markup: Optional[Decimal] = None
    ) -> Decimal:
        """Calculate price for a product based on tier and quantity"""
        
        base_cost = BASE_COSTS[product]
        
        # Apply tier markup
        if tier == PricingTier.CUSTOM and custom_markup is not None:
            markup = custom_markup
        else:
            markup = TIER_MARKUPS[tier]
        
        unit_price = base_cost * (1 + markup)
        total = unit_price * quantity
        
        return total.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    
    def calculate_volume_discount(self, total_gpu_hours: Decimal) -> Decimal:
        """Calculate volume discount based on total GPU hours"""
        
        discount = Decimal("0.00")
        
        for threshold, disc in sorted(VOLUME_DISCOUNTS.items(), reverse=True):
            if total_gpu_hours >= threshold:
                discount = disc
                break
        
        return discount
    
    def get_pricing_table(self, tier: PricingTier) -> Dict[str, Decimal]:
        """Get pricing table for a tier"""
        
        prices = {}
        for product in GPUProduct:
            base = BASE_COSTS[product]
            markup = TIER_MARKUPS[tier]
            price = base * (1 + markup)
            prices[product.value] = price.quantize(Decimal("0.01"))
        
        return prices
    
    # ========================================================================
    # CUSTOMER MANAGEMENT
    # ========================================================================
    
    def create_customer(
        self,
        name: str,
        email: str,
        company: str,
        tier: PricingTier = PricingTier.STARTER
    ) -> Customer:
        """Create a new customer"""
        
        customer_id = f"cust_{uuid.uuid4().hex[:12]}"
        
        customer = Customer(
            customer_id=customer_id,
            name=name,
            email=email,
            company=company,
            tier=tier,
        )
        
        self._customers[customer_id] = customer
        
        print(f"✅ Customer created: {name} ({customer_id})")
        print(f"   Tier: {tier.value}")
        print(f"   Pricing: {self.get_pricing_table(tier)}")
        
        return customer
    
    def upgrade_customer(self, customer_id: str, new_tier: PricingTier) -> Customer:
        """Upgrade customer to a new tier"""
        
        if customer_id not in self._customers:
            raise ValueError(f"Customer not found: {customer_id}")
        
        customer = self._customers[customer_id]
        old_tier = customer.tier
        customer.tier = new_tier
        
        print(f"⬆️ Customer upgraded: {customer.name}")
        print(f"   {old_tier.value} → {new_tier.value}")
        
        return customer
    
    def add_credit(self, customer_id: str, amount: Decimal, reason: str) -> Customer:
        """Add credit to customer account"""
        
        if customer_id not in self._customers:
            raise ValueError(f"Customer not found: {customer_id}")
        
        customer = self._customers[customer_id]
        customer.credit_balance += amount
        
        print(f"💰 Credit added: ${amount} to {customer.name}")
        print(f"   Reason: {reason}")
        print(f"   New balance: ${customer.credit_balance}")
        
        return customer
    
    # ========================================================================
    # USAGE TRACKING
    # ========================================================================
    
    def record_usage(
        self,
        customer_id: str,
        product: GPUProduct,
        quantity: Decimal,
        description: str,
        metadata: Optional[Dict] = None
    ) -> UsageRecord:
        """Record usage for a customer"""
        
        if customer_id not in self._customers:
            raise ValueError(f"Customer not found: {customer_id}")
        
        customer = self._customers[customer_id]
        
        # Calculate price
        unit_price = self.calculate_price(product, Decimal("1"), customer.tier, customer.custom_markup)
        total_price = unit_price * quantity
        
        record = UsageRecord(
            record_id=f"usage_{uuid.uuid4().hex[:12]}",
            customer_id=customer_id,
            product=product,
            quantity=quantity,
            unit_price=unit_price,
            total_price=total_price,
            description=description,
            timestamp=datetime.now(),
            metadata=metadata or {},
        )
        
        self._usage_records.append(record)
        
        print(f"📊 Usage recorded: {customer.name}")
        print(f"   {product.value}: {quantity} @ ${unit_price}/unit = ${total_price}")
        
        return record
    
    def get_customer_usage(
        self,
        customer_id: str,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None
    ) -> List[UsageRecord]:
        """Get usage records for a customer"""
        
        records = [r for r in self._usage_records if r.customer_id == customer_id]
        
        if start_date:
            records = [r for r in records if r.timestamp >= start_date]
        if end_date:
            records = [r for r in records if r.timestamp <= end_date]
        
        return records
    
    # ========================================================================
    # INVOICING
    # ========================================================================
    
    def generate_invoice(
        self,
        customer_id: str,
        period_start: datetime,
        period_end: datetime,
        tax_rate: Decimal = Decimal("0.00")
    ) -> Invoice:
        """Generate invoice for a customer"""
        
        if customer_id not in self._customers:
            raise ValueError(f"Customer not found: {customer_id}")
        
        customer = self._customers[customer_id]
        
        # Get usage for period
        usage = self.get_customer_usage(customer_id, period_start, period_end)
        
        # Group by product
        product_totals: Dict[str, Dict] = {}
        total_gpu_hours = Decimal("0")
        
        for record in usage:
            product_key = record.product.value
            if product_key not in product_totals:
                product_totals[product_key] = {
                    "product": record.product.value,
                    "quantity": Decimal("0"),
                    "unit_price": record.unit_price,
                    "total": Decimal("0"),
                }
            product_totals[product_key]["quantity"] += record.quantity
            product_totals[product_key]["total"] += record.total_price
            
            # Track GPU hours for volume discount
            if record.product in [GPUProduct.H100_HOUR, GPUProduct.H200_HOUR, 
                                  GPUProduct.B200_HOUR, GPUProduct.GB200_HOUR]:
                total_gpu_hours += record.quantity
        
        line_items = list(product_totals.values())
        subtotal = sum(item["total"] for item in line_items)
        
        # Calculate volume discount
        volume_discount_rate = self.calculate_volume_discount(total_gpu_hours)
        discount = subtotal * volume_discount_rate
        
        # Apply credit balance
        credit_applied = min(customer.credit_balance, subtotal - discount)
        if credit_applied > 0:
            customer.credit_balance -= credit_applied
            line_items.append({
                "product": "credit_applied",
                "quantity": Decimal("1"),
                "unit_price": -credit_applied,
                "total": -credit_applied,
            })
        
        # Calculate tax
        taxable_amount = subtotal - discount - credit_applied
        tax = taxable_amount * tax_rate
        
        total = taxable_amount + tax
        
        invoice = Invoice(
            invoice_id=f"inv_{uuid.uuid4().hex[:12]}",
            customer_id=customer_id,
            period_start=period_start,
            period_end=period_end,
            line_items=line_items,
            subtotal=subtotal,
            discount=discount,
            tax=tax,
            total=total.quantize(Decimal("0.01")),
            status="pending",
            due_date=datetime.now() + timedelta(days=30),
        )
        
        self._invoices[invoice.invoice_id] = invoice
        
        print(f"📄 Invoice generated: {invoice.invoice_id}")
        print(f"   Customer: {customer.name}")
        print(f"   Period: {period_start.date()} to {period_end.date()}")
        print(f"   Subtotal: ${subtotal}")
        print(f"   Discount: -${discount} ({volume_discount_rate * 100}%)")
        print(f"   Tax: ${tax}")
        print(f"   Total: ${total}")
        
        return invoice
    
    def mark_invoice_paid(self, invoice_id: str) -> Invoice:
        """Mark invoice as paid"""
        
        if invoice_id not in self._invoices:
            raise ValueError(f"Invoice not found: {invoice_id}")
        
        invoice = self._invoices[invoice_id]
        invoice.status = "paid"
        invoice.paid_at = datetime.now()
        
        print(f"✅ Invoice paid: {invoice_id}")
        
        return invoice
    
    # ========================================================================
    # SUBSCRIPTIONS
    # ========================================================================
    
    def create_subscription(
        self,
        customer_id: str,
        plan_name: str,
        products: List[Dict[str, Any]],
        billing_cycle_day: int = 1
    ) -> Subscription:
        """Create a recurring subscription"""
        
        if customer_id not in self._customers:
            raise ValueError(f"Customer not found: {customer_id}")
        
        customer = self._customers[customer_id]
        
        # Calculate monthly price
        monthly_price = Decimal("0")
        for item in products:
            product = GPUProduct(item["product"])
            quantity = Decimal(str(item["quantity"]))
            price = self.calculate_price(product, quantity, customer.tier, customer.custom_markup)
            monthly_price += price
        
        subscription = Subscription(
            subscription_id=f"sub_{uuid.uuid4().hex[:12]}",
            customer_id=customer_id,
            plan_name=plan_name,
            products=products,
            monthly_price=monthly_price,
            status="active",
            billing_cycle_day=billing_cycle_day,
        )
        
        self._subscriptions[subscription.subscription_id] = subscription
        
        print(f"🔄 Subscription created: {plan_name}")
        print(f"   Customer: {customer.name}")
        print(f"   Monthly: ${monthly_price}")
        
        return subscription
    
    # ========================================================================
    # REVENUE REPORTING
    # ========================================================================
    
    def get_revenue_report(
        self,
        start_date: datetime,
        end_date: datetime
    ) -> Dict[str, Any]:
        """Generate revenue report for a period"""
        
        # Filter invoices by period
        period_invoices = [
            inv for inv in self._invoices.values()
            if start_date <= inv.created_at <= end_date
        ]
        
        total_revenue = sum(inv.total for inv in period_invoices if inv.status == "paid")
        pending_revenue = sum(inv.total for inv in period_invoices if inv.status == "pending")
        
        # Revenue by product
        revenue_by_product: Dict[str, Decimal] = {}
        for inv in period_invoices:
            if inv.status == "paid":
                for item in inv.line_items:
                    product = item["product"]
                    if product != "credit_applied":
                        revenue_by_product[product] = revenue_by_product.get(product, Decimal("0")) + item["total"]
        
        # Revenue by customer
        revenue_by_customer: Dict[str, Decimal] = {}
        for inv in period_invoices:
            if inv.status == "paid":
                customer = self._customers.get(inv.customer_id)
                if customer:
                    revenue_by_customer[customer.name] = revenue_by_customer.get(customer.name, Decimal("0")) + inv.total
        
        # Calculate costs and profit
        total_cost = Decimal("0")
        for record in self._usage_records:
            if start_date <= record.timestamp <= end_date:
                base_cost = BASE_COSTS[record.product] * record.quantity
                total_cost += base_cost
        
        gross_profit = total_revenue - total_cost
        profit_margin = (gross_profit / total_revenue * 100) if total_revenue > 0 else Decimal("0")
        
        return {
            "period": {
                "start": start_date.isoformat(),
                "end": end_date.isoformat(),
            },
            "revenue": {
                "total": float(total_revenue),
                "pending": float(pending_revenue),
                "by_product": {k: float(v) for k, v in revenue_by_product.items()},
                "by_customer": {k: float(v) for k, v in revenue_by_customer.items()},
            },
            "costs": {
                "total": float(total_cost),
            },
            "profit": {
                "gross": float(gross_profit),
                "margin_percent": float(profit_margin.quantize(Decimal("0.1"))),
            },
            "metrics": {
                "total_invoices": len(period_invoices),
                "paid_invoices": len([i for i in period_invoices if i.status == "paid"]),
                "active_customers": len([c for c in self._customers.values() if c.is_active]),
                "active_subscriptions": len([s for s in self._subscriptions.values() if s.status == "active"]),
            },
        }
    
    def get_mrr(self) -> Decimal:
        """Calculate Monthly Recurring Revenue"""
        
        mrr = Decimal("0")
        for sub in self._subscriptions.values():
            if sub.status == "active":
                mrr += sub.monthly_price
        
        return mrr
    
    def get_arr(self) -> Decimal:
        """Calculate Annual Recurring Revenue"""
        return self.get_mrr() * 12
    
    # ========================================================================
    # EXPORT
    # ========================================================================
    
    def export_data(self, filepath: str):
        """Export all billing data to JSON"""
        
        def decimal_to_float(obj):
            if isinstance(obj, Decimal):
                return float(obj)
            elif isinstance(obj, datetime):
                return obj.isoformat()
            elif isinstance(obj, Enum):
                return obj.value
            elif isinstance(obj, dict):
                return {k: decimal_to_float(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [decimal_to_float(i) for i in obj]
            return obj
        
        data = {
            "customers": [decimal_to_float(asdict(c)) for c in self._customers.values()],
            "usage_records": [decimal_to_float(asdict(r)) for r in self._usage_records],
            "invoices": [decimal_to_float(asdict(i)) for i in self._invoices.values()],
            "subscriptions": [decimal_to_float(asdict(s)) for s in self._subscriptions.values()],
            "pricing": {
                "base_costs": {k.value: float(v) for k, v in BASE_COSTS.items()},
                "tier_markups": {k.value: float(v) for k, v in TIER_MARKUPS.items()},
            },
            "metrics": {
                "mrr": float(self.get_mrr()),
                "arr": float(self.get_arr()),
            },
            "exported_at": datetime.now().isoformat(),
        }
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"📁 Billing data exported to: {filepath}")


# ============================================================================
# ATHLYNX-SPECIFIC PLANS
# ============================================================================

ATHLYNX_PLANS = {
    "rookie": {
        "name": "Rookie",
        "tier": PricingTier.STARTER,
        "monthly_price": Decimal("29.99"),
        "included": {
            GPUProduct.INFERENCE_ENDPOINT: 1,
            GPUProduct.STORAGE_GB: 10,
        },
        "features": [
            "NIL Valuation Calculator",
            "Basic Content Generation",
            "10GB Storage",
        ],
    },
    "all_star": {
        "name": "All-Star",
        "tier": PricingTier.PROFESSIONAL,
        "monthly_price": Decimal("99.99"),
        "included": {
            GPUProduct.INFERENCE_ENDPOINT: 3,
            GPUProduct.STORAGE_GB: 100,
            GPUProduct.H100_HOUR: 10,
        },
        "features": [
            "Advanced NIL Analytics",
            "Unlimited Content Generation",
            "Transfer Portal Matching",
            "100GB Storage",
            "10 GPU Hours/month",
        ],
    },
    "mvp": {
        "name": "MVP",
        "tier": PricingTier.ENTERPRISE,
        "monthly_price": Decimal("299.99"),
        "included": {
            GPUProduct.INFERENCE_ENDPOINT: 10,
            GPUProduct.STORAGE_GB: 1000,
            GPUProduct.H100_HOUR: 100,
            GPUProduct.TRAINING_JOB: 5,
        },
        "features": [
            "Full AI Suite",
            "Custom Model Training",
            "Priority Support",
            "1TB Storage",
            "100 GPU Hours/month",
            "5 Training Jobs/month",
            "API Access",
        ],
    },
}


# ============================================================================
# EXAMPLE USAGE
# ============================================================================

if __name__ == "__main__":
    # Initialize billing engine
    engine = GPUBillingEngine()
    
    # Create customers
    customer1 = engine.create_customer(
        name="Texas A&M Athletics",
        email="athletics@tamu.edu",
        company="Texas A&M University",
        tier=PricingTier.ENTERPRISE,
    )
    
    customer2 = engine.create_customer(
        name="Elite Baseball Academy",
        email="info@elitebaseball.com",
        company="Elite Baseball Academy",
        tier=PricingTier.PROFESSIONAL,
    )
    
    # Record usage
    engine.record_usage(
        customer1.customer_id,
        GPUProduct.H100_HOUR,
        Decimal("50"),
        "NIL Model Training - Q1 2026",
    )
    
    engine.record_usage(
        customer1.customer_id,
        GPUProduct.INFERENCE_ENDPOINT,
        Decimal("5"),
        "Content Generation Endpoints",
    )
    
    engine.record_usage(
        customer2.customer_id,
        GPUProduct.H200_HOUR,
        Decimal("20"),
        "Video Highlight Processing",
    )
    
    # Create subscription
    engine.create_subscription(
        customer2.customer_id,
        "All-Star Plan",
        [
            {"product": "inference_endpoint", "quantity": 3},
            {"product": "storage_gb", "quantity": 100},
        ],
    )
    
    # Generate invoice
    invoice = engine.generate_invoice(
        customer1.customer_id,
        datetime.now() - timedelta(days=30),
        datetime.now(),
    )
    
    # Mark as paid
    engine.mark_invoice_paid(invoice.invoice_id)
    
    # Generate revenue report
    print("\n" + "="*50)
    print("REVENUE REPORT")
    print("="*50)
    report = engine.get_revenue_report(
        datetime.now() - timedelta(days=30),
        datetime.now(),
    )
    print(json.dumps(report, indent=2))
    
    # Show MRR/ARR
    print(f"\nMRR: ${engine.get_mrr():,.2f}")
    print(f"ARR: ${engine.get_arr():,.2f}")
    
    # Export data
    os.makedirs("/home/ubuntu/athlynx-perfect-storm/infrastructure/exports", exist_ok=True)
    engine.export_data("/home/ubuntu/athlynx-perfect-storm/infrastructure/exports/billing_data.json")
