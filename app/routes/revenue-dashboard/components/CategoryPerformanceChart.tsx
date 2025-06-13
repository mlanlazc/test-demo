import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const categoryPerformanceQuery = `
  SELECT 
    p.category,
    SUM(si.total_price) as revenue,
    COUNT(DISTINCT s.sale_id) as number_of_sales
  FROM products p
  JOIN sale_items si ON p.product_id = si.product_id
  JOIN sales s ON si.sale_id = s.sale_id
  WHERE s.sale_date >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY p.category
  ORDER BY revenue DESC
`;

export type CategoryPerformanceData = {
  category: string;
  revenue: number;
  number_of_sales: number;
};

interface CategoryPerformanceChartProps {
  data: CategoryPerformanceData[];
}

export function CategoryPerformanceChart({ data }: CategoryPerformanceChartProps) {
  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'var(--chart-3)',
    },
    number_of_sales: {
      label: 'Number of Sales',
      color: 'var(--chart-4)',
    },
  };

  return (
    <UniversalChartCard
      title="Product Category Performance"
      description="Revenue and sales by category in last 30 days"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis yAxisId="left" orientation="left" stroke="var(--chart-3-stroke)" />
          <YAxis yAxisId="right" orientation="right" stroke="var(--chart-4-stroke)" />
          <Tooltip />
          <Bar yAxisId="left" dataKey="revenue" fill="var(--chart-3)" />
          <Bar yAxisId="right" dataKey="number_of_sales" fill="var(--chart-4)" />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
