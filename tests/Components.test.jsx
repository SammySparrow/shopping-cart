import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import Cart from "../src/components/Cart/Cart";
import ItemCard from "../src/components/ItemCard/ItemCard";

describe("Components", () => {
  describe("Cart component", () => {
    it("Renders number of items in cart", () => {
      const mockArr = [1, 1, 1];
      render(<Cart count={mockArr.length} />);
      expect(screen.getByRole("count").textContent).toMatch("3");
    });
  });

  describe("ItemCard component", () => {
    const mockProps = {
      id: 0,
      title: "Game",
      image: "url",
      price: 20,
      rating: {
        rate: 2.5,
        count: 300,
      },
    };
    const mockRouter = createMemoryRouter([
      { path: "/", element: <ItemCard props={mockProps} /> },
    ]);
    it("Correctly displays price with dollar sign", () => {
      render(<RouterProvider router={mockRouter} />);
      expect(screen.getByText("$20")).toBeInTheDocument();
    });
  });
});
