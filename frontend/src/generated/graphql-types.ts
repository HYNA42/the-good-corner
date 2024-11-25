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
  owner: Scalars['String']['output'];
  pictures?: Maybe<Array<Picture>>;
  price: Scalars['Float']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  categoryId: Scalars['Int']['input'];
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picturesUrls?: InputMaybe<Array<Scalars['String']['input']>>;
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
  createNewAd: Ad;
  createNewCategory: Category;
  createNewTag: Tag;
  deleteAd: Scalars['String']['output'];
  deleteCategory: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  updateAd: Ad;
  updateCategory: Scalars['String']['output'];
  updateTag: Scalars['String']['output'];
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
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetAllAdsArgs = {
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
  owner?: InputMaybe<Scalars['String']['input']>;
  picturesUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, category?: { __typename?: 'Category', id: number, title: string } | null, pictures?: Array<{ __typename?: 'Picture', url: string }> | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type GetAllAdsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, category?: { __typename?: 'Category', id: number, title: string } | null, pictures?: Array<{ __typename?: 'Picture', id: number, url: string }> | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures?: Array<{ __typename?: 'Picture', id: number, url: string }> | null, category?: { __typename?: 'Category', id: number, title: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type GetAllTagAndCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagAndCategoryQuery = { __typename?: 'Query', getAllTag: Array<{ __typename?: 'Tag', id: number, name: string }>, getAllCategory: Array<{ __typename?: 'Category', id: number, title: string }> };


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
    owner
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
export const GetAllAdsDocument = gql`
    query GetAllAds($title: String) {
  getAllAds(title: $title) {
    id
    title
    description
    owner
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
    owner
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