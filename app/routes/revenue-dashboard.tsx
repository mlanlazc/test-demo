import { useLoaderData } from '@remix-run/react';
import { executeQuery } from '@/db/execute-query';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';

import {
  RevenueMetrics,
  RevenueMetricsData,
  revenueMetricsQuery,
} from './revenue-dashboard/components/RevenueMetrics';
import {
  MonthlyRevenueChart,
  MonthlyRevenueData,
  monthlyRevenueQuery,
} from './revenue-dashboard/components/MonthlyRevenueChart';
import {
  TopOrganizationsTable,
  TopOrganizationData,
  topOrganizationsQuery,
} from './revenue-dashboard/components/TopOrganizationsTable';
import {
  CategoryPerformanceChart,
  CategoryPerformanceData,
  categoryPerformanceQuery,
} from './revenue-dashboard/components/CategoryPerformanceChart';
import {
  SubscriptionTierChart,
  SubscriptionTierData,
  subscriptionTierQuery,
} from './revenue-dashboard/components/SubscriptionTierChart';
import {
  PaymentMethodsChart,
  PaymentMethodData,
  paymentMethodsQuery,
} from './revenue-dashboard/components/PaymentMethodsChart';

// Mock organization ID for demo purposes
const DEMO_ORGANIZATION_ID = '1';

export async function loader() {
  const [metrics, monthlyRevenue, topOrgs, categories, subscriptionTiers, paymentMethods] = await Promise.all([
    executeQuery<RevenueMetricsData>(revenueMetricsQuery, [DEMO_ORGANIZATION_ID]),
    executeQuery<MonthlyRevenueData>(monthlyRevenueQuery),
    executeQuery<TopOrganizationData>(topOrganizationsQuery),
    executeQuery<CategoryPerformanceData>(categoryPerformanceQuery),
    executeQuery<SubscriptionTierData>(subscriptionTierQuery),
    executeQuery<PaymentMethodData>(paymentMethodsQuery),
  ]);

  return {
    metrics,
    monthlyRevenue,
    topOrgs,
    categories,
    subscriptionTiers,
    paymentMethods,
  };
}

export default function RevenueDashboard() {
  const { metrics, monthlyRevenue, topOrgs, categories, subscriptionTiers, paymentMethods } =
    useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Revenue Dashboard</h1>

      <WithErrorHandling queryData={metrics} render={(data) => <RevenueMetrics data={data} />} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={monthlyRevenue}
          render={(data) => <MonthlyRevenueChart data={data} />}
        />
        <WithErrorHandling
          queryData={categories}
          render={(data) => <CategoryPerformanceChart data={data} />}
        />
      </div>

      <WithErrorHandling queryData={topOrgs} render={(data) => <TopOrganizationsTable data={data} />} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={subscriptionTiers}
          render={(data) => <SubscriptionTierChart data={data} />}
        />
        <WithErrorHandling
          queryData={paymentMethods}
          render={(data) => <PaymentMethodsChart data={data} />}
        />
      </div>
    </div>
  );
}
