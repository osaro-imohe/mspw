import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CampaignSidebar, sections } from "./campaign-sidebar";

describe("CampaignSidebar component", () => {
  it("renders all section options", () => {
    render(
      <CampaignSidebar selectedSection="idea" onSelectSection={vi.fn()} />
    );

    expect(screen.getByText("1. Describe Your Idea")).toBeInTheDocument();
    expect(screen.getByText("2. Select ICP")).toBeInTheDocument();
    expect(screen.getByText("3. Pricing")).toBeInTheDocument();
    expect(screen.getByText("4. Variants")).toBeInTheDocument();
  });

  it("renders section descriptions", () => {
    render(
      <CampaignSidebar selectedSection="idea" onSelectSection={vi.fn()} />
    );

    expect(
      screen.getByText("Tell us about your product or service concept")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Define your ideal customer profile")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Set your pricing strategy and tiers")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Create different versions to test")
    ).toBeInTheDocument();
  });

  it("highlights the selected section", () => {
    render(
      <CampaignSidebar selectedSection="icp" onSelectSection={vi.fn()} />
    );

    const icpButton = screen.getByText("2. Select ICP").closest("button");
    expect(icpButton).toHaveClass("border-l-indigo-600");
    expect(icpButton).toHaveClass("bg-white");
  });

  it("calls onSelectSection when a section is clicked", async () => {
    const user = userEvent.setup();
    const mockOnSelectSection = vi.fn();

    render(
      <CampaignSidebar
        selectedSection="idea"
        onSelectSection={mockOnSelectSection}
      />
    );

    await user.click(screen.getByText("3. Pricing"));

    expect(mockOnSelectSection).toHaveBeenCalledWith("pricing");
  });

  it("calls onSelectSection with correct id for each section", async () => {
    const user = userEvent.setup();
    const mockOnSelectSection = vi.fn();

    render(
      <CampaignSidebar
        selectedSection="idea"
        onSelectSection={mockOnSelectSection}
      />
    );

    await user.click(screen.getByText("1. Describe Your Idea"));
    expect(mockOnSelectSection).toHaveBeenCalledWith("idea");

    await user.click(screen.getByText("2. Select ICP"));
    expect(mockOnSelectSection).toHaveBeenCalledWith("icp");

    await user.click(screen.getByText("4. Variants"));
    expect(mockOnSelectSection).toHaveBeenCalledWith("variants");
  });

  it("exports sections array with correct data", () => {
    expect(sections).toHaveLength(4);
    expect(sections[0]).toEqual({
      id: "idea",
      title: "1. Describe Your Idea",
      description: "Tell us about your product or service concept",
    });
  });
});
