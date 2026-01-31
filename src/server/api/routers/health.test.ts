import { describe, it, expect, vi } from "vitest";
import { appRouter } from "~/server/api/root";

// Mock the auth module
vi.mock("~/server/auth", () => ({
  auth: vi.fn(() => Promise.resolve(null)),
}));

// Mock the database
vi.mock("~/server/db", () => ({
  db: {},
}));

describe("health router", () => {
  it("returns ok status", async () => {
    const caller = appRouter.createCaller({
      db: {} as any,
      session: null,
      headers: new Headers(),
    });

    const result = await caller.health();
    expect(result).toEqual({ status: "ok" });
  });
});
