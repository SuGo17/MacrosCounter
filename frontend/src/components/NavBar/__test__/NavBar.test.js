import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";

describe("NavBar Component", () => {
  test("Should render with initial state", () => {
    render(<NavBar />);

    expect(screen.getByText(/macros counter/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/SignUp/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/Users/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    const dateInput = screen.getByTestId(/date-picker/i);
    expect(dateInput).toBeInTheDocument();
  });

  test("Should render the selected input when the date is changed", () => {
    const dateInput = screen.getByTestId(/date-picker/i);
    fireEvent.change(dateInput, { target: { value: "2023-09-05" } });
    expect(dateInput.value).toBe("2023-09-05");
  });
});
