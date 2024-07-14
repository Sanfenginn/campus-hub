import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($account: String!, $password: String!) {
    login(account: $account, password: $password) {
      account
      token
      userType
    }
  }
`;

const useLogin = () => {
  const [login, { loading, error }] = useMutation(LOGIN);

  const loginFn = async (account: string, password: string) => {
    try {
      const response = await login({
        variables: {
          account,
          password,
        },
      });
      return response.data.login;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { loginFn, loading, error };
};

export default useLogin;
