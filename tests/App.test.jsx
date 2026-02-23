import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import Shop from "../src/pages/Shop/Shop";

describe("Shop page tests", () => {
  it("Displays a loading page when `loading` is true", () => {
    function MockParent() {
      const loading = true;
      return <Outlet context={{ loading }} />;
    }
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
    function MockParent() {
      const loading = false;
      const error = "bada bing";
      return <Outlet context={{ loading, error }} />;
    }
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
