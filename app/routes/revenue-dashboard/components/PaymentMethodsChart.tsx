import { ChartSharePercentage } from '@/components/building-blocks/chart-share-percentage/chart-share-percentage';

export const paymentMethodsQuery = `
  SELECT 
    payment_method,
    COUNT(*) as transaction_count,
    SUM(total_amount) as total_amount
  FROM sales
  WHERE sale_date >= CURRENT_DATE - INTERVAL '30 days'
  AND status = 'completed'
  GROUP BY payment_method
  ORDER BY total_amount DESC
`;

export type PaymentMethodData = {
  payment_method: string;
  transaction_count: number;
  total_amount: number;
};

interface PaymentMethodsChartProps {
  data: PaymentMethodData[];
}

export function PaymentMethodsChart({ data }: PaymentMethodsChartProps) {
  const chartConfig = {
    total_amount: {
      label: 'Amount',
    },
  };

  const totalTransactions = data.reduce((sum, item) => sum + item.transaction_count, 0);

  return (
    <ChartSharePercentage
      data={data}
      title="Sales by Payment Method"
      description="Distribution of sales across payment methods"
      dataKey="total_amount"
      nameKey="payment_method"
      chartConfig={chartConfig}
      centerValueRenderer={() => ({
        title: totalTransactions.toLocaleString(),
        subtitle: 'Transactions',
      })}
    />
  );
}
