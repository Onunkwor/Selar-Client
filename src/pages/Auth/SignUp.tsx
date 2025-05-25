import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/profile" />
    </div>
  );
};

export default SignUpPage;
