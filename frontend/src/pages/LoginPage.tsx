import { useForm, SubmitHandler } from "react-hook-form";
// import { useLoginLazyQuery } from "../generated/graphql-types";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";
import { toast } from "react-toastify";
import { useState } from "react";
// import { toast } from "react-toastify";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });

  const [resetPassword, setResetPassword] = useState(false);

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
        toast.success("Bienvenue !");
        navigate("/");
      },
      onError: (error) => {
        setResetPassword(true);
        console.error("Login error:", error);
        toast.error("Invalide login info");
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
            Login
          </button>
        </form>
        {resetPassword && <Link to="/forgotPassword">Reset password</Link>}
      </div>
    </>
  );
};

export default LoginPage;
