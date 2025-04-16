import { createServer, Model } from "miragejs";

export function makeServer() {
  createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      [
        {
          id: "1",
          name: "Mark Hill",
          designation: "Chief Executive Officer",
          team: "Executive",
          managerId: null,
        },
        {
          id: "2",
          name: "Joe Linux",
          designation: "Chief Technology Officer",
          team: "Technology",
          managerId: "1",
        },
        {
          id: "3",
          name: "Ron Blomquist",
          designation: "Chief Information Security Officer",
          team: "Technology",
          managerId: "2",
        },
        {
          id: "4",
          name: "Michael Rubin",
          designation: "Chief Innovation Officer",
          team: "Technology",
          managerId: "3",
          email: "we@aregreat.com",
        },
        {
          id: "5",
          name: "Linda May",
          designation: "Chief Business Officer",
          team: "Business",
          managerId: "1",
        },
        {
          id: "6",
          name: "Alice Lopez",
          designation: "Chief Communications Officer",
          team: "Business",
          managerId: "5",
        },
        {
          id: "7",
          name: "Mary Johnson",
          designation: "Chief Brand Officer",
          team: "Business",
          managerId: "5",
        },
        {
          id: "8",
          name: "Kirk Douglas",
          designation: "Chief Business Development Officer",
          team: "Business",
          managerId: "5",
        },
        {
          id: "9",
          name: "John Green",
          designation: "Chief Accounting Officer",
          team: "Finance",
          managerId: "1",
        },
        {
          id: "10",
          name: "Erica Reel",
          designation: "Chief Customer Officer",
          team: "Customer Success",
          managerId: "9",
        },
      ].forEach((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.namespace = "api";
      this.get("/employees", (schema) => schema.employees.all());
      this.patch("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.employees.find(id);
        return employee.update(attrs);
      });
    },
  });
}
