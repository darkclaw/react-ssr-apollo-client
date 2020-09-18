import React from 'react';
import { gql, NetworkStatus, useQuery } from "@apollo/client";

export const USERS_QUERY = gql`
  query users($page: Int!, $limit: Int!) {
    users(page: $page, limit: $limit) {
      id
      username
      email
    }
  }
`
export const queryVars = {
  page: 1,
  limit: 30,
}

export default function UsersList() {

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    USERS_QUERY,
    {
      variables: queryVars
    }
  );
  
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        page: (queryVars.page = queryVars.page + 1),
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          users: [...previousResult.users, ...fetchMoreResult.users],
        })
      },
    })
  }

  if (error) return <p>Error loading posts</p>
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { users } = data ?? [];
  const areMorePosts = queryVars.page * queryVars.limit === users.length

  return (
    <section>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div>
              <span>{index + 1}. </span>
              <a>{user.username}</a>
               <span> - {user.email}</span>
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </section>
  )

}
