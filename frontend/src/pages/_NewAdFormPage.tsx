import { Fragment } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import {
  useCreateNewAddMutation,
  useGetAllTagAndCategoryQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";

type Inputs = {
  title: string;
  description: string;
  user: string;
  price: number;
  location: string;
  createdAt: string;
  categoryId: number;
  pictures: { url: string }[];
  tagIds: number[];
};

const NewAdFormPage = () => {
  const navigate = useNavigate();

  const [
    createNewAd,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useCreateNewAddMutation({ refetchQueries: [GET_ALL_ADS] });

  //valeurs par défaut
  const defaultValues: Inputs = {
    title: "Titre par défaut",
    description: "Description par défaut",
    user: "Vendeur par défaut",
    price: 100,
    location: "Ville par défaut",
    createdAt: new Date().toISOString().slice(0, 10),
    categoryId: 1, // ID de catégorie par défaut
    pictures: [
      {
        url: "https://imgs.search.brave.com/l42u6JY0hdN597WLLpEIPyF6t0uEAzxKiIVRofRJAjU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkzLzBi/L2RjLzkzMGJkY2E1/MTM0ZjZjMmQwMDE4/ZWJmMTM5YTdiZGIy/LmpwZw",
      },
    ],
    // picturesUrls: [],
    tagIds: [11], // Pas de tags par défaut
  };

  // Setup form validation with React Hook Form
  const {
    register,
    control, // for useFieldArray
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all", defaultValues });

  // useFieldArray to manage dynamic picture inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const { data: queryData } = useGetAllTagAndCategoryQuery();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const dataForBackend = {
      title: formData.title,
      description: formData.description,
      user: formData.user,
      price: parseFloat(formData.price.toString()), // Convertir en Float
      location: formData.location,
      createdAt: new Date(formData.createdAt).toISOString(), // Assurez-vous que c'est une ISO string
      categoryId: parseInt(formData.categoryId.toString(), 10), // Utilisez uniquement categoryId
      pictures: formData.pictures.map((pic) => pic.url), // Conservez uniquement les URLs
      tagIds: formData.tagIds.map((tag) => parseInt(tag.toString(), 10)), // Utilisez uniquement tagIds
    };

    try {
      await createNewAd({ variables: { data: dataForBackend } });
      toast.success("Ad has been added");
      navigate("/");
    } catch (error) {
      console.log("Error submitting ad:", error);
      toast.error("Une erreur est survenue lors de la création de l'annonce.");
    }
    console.log("Payload sent to backend:", dataForBackend);
  };

  console.log("all categoris & tags : ", queryData);
  console.log("mutationData : ", mutationData);

  // Handling mutation states
  if (mutationLoading) return <p>Creating ad...</p>;
  if (mutationError) return <p>Error creating ad: {mutationError.message}</p>;

  // if (mutationData)
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
          {...register("user", {
            minLength: { value: 2, message: "Minimum 2 characters" },
            required: "Le vendeur est requis",
          })}
        />
        {errors.user && (
          <p className="error error-message">{errors.user.message}</p>
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
          {...register("categoryId", {
            required: "La catégorie est requise",
          })}
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
                defaultChecked={defaultValues.tagIds.includes(tag.id)}
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
      <button className="btn-submitAd" type="submit">
        Créer une annonce
      </button>
    </form>
  );
};

export default NewAdFormPage;
