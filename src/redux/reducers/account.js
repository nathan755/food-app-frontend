const initialState = {
    loggedIn:false,
    accountId:null,
    companyName:"",
    email:""
}

const account = (state=initialState, action ) => {
    switch (action.type) {
        case "LOGIN":
            return{
                ...state,
                accountId:action.payload.accountId,
                loggedIn:true,
                companyName:action.payload.company_name,
                email:action.payload.email,
            }
            
        case "LOGOUT":
            return{
                ...state,
            }
        
        case "SET_ACCOUNT":
            return {
                ...state,
                loggedIn:true,
                accountId:action.payload.currentUser.accountId,
                companyName:action.payload.currentUser.company_name,
                email:action.payload.currentUser.email
            }
        default:
            return state;
    }
}

export default account;