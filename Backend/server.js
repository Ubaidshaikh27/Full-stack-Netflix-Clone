import express  from "express";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { protectRoute } from "./middleware/protectRoute.js";

import searchRoutes from "./routes/search.routes.js";
import path from "path"



import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = ENV_VARS.PORT;
const __dirname= path.resolve() // for deployment

app.use(express.json()) //This function will allow us to use or Parse req.body
//The req object contains the request, that is, the thing the client sends to your server.


app.use(cookieParser()) //used to parse cookie


app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/movie", protectRoute, movieRoutes)

app.use("/api/v1/tv", protectRoute, tvRoutes)

app.use("/api/v1/search", protectRoute, searchRoutes)


if (ENV_VARS.NODE_ENV ==="production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (res, req) =>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//we are sayin if it hit api routes, then hit routes above but if any other routes, we would like to hit this controller,
//go under the frontend go under the dist and hit index.html
    })
}
//this will convert this path to a static path//our dist folder to static asset/React application
//dist folder is what we have in the production.

app.listen(PORT, function(req, res){
    console.log("Server started on Port "+PORT);
    connectDB();
})