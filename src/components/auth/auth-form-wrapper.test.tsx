import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthFormWrapper } from "./auth-form-wrapper";

describe("AuthFormWrapper component", () => {
  const defaultProps = {
    title: "Sign up",
    subtitle: "Already have an account?",
    linkText: "Sign in",
    linkHref: "/signin",
  };

  it("renders the title", () => {
    render(
      <AuthFormWrapper {...defaultProps}>
        <div>Form content</div>
      </AuthFormWrapper>
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Sign up" })
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(
      <AuthFormWrapper {...defaultProps}>
        <div>Form content</div>
      </AuthFormWrapper>
    );
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });

  it("renders the link with correct href", () => {
    render(
      <AuthFormWrapper {...defaultProps}>
        <div>Form content</div>
      </AuthFormWrapper>
    );
    const link = screen.getByRole("link", { name: "Sign in" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signin");
  });

  it("renders children", () => {
    render(
      <AuthFormWrapper {...defaultProps}>
        <div data-testid="child-content">Form content</div>
      </AuthFormWrapper>
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("renders Terms of Use link in footer", () => {
    render(
      <AuthFormWrapper {...defaultProps}>
        <div>Form content</div>
      </AuthFormWrapper>
    );
    const termsLink = screen.getByRole("link", { name: "Terms of Use" });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("renders Privacy Policy link in footer", () => {
    render(
      <AuthFormWrapper {...defaultProps}>
        <div>Form content</div>
      </AuthFormWrapper>
    );
    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders logo icon", () => {
    const { container } = render(
      <AuthFormWrapper {...defaultProps}>
        <div>Form content</div>
      </AuthFormWrapper>
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
