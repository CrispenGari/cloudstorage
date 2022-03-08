import React from "react";
import {
  createClient,
  Provider,
  Client,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { uri, __ssrMode__ } from "./constants";

const ssr = ssrExchange({
  isClient: !__ssrMode__,
  initialState: !__ssrMode__ ? (window as any)?.__URQL_DATA__ : undefined,
});
export const client: Client = createClient({
  url: uri,
  exchanges: [
    dedupExchange,
    cacheExchange,
    multipartFetchExchange,
    ssr,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});
const UrqlProvider: React.FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
export default UrqlProvider;
