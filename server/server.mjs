import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from 'config'
import mongoose from 'mongoose'
import chalk from 'chalk'
import initDatabase from './startUp/initDatabase.js'
// import { apolloUploadExpress } from 'apollo-upload-server'

import graphqlSchema from './graphql/schema/index.js'
import resolvers from './graphql/resolvers/index.js'
import tokenService from './services/token.service.js'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

// The GraphQL schema
const typeDefs = graphqlSchema
// const upload = multer({ dest: 'uploads/' })

const app = express()
const PORT = config.get('port') ?? 8080

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
// app.use(apolloUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

const httpServer = http.createServer(app)

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()

app.use(
  '/',
  cors({
    origin: 'http://localhost:3000'}),
  express.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1] || undefined
      if (!token) {
        return { isAuth: false }
      }

      const data = await tokenService.validateAccess(token)
      if (!data) {
        return { isAuth: false }
      }
      return { isAuth: true, user: data }
    },
  })
)

await new Promise((resolve) => {
  mongoose.connection.once('open', () => {
    initDatabase()
  })

  mongoose.connect(config.get('mongoUri'))
  console.log(chalk.green(`MongoDB connected`))
  httpServer.listen(PORT, resolve)
}).catch((error) => {
  console.log(chalk.red(error.message))
  process.exit(1)
})

console.log(chalk.green(`Server has been started on PORT ${PORT}...`))
