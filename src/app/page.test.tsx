import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Make Something/i)).toBeInTheDocument();
    expect(screen.getByText(/People/i)).toBeInTheDocument();
    expect(screen.getByText(/Want/i)).toBeInTheDocument();
  });
});
