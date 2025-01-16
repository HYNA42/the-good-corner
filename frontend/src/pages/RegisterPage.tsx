import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

type LoginInputs = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log("register data", data);

    registerMutation({
      variables: { data: { email: data.email, password: data.password } },
      onCompleted: (result) => {
        console.log("register on pending : waiting confirmation code)", result);
        navigate("/confirm");
      },
      onError: (error) => {
        console.log("register error:", error);
      },
    });
  };

  return (
    <>
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email:
            <input
              defaultValue={"john.doe@gmail.com"}
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

          <label>
            Password:
            <input
              defaultValue={"password"}
              type="password"
              placeholder="password"
              {...register("password", { required: "Password is required" })}
              className="text-field"
              style={{ margin: "0 8px" }}
            />
          </label>
          {errors.password && (
            <p className="error error-message">{errors.password.message}</p>
          )}

          <button className="btn-submitAd" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
