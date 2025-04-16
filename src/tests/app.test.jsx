import { render, screen } from "@testing-library/react";
import App from "../App";
import EmployeeList from "../components/EmployeeList";
import { describe, it, expect } from "vitest";

const mockEmployees = [
  { id: 1, name: "John Doe", designation: "Manager", team: "HR" },
  { id: 2, name: "Jane Smith", designation: "Developer", team: "IT" },
];

describe("Basic App Tests", () => {
  it("renders the EmployeeList component", async () => {
    render(
      <EmployeeList
        employees={mockEmployees}
        search={""}
        setSearch={() => {}}
        team={""}
        setTeam={() => {}}
      />
    );
    // App loaded if left & right panels exist
    expect(screen.getByText(/employee directory/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    screen.debug();
  });
  // Check EmployeeList component with search
  it("filters employees based on search input", () => {
    render(
      <EmployeeList
        employees={mockEmployees.filter((emp) =>
          emp.name.toLowerCase().includes("john")
        )}
        search={"john"}
        setSearch={() => {}}
        team={""}
        setTeam={() => {}}
      />
    );
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/jane smith/i)).not.toBeInTheDocument();
  });
});
