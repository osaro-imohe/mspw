import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CampaignContent } from "./campaign-content";

describe("CampaignContent component", () => {
  it("renders the page header", () => {
    render(<CampaignContent />);

    expect(screen.getByText("Create new campaign")).toBeInTheDocument();
  });

  it("shows first section selected by default", () => {
    render(<CampaignContent />);

    // Main content should show the first section's title
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "1. Describe Your Idea"
    );
    // Description appears in both sidebar and main content
    const descriptions = screen.getAllByText(
      "Tell us about your product or service concept"
    );
    expect(descriptions.length).toBeGreaterThanOrEqual(1);
  });

  it("updates main content when selecting a different section", async () => {
    const user = userEvent.setup();
    render(<CampaignContent />);

    // Click on "Select ICP" section
    await user.click(screen.getByText("2. Select ICP"));

    // Main content should update
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "2. Select ICP"
    );
  });

  it("shows correct description for selected section", async () => {
    const user = userEvent.setup();
    render(<CampaignContent />);

    // Click on "Pricing" section
    await user.click(screen.getByText("3. Pricing"));

    // Main content should show pricing description
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveTextContent("Set your pricing strategy and tiers");
  });

  it("shows correct content for Variants section", async () => {
    const user = userEvent.setup();
    render(<CampaignContent />);

    // Click on "Variants" section
    await user.click(screen.getByText("4. Variants"));

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "4. Variants"
    );
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveTextContent("Create different versions to test");
  });

  it("can switch between multiple sections", async () => {
    const user = userEvent.setup();
    render(<CampaignContent />);

    // Start with default (idea)
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "1. Describe Your Idea"
    );

    // Switch to Pricing
    await user.click(screen.getByText("3. Pricing"));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "3. Pricing"
    );

    // Switch to ICP
    await user.click(screen.getByText("2. Select ICP"));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "2. Select ICP"
    );

    // Switch back to Describe Your Idea
    await user.click(screen.getByText("1. Describe Your Idea"));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "1. Describe Your Idea"
    );
  });

  it("renders all sidebar options", () => {
    render(<CampaignContent />);

    // First section appears in both sidebar and main content
    const firstSectionTexts = screen.getAllByText("1. Describe Your Idea");
    expect(firstSectionTexts.length).toBeGreaterThanOrEqual(1);

    // Other sections only appear in sidebar
    expect(screen.getByText("2. Select ICP")).toBeInTheDocument();
    expect(screen.getByText("3. Pricing")).toBeInTheDocument();
    expect(screen.getByText("4. Variants")).toBeInTheDocument();
  });
});
