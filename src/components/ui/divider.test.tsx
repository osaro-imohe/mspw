import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./divider";

describe("Divider component", () => {
  it("renders the text", () => {
    render(<Divider text="or" />);
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    render(<Divider text="or continue with email" />);
    expect(screen.getByText("or continue with email")).toBeInTheDocument();
  });

  it("renders a horizontal line", () => {
    const { container } = render(<Divider text="test" />);
    const line = container.querySelector(".border-t");
    expect(line).toBeInTheDocument();
  });
});
