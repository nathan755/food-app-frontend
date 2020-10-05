export const setPopup = (type, config) => {
    return{
        type:"SET_POPUP",
        payload:{
            type,
            config
        }
    }
}

export const removePopup = () => {
    return{
        type:"REMOVE_POPUP"
    }
}