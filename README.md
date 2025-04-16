# 📘 employee-tree-app

A dynamic employee org chart built in **React + Vite**, visualizing hierarchical data using `react-d3-tree`, and simulating a backend with `MirageJS`.

## ✨ Features

- 👥 View and filter a list of employees (search + team dropdown)
- 🌳 Auto-generated org chart using **managerId-based hierarchy**
- 🖱️ Drag and drop nodes to reassign reporting managers
- 🔄 Realtime UI updates + persistent Mirage backend
- 🧭 Tree auto-fits the container and centers on load
- 🔒 Loading state & UI lock during updates
- 🧪 Unit + integration tests using **Vitest** & Testing Library

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/nobelnrj/EmployeeTree.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

## 🧠 Tech Stack

| Tech                                                    | Purpose                           |
| ------------------------------------------------------- | --------------------------------- |
| [React](https://reactjs.org/)                           | UI & component structure          |
| [Vite](https://vitejs.dev/)                             | Fast development server & bundler |
| [MirageJS](https://miragejs.com/)                       | Mock backend API                  |
| [react-d3-tree](https://bkrem.github.io/react-d3-tree/) | Tree rendering                    |
| [D3 Drag](https://github.com/d3/d3-drag)                | SVG drag behavior                 |
| [Vitest](https://vitest.dev/)                           | Unit & integration testing        |
| [Testing Library](https://testing-library.com/)         | UI testing                        |

## 🧪 Running Tests

```bash
npm run test
```

Runs unit tests for:

- `buildTree()` logic
- App integration with Mirage backend
- Drag-and-drop reassignment behavior

## 🌳 Data Structure

Each employee object:

```ts
{
  id: string;
  name: string;
  designation: string;
  team: string;
  managerId: string | null;
}
```

Hierarchy is built by nesting each employee under their `managerId`.

## 🧩 Project Structure

```
src/
├── api/              # MirageJS server
├── components/       # EmployeeList + TreeChart
├── utils/            # Data transform helpers
├── tests/            # Vitest test files
├── App.jsx
├── main.jsx
```

## 📷 UI Preview

> 📌 Drag a node (employee) and drop it on another to reassign their manager. Tree re-renders live. Filter by team or search any field.

## 📃 License

MIT © Nobel Reo Jacob
