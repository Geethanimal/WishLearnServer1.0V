import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../config/database";
 
export const commentRouter = express.Router();
commentRouter.use(express.json());
 
commentRouter.get("/", async (_req, res) => {
   try {
       const comments = await collections.comments.find({}).toArray();
       res.status(200).send(comments);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

commentRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const comment = await collections.comments.findOne(query);
  
        if (comment) {
            res.status(200).send(comment);
        } else {
            res.status(404).send(`Failed to find an comment: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an comment: ID ${req?.params?.id}`);
    }
 });

 commentRouter.post("/", async (req, res) => {
    try {
        const comment = req.body;
        const result = await collections.comments.insertOne(comment);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new comment: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new comment.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 commentRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const comment = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.comments.updateOne(query, { $set: comment });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an comment: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an comment: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an comment: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 commentRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.comments.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an comment: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an comment: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an comment: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });