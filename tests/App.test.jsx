import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("App component", () => {
  it("Initialise tests", () => {
    function Init() {
      return <h1>Project Init</h1>;
    }
    render(<Init />);
    expect(screen.getByRole("heading").textContent).toMatch(/project init/i);
  });
});
