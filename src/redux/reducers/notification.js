const initialState = {
    notificationVisible:false,
    copy:"",
    title:"",
    type:""
}

const notification = (state=initialState, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return {
                ...state,
                notificationVisible:true,
                copy:action.payload.copy,
                title:action.payload.title,
                type:action.payload.type
            }

        case "REMOVE_NOTIFICATION":
            return{
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default notification;