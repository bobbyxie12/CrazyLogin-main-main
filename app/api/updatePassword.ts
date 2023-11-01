import { MongoClient } from "mongodb";
import { User } from "../interfaces/user";


const client = new MongoClient("mongodb://0.0.0.0:27017");

const UserCollection = client.db("CrazyApp").collection<User>("UserCollection");


