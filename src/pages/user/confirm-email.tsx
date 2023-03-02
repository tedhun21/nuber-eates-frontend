import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { graphql } from "../../gql";
import { VerifyEmailMutation, VerifyEmailMutationVariables } from "../../gql/graphql";

const VERIFY_EMAIL_MUTATION = graphql(`
  mutation VerifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`);

export const ConfirmEmail = () => {
  const [verifyEmailMutation, { data, loading: verifyingEmail, error }] = useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VERIFY_EMAIL_MUTATION);
  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    /* verifyEmailMutation({
      variables: {
        verifyEmailInput: {
          code,
        },
      },
    }); */
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="mb-1 text-lg font-medium">Confirming email...</h2>
      <h4 className="text-sm text-gray-700">Please wait, don't close this page...</h4>
    </div>
  );
};
