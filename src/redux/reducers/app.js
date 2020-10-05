const initalState = {
    loading:true
}

const app = (state=initalState,action) => {
    switch (action.type) {
        case "INIT_APP":
            return {
                ...state,
                loading:false,

            }
        default:
            return {
                ...state
            }
    }
}

export default app;