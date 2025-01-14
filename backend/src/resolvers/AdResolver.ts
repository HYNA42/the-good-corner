import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import AdInput from "../inputs/AdInput";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { Category } from "../entities/Category";
import { Picture } from "../entities/Picture";
import { Tag } from "../entities/Tag";
import { FindManyOptions, ILike, In } from "typeorm";

@Resolver(() => Ad)
class AdResolver {
  //recupère toutes les annonces
  @Query(() => [Ad])
  async getAllAds(
    @Arg("title", { nullable: true }) title?: string,
    @Arg("category", { nullable: true }) category?: string
  ) {
    let ads: Ad[] = [];
    let findOptions: FindManyOptions<Ad> = {
      order: {
        id: "DESC",
        pictures: {
          id: "DESC",
        },
      },
    };
    if (title) {
      findOptions = { ...findOptions, where: { title: ILike(`%${title}%`) } };
    }
    if (category) {
      findOptions = {
        ...findOptions,
        where: { category: { title: category } },
      };
    }
    ads = await Ad.find(findOptions);
    return ads;
  }

  //récupère une annonce en fonction de son id
  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOne({
      where: { id: id },
      order: { pictures: { id: "DESC" } }, //trier les url des images
    });
    if (ad === null) {
      throw new Error("Cannot find ad with id " + id);
    }

    return ad;
  }

  // Crée une nouvelle annonce
  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput,@Ctx() context:any) {
    console.log("add context of create new ad mutation", context);
    //rechercher les pictures
    const pictures: Picture[] = [];
    if (newAdData.pictures) {
      newAdData.pictures.forEach((el) => {
        const newPicture = new Picture();
        newPicture.url = el;
        pictures.push(newPicture);
      });
    }
    // Recherche la catégorie via categoryId
    const category = await Category.findOneBy({ id: newAdData.categoryId });
    if (!category) throw new Error("Category not found");

    //Rechercher des tags via les IDs
    let tags: Tag[] = [];
    if (newAdData.tagIds) {
      tags = await Tag.findBy({ id: In(newAdData.tagIds) });
    }

    // Création de l'annonce avec la catégorie associée
    const adToSave = Ad.create({
      ...newAdData,
      category,
      pictures,
      tags,
    });

    const result = await adToSave.save();
    return result;
  }

  @Mutation(() => Ad)
  async updateAd(@Arg("data") updateData: UpdateAdInput) {
    // Récupère l'annonce avec ses relations "tags", "category" et "pictures"
    let adToUpdate = await Ad.findOne({
      where: { id: updateData.id },
      relations: ["tags", "category", "pictures"],
    });

    if (!adToUpdate) {
      throw new Error("Ad not found");
    }

    // Mise à jour des champs de base
    adToUpdate = Object.assign(adToUpdate, updateData);

    // Mise à jour des tags si `tagIds` est fourni
    if (updateData.tagIds) {
      const newTags = await Tag.findBy({ id: In(updateData.tagIds) });
      adToUpdate.tags = newTags;
    }

    // Mise à jour de la catégorie si `categoryId` est fourni
    if (updateData.categoryId) {
      const newCategory = await Category.findOneBy({
        id: updateData.categoryId,
      });
      if (!newCategory) {
        throw new Error("Category not found");
      }
      adToUpdate.category = newCategory;
    }

    // Mise à jour des images (pictures) si `picturesUrls` est fourni
    if (updateData.pictures) {
      // Supprime les images actuelles associées pour les remplacer
      await Picture.delete({ ad: { id: adToUpdate.id } });

      // Crée et associe les nouvelles images
      const newPictures = updateData.pictures.map((url) => {
        const picture = new Picture();
        picture.url = url;
        picture.ad = adToUpdate;
        return picture;
      });
      adToUpdate.pictures = newPictures;
    }

    // Sauvegarde de l'annonce avec les mises à jour
    const result = await adToUpdate.save();
    return result;
  }

  // supprimer une annonce
  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number, @Ctx() context: any) {
    console.log("delete context of create new ad mutation", context);
    let adToDelete = await Ad.findOneByOrFail({ id: id });
    const result = await Ad.remove(adToDelete);
    console.log(result);
    return "Ad has been deleted";
  }
}

export default AdResolver;
