import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import AdInput from "../inputs/AdInput";
import { Category } from "../entities/Category";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { Picture } from "../entities/Picture";
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

  // Crée une nouvelle annonce
  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput) {
    // Recherche la catégorie via categoryId
    const pictures: Picture[] = [];
    if (newAdData.picturesUrls) {
      newAdData.picturesUrls.forEach((el) => {
        const newPicture = new Picture();
        newPicture.url = el;
        pictures.push(newPicture);
      });
    }
    const category = await Category.findOneBy({ id: newAdData.categoryId });
    if (!category) throw new Error("Category not found");

    // Création de l'annonce avec la catégorie associée
    const adToSave = Ad.create({
      ...newAdData,
      category,
      pictures,
    });

    const result = await adToSave.save();
    return result;
  }

  // modifier une annonce
  @Mutation(() => Ad)
  async updateAd(@Arg("data") updateData: UpdateAdInput) {
    let adToUpdate = await Ad.findOneByOrFail({ id: updateData.id });
    adToUpdate = Object.assign(adToUpdate, updateData);
    const result = await adToUpdate.save();
    return result;
  }

  // supprimer une annonce
  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number) {
    let adToDelete = await Ad.findOneByOrFail({ id: id });
    const result = await Ad.remove(adToDelete);
    console.log(result);
    return "Ad has been deleted";
  }
}

export default AdResolver;
