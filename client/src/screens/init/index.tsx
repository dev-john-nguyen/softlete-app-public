import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ReducerProps } from '../../services';
import { UserActionProps, UserProps } from '../../services/user/types';
import PrimaryText from '../../components/elements/PrimaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyleConstants from '../../components/tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import Input from '../../components/elements/Input';
import { logout, registerUser } from '../../services/user/actions';
import paths, { SERVERURL } from '../../utils/PATHS';
import { AppDispatch } from '../../../App';
import { SIGNIN_USER } from '../../services/user/actionTypes';
import axios from 'axios';
import SecondaryText from '../../components/elements/SecondaryText';
import { IndexStackList } from '../types';
import PrimaryButton from '../../components/elements/PrimaryButton';
import { normalize } from '../../utils/tools';
import auth from '@react-native-firebase/auth';

interface Props {
    navigation: any;
    registerUser: UserActionProps['registerUser'];
    dispatch: AppDispatch;
    user: UserProps;
    logout: () => void;
}

function validateUsername(val: string) {
    const reg = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return reg.test(val)
}


const InitUser = ({ navigation, registerUser, dispatch, user, logout }: Props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (user && user.username) navigation.navigate(IndexStackList.TourForm)
    }, [user])


    const onSave = () => {
        if (loading) return;

        if (!username || username.length < 8 || username.length > 20) return setErrMsg('Username must be between 8-20 characters.');

        if (!validateUsername(username)) return setErrMsg('Invalid username. Please try again.');

        setLoading(true);

        let email = ''

        const currentUser = auth().currentUser;

        //get email if available
        if (currentUser?.email) {
            email = currentUser.email
        }

        axios.post(SERVERURL + paths.signin.register, { name, username, email })
            .then(({ data }) => {
                if (data) {
                    dispatch({ type: SIGNIN_USER, payload: { ...user, ...data } })
                    navigation.navigate(IndexStackList.TourForm)
                }
                setLoading(false)
            })
            .catch((err) => {
                if (err) {
                    const { response } = err;
                    if (response.data) {
                        if (response.data.tokenExpired) {
                            setLoading(false);
                            logout()
                            return;
                        }
                        setLoading(false)
                        return setErrMsg(response.data)
                    }
                }
                setErrMsg("Unexpected error occurred. Please try again.")
                setLoading(false)
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <PrimaryText styles={styles.headerText}>Account Setup</PrimaryText>
            <SecondaryText styles={styles.subText}>The username cannot be changed after it's been set.</SecondaryText>
            <View style={styles.formContainer}>

                {!!errMsg && <SecondaryText styles={styles.errTxt}>{`* ${errMsg}`}</SecondaryText>}

                <View>
                    <SecondaryText styles={styles.label}>Username</SecondaryText>
                    <Input
                        value={username}
                        placeholder='johnny1234'
                        onChangeText={(txt) => setUsername(txt.replace(/\s/g, '').toLowerCase())}
                        maxLength={100}
                        autoCapitalize='none'
                        styles={styles.input}
                    />
                </View>

                <View>
                    <SecondaryText styles={styles.label}>Name (optional)</SecondaryText>
                    <Input
                        value={name}
                        placeholder='John Doe'
                        onChangeText={(txt) => setName(txt)}
                        maxLength={200}
                        autoCapitalize='words'
                        styles={styles.input}
                    />
                </View>
                <View>
                    <SecondaryText styles={[styles.info, { marginBottom: 5 }]} bold>Username Criteria</SecondaryText>
                    <SecondaryText styles={styles.info}>- Only contains alphanumeric characters, underscore and dot.</SecondaryText>
                    <SecondaryText styles={styles.info}>- Underscore and dot can't be at the end or start of a username.</SecondaryText>
                    <SecondaryText styles={styles.info}>- Underscore and dot can't be next to each other.</SecondaryText>
                    <SecondaryText styles={styles.info}>- Underscore or dot can't be used multiple times in a row.</SecondaryText>
                    <SecondaryText styles={styles.info}>- Number of characters must be between 8 to 20.</SecondaryText>
                </View>
                <PrimaryButton onPress={onSave} styles={styles.save}>{loading ? <ActivityIndicator size='small' color={BaseColors.white} /> : "Next"}</PrimaryButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: StyleConstants.baseMargin
    },
    svg: {
        height: normalize.width(6),
        width: normalize.width(6),
        position: 'absolute',
        bottom: '20%',
        alignSelf: 'center',
    },
    info: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.lightBlack,
        marginTop: 5
    },
    errTxt: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.red,
        marginBottom: StyleConstants.smallMargin
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
        textTransform: 'capitalize',
        marginBottom: 5
    },
    subText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginBottom: StyleConstants.baseMargin,
    },
    formContainer: {
    },
    label: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.lightBlack,
        marginBottom: 10
    },
    save: {
        alignSelf: 'flex-end',
        marginTop: StyleConstants.baseMargin,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginBottom: StyleConstants.baseMargin
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: any) => ({
    registerUser: (username: string, name: string) => dispatch(registerUser(username, name)),
    logout: () => dispatch(logout()),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(InitUser);