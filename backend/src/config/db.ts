import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { DataSource } from "typeorm";

export const dataSourceGoodCorner = new DataSource({
  type: "sqlite",
  database: "good_corner.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["error", "query"],
});
