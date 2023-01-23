import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../config/database";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (_req, res) => {
    try {
        const users = await collections.users.find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

userRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
        const result = await collections.users.insertOne(user);

        if (result.acknowledged) {
            res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new user.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


