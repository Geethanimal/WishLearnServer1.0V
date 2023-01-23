import * as mongodb from "mongodb";
 
export interface Online_class {
   name: string;
   subject: string;
   uid: string;
   _id?: mongodb.ObjectId;
}