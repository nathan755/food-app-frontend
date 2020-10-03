export const setPopup = (type, config) => {
    console.log("config",config)
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