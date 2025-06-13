import { ChartSharePercentage } from '@/components/building-blocks/chart-share-percentage/chart-share-percentage';

export const subscriptionTierQuery = `
  SELECT 
    subscription_tier,
    COUNT(*) as organization_count,
    SUM(r.total_revenue) as total_revenue
  FROM organizations o
  JOIN revenue r ON o.organization_id = r.organization_id
  WHERE r.date >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY subscription_tier
  ORDER BY total_revenue DESC
`;

export type SubscriptionTierData = {
  subscription_tier: string;
  organization_count: number;
  total_revenue: number;
};

interface SubscriptionTierChartProps {
  data: SubscriptionTierData[];
}

export function SubscriptionTierChart({ data }: SubscriptionTierChartProps) {
  const chartConfig = {
    total_revenue: {
      label: 'Revenue',
    },
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.total_revenue, 0);

  return (
    <ChartSharePercentage
      data={data}
      title="Revenue by Subscription Tier"
      description="Distribution of revenue across subscription tiers"
      dataKey="total_revenue"
      nameKey="subscription_tier"
      chartConfig={chartConfig}
      centerValueRenderer={() => ({
        title: `$${totalRevenue.toLocaleString()}`,
        subtitle: 'Total Revenue',
      })}
    />
  );
}
