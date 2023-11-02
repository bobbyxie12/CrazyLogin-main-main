import { MongoClient } from "mongodb";
import { User } from "../../interfaces/user";
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from "@/app/utils/utils";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // if (req.method !== 'PUT') {
    //   return res.status(405).end(); 
    // }
  
    const { username, newPassword } = req.body;
  
    if (!username || !newPassword) {
      return res.status(400).json({ error: "username and Password are required" });
    }
  
    try {
  
    //   const db = client.db('YOUR_DB_NAME'); // Replace with your database name
    //   const collection = db.collection('users'); // Assuming you have a 'users' collection
        
      const client = new MongoClient("mongodb://0.0.0.0:27017");

      const UserCollection = client.db("CrazyApp").collection<User>("UserCollection");


      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the password in the database
      const result = await UserCollection.updateOne(
        { username },
        { $set: { password: hashedPassword } }
      );
        
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Password updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }



    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



