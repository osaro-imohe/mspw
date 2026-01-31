import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoogleButton } from "./google-button";

// Mock next-auth/react
const mockSignIn = vi.fn();
vi.mock("next-auth/react", () => ({
  signIn: (provider: string, options: unknown) => mockSignIn(provider, options),
}));

describe("GoogleButton component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the button with Google text", () => {
    render(<GoogleButton />);
    expect(
      screen.getByRole("button", { name: /continue with google/i })
    ).toBeInTheDocument();
  });

  it("renders Google icon", () => {
    const { container } = render(<GoogleButton />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("calls signIn with google provider when clicked", async () => {
    const user = userEvent.setup();
    render(<GoogleButton />);

    await user.click(screen.getByRole("button"));

    expect(mockSignIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });

  it("uses outline variant styling", () => {
    render(<GoogleButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("bg-white");
  });
});
