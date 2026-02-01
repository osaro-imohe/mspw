import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Sidenav component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
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

  it("renders collapse toggle button", () => {
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

    expect(screen.getByTestId("sidenav-toggle")).toBeInTheDocument();
  });

  it("starts expanded by default", () => {
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

    const aside = document.querySelector("aside");
    expect(aside).toHaveClass("w-64");
  });

  it("collapses when toggle button is clicked", async () => {
    const user = userEvent.setup();
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

    const toggleButton = screen.getByTestId("sidenav-toggle");
    await user.click(toggleButton);

    const aside = document.querySelector("aside");
    expect(aside).toHaveClass("w-16");
  });

  it("hides text labels when collapsed", async () => {
    const user = userEvent.setup();
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

    // Initially expanded - text should be visible
    expect(screen.getByText("MSPW")).toBeInTheDocument();
    expect(screen.getByText("Campaigns")).toBeInTheDocument();

    // Collapse
    const toggleButton = screen.getByTestId("sidenav-toggle");
    await user.click(toggleButton);

    // Text labels should be hidden
    expect(screen.queryByText("MSPW")).not.toBeInTheDocument();
    expect(screen.queryByText("Campaigns")).not.toBeInTheDocument();
  });

  it("saves collapsed state to localStorage", async () => {
    const user = userEvent.setup();
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

    const toggleButton = screen.getByTestId("sidenav-toggle");
    await user.click(toggleButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "sidenav-collapsed",
      "true"
    );
  });

  it("restores collapsed state from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("true");
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

    const aside = document.querySelector("aside");
    expect(aside).toHaveClass("w-16");
  });

  it("expands when toggle is clicked while collapsed", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue("true");
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

    // Should start collapsed
    let aside = document.querySelector("aside");
    expect(aside).toHaveClass("w-16");

    // Click to expand
    const toggleButton = screen.getByTestId("sidenav-toggle");
    await user.click(toggleButton);

    aside = document.querySelector("aside");
    expect(aside).toHaveClass("w-64");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "sidenav-collapsed",
      "false"
    );
  });

  it("toggle button has 'Collapse sidebar' label when expanded", () => {
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

    const toggleButton = screen.getByTestId("sidenav-toggle");
    expect(toggleButton).toHaveAttribute("aria-label", "Collapse sidebar");
  });

  it("toggle button has 'Expand sidebar' label when collapsed", () => {
    localStorageMock.getItem.mockReturnValue("true");
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

    const toggleButton = screen.getByTestId("sidenav-toggle");
    expect(toggleButton).toHaveAttribute("aria-label", "Expand sidebar");
  });

  it("toggle button is in header when expanded", () => {
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

    // When expanded, toggle button should be in the same container as the logo
    const toggleButton = screen.getByTestId("sidenav-toggle");
    const header = toggleButton.closest("div.flex.h-16");
    expect(header).toBeInTheDocument();
    // Header should also contain the logo link
    expect(header?.querySelector("a")).toBeInTheDocument();
  });

  it("toggle button is below header when collapsed", () => {
    localStorageMock.getItem.mockReturnValue("true");
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

    // When collapsed, toggle button should NOT be in the header
    const toggleButton = screen.getByTestId("sidenav-toggle");
    const header = toggleButton.closest("div.flex.h-16");
    expect(header).toBeNull();
  });

  it("aria-label changes after toggling", async () => {
    const user = userEvent.setup();
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

    // Initially expanded
    let toggleButton = screen.getByTestId("sidenav-toggle");
    expect(toggleButton).toHaveAttribute("aria-label", "Collapse sidebar");

    // Collapse
    await user.click(toggleButton);

    // After collapse, aria-label should change
    toggleButton = screen.getByTestId("sidenav-toggle");
    expect(toggleButton).toHaveAttribute("aria-label", "Expand sidebar");

    // Expand again
    await user.click(toggleButton);

    toggleButton = screen.getByTestId("sidenav-toggle");
    expect(toggleButton).toHaveAttribute("aria-label", "Collapse sidebar");
  });
});
