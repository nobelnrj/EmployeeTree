import React, { useRef, useEffect, useState, useCallback } from "react";
import Tree from "react-d3-tree";
import { EmployeeNode } from "./EmployeeNode";

// Card-style node component

export default function TreeChart({ data, setEmployees }) {
  const treeContainer = useRef(null);
  const draggedNodeRef = useRef(null);
  const [treeKey, setTreeKey] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Automatically size tree based on container
  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [treeContainer]);

  const handleReassign = useCallback(
    (empId, newManagerId) => {
      setIsLoading(true);
      fetch(`/api/employees/${empId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerId: newManagerId }),
      })
        .then((res) => res.json())
        .then(() => {
          // ✅ Fetch fresh data
          fetch("/api/employees")
            .then((res) => res.json())
            .then((data) => {
              setEmployees(data.employees);
              setTreeKey((prev) => prev + 1);
            });
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          setIsLoading(false);
        });
    },
    [setEmployees]
  );
  // If there's no data, don't render the tree
  if (!data || data.length === 0) {
    return <div ref={treeContainer}>No hierarchy data to display.</div>;
  }

  return (
    <div
      ref={treeContainer}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "#fff",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Updating...
        </div>
      )}
      <Tree
        key={treeKey} // 👈 forces remount when data changes
        data={data}
        orientation="vertical"
        translate={{
          x: dimensions.width / 2,
          y: dimensions.height + 100,
        }}
        separation={{ siblings: 2, nonSiblings: 2.5 }}
        pathFunc="step"
        collapsible={true}
        zoomable={true}
        draggable={true}
        scaleExtent={{ min: 0.5, max: 1 }}
        zoom={0.7}
        renderCustomNodeElement={(rd3tProps) => (
          <EmployeeNode
            {...rd3tProps}
            handleReassign={handleReassign}
            draggedNodeRef={draggedNodeRef}
            setTreeKey={setTreeKey}
            isLoading={isLoading}
          />
        )}
      />
    </div>
  );
}
