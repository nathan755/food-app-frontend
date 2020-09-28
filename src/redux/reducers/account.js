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
        default:
            return state;
    }
}

export default account;