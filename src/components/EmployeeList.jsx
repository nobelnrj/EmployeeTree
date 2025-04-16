import React from "react";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({
  employees,
  search,
  setSearch,
  team,
  setTeam,
}) {
  // Derive unique teams from the employees list
  const teams = [...new Set(employees.map((emp) => emp.team))];

  return (
    <div>
      <h2>Employee Directory</h2>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, designation, team..."
        className="search-input"
        style={{ width: "80%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {/* Team Filter Dropdown */}
      <select
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="team-filter"
        style={{ width: "80%", padding: "0.5rem", marginBottom: "1rem" }}
      >
        <option value="">All Teams</option>
        {teams.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Employee List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {employees.map((emp) => (
          <li
            key={emp.id}
            style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}
          >
            <EmployeeCard nodeDatum={emp} />
          </li>
        ))}
      </ul>
    </div>
  );
}
