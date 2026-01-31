"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/trpc/react";
import { signUpSchema, type SignUpInput } from "~/lib/validations/auth";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { GoogleButton } from "~/components/auth/google-button";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = api.auth.signUp.useMutation({
    onSuccess: async (_data, variables) => {
      const result = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/signin");
      } else {
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = (data: SignUpInput) => {
    setError(null);
    signUpMutation.mutate(data);
  };

  return (
    <div className="mt-8">
      <GoogleButton />

      <Divider text="or continue with email" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 ring-1 ring-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Input
            {...register("firstName")}
            type="text"
            label="First name"
            placeholder="First name"
            autoComplete="given-name"
            error={errors.firstName?.message}
          />
          <Input
            {...register("lastName")}
            type="text"
            label="Last name"
            placeholder="Last name"
            autoComplete="family-name"
            error={errors.lastName?.message}
          />
        </div>

        <Input
          {...register("email")}
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
        />

        <Input
          {...register("password")}
          type="password"
          label="Password"
          placeholder="Create a password"
          autoComplete="new-password"
          error={errors.password?.message}
        />

        <Input
          {...register("confirmPassword")}
          type="password"
          label="Confirm password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
        />

        <div className="pt-2">
          <Button type="submit" isLoading={signUpMutation.isPending}>
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
}
