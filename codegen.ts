import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.{tsx,ts}"],
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "graphql",
        fragmentMasking: false,
      },
      config: {
        skipTypename: true,
        addUnderscoreToArgsType: true,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  watch: true,
};

export default config;
