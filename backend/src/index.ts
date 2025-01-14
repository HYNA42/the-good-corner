// src/index.ts
import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";

import jwt, { Secret } from "jsonwebtoken";

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("no jwt secret");
  }
  

  await dataSourceGoodCorner.initialize(); // Initialise la connexion à la base de données

  // Construit le schéma avec `type-graphql`
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver,UserResolver], // Enregistre le resolver pour les annonces (Ad)
  });

  // Crée le serveur Apollo avec le schéma `type-graphql`
  const server = new ApolloServer({
    schema,
  });

  // Démarre le serveur Apollo
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    
    context: async ({ req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (token !== undefined) {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);
        console.log("payload in context", payload);
        if (payload) {
          console.log("payload was found and returned to resolver");
          return payload;
        }
      }
      return {};
    },
    
  });

  console.log(`🚀 Server ready at : ${url}`);
};

start();
