import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home component", () => {
  it("renders welcome message", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to MyHaki dashboard!")).toBeInTheDocument();
  });
});