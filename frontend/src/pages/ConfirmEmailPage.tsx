import { useNavigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../generated/graphql-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
// 
const ConfirmEmailPage = () => {
  type Inputs = {
    code: string;
  };
  const { code } = useParams<Inputs>();
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
  console.log("code = ", code);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      console.log("register data", data)

      confirmEmail({
        variables: {  code: data.code  },
        onCompleted: () => {
          // console.log("email confirmed");
          navigate("/login");
          toast.success("Email was confirmed, please login");
        },
        onError: () => {
            console.log("register error:");
            toast.error("Error");
        },
      });
    };



  return (
    <>
      <div className="login-container">
        <h2>Email confirmation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Code :
            <input
              defaultValue={code}
              placeholder="confirmation code received"
              {...register("code", { required: "verify code is required" })}
              className="text-field"
              style={{ margin: "0 8px" }}
            />
          </label>
          {errors.code && (
            <p className="error error-message">{errors.code.message}</p>
          )}

          <button className="btn-submitAd" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </>
  );
};

export default ConfirmEmailPage;
