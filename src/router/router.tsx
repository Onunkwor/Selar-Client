import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import SignInPage from "@/pages/Auth/SignIn";
import SignUpPage from "@/pages/Auth/SignUp";
import BookingPage from "@/pages/Booking/Booking";
import TokenProvider from "@/context/TokenContext";
import Layout from "@/Layout/Layout";
import Home from "@/pages/Home/Home";

export const AppRouter = () => {
  const router = createBrowserRouter([
    // Public Routes
    { path: "/", element: <Home /> },
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },

    // Protected Routes (Requires Authentication)
    {
      path: "/booking",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "",
          children: [
            {
              path: "",
              element: <BookingPage />,
            },
          ],
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <RouterProvider router={router} />
      </TokenProvider>
    </QueryClientProvider>
  );
};
