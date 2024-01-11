const initialState = {
    authToken: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_TOKEN':
        return { ...state, authToken: action.payload };
      case 'CLEAR_AUTH_TOKEN':
        return { ...state, authToken: null };
      default:
        return state;
    }
  };
  
  export default authReducer;