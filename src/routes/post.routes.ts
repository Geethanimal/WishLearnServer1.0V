import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../config/database";
 
export const postRouter = express.Router();
postRouter.use(express.json());
 
postRouter.get("/", async (_req, res) => {
   try {
       const posts = await collections.posts.find({}).toArray();
       res.status(200).send(posts);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

postRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const post = await collections.posts.findOne(query);
  
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send(`Failed to find an post: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an post: ID ${req?.params?.id}`);
    }
 });

 postRouter.post("/", async (req, res) => {
    try {
        const post = req.body;
        const result = await collections.posts.insertOne(post);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new post: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new post.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 postRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const post = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.posts.updateOne(query, { $set: post });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an post: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an post: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an post: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 postRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.posts.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an post: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an post: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an post: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });