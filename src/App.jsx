import React, { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";
import TreeChart from "./components/TreeChart";
import { buildTree } from "./utils/transformData";
import "./App.css";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.employees));
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation.toLowerCase().includes(search.toLowerCase()) ||
      emp.team.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = team === "" || emp.team === team;
    return matchesSearch && matchesTeam;
  });

  const treeData = buildTree(team ? filteredEmployees : employees);

  return (
    <div className="app">
      <div className="sidebar">
        <EmployeeList
          employees={filteredEmployees}
          search={search}
          setSearch={setSearch}
          team={team}
          setTeam={setTeam}
        />
      </div>
      <div className="main">
        <TreeChart data={treeData} setEmployees={setEmployees} />
      </div>
    </div>
  );
}
