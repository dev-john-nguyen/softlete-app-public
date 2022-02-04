export enum BannerTypes {
    warning = 'warning',
    default = 'default',
    error = 'error'
}

export interface BannerProps {
    banner: {
        msg: string,
        type: string
    }
}

export interface BannerActionsProps {
    setBanner: (type: BannerTypes, msg: string) => void;
}