
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.HYGRAPH_ENDPOINT,
  documents: "queries/**/*.graphql",
  generates: {
    "types/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
