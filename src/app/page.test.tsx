// import test
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// import component
import Home from "@/app/page";

describe("Home", () => {
  it("renders heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /TS Blog/i })).toBeInTheDocument();
  });
});
