import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";



//mongodb url 
const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');
//for coummunicating database 

export const auth = betterAuth({
  //authentication type
   emailAndPassword: { 
    enabled: true, 
  }, 
  //...
  // adding social provider 
  // social provider name
  socialProviders:{
 google: {
     clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET

  },
   github: { 
            clientId: process.env.GITHUB_CLIENT_ID  ,
            clientSecret: process.env.GITHUB_CLIENT_SECRET 
        },
  },

    database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});