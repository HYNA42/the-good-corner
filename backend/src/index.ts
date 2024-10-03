// console.log("hello from typescript");
import "reflect-metadata";
import express from "express";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Category } from "./entities/Category";
import { In, Like } from "typeorm";
import { Tag } from "./entities/Tag";
import cors from "cors";

// const db = new sqlite3.Database("good_corner.sqlite");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// let ads = [
//   {
//     id: 1,
//     title: "Bike to sell",
//     description:
//       "My bike is blue, working fine. I'm selling it because I've got a new one",
//     owner: "bike.seller@gmail.com",
//     price: 100,
//     picture:
//       "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
//     location: "Paris",
//     createdAt: "2023-09-05T10:13:14.755Z",
//   },
//   {
//     id: 2,
//     title: "Car to sell",
//     description:
//       "My car is blue, working fine. I'm selling it because I've got a new one",
//     owner: "car.seller@gmail.com",
//     price: 10000,
//     picture:
//       "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
//     location: "Paris",
//     createdAt: "2023-10-05T10:14:15.922Z",
//   },
// ];

// app.get("/ads", async (_req, res) => {
//   const ads = await Ad.find({ relations: ["category"] });
//   res.send(ads);
// });

/**Ad */

app.get("/ads", async (req, res) => {
  let ads: Ad[];
  if (req.query.category) {
    ads = await Ad.find({
      where: {
        category: { title: req.query.category as string },
      },
      relations: ["category", "tags"],
      order: {
        createdAt: "DESC", // Trie par date de création, de la plus récente à la plus ancienne
      },
    });
  }
  if (req.query.title) {
    //recherche par titre
    // Recherche par titre, avec inclusion de la relation 'category'
    ads = await Ad.find({
      where: {
        title: Like(`%${req.query.title as string}%`),
      },
      relations: ["category", "tags"], // Inclut les relations avec 'category' et 'tags'
      order: {
        createdAt: "DESC", // Trie par date de création
      },
    });
  } else {
    ads = await Ad.find({
      relations: ["category", "tags"],
      order: {
        createdAt: "DESC", // Trie par date de création, de la plus récente à la plus ancienne
      },
    });
  }
  res.send(ads);
});

app.get("/ads/category/:keyword", async (req, res) => {
  const { keyword } = req.params;
  try {
    const ads = await Ad.find({
      where: {
        category: { title: keyword },
      },
      relations: { category: true, tags: true },
    });
    res.send(ads);
  } catch (error) {
    console.error("Error while trying to get ads:", error);
    res.status(500).send("Server error");
  }
});

//récupère une annonce en fonction de son id récupéré dans l'url

app.get("/ads/:id", async (req, res) => {
  // let ads: Ad[];
  try {
    const adId = parseInt(req.params.id);
    //on récupère toutes les informations de l'annonce avec ses relations (Category, Tag)
    const ad = await Ad.findOne({
      where: { id: adId },
      relations: ["category", "tags"],
    });
    //renvoyer une erreur si aucune annonce
    if (!ad) {
      return res.status(404).send("Ad not found");
    }
    //sinon envoyer au client l'annonce trouvé
    return res.send(ad);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Erreur dans la tentative de connexion au sereur");
  }
});

app.post("/ads", async (req, res) => {
  console.log("request body", req.body);

  // Création de l'annonce
  const adToSave = new Ad();
  adToSave.createdAt = req.body.createdAt;
  adToSave.description = req.body.description;
  adToSave.location = req.body.location;
  adToSave.owner = req.body.owner;
  adToSave.picture = req.body.picture;
  adToSave.price = req.body.price;
  adToSave.title = req.body.title;

  // Récupérer la catégorie associée
  adToSave.category = req.body.category ? req.body.category : 1;

  // Récupérer les tags par leurs IDs
  if (req.body.tags && req.body.tags.length > 0) {
    const tags = await Tag.find({
      where: {
        id: In(req.body.tags),
      },
    });
    adToSave.tags = tags; // Associer les tags à l'annonce
  }

  // Valider et sauvegarder l'annonce
  const errors = await validate(adToSave);
  if (errors.length > 0) {
    console.log(errors);
    res.status(400).send("Invalid input");
  } else {
    const result = await adToSave.save();
    res.send(result);
  }
});

app.put("/ads/:id", async (req, res) => {
  try {
    let adToUpdate = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    adToUpdate = Object.assign(adToUpdate, req.body);
    const result = await adToUpdate.save();
    console.log(result);
    res.send("Ad hes been updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid request");
  }
});

app.delete("/ads/:id", async (req, res) => {
  const result = await Ad.delete(req.params.id);
  console.log(result);
  res.send("Ad has been deleted");
});

/**Category */
app.get("/categories", async (req, res) => {
  let categories: Category[];
  if (req.query.title) {
    categories = await Category.find({
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

app.post("/categories", async (req, res) => {
  const categoryToSave = new Category();
  categoryToSave.title = req.body.title;
  await categoryToSave.save();
  res.send("Category has been saved");
});

app.put("/categories/:id", async (req, res) => {
  try {
    let categoryToUpdate = await Category.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    categoryToUpdate = Object.assign(categoryToUpdate, req.body);
    const result = await categoryToUpdate.save();
    console.log(result);
    res.send("Category has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.delete("/categories/:id", async (req, res) => {
  const result = await Category.delete(req.params.id);
  console.log(result);
  res.send("Category has been deleted");
});

/**TAGS */
app.get("/tags", async (_req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

app.post("/tags", async (req, res) => {
  console.log("request body", req.body);
  const adToSave = new Tag();
  adToSave.name = req.body.name;

  const error = await validate(adToSave);
  if (error.length > 0) {
    console.log(error);
    // throw new Error("validation failed")
    res.status(400).send("Invalid input");
  } else {
    const result = await adToSave.save();
    res.send(result);
  }
});

app.put("/tags/:id", async (req, res) => {
  try {
    let tagToUpdate = await Tag.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    tagToUpdate = Object.assign(tagToUpdate, req.body);
    const result = await tagToUpdate.save();
    console.log(result);
    res.send("Tag has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.delete("/tags/:id", async (req, res) => {
  const result = await Tag.delete(req.params.id);
  console.log(result);
  res.send("Tag has been deleted");
});

/**FINAL */

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
