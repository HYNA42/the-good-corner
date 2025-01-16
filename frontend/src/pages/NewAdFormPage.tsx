import {
  useCreateNewAddMutation,
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
    <CreateOrUpdateAdForm
      defaultValues={{
        id: 0, // ID par défaut
        title: "", // Titre vide
        description: "", // Description vide
        price: 0, // Prix par défaut
        location: "", // Emplacement vide
        createdAt: new Date().toISOString().slice(0, 10), // Date actuelle
        categoryId: 0, // Catégorie par défaut
        pictures: [], // Liste d'images vide
        tagIds: [], // Liste de tags vide
        user: {// utilisateur vide
          email: "",
          id: 0,
        },
      }}
      submitedToBackend={createNewAd}
    />
  );
};

export default NewAdFormPage;
