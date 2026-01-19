/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetAuthor {\n  authors {\n    authorDescription\n    name\n    socials {\n      html\n    }\n  }\n}": typeof types.GetAuthorDocument,
    "query MyQuery {\n  experiences {\n    companyInfo {\n      html\n    }\n    companyLogo {\n      url\n    }\n    workdateFrom\n    workdateTo\n  }\n}": typeof types.MyQueryDocument,
    "query GetPosts {\n  posts {\n    content {\n      html\n    }\n    author {\n      name\n      createdAt\n    }\n    coverPhoto {\n      url\n    }\n  }\n}": typeof types.GetPostsDocument,
    "query GetProjects {\n  projects(orderBy: publishedAt_DESC) {\n    projectTitle\n    projectDescription {\n      html\n    }\n    projectIdea {\n      html\n    }\n    techStack\n    projectPhoto {\n      url\n    }\n    projectsPhotos {\n      url\n    }\n  }\n}": typeof types.GetProjectsDocument,
    "query GetTechnologies {\n  techstacks {\n    technologyDescription\n    technologyTitle\n  }\n}": typeof types.GetTechnologiesDocument,
};
const documents: Documents = {
    "query GetAuthor {\n  authors {\n    authorDescription\n    name\n    socials {\n      html\n    }\n  }\n}": types.GetAuthorDocument,
    "query MyQuery {\n  experiences {\n    companyInfo {\n      html\n    }\n    companyLogo {\n      url\n    }\n    workdateFrom\n    workdateTo\n  }\n}": types.MyQueryDocument,
    "query GetPosts {\n  posts {\n    content {\n      html\n    }\n    author {\n      name\n      createdAt\n    }\n    coverPhoto {\n      url\n    }\n  }\n}": types.GetPostsDocument,
    "query GetProjects {\n  projects(orderBy: publishedAt_DESC) {\n    projectTitle\n    projectDescription {\n      html\n    }\n    projectIdea {\n      html\n    }\n    techStack\n    projectPhoto {\n      url\n    }\n    projectsPhotos {\n      url\n    }\n  }\n}": types.GetProjectsDocument,
    "query GetTechnologies {\n  techstacks {\n    technologyDescription\n    technologyTitle\n  }\n}": types.GetTechnologiesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAuthor {\n  authors {\n    authorDescription\n    name\n    socials {\n      html\n    }\n  }\n}"): (typeof documents)["query GetAuthor {\n  authors {\n    authorDescription\n    name\n    socials {\n      html\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MyQuery {\n  experiences {\n    companyInfo {\n      html\n    }\n    companyLogo {\n      url\n    }\n    workdateFrom\n    workdateTo\n  }\n}"): (typeof documents)["query MyQuery {\n  experiences {\n    companyInfo {\n      html\n    }\n    companyLogo {\n      url\n    }\n    workdateFrom\n    workdateTo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPosts {\n  posts {\n    content {\n      html\n    }\n    author {\n      name\n      createdAt\n    }\n    coverPhoto {\n      url\n    }\n  }\n}"): (typeof documents)["query GetPosts {\n  posts {\n    content {\n      html\n    }\n    author {\n      name\n      createdAt\n    }\n    coverPhoto {\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProjects {\n  projects(orderBy: publishedAt_DESC) {\n    projectTitle\n    projectDescription {\n      html\n    }\n    projectIdea {\n      html\n    }\n    techStack\n    projectPhoto {\n      url\n    }\n    projectsPhotos {\n      url\n    }\n  }\n}"): (typeof documents)["query GetProjects {\n  projects(orderBy: publishedAt_DESC) {\n    projectTitle\n    projectDescription {\n      html\n    }\n    projectIdea {\n      html\n    }\n    techStack\n    projectPhoto {\n      url\n    }\n    projectsPhotos {\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTechnologies {\n  techstacks {\n    technologyDescription\n    technologyTitle\n  }\n}"): (typeof documents)["query GetTechnologies {\n  techstacks {\n    technologyDescription\n    technologyTitle\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;