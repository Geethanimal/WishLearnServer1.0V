import * as mongodb from "mongodb";

export interface User {
    fname?: string;
    lname?: string;
    pno?: string;
    email?: string;
    dob?: string;
    gender?: 'male' | 'female';
    type?:'teacher'|'student';
    pw?:string;
    _id?: mongodb.ObjectId;
 }