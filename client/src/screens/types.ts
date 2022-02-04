import { UserProps } from "../services/user/types";

export type IndexStackParamsList = {
    SettingsStack: UserProps;
    HomeStack: UserProps | undefined;
    SignIn: undefined;
    Init: undefined;
    TourForm: undefined;
    NetworkStack: undefined;
    AdminStack: undefined;
    VerifyEmail: undefined;
    HelpStack: undefined;
    About: undefined;
    ProgramStack: undefined;
}

export enum IndexStackList {
    SettingsStack = 'SettingsStack',
    ProgramStack = 'ProgramStack',
    HomeStack = 'HomeStack',
    TourForm = 'TourForm',
    Init = 'Init',
    NetworkStack = 'NetworkStack',
    AdminStack = 'AdminStack',
    VerifyEmail = 'VerifyEmail',
    HelpStack = 'HelpStack',
    About = 'About',
    SignIn = 'SignIn'
}