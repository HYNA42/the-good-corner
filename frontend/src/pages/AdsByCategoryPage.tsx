import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../components/AdCard";

const AdsByCategoryPage = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchAdsForCategory = async () => {
      const result = await axios.get(
        `http://localhost:3000/ads/category/${keyword}`
      );
      console.log("result", result);
      setAds(result.data);
    };
    fetchAdsForCategory();
  }, [keyword]);
  return (
    <div>
      <h2>Search results for category: {keyword}</h2>
      <section className="recent-ads">
        {ads.map((el) => (
          <div key={el.title}>
            <AdCard
              id={el.id}
              title={el.title}
              picture={el.picture}
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
