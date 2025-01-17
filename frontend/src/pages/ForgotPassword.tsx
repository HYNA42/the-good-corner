import { useForm, SubmitHandler } from "react-hook-form";
// import { useLoginLazyQuery } from "../generated/graphql-types";
import { useForgotPasswordMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

type LoginInputs = {
  email: string;
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [forgot] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log("Login data", data);

    forgot({
      variables: { email: data.email },
      onCompleted: (result) => {
        if (result.forgotPassword.isExist) {
          console.log("reset code success", result);
          navigate("/changePassword");
        }
      },
      onError: (error) => {
        toast.error("User not found");
        console.error("User not found :", error);
      },
    });
  };

  return (
    <>
      <div className="login-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email:
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
              className="text-field"
              style={{ margin: "0 8px" }}
            />
          </label>
          {errors.email && (
            <p className="error error-message">{errors.email.message}</p>
          )}

          <button className="btn-submitAd" type="submit">
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
