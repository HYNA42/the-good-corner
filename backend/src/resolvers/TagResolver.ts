import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import CategoryInput from "../inputs/CategoryInput ";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import TagInput from "../inputs/TagInput";
import { Ad } from "../entities/Ad";
import { In } from "typeorm";
import UpdateTagInput from "../inputs/UpdateTagInput";
// import UpdateCategoryInput from "../inputs/UpdateCategoryInput";

@Resolver(() => Category)
class TagResolver {
  //retrieve categories
  @Query(() => [Tag])
  async getAllTag() {
    // Ajout d'async et de la promesse
    const tag = await Tag.find({
      order: {
        id: "DESC",
      },
      relations: ["ads"], //inclure les annonces
    });
    return tag;
  }

  //retrieve Tag with id
  @Query(() => Tag)
  async getTagById(@Arg("id") id: number) {
    const tag = await Tag.findOneByOrFail({ id: id });
    return tag;
  }

  //create new tag
  @Mutation(() => Tag)
  async createNewTag(@Arg("data") tagData: TagInput) {
    let ads: Ad[] = [];
    if (tagData.adIDs) {
      ads = await Ad.findBy({ id: In(tagData.adIDs) });
    }
    const newTag = Tag.create({ ...tagData, ads }); // Associe les annonces récupérées au tag
    const result = await newTag.save();
    return result;
  }

  //update category
  @Mutation(() => String)
  //   async updateTag(@Arg("data") updateData: UpdateTagInput) {
  //     let tagToUpdate = await Tag.findOneByOrFail({
  //       id: updateData.id,
  //     });

  //     // Rechercher les annonces si adIDs est fourni
  //     let ads: Ad[] = [];
  //     if (updateData.adIDs) {
  //       ads = await Ad.findBy({ id: In(updateData.adIDs) });
  //     }

  //     tagToUpdate.ads = ads;

  //     tagToUpdate = Object.assign(tagToUpdate, updateData);
  //     const result = await tagToUpdate.save();
  //     console.log(result);
  //     return `Tag ${updateData.id} has been updated`;
  //   }
  @Mutation(() => String)
  async updateTag(@Arg("data") updateData: UpdateTagInput) {
    const tagToUpdate = await Tag.findOneByOrFail({ id: updateData.id });
    // Mettre à jour uniquement le nom si un nouveau nom est fourni
    if (updateData.name) {
      tagToUpdate.name = updateData.name;
    }
    await tagToUpdate.save();
    return `Tag ${updateData.id} has been updated with the new name: ${updateData.name}`;
  }

  //delete category
  @Mutation(() => String)
  async deleteTag(@Arg("id") id: number) {
    let TagToDelete = await Tag.findOneByOrFail({ id: id });
    const result = await Tag.remove(TagToDelete);
    console.log(result);
    return "Category has been deleted";
  }
}

export default TagResolver;
