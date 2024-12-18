// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import AdCard, { AdCardProps } from "../components/AdCard";
import AdCard from "../components/AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const AdsByCategoryPage = () => {
  const { keyword } = useParams();
  // const [ads, setAds] = useState<AdCardProps[]>([]);
  // useEffect(() => {
  //   const fetchAdsForCategory = async () => {
  //     const result = await axios.get(
  //       `http://localhost:3000/ads/category/${keyword}`
  //     );
  //     console.log("result", result);
  //     setAds(result.data);
  //   };
  //   fetchAdsForCategory();
  // }, [keyword]);

  const { data, loading, error } = useGetAllAdsQuery({
    variables: {
      category:keyword
    },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("ads ====>", data?.getAllAds);
  if(data?.getAllAds)
  return (
    <div>
      <h2>Search results for category: {keyword}</h2>
      <section className="recent-ads">
        {data.getAllAds.map((el) => (
          <div key={el.title}>
            <AdCard
              id={el.id}
              title={el.title}
              pictures={el.pictures?.map(pic=>pic.url)}
              price={el.price}
              category={el.category}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdsByCategoryPage;
