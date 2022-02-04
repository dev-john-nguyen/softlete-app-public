import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../App';
import PrimaryButton from '../../components/elements/PrimaryButton';
import PrimaryText from '../../components/elements/PrimaryText';
import SecondaryText from '../../components/elements/SecondaryText';
import StyleConstants from '../../components/tools/StyleConstants';
import request from '../../services/utils/request';
import BaseColors from '../../utils/BaseColors';
import LocalStoragePaths from '../../utils/LocalStoragePaths';
import PATHS from '../../utils/PATHS';
import auth from '@react-native-firebase/auth';
import { logout } from '../../services/user/actions';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReducerProps } from '../../services';
import { UserProps } from '../../services/user/types';
import { setBanner } from '../../services/banner/actions';
import { BannerTypes } from '../../services/banner/types';


interface Props {
    dispatch: AppDispatch;
    state: any;
    user: UserProps;
    navigation: any;
}


const RemoveAccount = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const mount = useRef(false);
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        mount.current = true;
        if (props.user.admin) {
            props.dispatch(setBanner(BannerTypes.warning, "Please contact us directly to remove your account."))
            props.navigation.goBack()
        }
        return () => {
            mount.current = false
        }
    }, [])

    const onRemoveAccount = async () => {
        if (loading) return;
        setLoading(true)
        const currentUser = auth().currentUser;
        if (!currentUser) return Alert.alert("Please logout and and log back in.");
        const { data } = await request("POST", PATHS.user.remove, props.dispatch)
        if (data) {
            const allPaths = Object.values(LocalStoragePaths)
            await AsyncStorage.multiRemove(allPaths).catch(err => console.log(err))
            props.dispatch(logout())
        }
        mount.current && setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={{ height: headerHeight }} />
            <PrimaryText styles={styles.title}>Remove Account</PrimaryText>
            <SecondaryText styles={styles.sub}>Are you sure you want to remove your account? Once your account has been removed all of your data will be lost.</SecondaryText>
            <PrimaryButton styles={styles.btn} onPress={onRemoveAccount} loading={loading}>Remove My Account</PrimaryButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: StyleConstants.baseMargin,
        paddingTop: 0
    },
    btn: {
        fontSize: StyleConstants.smallFont,
        marginTop: StyleConstants.baseMargin
    },
    title: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
    },
    sub: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginTop: StyleConstants.smallMargin
    },
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

export default connect(mapStateToProps)(RemoveAccount);