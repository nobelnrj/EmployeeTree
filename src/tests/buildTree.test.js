import { buildTree } from "../utils/transformData";

const mockEmployees = [
  { id: "1", name: "CEO", managerId: null },
  { id: "2", name: "VP", managerId: "1" },
  { id: "3", name: "Engineer", managerId: "2" },
];

test("builds correct hierarchy from flat list", () => {
  const tree = buildTree(mockEmployees);
  expect(tree.length).toBe(1);
  expect(tree[0].name).toBe("CEO");
  expect(tree[0].children[0].name).toBe("VP");
  expect(tree[0].children[0].children[0].name).toBe("Engineer");
});
