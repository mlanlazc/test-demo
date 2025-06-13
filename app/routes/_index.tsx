import { useLoaderData } from '@remix-run/react';
import RevenueDashboard, { loader as revenueDashboardLoader } from './revenue-dashboard';

export async function loader() {
  return revenueDashboardLoader();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <RevenueDashboard {...data} />;
}
