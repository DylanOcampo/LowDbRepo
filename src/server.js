import express from "express";
import morgan from "morgan";
import taskRoutes from "./routes.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const server = express();

// settings
server.set("port", process.env.PORT || 5000);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsDoc(options);

// middlewares
server.use(express.json());
server.use(morgan("dev"));
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Routes
server.use(taskRoutes);

export { server };
