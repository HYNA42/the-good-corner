import { Link, useNavigate, useParams } from "react-router-dom"; //useParams

import {
  useDeleteAdByIdMutation,
  useGetAdByIdQuery,
} from "../generated/graphql-types";
import Carousel from "../components/Carousel";
import { GET_ALL_ADS } from "../graphql/queries";
import { toast } from "react-toastify";

const AdDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteAdById] = useDeleteAdByIdMutation({
    refetchQueries: [GET_ALL_ADS],
  });

  const { loading, error, data } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const adDetails = data?.getAdById;

  console.log("adDetails ===> ", adDetails);
  if (adDetails) {
    const images = adDetails.pictures?.map((picture) => picture.url) || [];
    return (
      <div>
        <h2 className="ad-details-title">{adDetails?.title}</h2>
        <section className="ad-details">
          <div className="ad-details-image-container">
            <Carousel images={images} />
          </div>
          <div className="ad-details-info">
            <div className="ad-details-price">{adDetails?.price} €</div>
            <hr className="separator" />
            <div className="tags">
              {adDetails.tags?.map((tag) => (
                <span key={tag.id} className="tag-badge">
                  {tag.name}
                </span>
              ))}
            </div>

            <hr className="separator" />
            <div className="ad-details-description">
              {adDetails?.description}
            </div>
            <hr className="separator" />
            <div className="ad-details-user">
              Annoncée publiée par <b>{adDetails?.user?.email}</b>{" "}
              {new Date(adDetails?.createdAt as string).toDateString()}.
            </div>
            <a
              href={`mailto:${adDetails?.user}`}
              className="button button-primary link-button"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                stroke="currentcolor"
                strokeWidth="2.5"
                fill="none"
              >
                <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
              </svg>
              Envoyer un email
            </a>
            <button
              className="button btn-delete"
              onClick={async () => {
                console.log("delete ad with id", id);
                if (id) {
                  await deleteAdById({
                    variables: { deleteAdId: parseInt(id) },

                    onCompleted: async () => {
                      toast.success("Ad has been delted");

                      navigate("/");
                    },
                    onError: (error) => {
                      const err = error as Error;
                      toast.error(err.message);
                    },
                  });
                }
              }}
            >
              Supprimer l'annonce
            </button>
          </div>
          <Link className="button" to={`/ad/update/${id}`}>
            Editer l'annonce
          </Link>
        </section>
      </div>
    );
  }
};

export default AdDetailsPage;
