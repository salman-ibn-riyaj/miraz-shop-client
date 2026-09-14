import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// env ফাইল থেকে Mongo URI নেওয়া হচ্ছে
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/database";
const client = new MongoClient(uri);
export const db = client.db('mirazShop'); // আপনার ডাটাবেসের নাম

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
});