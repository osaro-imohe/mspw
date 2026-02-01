import { describe, it, expect } from "vitest";
import { signUpSchema, signInSchema } from "./auth";

describe("signUpSchema", () => {
  it("validates correct input", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects weak password - too short", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "Pass1",
      confirmPassword: "Pass1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without uppercase", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without lowercase", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "PASSWORD123",
      confirmPassword: "PASSWORD123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without number", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "PasswordABC",
      confirmPassword: "PasswordABC",
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const result = signUpSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "Password123",
      confirmPassword: "Password456",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain("confirmPassword");
    }
  });
});

describe("signInSchema", () => {
  it("validates correct input", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "anypassword",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = signInSchema.safeParse({
      email: "invalid-email",
      password: "anypassword",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});
