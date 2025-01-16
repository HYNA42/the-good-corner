import {
  useDeleteAdByIdMutation,
  useGetAllAdsQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";
import AdCard from "./AdCard";

const RecentAds = () => {

  const { loading, error, data } = useGetAllAdsQuery();

  const [deleteAdById] = useDeleteAdByIdMutation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("recents ads ==>", data?.getAllAds);

  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {data.getAllAds?.map((el) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                pictures={el.pictures?.map((pic) => pic.url)}
                price={el.price}
                category={el.category}
              />
              <button
                className="button btn-delete"
                onClick={async () => {
                  console.log("deleting ad with", el.id);
                  if (el.id) {
                    await deleteAdById({
                      variables: { deleteAdId: el.id },
                      refetchQueries: [GET_ALL_ADS],
                      awaitRefetchQueries: true,
                    });
                  }
                }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default RecentAds;
