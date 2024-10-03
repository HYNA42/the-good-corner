import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";

const RecentAds = () => {
  const [ads, setAds] = useState([] as AdCardProps[]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/ads");
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total: {total} €</p>
      <section className="recent-ads">
        {ads.map((el) => (
          <div key={el.id}>
            <AdCard
              id={el.id}
              title={el.title}
              picture={el.picture}
              price={el.price}
              category={el.category}
            />
            <button
              onClick={() => {
                setTotal(total + el.price);
              }}
            >
              Add to total
            </button>
            <button
              onClick={() => {
                axios.delete(`http://localhost:3000/ads/${el.id}`);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;