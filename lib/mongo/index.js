

import {MongoClient} from 'mongodb';

//this is connection string we got from mongodb
const URI = process.env.MONGODB_URL; 
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

//if no url, throw the error
if(!URL) throw new Error('plz add your mongo URL to env.local');

//create a mongo client
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to retain the db connection
  // across hot reloads in order to prevent multiple connections in development.
  if (!global._mongoClientPromise) {
    client = new MongoClient(URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection for every request.
  client = new MongoClient(URI, options);
  clientPromise = client.connect();
}

export default clientPromise;