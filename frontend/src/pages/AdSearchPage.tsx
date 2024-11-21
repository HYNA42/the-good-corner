// import axios from "axios";
// import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";
import { useEffect } from "react";

const AdSearchPage = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const { loading, error, data } = useGetAllAdsQuery({
    variables: { title: keyword },
  });
  const ads = data?.getAllAds;
  useEffect(() => {
    if (!loading && !ads?.length) {
      //Réinitialiser de l'input de recherche
      const searchInputRef =
        document.querySelector<HTMLInputElement>(".main-search-field");
      if (searchInputRef) {
        searchInputRef.value = "";
        searchInputRef.focus();
      }
      navigate("/"); // Redirige vers la page d'accueil
    }
  }, [ads, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("allads from searchPage", ads);

  // const [ads, setAds] = useState<AdCardProps[]>([]);
  // useEffect(() => {
  //   const fetchAdsForKeyword = async () => {
  //     const result = await axios.get(
  //       `http://localhost:3000/ads?title=${keyword}`
  //     );
  //     console.log("result", result);
  //     setAds(result.data);
  //   };
  //   fetchAdsForKeyword();
  // }, [keyword]);

  return (
    <div>
      <h2>Search results for keyword: {keyword}</h2>
      <section className="recent-ads">
        {ads?.map((el) => (
          <div key={el.id}>
            <AdCard
              id={el.id}
              title={el.title}
              picture={el.pictures?.at(0)?.url}
              price={el.price}
              category={el.category}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdSearchPage;
