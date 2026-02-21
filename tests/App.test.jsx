import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App component", () => {
  it("Initialise tests", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/project init/i);
  });
});
