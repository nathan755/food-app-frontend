import Axios from "axios";

export const login = (email, password) => {
    /**   */
    return async (dispatch) => {
        const response = await Axios.post("http://127.0.0.1:3001/login", {
            email: email,
            password: password
            // hmm, should this be in auth header.. lol 
        });
        localStorage.setItem("token", response.data.token)
        dispatch({ type: "LOGIN", payload:response.data })
    } 
}

export const logout = () => {
    localStorage.removeItem("token");
    return {
        type:"LOGOUT"
    }
}

export const setAccount = () => {
    /** Check if a user is logged in. Ie do they have a valid token */
    return {
        type:"SET_ACCOUNT"
    }
}

export const setUser = () => {
    return {
        type:"SET_USER"
    }
}