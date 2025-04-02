import { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";

// GLOBAL CUSTOM COMPONENTS
import Loading from "app/components/MatxLoading";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
  step: 1 // 1 = user info form, 2 = OTP form, 3 = address/bank details form
};

const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  const decodedToken = jwtDecode(accessToken);

  return decodedToken?.id ? true : false;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isAuthenticated, isInitialized: true };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, user, isAuthenticated: true };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    case "SET_STEP": {
      return { ...state, step: action.payload.step };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT"
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const { data } = await axiosInstance.post("/auth/login", { email, password });
    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "LOGIN", payload: { user } });
  };

  const register = async (formdata) => {
    const { data } = await axiosInstance.post("/auth/register", formdata);
    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "REGISTER", payload: { user } });
  };
  const generateOtp = async (phone_number) => {
    const { data } = await axiosInstance.post("/auth/generateOtp", { phone_number });
    const { status } = data;
    if(status == 'success'){
      dispatch({ type: "SET_STEP", payload: { step:2 } });
    }
    
  };
  const verifyOtp = async (phone_number, otp) => {
    const { data } = await axiosInstance.post("/auth/verifyOtp", {phone_number, otp });
    const { status } = data;
    if(status == 'success'){
      dispatch({ type: "SET_STEP", payload: { step:3 } });
    }
    
  };
  const setStep = (step) => {
      dispatch({ type: "SET_STEP", payload: { step } })
  };
  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axiosInstance.get("/api/auth/profile");
          const { user } = response.data;

          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null }
          });
        }
      } catch (err) {
        console.log(err);

        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null }
        });
      }
    })();
  }, []);

  if (!state.isInitialized) return <Loading />;

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      method: "JWT", 
      login, 
      logout, 
      register, 
      generateOtp,
      verifyOtp,
      setStep
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
