import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginLazyQuery } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginLazyQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log("Login data", data);

    login({
      variables: { data: { email: data.email, password: data.password } },
      onCompleted: (result) => {
        console.log("login success", result);
        // localStorage.setItem('token', result.login)
        navigate("/");
      },
      onError: (error) => {
        console.log("Login error:", error);
      },
    });
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email:
            <input
              defaultValue={"hyna@duck.com"}
              type="email"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
              className="text-field"
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
            />
          </label>
          {errors.password && (
            <p className="error error-message">{errors.password.message}</p>
          )}

          <button className="btn-submitAd" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
