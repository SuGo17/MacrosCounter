import React from "react";
import Main from "../Main";
import { render, screen } from "@testing-library/react";

test("Should render Main component with initial state", () => {
  render(<Main />);
  expect(screen.getByText(/macros counter/i)).toBeInTheDocument();
});
