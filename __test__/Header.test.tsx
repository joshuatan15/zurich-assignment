import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header"; // Adjust the import path to where your Header component is located
import { expect } from "@jest/globals";

describe("Header", () => {
  it("renders the logo and user avatar", () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    expect(screen.getByText("LOGO")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("open the user menu", async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const avatar = screen.getByTestId(`avatar`);
    fireEvent.click(avatar);
    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    fireEvent.click(avatar);
    await waitFor(() => {
      expect(screen.queryByText("Profile1")).not.toBeInTheDocument();
    });
  });
  
});
