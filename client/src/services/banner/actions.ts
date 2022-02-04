import { REMOVE_BANNER, SET_BANNER } from "./actionTypes";
import { BannerTypes } from "./types";

export const setBanner = (type: BannerTypes, msg: string) => ({
    type: SET_BANNER,
    payload: {
        msg,
        type
    }
})


export const removeBanner = () => ({
    type: REMOVE_BANNER
})
