import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdByIdQuery,
  useGetAllTagAndCategoryQuery,
  useUpdateAdMutation,
} from "../generated/graphql-types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";

type Inputs = {
  id: number;
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

const AdUpdatePage = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const idForBack = Number(params.id);

  const {
    data: adData,
    loading: adLoading,
    error: adError,
  } = useGetAdByIdQuery({
    variables: { getAdByIdId: idForBack },
  });

  const [updateAdMutation, { loading: updateLoading, error: updateError }] =
    useUpdateAdMutation();

  const adDetails = adData?.getAdById;
  console.log("AdDetails ", adDetails);

  const defaultValues: Inputs = {
    id: idForBack,
    title: "",
    description: "",
    user: "",
    price: 0,
    location: "",
    createdAt: "",
    categoryId: 0,
    pictures: [],
    tagIds: [],
  };

  // Setup form validation with React Hook Form
  const {
    reset,
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

  useEffect(() => {
    if (adDetails) {
      reset({
        id: idForBack,
        title: adDetails.title || "",
        description: adDetails.description || "",
        user: adDetails.user || "",
        price: adDetails.price || 0,
        location: adDetails.location || "",
        createdAt: adDetails.createdAt?.slice(0, 10) || "",
        categoryId: adDetails.category?.id || 0,
        pictures: adDetails.pictures?.map((pic) => ({ url: pic.url })) || [],
        tagIds: adDetails.tags?.map((tag) => tag.id) || [],
      });
    }
  }, [adDetails, idForBack, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    console.log("Form submitted with:", formData);
    const dataForBackend = {
      id: idForBack,
      title: formData.title,
      description: formData.description,
      user: formData.user,
      price: parseFloat(formData.price.toString()),
      location: formData.location,
      createdAt: new Date(formData.createdAt).toISOString(),
      categoryId: parseInt(formData.categoryId.toString(), 10),
      pictures: formData.pictures.map((pic) => pic.url),
      tagIds: formData.tagIds.map((tag) => parseInt(tag.toString(), 10)),
    };
    console.log("Payload sent to backend:", dataForBackend);

    try {
      await updateAdMutation({ variables: { data: dataForBackend } });
      toast.success("Ad has been updated");
      navigate("/");
    } catch (error) {
      console.log("Error updating ad:", error);
      toast.error(
        "Une erreur est survenue lors de la mise à jour de l'annonce."
      );
    }
  };

  if (adLoading) return <p>Loading data...</p>;
  if (adError) return <p>Error fetching data: {adError.message}</p>;

  if (updateLoading) return <p>Loading data...</p>;
  if (updateError) return <p>Error fetching data: {updateError.message}</p>;

  return (
    <>
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
                    {errors.pictures[index].url?.message}
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
                  defaultChecked={adDetails?.tags?.some(
                    (adTag) => adTag.id === tag.id
                  )}
                />
                {tag.name}
              </label>
              <br />
            </Fragment>
          ))}
          {errors.tagIds && (
            <p className="error error-message">
              {"Au moins un tag est requis"}
            </p>
          )}
        </label>

        <br />
        <button className="btn-submitAd" type="submit">
          Modifier l'annonce
        </button>
      </form>
    </>
  );
};

export default AdUpdatePage;
