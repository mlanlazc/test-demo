import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { QuickInfoCard } from '@/components/building-blocks/quick-info-card/quick-info-card';

export const revenueMetricsQuery = `
  SELECT 
    SUM(total_revenue) as total_revenue,
    SUM(total_cost) as total_cost,
    SUM(net_profit) as net_profit
  FROM revenue 
  WHERE date >= CURRENT_DATE - INTERVAL '30 days'
    AND organization_id = $1
`;

export type RevenueMetricsData = {
  total_revenue: number;
  total_cost: number;
  net_profit: number;
};

interface RevenueMetricsProps {
  data: RevenueMetricsData[];
}

export function RevenueMetrics({ data }: RevenueMetricsProps) {
  const metrics = data[0] || { total_revenue: 0, total_cost: 0, net_profit: 0 };
  const profitMargin = metrics.total_revenue > 0 
    ? ((metrics.net_profit / metrics.total_revenue) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <QuickInfoCard
        title="Total Revenue"
        description="Last 30 days"
        icon={<DollarSign className="h-4 w-4 text-green-500" />}
      >
        <div className="text-2xl font-bold">${metrics.total_revenue.toLocaleString()}</div>
      </QuickInfoCard>

      <QuickInfoCard
        title="Total Cost"
        description="Last 30 days"
        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
      >
        <div className="text-2xl font-bold">${metrics.total_cost.toLocaleString()}</div>
      </QuickInfoCard>

      <QuickInfoCard
        title="Net Profit"
        description={`${profitMargin}% margin`}
        icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
      >
        <div className="text-2xl font-bold">${metrics.net_profit.toLocaleString()}</div>
      </QuickInfoCard>
    </div>
  );
}
