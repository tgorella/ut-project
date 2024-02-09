import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from 'config'
import mongoose from 'mongoose'
import chalk from 'chalk'
import initDatabase from './startUp/initDatabase.js';

const PORT = config.get("port") ?? 8080;
// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => {
  mongoose.connection.once("open", () => {
    initDatabase();
  });

  mongoose.connect(config.get("mongoUri"));
  console.log(chalk.green(`MongoDB connected`));
  httpServer.listen(PORT, resolve)

});
console.log(`🚀 Server ready at http://localhost:${PORT}`);