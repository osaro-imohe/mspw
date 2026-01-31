import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Input component", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(<Input label="Email" />);
    const label = screen.getByText("Email");
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for");
    expect(input).toHaveAttribute("id");
    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
  });

  it("shows error message when error prop is passed", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies error styling when error is present", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-500");
  });

  it("does not show error message when no error", () => {
    render(<Input placeholder="Test" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("passes through HTML input attributes", () => {
    render(<Input type="email" placeholder="you@example.com" disabled />);
    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeDisabled();
  });

  it("uses custom id when provided", () => {
    render(<Input id="custom-id" label="Custom" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "custom-id");
  });
});
