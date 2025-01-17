import { useForm, SubmitHandler } from "react-hook-form";
// import { useLoginLazyQuery } from "../generated/graphql-types";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePassewordMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

type Inputs = {
  code: string;
  password: string;
};

const ChangePassword = () => {
  const { code } = useParams<string>();

  const navigate = useNavigate();
  const [change] = useChangePassewordMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  console.log("code", code);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Login data", data);

    change({
      variables: { code: data.code, password: data.password },
      onCompleted: (result) => {
        console.log("login success", result);
        toast.success("Password changed successful!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error("Reset code not valid");
        console.error("Error on change password:", error);
      },
    });
  };

  return (
    <>
      <div className="login-container change-password">
        <h2>Change password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="child">
            <label>
              Reset code :
              <input
                defaultValue={code}
                placeholder="code received in email"
                {...register("code", { required: "Code is required" })}
                className="text-field"
                style={{ margin: "0 0 0 35px" }}
              />
            </label>
            {errors.code && (
              <p className="error error-message">{errors.code.message}</p>
            )}
          </div>

          <div className="child">
            <label>
              New password :
              <input
                placeholder="new password"
                {...register("password", { required: "Password is required" })}
                className="text-field"
                style={{ margin: "0 8px" }}
              />
            </label>
            {errors.password && (
              <p className="error error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="child">
            <button className="btn-submitAd" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
