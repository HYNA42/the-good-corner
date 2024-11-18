import { Fragment } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

// import { useMutation } from "@apollo/client";
// import { GET_ALL_CATEGORY_AND_TAG } from "../graphql/queries";
// import { CREATE_NEW_AD } from "../graphql/mutations";
import {
  useGetAllTagAndCategoryQuery,
  useMutationMutation,
} from "../generated/graphql-types";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  createdAt: Date;
  categoryId: number; // Remplacer "category" par "categoryId"
  pictures: { url: string }[]; // Garder "pictures" pour le formulaire
  picturesUrls: string[]; // Correspond à "picturesUrls" attendu par l'API
  tagIds: number[]; // Remplacer "tags" par "tagIds"
};

// type Tags = {
//   id: number;
//   name: string;
// };

const NewAdFormPage = () => {
  const navigate = useNavigate();
  // Setup form validation with React Hook Form
  const {
    register,
    control, // for useFieldArray
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  // useFieldArray to manage dynamic picture inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures", // managing pictures array
  });

  //useQuery for fetching categories and tags
  // const {
  //   loading: queryLoading,
  //   error: queryError,
  //   data: queryData,
  // } = useQuery(GET_ALL_CATEGORY_AND_TAG);

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useGetAllTagAndCategoryQuery();

  // UseMutation for crating new ad
  // const [
  //   createNewAd,
  //   { data: mutationData, loading: mutationLoading, error: mutationError },
  // ] = useMutation(CREATE_NEW_AD);

  const [
    createNewAd,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutationMutation();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const dataForBackend = {
      title: formData.title,
      description: formData.description,
      owner: formData.owner,
      price: parseFloat(formData.price.toString()), // Convertir en Float
      location: formData.location,
      createdAt: new Date(formData.createdAt).toISOString(), // Assurez-vous que c'est une ISO string
      categoryId: parseInt(formData.categoryId.toString(), 10), // Utilisez uniquement categoryId
      picturesUrls: formData.pictures.map((pic) => pic.url), // Conservez uniquement les URLs
      tagIds: formData.tagIds.map((tag) => parseInt(tag.toString(), 10)), // Utilisez uniquement tagIds
    };

    console.log("Payload sent to backend:", dataForBackend);

    try {
      // await axios.post("http://localhost:3000/ads", dataForBackend);
      await createNewAd({ variables: { data: dataForBackend } });
      toast.success("Ad has been added");
      navigate("/");
    } catch (error) {
      console.log("Error submitting ad:", error);
      toast.error("Une erreur est survenue lors de la création de l'annonce.");
    }
  };

  // Handling query states
  if (queryLoading) return <p>Loading categories and tags...</p>;
  if (queryError) return <p>Error fetching data: {queryError.message}</p>;
  console.log("all categoris & tags : ", queryData);

  // Handling mutation states
  if (mutationLoading) return <p>Creating ad...</p>;
  if (mutationError) return <p>Error creating ad: {mutationError.message}</p>;

  if (mutationData) {
    console.log("Mutation successful:", mutationData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre de l'annonce:
        <br />
        <input
          className="text-field"
          {...register("title", {
            minLength: { value: 2, message: "Minimum 2 characters" },
            required: "Le titre est requis",
          })}
        />
        {errors.title && (
          <p className="error error-message">{errors.title.message}</p>
        )}
      </label>

      <br />
      <label>
        Description:
        <br />
        <input
          className="text-field"
          {...register("description", {
            minLength: { value: 10, message: "Minimum 10 characters" },
            required: "La description est requise",
          })}
        />
        {errors.description && (
          <p className="error error-message">{errors.description.message}</p>
        )}
      </label>

      <br />
      <label>
        Vendeur:
        <br />
        <input
          className="text-field"
          {...register("owner", {
            minLength: { value: 2, message: "Minimum 2 characters" },
            required: "Le vendeur est requis",
          })}
        />
        {errors.owner && (
          <p className="error error-message">{errors.owner.message}</p>
        )}
      </label>

      <br />
      <label>
        Prix:
        <br />
        <input
          type="number"
          className="text-field"
          {...register("price", {
            required: "Le prix est requis",
            min: { value: 0, message: "Le prix doit être positif" },
          })}
        />
        {errors.price && (
          <p className="error error-message">{errors.price.message}</p>
        )}
      </label>

      {/* images */}
      <br />
      <label>
        Images:
        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                className="text-field"
                {...register(`pictures.${index}.url`, {
                  required: "L'URL de l'image est requise",
                })}
              />
              {errors.pictures?.[index]?.url && (
                <p className="error error-message">
                  {errors.pictures?.[index]?.url?.message}
                </p>
              )}
              <button type="button" onClick={() => remove(index)}>
                Supprimer cette image
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ url: "" })}>
            Ajouter une image
          </button>
        </div>
      </label>
      {/* images */}

      <br />
      <label>
        Ville:
        <br />
        <input
          className="text-field"
          {...register("location", {
            required: "La ville est requise",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
        />
        {errors.location && (
          <p className="error error-message">{errors.location.message}</p>
        )}
      </label>

      <br />
      <label>
        Date:
        <br />
        <input
          type="date"
          className="text-field"
          {...register("createdAt", {
            required: "La date est requise",
          })}
          // onChange={(e) => {
          //   const dateValue = e.target.value;
          //   const test = new Date(dateValue).toISOString();

          //   console.log("Date saisie:", dateValue, "Type:", typeof dateValue, "date ISo",test);
          // }}
        />
        {errors.createdAt && (
          <p className="error error-message">{errors.createdAt.message}</p>
        )}
      </label>

      <br />
      <label>
        Catégorie:
        <br />
        <select
          className="text-field"
          {...register("categoryId", { required: "La catégorie est requise" })}
        >
          <option value="">Choisissez une catégorie</option>
          {queryData?.getAllCategory.map((el: any) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="error error-message">{errors.categoryId.message}</p>
        )}
      </label>

      <br />
      <label>
        Tags :
        <br />
        {queryData?.getAllTag.map((tag: any) => (
          <Fragment key={tag.id}>
            <label>
              <input
                type="checkbox"
                value={tag.id}
                {...register("tagIds", { required: "Un tag est requis" })}
              />
              {tag.name}
            </label>
            <br />
          </Fragment>
        ))}
        {errors.tagIds && (
          <p className="error error-message">{"Au moins un tag est requis"}</p>
        )}
      </label>

      <br />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default NewAdFormPage;
