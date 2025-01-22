import { toast } from "react-toastify";
import {
  useDeleteAdByIdMutation,
  useGetAllAdsQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";
// import { GET_ALL_ADS } from "../graphql/queries";
import AdCard from "./AdCard";
// import { useQuery } from "@apollo/client";

const RecentAds = () => {
  // const { loading, error, data } = useQuery(GET_ALL_ADS);
  const { loading, error, data } = useGetAllAdsQuery();

  const [deleteAdById] = useDeleteAdByIdMutation({refetchQueries:[GET_ALL_ADS]});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("recents ads ==>", data?.getAllAds);

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
                        variables: { deleteAdId: el.id }, onCompleted: () => {
                          toast.success('Ad has been deleted')
                        },
                        onError: (error) => {
                          const err = error as Error 
                          toast.error(err.message)
                        }
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
