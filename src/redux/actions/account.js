import Axios from "axios";

export const login = (email, password) => {
    console.log("actionemail", email, password)
    return async (dispatch) => {
        const response = await Axios.post("http://127.0.0.1:3001/login", {
            email: email,
            password: password
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