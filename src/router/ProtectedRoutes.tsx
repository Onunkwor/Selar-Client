import Loader from "@/components/shared/Loader";
import { useUser } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded && !user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
