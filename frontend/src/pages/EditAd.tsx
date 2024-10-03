import axios from "axios";
import { useEffect, useState } from "react";
import { category } from "../components/Header";
import { AdCardProps } from "../components/AdCard";
import { useNavigate, useParams } from "react-router-dom";

const EditAd = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([] as category[]);
  const [adDetails, setAdDetails] = useState<AdCardProps>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    const fetchAdDetails = async () => {
      try {
        const adDetailsResult = await axios.get(
          `http://localhost:3000/ads/${id}`
        );
        setAdDetails(adDetailsResult.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchAdDetails();
    fetchCategories();
  }, [id]);
  if (adDetails) {
    return (
      <form
        className="abc"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form as HTMLFormElement);

          const formJson = Object.fromEntries(formData.entries());
          try {
            axios.put(`http://localhost:3000/ads/${id}`, formJson);

            setTimeout(() => {
              navigate("/");
            }, 1000);
          } catch (err) {
            console.error("Error while trying to edit ad:", err);
          }
        }}
      >
        <label>
          Titre de l'annonce:
          <br />
          <input
            className="text-field"
            type="text"
            name="title"
            defaultValue={adDetails.title}
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            className="text-field"
            type="text"
            name="description"
            defaultValue={adDetails.description}
          />
        </label>
        <br />
        <label>
          Vendeur:
          <br />
          <input
            className="text-field"
            type="text"
            name="owner"
            defaultValue={adDetails.owner}
          />
        </label>
        <br />
        <label>
          Prix:
          <br />
          <input
            className="text-field"
            type="number"
            name="price"
            defaultValue={adDetails.price}
          />
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            className="text-field"
            type="text"
            name="picture"
            defaultValue={adDetails.picture}
          />
        </label>
        <br />
        <label>
          Date:
          <br />
          <input
            className="text-field"
            type="date"
            name="createdAt"
            defaultValue={new Date(adDetails.createdAt as string)
              .toISOString()
              .slice(0, 10)}
          />
        </label>
        <br />
        <select name="category" defaultValue={adDetails.category?.id || ""}>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <button className="button">Submit</button>
      </form>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default EditAd;
