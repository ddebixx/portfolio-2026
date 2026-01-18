
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg6idcnc0tde01t3cvzvgg5l/master",
  documents: "queries/**/*.graphql",
  generates: {
    "types/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
