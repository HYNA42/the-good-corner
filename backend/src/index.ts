// src/index.ts
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver  from "./resolvers/AdResolver";

const start = async () => {
  await dataSourceGoodCorner.initialize(); // Initialise la connexion à la base de données

  // Construit le schéma avec `type-graphql`
  const schema = await buildSchema({
    resolvers: [AdResolver], // Enregistre le resolver pour les annonces (Ad)
  });

  // Crée le serveur Apollo avec le schéma `type-graphql`
  const server = new ApolloServer({
    schema,
  });

  // Démarre le serveur Apollo
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

start();
