import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "../components/button";
import FormError from "../components/form-error";
import { graphql } from "../gql/gql";
import { UserRole } from "../gql/graphql";
import nuberLogo from "../images/logo.svg";

const CREATE_ACCOUNT_MUTATION = graphql(`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`);

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({ defaultValues: { role: UserRole.Client } });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);
  const onSubmit = (data: ICreateAccountForm) => {
    console.log(watch());
  };
  return (
    <div className="mt-10 flex h-screen flex-col items-center lg:mt-28">
      <Helmet>
        <title>Nuber | Create Account</title>
      </Helmet>
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <img src={nuberLogo} className="mb-5 w-52" />
        <h4 className="w-full text-3xl font-medium">Let's get started</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-3 grid w-full gap-3">
          <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email" className="input" />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <input {...register("password", { required: "Password is required", minLength: 10 })} type="password" placeholder="Password" className="input" />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more 10 chars" />}
          <select {...register("role", { required: true })} required className="input">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={false} actionText={"Create Account"} />
        </form>
        <div>
          Already have an account{" "}
          <Link to="/login" className="text-lime-600">
            Log In Now
          </Link>
        </div>
      </div>
    </div>
  );
}
