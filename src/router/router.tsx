import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "@/pages/Auth/SignIn";
import SignUpPage from "@/pages/Auth/SignUp";
import BookingPage from "@/pages/Booking/Booking";
import Home from "@/pages/Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "@/pages/Profile/Profile";

export const AppRouter = () => {
  const router = createBrowserRouter([
    // Public Routes
    { path: "/", element: <Home /> },
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
    { path: "/booking/:id", element: <BookingPage /> },
    // Protected Routes
    {
      path: "/profile",
      element: (
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      ),
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
