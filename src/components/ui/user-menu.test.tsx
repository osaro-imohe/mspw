import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserMenu } from "./user-menu";

// Mock next-auth/react
const mockSignOut = vi.fn();
vi.mock("next-auth/react", () => ({
  signOut: (options: unknown) => mockSignOut(options),
}));

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
};

describe("UserMenu component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders avatar with user initials", () => {
    render(<UserMenu user={mockUser} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders avatar as a button", () => {
    render(<UserMenu user={mockUser} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("does not show dropdown by default", () => {
    render(<UserMenu user={mockUser} />);
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  it("opens dropdown when avatar is clicked", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={mockUser} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("closes dropdown when avatar is clicked again", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={mockUser} />);

    // Open dropdown
    await user.click(screen.getByText("JD"));
    expect(screen.getByText("Log out")).toBeInTheDocument();

    // Close dropdown - click the avatar button (by its initials text)
    await user.click(screen.getByText("JD"));
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  it("calls signOut when Log out is clicked", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={mockUser} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Log out"));

    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: "/signin" });
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <UserMenu user={mockUser} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    // Open dropdown
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Log out")).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByText("Log out")).not.toBeInTheDocument();
    });
  });

  it("uses uppercase initials", () => {
    render(
      <UserMenu
        user={{ firstName: "john", lastName: "doe", email: "john@example.com" }}
      />
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("avatar button has pointer cursor style", () => {
    render(<UserMenu user={mockUser} />);
    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toHaveClass("cursor-pointer");
  });
});
