import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { category } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  // picture: string;
  location: string;
  createdAt: Date;
  category: number;
  tags: number[];
  pictures: { url: string }[]; // Tableau d'images sous forme d'objets avec une clé `url`
};

type Tags = {
  id: number;
  name: string;
};

const NewAdFormPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as category[]);
  const [tags, setTags] = useState([] as Tags[]);

  // Fetch categories and tags
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("Error fetching categories", err);
      }
    };

    const fetchTags = async () => {
      try {
        const result = await axios.get("http://localhost:3000/tags");
        setTags(result.data);
      } catch (err) {
        console.log("Error fetching tags", err);
      }
    };

    fetchTags();
    fetchCategories();
  }, []);

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataForBackend = {
      ...data,
      tags: data.tags.map((el) => ({ id: el })),
    };

    try {
      await axios.post("http://localhost:3000/ads", dataForBackend);
      toast.success("Ad has been added");
      navigate("/");
    } catch (error) {
      console.log("Error submitting ad:", error);
      toast.error("An error occurred while submitting the ad");
    }
  };

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

      <br />
      {/* <label>
        Image:
        <br />
        <input
          className="text-field"
          {...register("picture", {
            required: "L'image est requise",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
        />
        {errors.picture && (
          <p className="error error-message">{errors.picture.message}</p>
        )}
      </label> */}

      {/* Gestion dynamique des images */}
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
          {...register("category", { required: "La catégorie est requise" })}
        >
          <option value="">Choisissez une catégorie</option>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="error error-message">{errors.category.message}</p>
        )}
      </label>

      <br />
      <label>
        Tags :
        <br />
        {tags.map((tag) => (
          <Fragment key={tag.id}>
            <label>
              <input
                type="checkbox"
                value={tag.id}
                {...register("tags", { required: "Un tag est requis" })}
              />
              {tag.name}
            </label>
            <br />
          </Fragment>
        ))}
        {errors.tags && (
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
