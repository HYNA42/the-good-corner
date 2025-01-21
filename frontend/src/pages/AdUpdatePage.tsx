import { useParams } from "react-router-dom";
import {
  useGetAdByIdQuery,
  useUpdateAdMutation,
} from "../generated/graphql-types";

import { GET_ALL_ADS } from "../graphql/queries";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";

const AdUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const adId = parseInt(id as string, 10);

  // Query to get the existing Ad details
  const {
    data: adData,
  } = useGetAdByIdQuery({
    variables: { getAdByIdId: adId },
  });

  // Mutation to update the ad
  const [updateAdMutation] =
    useUpdateAdMutation({
      refetchQueries: [GET_ALL_ADS],
    });

  const adDetails = adData?.getAdById;
  console.log("AdDetails ", adDetails);

  // if (adLoading) return <p>Loading data...</p>;
  // if (adError) return <p>Error fetching data: {adError.message}</p>;

  // if (updateLoading) return <p>Loading data...</p>;
  // if (updateError) return <p>Error fetching data: {updateError.message}</p>;

  return (
    <>
      <CreateOrUpdateAdForm
        action="Modifier l'annonce"
        defaultValues={{
          id: adId,
          title: adDetails?.title || "",
          description: adDetails?.description || "",
          user: adDetails?.user || "",
          price: adDetails?.price || 0,
          location: adDetails?.location || "",
          createdAt: adDetails?.createdAt?.slice(0, 10) || "",
          categoryId: adDetails?.category?.id || 0,
          pictures: adDetails?.pictures?.map((pic) => ({ url: pic.url })) || [],
          tagIds: adDetails?.tags?.map((tag) => tag.id) || [],
        }}
        submitedToBackend={updateAdMutation}
      />
    </>
  );
};

export default AdUpdatePage;
