import * as types from "../actions/types";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZkYTM4Zjk4MTc1NzEyZjAwOWVmY2FlIn0sImlhdCI6MTYwODEzNjk1NCwiZXhwIjoxNjA4MTcyOTU0fQ.qK7hD75OOzPIwdy8dnJDwdmoSJzj930vR4pT1XDtQKw
const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_SUCCESS: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuth: true,
      };
    }
    case types.REGISTER_FAILED: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default auth;
