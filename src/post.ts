import * as mongodb from "mongodb";
 
export interface Employee {
   postmsg: string;
   _id?: mongodb.ObjectId;
}