import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Pokepedia logo", () => {
  render(<App />);
  const logo = screen.getByText(/Poképedia/i);
  expect(logo).toBeInTheDocument();
});
