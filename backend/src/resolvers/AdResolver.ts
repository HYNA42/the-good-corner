import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import AdInput from "../inputs/AdInput";
import { Category } from "../entities/Category";
// import { Category } from "src/entities/Category";

@Resolver(() => Ad)
class AdResolver {
  //recupère toutes les annonces
  @Query(() => [Ad])
  async getAllAds(): Promise<Ad[]> {
    // Ajout d'async et de la promesse
    const ads = await Ad.find({
      order: {
        id: "DESC",
      },
    });
    // console.log(ads);
    return ads; // Retourne la liste des annonces
  }

  //récupère une annonce en fonction de son id
  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOneByOrFail({ id: id });
    return ad;
  }

  //créer une annonce
  //   @Mutation(() => Ad)
  //   async createNewAd(
  //     @Arg("title") title: string,
  //     @Arg("description") description: string,
  //     @Arg("owner") owner: string,
  //     @Arg("price") price: number,
  //     @Arg("location") location: string,
  //     @Arg("createdAt") createdAt: Date

  //   ) {
  //     // Création de l'annonce
  //     const adToSave = new Ad();
  //     adToSave.title = title;
  //     adToSave.description = description;
  //     adToSave.owner = owner;
  //     adToSave.price = price;
  //     adToSave.location = location;
  //     adToSave.createdAt = createdAt;

  //     const result = await adToSave.save();
  //     // console.log(result);
  //     return result;
  //   }
  //   @Mutation(() => Ad)
  //   async createNewAd(@Arg("data") newAdData: AdInput) {
  //     const adToSave = new Ad();
  //     adToSave.createdAt = newAdData.createdAt;
  //     adToSave.description = newAdData.description;
  //     adToSave.location = newAdData.location;
  //     adToSave.owner = newAdData.owner;
  //     adToSave.price = newAdData.price;
  //     adToSave.title = newAdData.title;
  //     adToSave.category = newAdData.category;

  //     const result = await adToSave.save();
  //     return result;
  //   }

  // Crée une nouvelle annonce
  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput): Promise<Ad> {
    // Recherche la catégorie via categoryId
    const category = await Category.findOneBy({ id: newAdData.categoryId });
    if (!category) throw new Error("Category not found");

    // Création de l'annonce avec la catégorie associée
    const adToSave = Ad.create({
      ...newAdData,
      category,
    });

    return await adToSave.save();
  }
}

export default AdResolver;
