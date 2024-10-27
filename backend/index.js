import mongoose from "mongoose";
import express from 'express';
import http from 'http';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from "@apollo/server";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typrDef/index.js";
import dotenv from 'dotenv';
import { dbConnection } from "./config/dbConnection.js";
import { configurePassport } from "./config/passportAuthentication/passport.js";
import MongoDBStore from "connect-mongodb-session";
import passport from "passport";
import session from 'express-session'; // Import express-session

dotenv.config();
configurePassport();

export const connectDb = async () => {
  mongoose.set('strictQuery', true);
  const uri = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;
  
  try {
    await mongoose.connect(uri);
    console.log("Database is connected successfully");
  } catch (error) {
    console.error("Error connecting to the Database");
    console.error(error);
    process.exit(1); 
  }
};

const app = express();
const httpServer = http.createServer(app);

// Initialize MongoDBStore with the session module
const store = new MongoDBStore(session)({
  uri: process.env.DB_URL,
  collection: 'sessions',
});

store.on("error", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await dbConnection();

console.log(`🚀 Server ready at http://localhost:4000/`);
