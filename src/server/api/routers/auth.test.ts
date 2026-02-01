import { describe, it, expect, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";

// Use vi.hoisted to create mocks that can be referenced in vi.mock
const { mockDb, mockHash } = vi.hoisted(() => ({
  mockDb: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
  mockHash: vi.fn(),
}));

// Mock bcryptjs
vi.mock("bcryptjs", () => ({
  default: {
    hash: mockHash,
  },
}));

// Mock the database
vi.mock("~/server/db", () => ({
  db: mockDb,
}));

// Mock auth
vi.mock("~/server/auth", () => ({
  auth: vi.fn(() => Promise.resolve(null)),
}));

// Import after mocks are set up
import { appRouter } from "~/server/api/root";

describe("auth router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHash.mockImplementation((password: string) =>
      Promise.resolve(`hashed_${password}`)
    );
  });

  describe("signUp", () => {
    it("creates a new user with hashed password", async () => {
      mockDb.user.findUnique.mockResolvedValue(null);
      mockDb.user.create.mockResolvedValue({
        id: "user-123",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
      });

      const caller = appRouter.createCaller({
        db: mockDb as any,
        session: null,
        headers: new Headers(),
      });

      const result = await caller.auth.signUp({
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Account created successfully");
      expect(result.userId).toBe("user-123");

      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });

      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          password: "hashed_Password123",
        },
      });
    });

    it("throws CONFLICT error if email already exists", async () => {
      mockDb.user.findUnique.mockResolvedValue({
        id: "existing-user",
        email: "test@example.com",
      });

      const caller = appRouter.createCaller({
        db: mockDb as any,
        session: null,
        headers: new Headers(),
      });

      await expect(
        caller.auth.signUp({
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        })
      ).rejects.toThrow(TRPCError);
    });

    it("validates email format", async () => {
      const caller = appRouter.createCaller({
        db: mockDb as any,
        session: null,
        headers: new Headers(),
      });

      await expect(
        caller.auth.signUp({
          firstName: "John",
          lastName: "Doe",
          email: "invalid-email",
          password: "Password123",
          confirmPassword: "Password123",
        })
      ).rejects.toThrow();
    });

    it("validates password requirements", async () => {
      const caller = appRouter.createCaller({
        db: mockDb as any,
        session: null,
        headers: new Headers(),
      });

      // Too short
      await expect(
        caller.auth.signUp({
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          password: "Pass1",
          confirmPassword: "Pass1",
        })
      ).rejects.toThrow();
    });

    it("validates password confirmation matches", async () => {
      const caller = appRouter.createCaller({
        db: mockDb as any,
        session: null,
        headers: new Headers(),
      });

      await expect(
        caller.auth.signUp({
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          password: "Password123",
          confirmPassword: "DifferentPassword123",
        })
      ).rejects.toThrow();
    });
  });
});
