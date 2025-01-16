import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateNewCategoryMutation } from "../generated/graphql-types";
import { GET_ALL_CATEGORIES_AND_USER_INFO } from "../graphql/queries";


type Inputs = {
  title: string;
};

const NewCategoryFormPage = () => {
  const [createNewCategory] = useCreateNewCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createNewCategory({ variables: { data: data }, refetchQueries:[GET_ALL_CATEGORIES_AND_USER_INFO ]});
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de la catégorie:
          <br />
          <input
            className="text-field"
            {...register("title", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewCategoryFormPage;
