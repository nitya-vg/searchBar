import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import SearchBar from "../components/searchBar";
require("@testing-library/jest-dom");


beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]), 
      })
    );
  });

describe("SearchBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("renders the search input and button", () => {
    render(<SearchBar />);
    
    expect(screen.getByPlaceholderText("Search the name here...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText("Search the name here...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(input.value).toBe("test");
  });

  test("does not fetch suggestions if query length is <= 3", async () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText("Search the name here...");
    fireEvent.change(input, { target: { value: "tes" } });

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  test("fetches and displays search results on search button click", async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([
        { id: 1, name: "John Doe", email: "john@example.com", body: "Sample comment text" },
      ]),
    });

    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText("Search the name here...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    //expect(await screen.findByText("john@example.com")).toBeInTheDocument();
    expect(await screen.findByText("Sample comment text")).toBeInTheDocument();
  });

  test("handles API error gracefully", async () => {
    console.error = jest.fn(); // Mock console.error to suppress output in test logs
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText("Search the name here...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "errorTest" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error fetching search results:", expect.any(Error));
    });
  });
});
