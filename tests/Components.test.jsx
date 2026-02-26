import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart/Cart";
import ItemCard from "../src/components/ItemCard/ItemCard";
import QuantityInput from "../src/components/QuantityInput/QuantityInput";
import CartModal from "../src/components/CartModal/CartModal";
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
    const MockParent = vi.fn(({ initVal }) => {
      const [value, setValue] = useState(initVal);

      const changeValue = vi.fn((e) => {
        if (
          e.target.value <= 0 ||
          e.target.value >= 100 ||
          /[^0-9]/.test(e.target.value)
        )
          return;
        setValue(e.target.value);
      });

      const increment = vi.fn(() => {
        let quantityParse = parseInt(value);
        if (quantityParse === 99) return;
        setValue(quantityParse + 1);
      });

      const decrement = vi.fn(() => {
        let quantityParse = parseInt(value);
        if (quantityParse === 1) return;
        setValue(quantityParse - 1);
      });

      return (
        <QuantityInput
          value={value}
          onChange={changeValue}
          increment={increment}
          decrement={decrement}
        />
      );
    });

    it("Displays default value", () => {
      render(<MockParent initVal="5" />);
      expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    });

    it("+ button increments value", async () => {
      render(<MockParent initVal="5" />);
      const user = userEvent.setup();
      const link = screen.getByRole("button", { name: "+" });
      await user.click(link);
      expect(screen.getByDisplayValue("6")).toBeInTheDocument();
    });

    it("- button decrements the value", async () => {
      render(<MockParent initVal="5" />);
      const user = userEvent.setup();
      const link = screen.getByRole("button", { name: "-" });
      await user.click(link);
      expect(screen.getByDisplayValue("4")).toBeInTheDocument();
    });

    it("Will not increment past 99", async () => {
      render(<MockParent initVal="99" />);
      const user = userEvent.setup();
      const link = screen.getByRole("button", { name: "+" });
      await user.click(link);
      expect(screen.getByDisplayValue("99")).toBeInTheDocument();
    });

    it("Will not decrement below 1", async () => {
      render(<MockParent initVal="1" />);
      const user = userEvent.setup();
      const link = screen.getByRole("button", { name: "-" });
      await user.click(link);
      expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });

    it("Doesn't allow non numerical inputs", async () => {
      render(<MockParent initVal="5" />);
      const user = userEvent.setup();
      const input = screen.getByRole("textbox");

      await user.type(input, "abc!@#$%^&*()ABC");

      expect(input).toHaveValue("5");
    });
  });

  describe("CartModal component", () => {
    beforeAll(() => {
      HTMLDialogElement.prototype.show = vi.fn();
      HTMLDialogElement.prototype.showModal = vi.fn();
      HTMLDialogElement.prototype.close = vi.fn();
    });

    it("Displays a message when cart is empty", () => {
      const cartModalRouter = createMemoryRouter([
        { path: "/", element: <CartModal cartList={[]} /> },
      ]);
      render(<RouterProvider router={cartModalRouter} />);
      expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument();
    });

    it("Displays the total price of items in cartList", () => {
      const testCart = [
        {
          id: 0,
          title: "",
          image: null,
          price: 6.5,
          quantity: 12,
        },
        {
          id: 1,
          title: "",
          image: null,
          price: 5,
          quantity: 12,
        },
      ];
      const cartModalRouter = createMemoryRouter([
        { path: "/", element: <CartModal cartList={testCart} /> },
      ]);
      render(<RouterProvider router={cartModalRouter} />);
      expect(screen.getByText("$138.00")).toBeInTheDocument();
    });
  });
});
