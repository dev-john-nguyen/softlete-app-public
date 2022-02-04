import { REMOVE_BANNER, SET_BANNER } from "./actionTypes"

const INITIAL_STATE = {
    banner: {
        msg: '',
        type: '',
    },
    count: 0
}

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_BANNER:
            return {
                ...state,
                banner: {
                    ...action.payload
                }
            }
        case REMOVE_BANNER:
            return {
                ...state,
                banner: INITIAL_STATE.banner
            }
        default:
            return state
    }
}