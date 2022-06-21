import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Annotations = {
  __typename?: 'Annotations';
  bold: Scalars['Boolean'];
  code: Scalars['Boolean'];
  color: Scalars['String'];
  italic: Scalars['Boolean'];
  strikethrough: Scalars['Boolean'];
  underline: Scalars['Boolean'];
};

export type ContentBlock = {
  __typename?: 'ContentBlock';
  _id: Scalars['String'];
  color: Scalars['String'];
  creationDate: Scalars['DateTime'];
  heading_1: HeadingOne;
  paragraph: Paragraph;
  type: Scalars['String'];
};

export type DemoQuest = {
  __typename?: 'DemoQuest';
  _id: Scalars['String'];
  creationDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type HeadingOne = {
  __typename?: 'HeadingOne';
  color: Scalars['String'];
  rich_text: Array<RichText>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDemoQuest: Scalars['String'];
  createQuest: Scalars['String'];
  createUser: User;
  redactDemoQuest: Scalars['Boolean'];
  redactQuest: Scalars['Boolean'];
};


export type MutationCreateQuestArgs = {
  createQuestArgs: CreateQuestArgs;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRedactDemoQuestArgs = {
  _id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRedactQuestArgs = {
  redactQuestArgs: RedactQuestArgs;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['String'];
  creationDate: Scalars['DateTime'];
  description: Scalars['String'];
  notifications: Array<Notification>;
  title: Scalars['String'];
};

export type Paragraph = {
  __typename?: 'Paragraph';
  color: Scalars['String'];
  rich_text: Array<RichText>;
};

export type Query = {
  __typename?: 'Query';
  demoQuest: DemoQuest;
  demoQuests: Array<DemoQuest>;
  quest: DemoQuest;
  quests: Array<DemoQuest>;
  users: Array<User>;
};


export type QueryDemoQuestArgs = {
  _id: Scalars['String'];
};


export type QueryQuestArgs = {
  _id: Scalars['String'];
};

export type Quest = {
  __typename?: 'Quest';
  _id: Scalars['String'];
  content?: Maybe<Array<ContentBlock>>;
  contentIds?: Maybe<Array<Scalars['String']>>;
  created_by: Scalars['String'];
  creationDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type RichText = {
  __typename?: 'RichText';
  annotations: Annotations;
  link: Scalars['String'];
  text: Scalars['String'];
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  account_type: Scalars['String'];
  achievements: Array<Scalars['String']>;
  avatar_link: Scalars['String'];
  balance: Scalars['Float'];
  biography: Scalars['String'];
  categories: Array<Scalars['String']>;
  creationDate: Scalars['DateTime'];
  email: Scalars['String'];
  experience: Scalars['Float'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  level: Scalars['Float'];
  major: Scalars['String'];
  notifications: Array<Notification>;
  phone_number: Scalars['Float'];
  quests_attempted: Array<Quest>;
  quests_posted: Array<Quest>;
  subcategories: Array<Scalars['String']>;
  username: Scalars['String'];
};

export type CreateQuestArgs = {
  _id: Scalars['String'];
  blockIds: Array<Scalars['String']>;
};

export type CreateUserInput = {
  user_secret: Scalars['String'];
  username: Scalars['String'];
};

export type RedactQuestArgs = {
  _id: Scalars['String'];
  blockIds: Array<Scalars['String']>;
};

export type DemoQuestFragment = { __typename?: 'DemoQuest', _id: string, title: string };

export type CreateDemoQuestMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateDemoQuestMutation = { __typename?: 'Mutation', createDemoQuest: string };

export type CreateQuestMutationVariables = Exact<{
  createQuestArgs: CreateQuestArgs;
}>;


export type CreateQuestMutation = { __typename?: 'Mutation', createQuest: string };

export type RedactDemoQuestMutationVariables = Exact<{
  _id: Scalars['String'];
  title: Scalars['String'];
}>;


export type RedactDemoQuestMutation = { __typename?: 'Mutation', redactDemoQuest: boolean };

export type DemoQuestQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DemoQuestQuery = { __typename?: 'Query', demoQuest: { __typename?: 'DemoQuest', _id: string, title: string } };

export type DemoQuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type DemoQuestsQuery = { __typename?: 'Query', demoQuests: Array<{ __typename?: 'DemoQuest', _id: string, title: string }> };

export const DemoQuestFragmentDoc = gql`
    fragment DemoQuest on DemoQuest {
  _id
  title
}
    `;
export const CreateDemoQuestDocument = gql`
    mutation createDemoQuest {
  createDemoQuest
}
    `;

export function useCreateDemoQuestMutation() {
  return Urql.useMutation<CreateDemoQuestMutation, CreateDemoQuestMutationVariables>(CreateDemoQuestDocument);
};
export const CreateQuestDocument = gql`
    mutation createQuest($createQuestArgs: createQuestArgs!) {
  createQuest(createQuestArgs: $createQuestArgs)
}
    `;

export function useCreateQuestMutation() {
  return Urql.useMutation<CreateQuestMutation, CreateQuestMutationVariables>(CreateQuestDocument);
};
export const RedactDemoQuestDocument = gql`
    mutation RedactDemoQuest($_id: String!, $title: String!) {
  redactDemoQuest(_id: $_id, title: $title)
}
    `;

export function useRedactDemoQuestMutation() {
  return Urql.useMutation<RedactDemoQuestMutation, RedactDemoQuestMutationVariables>(RedactDemoQuestDocument);
};
export const DemoQuestDocument = gql`
    query DemoQuest($_id: String!) {
  demoQuest(_id: $_id) {
    ...DemoQuest
  }
}
    ${DemoQuestFragmentDoc}`;

export function useDemoQuestQuery(options: Omit<Urql.UseQueryArgs<DemoQuestQueryVariables>, 'query'>) {
  return Urql.useQuery<DemoQuestQuery>({ query: DemoQuestDocument, ...options });
};
export const DemoQuestsDocument = gql`
    query DemoQuests {
  demoQuests {
    _id
    title
  }
}
    `;

export function useDemoQuestsQuery(options?: Omit<Urql.UseQueryArgs<DemoQuestsQueryVariables>, 'query'>) {
  return Urql.useQuery<DemoQuestsQuery>({ query: DemoQuestsDocument, ...options });
};