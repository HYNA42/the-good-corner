import {
  useCreateNewAddMutation,
  // useGetAllTagAndCategoryQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";

const NewAdFormPage = () => {
  const [
    createNewAd,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useCreateNewAddMutation({ refetchQueries: [GET_ALL_ADS] });

  console.log("mutationData : ", mutationData);

  // Handling mutation states
  if (mutationLoading) return <p>Creating ad...</p>;
  if (mutationError) return <p>Error creating ad: {mutationError.message}</p>;

  return (
    <CreateOrUpdateAdForm defaultValues={{}} submitedToBackend={createNewAd} />
  );
};

export default NewAdFormPage;
