// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //useParams
// import { AdCardProps } from "../components/AdCard";

import { gql, useQuery } from "@apollo/client";

const GET_ADD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
      price
      location
      createdAt
      pictures {
        url
      }
    }
  }
`;

const AdDetailsPage = () => {
  // const { id } = useParams();
  const { id } = useParams<{ id?: string }>();
  const parsedId = parseInt(id || "0", 10);
  console.log("id", id, "parsedId", parsedId);

  const { loading, error, data } = useQuery(GET_ADD_BY_ID, {
    variables: { getAdByIdId: parsedId }, // Convertir l'ID en entier
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);

  const adDetails = data?.getAdById;

  // console.log("AllAd",adDetails);

  // const [adDetails, setAdDetails] = useState<AdCardProps>();
  // useEffect(() => {
  //   const fetchAdDetails = async () => {
  //     const result = await axios.get(`http://localhost:3000/ads/${id}`);
  //     console.log(result);
  //     setAdDetails(result.data);
  //   };
  //   fetchAdDetails();
  // }, [id]);
  //vérifier si !adDetails return loadin, sinon return le formulaire pré rempli
  return (
    <div>
      <h2 className="ad-details-title">{adDetails?.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img
            className="ad-details-image"
            src={adDetails.pictures?.[0]?.url}
          />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{adDetails?.price} €</div>
          <div className="ad-details-description">{adDetails?.description}</div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par <b>{adDetails?.owner}</b>{" "}
            {new Date(adDetails?.createdAt as string).toDateString()}.
          </div>
          <a
            href={`mailto:${adDetails?.owner}`}
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
        </div>
        {/* ici */}
        {/* <Link
          className="button"
          to={`http://localhost:5173/ad/edit/${adDetails?.id}`}
        >
          Editer l'annonce
        </Link> */}
      </section>
    </div>
  );
};

export default AdDetailsPage;
