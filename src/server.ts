import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./config/database";

import { employeeRouter } from "./routes/employee.routes";
import { userRouter } from "./routes/user.routes";
import { postRouter } from "./routes/post.routes";
import { commentRouter } from "./routes/comment.routes";
import { online_classRouter } from "./routes/online_class.routes";

 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());

       app.use("/employees", employeeRouter);
       app.use("/users", userRouter);
       app.use("/posts", postRouter);
       app.use("/comments", commentRouter);
       app.use("/online_class", online_classRouter );

 
       // start the Express server
       app.listen(5200, () => {
           console.log(`Server running at http://localhost:5200...`);
       });
 
   })
   .catch(error => console.error(error));