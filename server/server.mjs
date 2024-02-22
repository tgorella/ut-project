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

import graphqlSchema from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';


// The GraphQL schema
const typeDefs = graphqlSchema


const app = express();
const PORT = config.get("port") ?? 8080;

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

}).catch((error) => {
  console.log(chalk.red(error.message));
process.exit(1);
});

console.log(chalk.green(`Server has been started on PORT ${PORT}...`));;