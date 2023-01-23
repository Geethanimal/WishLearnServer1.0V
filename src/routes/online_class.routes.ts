import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../config/database";
 
export const online_classRouter = express.Router();
online_classRouter.use(express.json());
 
online_classRouter.get("/", async (_req, res) => {
   try {
       const online_classes = await collections.online_classes.find({}).toArray();
       res.status(200).send(online_classes);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

online_classRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const online_class = await collections.online_classes.findOne(query);
  
        if (online_class) {
            res.status(200).send(online_class);
        } else {
            res.status(404).send(`Failed to find an online_class: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an online_class: ID ${req?.params?.id}`);
    }
 });

 online_classRouter.post("/", async (req, res) => {
    try {
        const online_class = req.body;
        const result = await collections.online_classes.insertOne(online_class);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new online_class: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new online_class.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 online_classRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const online_class = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.online_classes.updateOne(query, { $set: online_class });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an online_class: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an online_class: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an online_class: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 online_classRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.online_classes.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an online_class: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an online_class: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an online_class: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });