import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// Create AuthContext
export const AuthContext = createContext(initial_state);

// Reducer function
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

// AuthContext Provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
