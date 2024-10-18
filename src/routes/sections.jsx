import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
export const LoginPage = lazy(() => import('src/pages/login'));
export const ValidateOtpPage = lazy(() => import('src/pages/validate-otp'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PayoutInformation = lazy(() => import('src/pages/payout-information'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: 'validate-otp',
      element: <ValidateOtpPage />,
    },
    {
      path: 'payout-information',
      element: <PayoutInformation />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
