import { server } from "./server.js";
import { createConnection } from "./database.js";

createConnection();
server.listen(server.get("port"));
console.log("Server on port", server.get("port"));
