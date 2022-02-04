import React from 'react';
import { AppDispatch } from "../../../App";
import { SET_DEMO_STATE, SET_NEW_USER_STATE } from "../../services/global/actionTypes";
import { DemoStates } from "../../services/global/types";
import { View, StyleSheet } from "react-native";
import BaseColors from "../../utils/BaseColors";
import PrimaryText from "../../components/elements/PrimaryText";
import SecondaryText from "../../components/elements/SecondaryText";
import StyleConstants from "../../components/tools/StyleConstants";
import { connect } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReducerProps } from '../../services';
import { UserProps } from '../../services/user/types';
import { normalize } from '../../utils/tools';
import PrimaryButton from '../../components/elements/PrimaryButton';
interface Props {
    dispatch: AppDispatch;
    user: UserProps;
}


const TourForm = ({ dispatch, user }: Props) => {

    const onContinue = () => {
        dispatch({ type: SET_DEMO_STATE, payload: DemoStates.HOME_WOS });
        dispatch({ type: SET_NEW_USER_STATE, payload: false });
    }

    return (
        <SafeAreaView style={styles.container}>
            <PrimaryText styles={styles.headerSubText}>Welcome,</PrimaryText>
            <PrimaryText styles={styles.headerText}>{user.name ? user.name : user.username}!</PrimaryText>
            <SecondaryText styles={styles.title} bold>If You Get Lost</SecondaryText>
            <SecondaryText styles={styles.label}>Or have trouble accessing functionalities, please look for the help/tips icons. The help/tips are located in most menu options.</SecondaryText>

            <SecondaryText styles={styles.title} bold>Issues</SecondaryText>
            <SecondaryText styles={styles.label}>
                If you identify any issues with the app please fill out and submit an issues form that can be found in the settings screen of the app.
            </SecondaryText>

            <SecondaryText styles={styles.title} bold>Feedback</SecondaryText>
            <SecondaryText styles={styles.label}>
                Please let us know how we are doing by visiting our website and feeling out the feedback form. We would love to hear from you :).
            </SecondaryText>

            <PrimaryButton onPress={onContinue} styles={styles.btn}>I'm ready</PrimaryButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: StyleConstants.baseMargin,
        backgroundColor: BaseColors.lightWhite
    },
    headerSubText: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.black,
        marginBottom: 10
    },
    svg: {
        height: normalize.width(6),
        width: normalize.width(6),
        position: 'absolute',
        bottom: '40%',
        alignSelf: 'center',
    },
    nextContainer: {
        padding: 5,
        borderBottomColor: BaseColors.black,
        borderBottomWidth: 1,
        alignSelf: 'flex-end'
    },
    nextText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginTop: StyleConstants.baseMargin,
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
        textTransform: 'capitalize',
        marginBottom: StyleConstants.baseMargin
    },
    title: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginBottom: 5
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginBottom: StyleConstants.baseMargin
    },
    btn: {
        alignSelf: 'stretch',
        marginTop: StyleConstants.baseMargin
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

export default connect(mapStateToProps)(TourForm);