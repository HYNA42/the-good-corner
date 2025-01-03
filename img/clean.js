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

    //requete bdd pour récupérer tous les urls
    const res = await client.query(`
      SELECT url FROM "picture" WHERE "adId" IS NOT NULL;
    `);

    //liste des urls valides (non nuls)
    const fileToKepp = res.rows.map((el) => el.url);
    console.log("db list files (filetoKeep) ==> ", fileToKepp);

    // liste des fichiers dans le dossiers uploads
    const files = fs.readdirSync("/app/uploads").map((file) => "/img/" + file);
    console.log("uploads list files ==> ", files);

    //supprimer les fichiers présenets dans uploads et qui ne sont pas dans la bdd

    fs.readdirSync("/app/uploads").forEach((file) => {
      //recupérer l'age du ficher
      const createdAt = fs.statSync("/app/uploads/" + file).ctimeMs;

      const age = Date.now() - createdAt;

      // const isOlderThan24H = age / 1000 / 60 / 60 >= 24;

      const isOlderThan24H = age / 1000 / 60 >= 60;

      console.log(`
          fileBirthDateMS ==> ${createdAt}
          fileAgeMS ==> ${age}
          fileAgeHours ==> ${age / 1000 / 60 / 60}
          isAge > 24H  :  ${isOlderThan24H}
        `);

      if (!fileToKepp.includes("/img/" + file)) {
        if (isOlderThan24H) {
          fs.unlink("/app/uploads/" + file, (error) => {
            if (error) throw error;
            console.log(file, " was succesfully deleted");
          });
        } else {
          console.log(
            file,
            " File can't be deleted because it was created less than 60 minutes"
          );
        }
      }
    });
  } catch (error) {
    console.error("Error during query: ", error);
  } finally {
    await client.end();
  }
})();
