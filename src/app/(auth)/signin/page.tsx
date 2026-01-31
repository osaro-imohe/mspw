import { SignInForm } from "~/components/auth/signin-form";
import { AuthFormWrapper } from "~/components/auth/auth-form-wrapper";

export const metadata = {
  title: "Sign In | Make Something People Want",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <AuthFormWrapper
      title="Sign in"
      subtitle="Don't have an account?"
      linkText="Sign up"
      linkHref="/signup"
    >
      <SignInForm />
    </AuthFormWrapper>
  );
}
