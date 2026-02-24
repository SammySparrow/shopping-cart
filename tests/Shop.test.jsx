import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import Shop from "../src/pages/Shop/Shop";

describe("Shop page tests", () => {
  it("Displays a loading page when `loading` is true", () => {
    const MockParent = vi.fn(() => {
      const loading = true;
      return <Outlet context={{ loading }} />;
    });
    const shopRoute = createMemoryRouter([
      {
        path: "/",
        element: <MockParent />,
        children: [{ index: true, element: <Shop /> }],
      },
    ]);
    render(<RouterProvider router={shopRoute} />);
    expect(screen.getByRole("paragraph").textContent).toMatch(/loading/i);
  });

  it("Displays an error message when `error` isn't null", () => {
    const MockParent = vi.fn(() => {
      const loading = false;
      const error = "aloooo";
      return <Outlet context={{ loading, error }} />;
    });
    const shopRoute = createMemoryRouter([
      {
        path: "/",
        element: <MockParent />,
        children: [{ index: true, element: <Shop /> }],
      },
    ]);
    render(<RouterProvider router={shopRoute} />);
    expect(screen.getByRole("paragraph").textContent).toMatch(/error/i);
  });
});
