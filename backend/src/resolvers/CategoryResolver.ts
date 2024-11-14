import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import CategoryInput from "../inputs/CategoryInput ";
import { Category } from "../entities/Category";
import CategoryInput from "../inputs/CategoryInput ";
import UpdateCategoryInput from "../inputs/UpdateCategoryInput";
// import UpdateCategoryInput from "../inputs/UpdateCategoryInput";

@Resolver(() => Category)
class CategoryResolver {
  //retrieve categories
  @Query(() => [Category])
  async getAllCategory() {
    // Ajout d'async et de la promesse
    const category = await Category.find({
      order: {
        id: "DESC",
      },
    });
    return category;
  }

  //retrieve category with id
  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number) {
    const category = await Category.findOneByOrFail({ id: id });
    return category;
  }

  //create new category
  @Mutation(() => Category)
  async createNewCategory(@Arg("data") categoryData: CategoryInput) {
    // const category = new Category();
    // category.title = categoryData.title
    const newCategory = Category.create({ ...categoryData });
    const result = await newCategory.save();
    return result;
  }

  //update category
  @Mutation(() => String)
  async updateCategory(@Arg("data") updateData: UpdateCategoryInput) {
    let categoryToUpdate = await Category.findOneByOrFail({
      id: updateData.id,
    });
    categoryToUpdate = Object.assign(categoryToUpdate, updateData);
    const result = await categoryToUpdate.save();
    console.log(result);
    return `Categoy ${updateData.id} has been updated`;
  }

  //delete category
  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: number) {
    let categoryToDelete = await Category.findOneByOrFail({ id: id });
    const result = await Category.remove(categoryToDelete);
    console.log(result);
    return "Category has been deleted";
  }
}

export default CategoryResolver;
