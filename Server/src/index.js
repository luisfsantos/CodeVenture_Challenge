// Import the main library
const server = require("server");
const github = require("./auth/github");
const { get, post } = server.router;

const api = [
  get("/auth/github/login", github.redirectGithub),
  get("/auth/github/callback", github.getAuthToken)
];

server(
  {
    port: 3000
  },
  api
);
