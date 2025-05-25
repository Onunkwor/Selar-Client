import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/profile" />
    </div>
  );
};

export default SignInPage;
