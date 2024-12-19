import { useSearchParams } from "react-router-dom";
import { useGetAllAdsQuery } from "../generated/graphql-types";
import AdCard from "../components/AdCard";

const AdsByTitlePage = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  const { data, loading, error } = useGetAllAdsQuery({
    variables: {
      title: title,
    },
  });
  console.log("adsBy title ==>", data?.getAllAds);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data?.getAllAds)
    return (
      <div>
      <h2>Search results for category: {title}</h2>
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

export default AdsByTitlePage;
