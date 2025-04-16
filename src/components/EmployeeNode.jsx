import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import EmployeeCard from "./EmployeeCard";

export const EmployeeNode = ({
  nodeDatum,
  handleReassign,
  draggedNodeRef,
  setTreeKey,
  isLoading,
}) => {
  const nodeGroupRef = useRef(null);

  useEffect(() => {
    if (!nodeGroupRef.current) return;

    const selection = d3.select(nodeGroupRef.current);

    const dragBehavior = d3
      .drag()
      .on("start", () => {
        if (isLoading) return; // Prevent drag if loading
        draggedNodeRef.current = nodeDatum.id;
      })
      .on("drag", (event) => {
        if (isLoading) return; // Prevent drag if loading
        selection.attr("transform", `translate(${event.x}, ${event.y})`);
      })
      .on("end", (event) => {
        const elements = document.elementsFromPoint(
          event.sourceEvent.clientX,
          event.sourceEvent.clientY
        );
        const dropTarget = elements.find(
          (el) =>
            el.dataset &&
            el.dataset.nodeId &&
            el.dataset.nodeId !== nodeDatum.id
        );
        if (dropTarget) {
          const targetId = dropTarget.dataset.nodeId;
          if (nodeDatum.managerId === targetId) {
            console.log("Dropped on current manager — resetting tree");
            setTreeKey((prev) => prev + 1); // re-trigger re-render
          } else {
            handleReassign(draggedNodeRef.current, targetId);
            console.log(
              `Reassigning ${draggedNodeRef.current} under ${targetId}`
            );
          }
        } else {
          setTreeKey((prev) => prev + 1);
        }
        draggedNodeRef.current = null;
      });

    selection.call(dragBehavior);
  }, [nodeDatum]);

  const handleClick = () => {
    const sourceId = draggedNodeRef.current;
    const targetId = nodeDatum.id;

    console.log(`Reassigning ${sourceId} under ${targetId}`);
  };
  return (
    <g ref={nodeGroupRef} onClick={handleClick}>
      <foreignObject width="200" height="100" x="-100" y="-50">
        <div
          data-node-id={nodeDatum.id}
          style={{
            padding: "10px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          <EmployeeCard nodeDatum={nodeDatum} />
        </div>
      </foreignObject>
    </g>
  );
};
