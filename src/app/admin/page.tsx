import Link from "next/link";
import {
  Package,
  ShoppingCart,
  FileText,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";

// ============================================
// ADMIN OVERVIEW PAGE
// ============================================

export default async function AdminOverviewPage() {
  // 1. Fetch Stats
  const totalProducts = await prisma.product.count({
    where: { isActive: true },
  });

  const pendingOrders = await prisma.order.count({
    where: {
      status: {
        in: ["PENDING", "PENDING_COD", "PENDING_VERIFICATION", "PROCESSING"],
      },
    },
  });

  const newInquiries = await prisma.bulkInquiry.count({
    where: { status: "NEW" },
  });

  // Calculate Revenue (Month to Date)
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const revenueAggregation = await prisma.order.aggregate({
    _sum: {
      grandTotal: true,
    },
    where: {
      createdAt: { gte: firstDayOfMonth },
      status: { notIn: ["CANCELLED", "REFUNDED", "PENDING"] }, // Assume valid revenue if not cancelled/pending payment
    },
  });

  const mtdRevenue = Number(revenueAggregation._sum.grandTotal || 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-white/60">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <Button asChild className="bg-white text-black hover:bg-white/90">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Products"
          value={totalProducts.toString()}
          change="In catalog"
          icon={Package}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders.toString()}
          change="Needs attention"
          icon={ShoppingCart}
        />
        <StatCard
          title="New Inquiries"
          value={newInquiries.toString()}
          change="Unread bulk requests"
          icon={FileText}
        />
        <StatCard
          title="Revenue (MTD)"
          value={formatPrice(mtdRevenue)}
          change="This Month"
          icon={TrendingUp}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActionCard
          title="Add New Product"
          description="Create a new standard or custom product listing"
          href="/admin/products/new"
          icon={Package}
        />
        <QuickActionCard
          title="View Orders"
          description="Manage and fulfill customer orders"
          href="/admin/orders"
          icon={ShoppingCart}
        />
      </div>
    </div>
  );
}

// ============================================
// STAT CARD COMPONENT
// ============================================

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">{title}</p>
        <Icon className="h-5 w-5 text-white/40" />
      </div>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-white/40">{change}</p>
    </div>
  );
}

// ============================================
// QUICK ACTION CARD COMPONENT
// ============================================

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/60">{description}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
    </Link>
  );
}

