import * as mongodb from "mongodb";
import { Employee } from "../Interfaces/employee";
import { User } from "../Interfaces/user";
import { Post } from "../Interfaces/post";
import { Comment } from "../Interfaces/comments";
import { Online_class } from "../Interfaces/onlineclass";


export const collections: {
    
    employees?: mongodb.Collection<Employee>;
    users?: mongodb.Collection<User>;
    posts?: mongodb.Collection<Post>;
    comments?: mongodb.Collection<Comment>;
    online_classes?: mongodb.Collection<Online_class>;


} = {};


export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("wishlearndb");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    const usersCollection = db.collection<User>("user");
    const postsCollection = db.collection<Post>("posts");
    const commentsCollection = db.collection<Comment>("comments");
    const online_classesCollection = db.collection<Online_class>("online_classes");


    collections.employees = employeesCollection;
    collections.users = usersCollection;
    collections.posts = postsCollection;
    collections.comments = commentsCollection;
    collections.online_classes = online_classesCollection;

    

}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };

    const jsonSchema_user = {
        $jsonSchema: {
            bsonType: "object",
            required: ["fname", "lname", "pno", "email", "dob", "gender", "type"],
            additionalProperties: false,
            properties: {
                _id: {},
                fname: {
                    bsonType: "string",
                    description: "'First name' is required and is a string",
                },
                lname: {
                    bsonType: "string",
                    description: "'Last name' is required and is a string",
                    minLength: 5
                },
                pno: {
                    bsonType: "string",
                    description: "'Phone number' is required and is a string",
                    minLength: 10
                },
                email: {
                    bsonType: "string",
                    description: "'Email' is required and is a string",
                    minLength: 10
                },
                pw: {
                    bsonType: "string",
                    description: "'Password' is required",
                    minLength: 6
                },
                dob: {
                    bsonType: "string",
                    description: "'date of birth' is required and is a string",
                    minLength: 10
                },
                gender: {
                    bsonType: "string",
                    description: "'Gender' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["male", "female"],
                },
                type: {
                    bsonType: "string",
                    description: "'Type' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["teacher", "student"],
                },
            },
        },
    };

    const jsonSchemaPost = {
        $jsonSchema: {
            bsonType: "object",
            required: ["post"],
            additionalProperties: false,
            properties: {
                _id: {},
                post: {
                    bsonType: "string",
                    description: "'post' is required and is a string",
                },
            },
        },
    };

    const jsonSchemaComment = {
        $jsonSchema: {
            bsonType: "object",
            required: ["comment"],
            additionalProperties: false,
            properties: {
                _id: {},
                comment: {
                    bsonType: "string",
                    description: "'comment' is required and is a string",
                },
                uid: {
                    bsonType: "string",
                    description: "'uid' is required and is a string",
                },
            },
        },
    };

    const jsonSchemaOnlineClass = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name","subject","uid"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                subject: {
                    bsonType: "string",
                    description: "'subject' is required and is a string",
                },
                uid: {
                    bsonType: "string",
                    description: "'uid' is required and is a string",
                },
            },
        },
    };


    // Try applying the modification to the collection, if the collection doesn't exist, create it
    

    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", { validator: jsonSchema_user });
        }
    });

    await db.command({
        collMod: "posts",
        validator: jsonSchemaPost
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("posts", { validator: jsonSchemaPost });
        }
    });

    await db.command({
        collMod: "posts",
        validator: jsonSchemaPost
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("posts", { validator: jsonSchemaPost });
        }
    });

    await db.command({
        collMod: "comments",
        validator: jsonSchemaComment
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("comments", { validator: jsonSchemaComment });
        }
    });

    await db.command({
        collMod: "online_classes",
        validator: jsonSchemaOnlineClass
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("online_classes", { validator: jsonSchemaOnlineClass });
        }
    });

}