"use client";
import SearchUsers from "@/components/search-users/SearchUser";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsersData } from "@/redux/usersData";
import { FIND_USERS, USER_DELETED_SUBSCRIPTION } from "@/graphql/users";
import { useSubscription, useApolloClient } from "@apollo/client";
import { RootState } from "@/redux/store";

const UsersSearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const usersData = useSelector((state: RootState) => state.usersData);

  useSubscription(USER_DELETED_SUBSCRIPTION, {
    onData: ({ data }) => {
      const deletedUsers = data?.data?.userDeleted.results;

      // 提取被删除用户的 ID 列表
      const deletedIds = deletedUsers.map((user: any) => user.id);

      // 过滤掉被删除的用户
      const restUserData = usersData.filter(
        (user: any) => !deletedIds.includes(user.id)
      );
      dispatch(setUsersData(restUserData));
    },
  });

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
