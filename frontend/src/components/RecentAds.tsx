import AdCard from "./AdCard";
import { useQuery, gql } from "@apollo/client";
// { AdCardProps }

const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      location
      createdAt
      category {
        id
        title
      }
      tags {
        id
        name
      }
      pictures {
        url
      }
    }
  }
`;

const RecentAds = () => {
  const { loading, error, data } = useQuery(GET_ALL_ADS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return (
    <>
      <h2>Annonces récentes</h2>
      {/* <p>Total: {total} €</p> */}
      <section className="recent-ads">
        {data.getAllAds.map((el: any) => (
          <div key={el.id}>
            <AdCard
              id={el.id}
              title={el.title}
              picture={el.pictures[0]?.url}
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
};

export default RecentAds;
