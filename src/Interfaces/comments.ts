import * as mongodb from "mongodb";
 
export interface Comment {
   comment: string;
   uid: string;
   _id?: mongodb.ObjectId;
}