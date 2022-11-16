import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import request from "../lib/auth";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;
        return {
          ...state,
          isAuthenticated,
          isInitialized: true,
          user,
        };
      },
      LOGIN: (state, action) => {
        const { user } = action.payload;
    
        return {
          ...state,
          isAuthenticated: true,
          user,
        };
      },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (formData) => {
    const { data } = await request.post("login",
        formData);
    const user = await getUserInfo(data?.accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const getUserInfo = async (accessToken) => {
    const decoded = jwtDecode(accessToken);
    const { username, id: userId } = await request.get(
      `user/${decoded.userId}`
    );

    return {
      username,
      userId,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };