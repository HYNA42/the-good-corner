import { useGetAllAdsQuery } from "../generated/graphql-types";
// import { GET_ALL_ADS } from "../graphql/queries";
import AdCard from "./AdCard";
// import { useQuery } from "@apollo/client";

const RecentAds = () => {
  // const { loading, error, data } = useQuery(GET_ALL_ADS);
  const { loading, error, data } = useGetAllAdsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("getAllAds",data?.getAllAds);

  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        {/* <p>Total: {total} €</p> */}
        <section className="recent-ads">
          {data.getAllAds?.map((el) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                picture={el.pictures?.[0]?.url}
                price={el.price}
                category={el.category}
              />
              {/* <button
                onClick={() => {
                  setTotal(total + el.price);
                }}
              >
                Add to total
              </button> */}
              {/* <button
                onClick={() => {
                  axios.delete(`http://localhost:3000/ads/${el.id}`);
                }}
              >
                Delete
              </button> */}

              {/* <Link
                className="button"
                to={`http://localhost:5173/ad/edit/${ads?.id}`}
              >
                Editer l'annonce
              </Link> */}
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default RecentAds;
