import { SignUpForm } from "~/components/auth/signup-form";
import { AuthFormWrapper } from "~/components/auth/auth-form-wrapper";

export const metadata = {
  title: "Sign Up | Make Something People Want",
  description: "Create your account",
};

export default function SignUpPage() {
  return (
    <AuthFormWrapper
      title="Sign up"
      subtitle="Already have an account?"
      linkText="Sign in"
      linkHref="/signin"
    >
      <SignUpForm />
    </AuthFormWrapper>
  );
}
