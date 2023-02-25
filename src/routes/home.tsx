import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const ME_QUERY = graphql(`
  query Me {
    me {
      id
      email
      role
      verified
    }
  }
`);

export default function Home() {
  const { data, loading, error } = useQuery(ME_QUERY);
  console.log(data);
  if (!data || loading || error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <h2>Home</h2>
      <h1>{data.me.role}</h1>
    </div>
  );
}
