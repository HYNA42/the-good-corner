// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const AdSearchPage = () => {
  const { keyword } = useParams();

  const { loading, error, data } = useGetAllAdsQuery({
    variables: { title: keyword },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const ads = data?.getAllAds;
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
