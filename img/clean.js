// const pg = require("pg");
// const dotenv = require("dotenv");

import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import { error } from "console";

const { Client } = pg;
dotenv.config();

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: false,
});

(async () => {
  try {
    console.log("Start connecting to database...");

    //connection avec la bdd
    await client.connect();

    const res = await client.query(`
      SELECT url FROM "picture" WHERE "adId" IS NOT NULL;
    `);

    //recupères les urls non nuls
    const fileToKepp = res.rows.map((el) => el.url);
    console.log("response FileToKepp==> ", fileToKepp);

    //recupérer la liste des fichiers dans le dossiers uploads
    const files = fs.readdirSync("./uploads").map((file) => "/img/" + file);
    console.log("files list on uploads ==> ", files);

    //supprimer les fichiers présenets dans uploads et qui ne sont pas dans la bdd
    fs.readdirSync("./uploads").forEach((file) => {
      if (!fileToKepp.includes("/img/" + file)) {
        fs.unlink("/app/uploads/" + file, (error) => {
          if (error) throw error;
          console.log(file, " was succesfully deleted");
        });
      }
    });
  } catch (error) {
    console.error("Error during query: ", error);
  } finally {
    await client.end();
  }
})();
