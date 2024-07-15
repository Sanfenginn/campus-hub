"use client";
import SearchUsers from "@/components/search-users/SearchUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsersData } from "@/redux/usersData";
import { FIND_USERS } from "@/graphql/getUsers";
import { useApolloClient } from "@apollo/client";

const UsersSearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  useEffect(() => {
    const getUserData = async () => {
      let conditionVar = {};
      try {
        const { data } = await client.query({
          query: FIND_USERS,
          variables: { conditionVar },
        });
        dispatch(setUsersData(data.findAllUsers));
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [dispatch, client]);

  return <SearchUsers />;
};

export default UsersSearchPage;
