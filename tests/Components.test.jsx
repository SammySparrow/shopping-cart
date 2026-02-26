import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart/Cart";
import ItemCard from "../src/components/ItemCard/ItemCard";
import QuantityInput from "../src/components/QuantityInput/QuantityInput";
import { useState } from "react";

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
      expect(screen.getByText("$20.00")).toBeInTheDocument();
    });
  });

  describe("Quantity component", () => {
    const MockParent = vi.fn(() => {
      const [value, setValue] = useState(5);
      const increment = vi.fn(() => setValue(value + 1));
      const decrement = vi.fn(() => setValue(value - 1));
      return (
        <QuantityInput
          value={value}
          increment={increment}
          decrement={decrement}
        />
      );
    });
    it("Displays default value", () => {
      render(<MockParent />);
      expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    });
    it("+ button increments value", async () => {
      render(<MockParent />);
      const user = userEvent.setup();
      const link = screen.getByRole("button", { name: "+" });
      await user.click(link);
      expect(screen.getByDisplayValue("6")).toBeInTheDocument();
    });
    it("- button decrements the value", async () => {
      render(<MockParent />);
      const user = userEvent.setup();
      const link = screen.getByRole("button", { name: "-" });
      await user.click(link);
      expect(screen.getByDisplayValue("4")).toBeInTheDocument();
    });
  });
});
