import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Picture } from "../entities/Picture";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'env

export const dataSourceGoodCorner = new DataSource({
  // type: "sqlite",
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // database: "good_corner.sqlite",
  entities: [Ad, Category, Tag, Picture],
  synchronize: true,
  logging: ["error", "query"],
});
