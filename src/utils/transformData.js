export function buildTree(data) {
  const idMap = {};
  data.forEach(
    (emp) =>
      (idMap[emp.id] = {
        ...emp,
        name: emp.name,
        attributes: { designation: emp.designation },
        children: [],
      })
  );

  const tree = [];
  data.forEach((emp) => {
    if (emp.managerId && idMap[emp.managerId]) {
      idMap[emp.managerId].children.push(idMap[emp.id]);
    } else {
      tree.push(idMap[emp.id]);
    }
  });

  return tree;
}
