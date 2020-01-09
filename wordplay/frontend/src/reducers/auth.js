const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
    isLoading: false,
    user: JSON.parse(localStorage.getItem("user"))
};

const auth = (state = initialState, action) => {
  switch(action.type){
      case 'LOGIN_SUCCESS':
      case 'REGISTRATION_SUCCESS':
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("isAuthenticated", "true");
          const serialUser = JSON.stringify(action.payload.user);
          localStorage.setItem("user", serialUser);
          return {
              ...state,
              ...action.payload,
              isAuthenticated: true,
              isLoading: false
          };

      case 'LOGOUT_SUCCESS':
          localStorage.setItem("token", null);
          localStorage.setItem("isAuthenticated", "false");
          localStorage.setItem("user", null);
          localStorage.setItem("isLoading", "false");
          return{
             ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
          };
      default:
          return state;
  }
};

export default auth
