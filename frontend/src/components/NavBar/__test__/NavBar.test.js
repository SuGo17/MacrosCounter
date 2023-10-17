import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";

const dateFormatter = (d) => {
  const newDate = new Date(d);
  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;
};

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
    render(<NavBar />);
    const dateInput = screen.getByTestId(/date-picker/i);
    fireEvent.change(dateInput, { target: { value: "2023-09-05" } });
    expect(dateInput.value).toBe("2023-09-05");
  });

  test("Should open menu when the width is less than 768 and menu icon is clicked", () => {
    render(<NavBar />);
    window.innerWidth = 750;
    const menuElement = screen.getByTestId("menu");
    fireEvent.click(menuElement);
    expect(window.innerWidth).toBe(750);
    expect(screen.getByTestId("menu-list")).toHaveClass("nav-active");
  });

  test("Should display today's date in date-picker if clear button is clicked or empty value is passed", () => {
    render(<NavBar />);
    const todayDate = dateFormatter(new Date());
    const dateInput = screen.getByTestId(/date-picker/i);
    fireEvent.change(dateInput, { target: { value: "" } });
    expect(dateInput.value).toBe(todayDate);
  });
});
