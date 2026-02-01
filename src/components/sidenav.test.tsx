import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidenav } from "./sidenav";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next-auth/react
const mockUseSession = vi.fn();
vi.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
  signOut: vi.fn(),
}));

// Mock UserMenu component
vi.mock("~/components/ui/user-menu", () => ({
  UserMenu: ({ user }: { user: { firstName: string; lastName: string } }) => (
    <div data-testid="user-menu">
      {user.firstName} {user.lastName}
    </div>
  ),
}));

describe("Sidenav component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when session is loading", () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "loading",
    });

    render(<Sidenav />);

    // Should show loading skeleton
    const aside = document.querySelector("aside");
    expect(aside).toBeInTheDocument();
  });

  it("returns null when user is not authenticated", () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    const { container } = render(<Sidenav />);

    expect(container.firstChild).toBeNull();
  });

  it("renders sidenav when user is authenticated", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
      status: "authenticated",
    });

    render(<Sidenav />);

    expect(screen.getByText("MSPW")).toBeInTheDocument();
    expect(screen.getByText("Campaigns")).toBeInTheDocument();
  });

  it("renders logo link pointing to home", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
      status: "authenticated",
    });

    render(<Sidenav />);

    const logoLink = screen.getByText("MSPW").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders Campaigns link pointing to home", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
      status: "authenticated",
    });

    render(<Sidenav />);

    const campaignsLink = screen.getByText("Campaigns").closest("a");
    expect(campaignsLink).toHaveAttribute("href", "/");
  });

  it("renders user menu with user data", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
      status: "authenticated",
    });

    render(<Sidenav />);

    expect(screen.getByTestId("user-menu")).toBeInTheDocument();
  });

  it("displays user name and email", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
      status: "authenticated",
    });

    render(<Sidenav />);

    // Use getAllByText since name appears in both UserMenu mock and name display
    const nameElements = screen.getAllByText("John Doe");
    expect(nameElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
