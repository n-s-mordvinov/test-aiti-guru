import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { NotistackProvider } from "./Notistack";
import { ProtectedRoute } from "./Routing";

import './styles.css';

const LoginPage = lazy(() => import('../pages/Login'));
const ProductsPage = lazy(() => import('../pages/Products/ui/Products'));

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <ProductsPage />
        },
      ]
    },
    {
      path: "/login",
      element: <LoginPage />
    },
  ], {
    basename: import.meta.env.BASE_URL
  });

  return (
    <NotistackProvider>
      <RouterProvider router={router} />
    </NotistackProvider>
  );
}

export default App;
