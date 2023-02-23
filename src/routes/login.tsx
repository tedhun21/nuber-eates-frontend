import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import { graphql } from "../gql/gql";
import { LoginInput, LoginMutation, LoginMutationVariables } from "../gql/graphql";

const LOGIN_MUTATION = graphql(`
  mutation Login($loginInput: LoginInput!) {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok) {
      console.log(token);
    } else {
      if (error) {
      }
    }
  };
  const [loginMutation, { data:loginMutationResult }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, { onCompleted });
  const onSubmit = ({ email, password }: ILoginForm) => {
    loginMutation({
      variables: { loginInput: { email, password } },
    });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-lg rounded-lg bg-white pt-10 pb-7 text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-5 px-5">
          <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email" className="input mb-3" />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <input {...register("password", { required: "Password is required", minLength: 10 })} type="password" placeholder="Password" className="input" />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more 10 chars" />}
          <button className="btn mt-3">Log In</button>
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
        </form>
      </div>
    </div>
  );
}
