import { useNavigate } from "react-router-dom";
import { useGetAllTagAndCategoryQuery } from "../generated/graphql-types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import axios from "axios";

const CreateOrUpdateAdForm = ({
  action,
  defaultValues,
  submitedToBackend,
}: {
  action?: string | "Envoyer";
  defaultValues: object;
  submitedToBackend: any;
}) => {
  const navigate = useNavigate();

  const { data: queryData, error, loading } = useGetAllTagAndCategoryQuery();

  //type
  type Inputs = {
    id: number;
    title: string;
    description: string;
    // user: string; --> déjà recu par le context == email user
    price: number;
    location: string;
    createdAt: string;
    categoryId: number;
    pictures: { url: string }[];
    tagIds: number[];
  };

  //useForm
  const {
    register,
    control, // for useFieldArray
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<Inputs>({ criteriaMode: "all", defaultValues: defaultValues });

  watch("pictures");

  //useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  //onesubmit
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const dataForBackend = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      // user: formData.user,
      price: parseFloat(formData.price.toString()), // Convertir en Float
      location: formData.location,
      createdAt: new Date(formData.createdAt).toISOString(), // convertir en ISO string
      categoryId: parseInt(formData.categoryId.toString(), 10), // Utiliser uniquement categoryId
      pictures: formData.pictures.map((pic) => pic.url), // Conserver uniquement les URLs
      tagIds: formData.tagIds.map((tag) => parseInt(tag.toString(), 10)), // Utiliser uniquement tagIds
    };

    try {
      await submitedToBackend({ variables: { data: dataForBackend } });
      toast.success("success");
      navigate("/");
    } catch (error) {
      const err = error as Error;
      console.log("Error:", error);
      toast.error(err.message || "Une erreur est survenue");
    }
    console.log("Payload sent to backend:", dataForBackend);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
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
          <div className="picturesContainer">
            {fields.map((field, index) => (
              <div key={field.id}>
                {/* fiels image 1 */}
                <div className="input-group">
                  {getValues(`pictures.${index}.url`) ? (
                    <img
                      src={getValues(`pictures.${index}.url`)}
                      className="image-input-and-remove"
                    />
                  ) : (
                    <input
                      id="file"
                      type="file"
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        console.log("test", index);
                        if (e.target.files) {
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);

                          try {
                            const result = await axios.post("/img", formData);
                            console.log("file axios ==> ", result.data);
                            setValue(
                              `pictures.${index}.url`,
                              result.data.filename
                            );
                          } catch (error) {
                            console.error(error);
                          }
                        }
                      }}
                    />
                  )}
                </div>

                {/* field image 2 */}
                <input
                  className="text-field"
                  {...register(`pictures.${index}.url`, {
                    required: "L'URL de l'image est requise",
                  })}
                  //type=hidden ne fonctionne pas :)
                  style={{ display: "none" }}
                />
                {errors.pictures?.[index]?.url && (
                  <p className="error error-message">
                    {errors.pictures?.[index]?.url?.message}
                  </p>
                )}
                <button
                  className="btn-submitAd"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ url: "" })}>
            Ajouter une image
          </button>
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
                  // defaultChecked={defaultValues.tagIds.includes(tag.id)}
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
          {action}
        </button>
      </form>
    </>
  );
};

export default CreateOrUpdateAdForm;
