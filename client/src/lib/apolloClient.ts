import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "same-origin",
  });

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: `ws://localhost:51003/graphql`, // 使用url
            connectionParams: {
              reconnect: true,
            },
            retryAttempts: Infinity, // 自动重连

            keepAlive: 30000, // 30 seconds
            // retryAttempts: 5,

            on: {
              connected: () => console.log("connected"),
              closed: () => console.log("closed"),
              error: (err) => console.error("error", err),
            },
          })
        )
      : null;

  const splitLink =
    typeof window !== "undefined" && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const link = ApolloLink.from([errorLink, splitLink]);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: link,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { onError } from "@apollo/client/link/error";
// import { ApolloLink } from "@apollo/client/link/core";

// let apolloClient: ApolloClient<any>;

// function createApolloClient() {
//   const httpLink = new HttpLink({
//     uri: process.env.NEXT_PUBLIC_API_URL,
//     credentials: "same-origin",
//   });

//   const wsLink =
//     typeof window !== "undefined"
//       ? new WebSocketLink({
//           url: `ws://localhost:51003/graphql`,
//           options: {
//             reconnect: true,
//           },
//         })
//       : null;

//   const splitLink =
//     typeof window !== "undefined" && wsLink
//       ? split(
//           ({ query }) => {
//             const definition = getMainDefinition(query);
//             return (
//               definition.kind === "OperationDefinition" &&
//               definition.operation === "subscription"
//             );
//           },
//           wsLink,
//           httpLink
//         )
//       : httpLink;

//   // 创建错误处理链接
//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(({ message, locations, path }) => {
//         console.error(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         );
//       });
//     }

//     if (networkError) {
//       console.error(`[Network error]: ${networkError}`);
//     }
//   });

//   // 将错误处理链接添加到 Apollo 链接中
//   const link = ApolloLink.from([errorLink, splitLink]);

//   return new ApolloClient({
//     ssrMode: typeof window === "undefined",
//     link: link,
//     cache: new InMemoryCache(),
//   });
// }

// export function initializeApollo(initialState = null) {
//   const _apolloClient = apolloClient ?? createApolloClient();

//   if (initialState) {
//     _apolloClient.cache.restore(initialState);
//   }

//   if (typeof window === "undefined") return _apolloClient;
//   if (!apolloClient) apolloClient = _apolloClient;

//   return _apolloClient;
// }
