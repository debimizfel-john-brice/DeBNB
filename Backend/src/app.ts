import { catchErrors } from "./middleware/catch_errors";
import { routeNotFound } from "./middleware/route_not_found";
import AppConfig from "./app_config";
import authRoutes from "./routes/auth_route";
import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import reportRoutes from "./routes/report_route";
import vacationsRoutes from "./routes/vacations_route";
import verifyLoggedIn from "./middleware/verify_logged_in";

const server = express();

server.use(cors());
server.use(expressFileUpload());
server.use(express.json());

server.use(express.static(path.join(__dirname, "..", "public")));

server.use("/", authRoutes);
server.use(verifyLoggedIn);
server.use("/", vacationsRoutes);
server.use("/", reportRoutes);

server.use("*", routeNotFound);
server.use(catchErrors);

server.listen(AppConfig.port, () => console.log(`Server is running on port ${AppConfig.port}`));

