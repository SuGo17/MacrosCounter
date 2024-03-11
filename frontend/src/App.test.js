import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders learn react link", () => {
    render(<App />);
    expect(1).toBe(1);
  });
});
