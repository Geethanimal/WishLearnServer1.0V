import * as mongodb from "mongodb";

export interface Post {
    post?: string;
    _id?: mongodb.ObjectId;
}
