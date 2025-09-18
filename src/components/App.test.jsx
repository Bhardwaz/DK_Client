import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../components/services/store";

// Mock user so ProtectedRoute sees a logged-in user
vi.mock("../components/auth/authSlice.js", async () => {
  const actual = await vi.importActual("../components/auth/authSlice.js");
  return {
    ...actual,
    selectUser: () => ({ email: "sumit@gmail.com", password: "Sumit@123" }),
  };
});

// Mock ProtectedRoute to just render children
vi.mock("../utils/ProtectedRoute.jsx", () => ({
  default: ({ children }) => <>{children}</>,
}));

// Same for GuestRoute if needed
vi.mock("../utils/GuestRoute.jsx", () => ({
  default: ({ children }) => <>{children}</>,
}));

import App from "../App";

const renderWithProvider = (ui) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("App Component", () => {
  it("renders without crashing", () => {
    renderWithProvider(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it("contains main content on /", () => {
    renderWithProvider(<App />);
    const element = screen.getByRole("main");
    expect(element).toBeInTheDocument();
  });
});
