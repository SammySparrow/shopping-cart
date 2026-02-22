import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "../src/components/Cart/Cart";

describe("Components", () => {
  describe("Cart component", () => {
    it("Renders number of items in cart", () => {
      const mockArr = [1, 1, 1];
      render(<Cart count={mockArr.length} />);
      expect(screen.getByRole("count").textContent).toMatch("3");
    });
  });
});
