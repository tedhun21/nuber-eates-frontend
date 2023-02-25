import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "../components/button";
import FormError from "../components/form-error";
import { graphql } from "../gql/gql";
import { LogInMutation, LogInMutationVariables } from "../gql/graphql";
import nuberLogo from "../images/logo.svg";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

const LOGIN_MUTATION = graphql(`
  mutation LogIn($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`);

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>();
  const onCompleted = (data: LogInMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && token) {
      console.log(token);
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
      navigate("/home");
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<LogInMutation, LogInMutationVariables>(LOGIN_MUTATION, { onCompleted });
  const onSubmit = ({ email, password }: ILoginForm) => {
    if (!loading) {
      loginMutation({
        variables: { loginInput: { email, password } },
      });
    }
  };
  return (
    <div className="mt-10 flex h-screen flex-col items-center lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <img src={nuberLogo} className="mb-5 w-52" />
        <h4 className="w-full text-3xl font-medium">Welcome Back</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-3 grid w-full gap-3">
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          {errors.email?.type === "pattern" && <FormError errorMessage={"Please enter a valid email"} />}
          <input {...register("password", { required: "Password is required" })} required type="password" placeholder="Password" className="input" />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more 10 chars" />}
          <Button canClick={isValid} loading={loading} actionText={"Log In"} />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
