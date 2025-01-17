import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  pictures?: Maybe<Array<Picture>>;
  price: Scalars['Float']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type AdInput = {
  categoryId: Scalars['Int']['input'];
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  pictures?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type CategoryInput = {
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePasseword: Scalars['String']['output'];
  confirmEmail: Scalars['String']['output'];
  createNewAd: Ad;
  createNewCategory: Category;
  createNewTag: Tag;
  deleteAd: Scalars['String']['output'];
  deleteCategory: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  forgotPassword: UserIsExist;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  register: Scalars['String']['output'];
  updateAd: Ad;
  updateCategory: Scalars['String']['output'];
  updateTag: Scalars['String']['output'];
};


export type MutationChangePassewordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationConfirmEmailArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateNewAdArgs = {
  data: AdInput;
};


export type MutationCreateNewCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateNewTagArgs = {
  data: TagInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['Float']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
};

export type Picture = {
  __typename?: 'Picture';
  ad: Ad;
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAllAds: Array<Ad>;
  getAllCategory: Array<Category>;
  getAllTag: Array<Tag>;
  getCategoryById: Category;
  getTagById: Tag;
  getUserInfo: UserInfo;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetAllAdsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  ads?: Maybe<Array<Ad>>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TagInput = {
  adIDs?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
};

export type UpdateAdInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  pictures?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  ads?: Maybe<Array<Ad>>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']['output']>;
  isLoggedIn: Scalars['Boolean']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserIsExist = {
  __typename?: 'UserIsExist';
  email?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTimeISO']['output']>;
  isExist: Scalars['Boolean']['output'];
  resetCode?: Maybe<Scalars['String']['output']>;
};

export type CreateNewAddMutationVariables = Exact<{
  data: AdInput;
}>;


export type CreateNewAddMutation = { __typename?: 'Mutation', createNewAd: { __typename?: 'Ad', id: number } };

export type DeleteAdByIdMutationVariables = Exact<{
  deleteAdId: Scalars['Float']['input'];
}>;


export type DeleteAdByIdMutation = { __typename?: 'Mutation', deleteAd: string };

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: { __typename?: 'Ad', id: number, title: string, description: string, price: number, location: string, createdAt: any, user?: { __typename?: 'User', id: number, email: string } | null, category?: { __typename?: 'Category', id: number, title: string } | null, pictures?: Array<{ __typename?: 'Picture', url: string }> | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ConfirmEmailMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: string };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'UserIsExist', isExist: boolean } };

export type ChangePassewordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ChangePassewordMutation = { __typename?: 'Mutation', changePasseword: string };

export type GetAllAdsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, price: number, location: string, createdAt: any, user?: { __typename?: 'User', id: number, email: string } | null, category?: { __typename?: 'Category', id: number, title: string } | null, pictures?: Array<{ __typename?: 'Picture', id: number, url: string }> | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, price: number, location: string, createdAt: any, user?: { __typename?: 'User', id: number, email: string } | null, pictures?: Array<{ __typename?: 'Picture', id: number, url: string }> | null, category?: { __typename?: 'Category', id: number, title: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type GetAllTagAndCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagAndCategoryQuery = { __typename?: 'Query', getAllTag: Array<{ __typename?: 'Tag', id: number, name: string }>, getAllCategory: Array<{ __typename?: 'Category', id: number, title: string }> };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo: { __typename?: 'UserInfo', isLoggedIn: boolean, email?: string | null } };

export type GetAllCategoryAndUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoryAndUserInfoQuery = { __typename?: 'Query', getAllCategory: Array<{ __typename?: 'Category', id: number, title: string }>, getUserInfo: { __typename?: 'UserInfo', isLoggedIn: boolean, email?: string | null } };


export const CreateNewAddDocument = gql`
    mutation createNewAdd($data: AdInput!) {
  createNewAd(data: $data) {
    id
  }
}
    `;
export type CreateNewAddMutationFn = Apollo.MutationFunction<CreateNewAddMutation, CreateNewAddMutationVariables>;

/**
 * __useCreateNewAddMutation__
 *
 * To run a mutation, you first call `useCreateNewAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewAddMutation, { data, loading, error }] = useCreateNewAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewAddMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewAddMutation, CreateNewAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewAddMutation, CreateNewAddMutationVariables>(CreateNewAddDocument, options);
      }
export type CreateNewAddMutationHookResult = ReturnType<typeof useCreateNewAddMutation>;
export type CreateNewAddMutationResult = Apollo.MutationResult<CreateNewAddMutation>;
export type CreateNewAddMutationOptions = Apollo.BaseMutationOptions<CreateNewAddMutation, CreateNewAddMutationVariables>;
export const DeleteAdByIdDocument = gql`
    mutation DeleteAdById($deleteAdId: Float!) {
  deleteAd(id: $deleteAdId)
}
    `;
export type DeleteAdByIdMutationFn = Apollo.MutationFunction<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;

/**
 * __useDeleteAdByIdMutation__
 *
 * To run a mutation, you first call `useDeleteAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdByIdMutation, { data, loading, error }] = useDeleteAdByIdMutation({
 *   variables: {
 *      deleteAdId: // value for 'deleteAdId'
 *   },
 * });
 */
export function useDeleteAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>(DeleteAdByIdDocument, options);
      }
export type DeleteAdByIdMutationHookResult = ReturnType<typeof useDeleteAdByIdMutation>;
export type DeleteAdByIdMutationResult = Apollo.MutationResult<DeleteAdByIdMutation>;
export type DeleteAdByIdMutationOptions = Apollo.BaseMutationOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;
export const UpdateAdDocument = gql`
    mutation UpdateAd($data: UpdateAdInput!) {
  updateAd(data: $data) {
    id
    title
    description
    user {
      id
      email
    }
    price
    location
    createdAt
    category {
      id
      title
    }
    pictures {
      url
    }
    tags {
      id
      name
    }
  }
}
    `;
export type UpdateAdMutationFn = Apollo.MutationFunction<UpdateAdMutation, UpdateAdMutationVariables>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdMutation, UpdateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UpdateAdDocument, options);
      }
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<UpdateAdMutation, UpdateAdMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($code: String!) {
  confirmEmail(code: $code)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    isExist
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ChangePassewordDocument = gql`
    mutation ChangePasseword($password: String!, $code: String!) {
  changePasseword(password: $password, code: $code)
}
    `;
export type ChangePassewordMutationFn = Apollo.MutationFunction<ChangePassewordMutation, ChangePassewordMutationVariables>;

/**
 * __useChangePassewordMutation__
 *
 * To run a mutation, you first call `useChangePassewordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePassewordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePassewordMutation, { data, loading, error }] = useChangePassewordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useChangePassewordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePassewordMutation, ChangePassewordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePassewordMutation, ChangePassewordMutationVariables>(ChangePassewordDocument, options);
      }
export type ChangePassewordMutationHookResult = ReturnType<typeof useChangePassewordMutation>;
export type ChangePassewordMutationResult = Apollo.MutationResult<ChangePassewordMutation>;
export type ChangePassewordMutationOptions = Apollo.BaseMutationOptions<ChangePassewordMutation, ChangePassewordMutationVariables>;
export const GetAllAdsDocument = gql`
    query GetAllAds($title: String, $category: String) {
  getAllAds(title: $title, category: $category) {
    id
    title
    description
    user {
      id
      email
    }
    price
    location
    createdAt
    category {
      id
      title
    }
    pictures {
      id
      url
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *      title: // value for 'title'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const GetAdByIdDocument = gql`
    query GetAdById($getAdByIdId: Float!) {
  getAdById(id: $getAdByIdId) {
    id
    title
    description
    user {
      id
      email
    }
    price
    pictures {
      id
      url
    }
    location
    createdAt
    category {
      id
      title
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const GetAllTagAndCategoryDocument = gql`
    query GetAllTagAndCategory {
  getAllTag {
    id
    name
  }
  getAllCategory {
    id
    title
  }
}
    `;

/**
 * __useGetAllTagAndCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllTagAndCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagAndCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagAndCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagAndCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>(GetAllTagAndCategoryDocument, options);
      }
export function useGetAllTagAndCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>(GetAllTagAndCategoryDocument, options);
        }
export function useGetAllTagAndCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>(GetAllTagAndCategoryDocument, options);
        }
export type GetAllTagAndCategoryQueryHookResult = ReturnType<typeof useGetAllTagAndCategoryQuery>;
export type GetAllTagAndCategoryLazyQueryHookResult = ReturnType<typeof useGetAllTagAndCategoryLazyQuery>;
export type GetAllTagAndCategorySuspenseQueryHookResult = ReturnType<typeof useGetAllTagAndCategorySuspenseQuery>;
export type GetAllTagAndCategoryQueryResult = Apollo.QueryResult<GetAllTagAndCategoryQuery, GetAllTagAndCategoryQueryVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  getUserInfo {
    isLoggedIn
    email
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export function useGetUserInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoSuspenseQueryHookResult = ReturnType<typeof useGetUserInfoSuspenseQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetAllCategoryAndUserInfoDocument = gql`
    query GetAllCategoryAndUserInfo {
  getAllCategory {
    id
    title
  }
  getUserInfo {
    isLoggedIn
    email
  }
}
    `;

/**
 * __useGetAllCategoryAndUserInfoQuery__
 *
 * To run a query within a React component, call `useGetAllCategoryAndUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoryAndUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoryAndUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoryAndUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>(GetAllCategoryAndUserInfoDocument, options);
      }
export function useGetAllCategoryAndUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>(GetAllCategoryAndUserInfoDocument, options);
        }
export function useGetAllCategoryAndUserInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>(GetAllCategoryAndUserInfoDocument, options);
        }
export type GetAllCategoryAndUserInfoQueryHookResult = ReturnType<typeof useGetAllCategoryAndUserInfoQuery>;
export type GetAllCategoryAndUserInfoLazyQueryHookResult = ReturnType<typeof useGetAllCategoryAndUserInfoLazyQuery>;
export type GetAllCategoryAndUserInfoSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoryAndUserInfoSuspenseQuery>;
export type GetAllCategoryAndUserInfoQueryResult = Apollo.QueryResult<GetAllCategoryAndUserInfoQuery, GetAllCategoryAndUserInfoQueryVariables>;