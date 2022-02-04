import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, Keyboard } from 'react-native';
import BaseColors from '../../utils/BaseColors';
import SecondaryText from '../../components/elements/SecondaryText';
import StyleConstants from '../../components/tools/StyleConstants';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../App';
import { TextInput } from 'react-native-gesture-handler';
import { normalize, validateEmail } from '../../utils/tools';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Fonts from '../../utils/Fonts';
import LockSvg from '../../assets/LockSvg';
import MailSvg from '../../assets/MailSvg';

interface Props {
    register: boolean;
    dispatch: AppDispatch;
    onRegStateChange: () => void;
    onNavigateToForgot: () => void;
}

const LoginForm = ({ register, dispatch, onRegStateChange, onNavigateToForgot }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [keyboardShow, setKeyboardShow] = useState(false)
    const mount = useRef(false);
    const attempts = useRef(0);

    useEffect(() => {
        mount.current = true;
        const keyboardSubscribeShow = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardShow(true)
        })
        const keyboardSubscribeHide = Keyboard.addListener("keyboardDidHide", (e) => {
            setKeyboardShow(false)
        })

        return () => {
            mount.current = false;
            keyboardSubscribeShow.remove();
            keyboardSubscribeHide.remove();
        }
    }, [])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            bottom: (keyboardShow && register) ? withTiming(100) : withTiming(0),
            backgroundColor: BaseColors.white
        }
    }, [keyboardShow, register])

    const onSubmit = () => {

        if (!email || !password || !password) return setErrMsg('Email and password are required.')

        if (!validateEmail(email)) return setErrMsg('Invalid email address. Please try again.')

        if (password.length < 6) return setErrMsg('Password should be at least 6 characters long.')

        if (!register) return onLogin();

        if (password !== password2) return setErrMsg("Password do not match.")

        setLoading(true);

        auth().createUserWithEmailAndPassword(email, password)
            .catch(err => {
                console.log(err)
            })
    }

    const onLogin = () => {
        if (loading) return;
        setLoading(true)

        if (attempts.current > 4) {
            setLoading(false)
            return setErrMsg("No more attempts. Please try again later.");
        }

        auth().signInWithEmailAndPassword(email, password)
            .then(() => mount.current && setLoading(false))
            .catch((error) => {
                if (mount.current) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (attempts.current < 4) {
                        switch (errorCode) {
                            case 'auth/wrong-password':
                            case 'auth/invalid-email':
                            case 'auth/user-disabled':
                            case 'auth/user-not-found':
                                setErrMsg("Invalid Credentials. Please try again.");
                                break;
                            default:
                                setErrMsg("An unexpected error occurred.");
                                console.log(errorMessage)
                        }
                    } else {
                        setErrMsg("Invalid Credentials. One more attempt.");
                    }
                    attempts.current = attempts.current + 1;
                    setLoading(false)
                }
            })
    }

    return (
        <View style={{ alignSelf: 'stretch', marginTop: StyleConstants.baseMargin }}>
            <Animated.View style={animatedStyles}>
                {
                    !!errMsg && (
                        <SecondaryText styles={styles.errText}>{errMsg ? "*" + errMsg : ""}</SecondaryText>
                    )
                }
                <View style={{ justifyContent: 'center', marginBottom: 20 }}>
                    <View style={styles.svg}>
                        <MailSvg fillColor={BaseColors.primary} />
                    </View>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={(txt) => setEmail(txt.trim())}
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        style={styles.input}
                        placeholderTextColor={BaseColors.medGrey}
                    />
                </View>


                <View style={{ justifyContent: 'center', marginBottom: 20 }}>
                    <View style={styles.svg}>
                        <LockSvg fillColor={BaseColors.primary} />
                    </View>
                    <TextInput
                        placeholder='Password'
                        onChangeText={(txt) => setPassword(txt.trim())}
                        textContentType='password'
                        secureTextEntry
                        autoCapitalize='none'
                        style={styles.input}
                        placeholderTextColor={BaseColors.medGrey}
                    />
                </View>

                {
                    register ? (
                        <View>
                            <View style={{ justifyContent: 'center', marginBottom: 20 }}>
                                <View style={styles.svg}>
                                    <LockSvg fillColor={BaseColors.primary} />
                                </View>
                                <TextInput
                                    placeholder='Confirm Password'
                                    onChangeText={(txt) => setPassword2(txt.trim())}
                                    textContentType='password'
                                    secureTextEntry
                                    autoCapitalize='none'
                                    style={styles.input}
                                    placeholderTextColor={BaseColors.medGrey}
                                />
                            </View>
                        </View>
                    )
                        : (
                            <Pressable onPress={onNavigateToForgot}>
                                <SecondaryText styles={styles.forgot} bold>Recovery Password</SecondaryText>
                            </Pressable>
                        )

                }
            </Animated.View>
            <Pressable style={styles.button} onPress={onSubmit}>
                <SecondaryText styles={styles.submit} bold>{register ? "Register" : "Login"}</SecondaryText>
                {loading && <ActivityIndicator size='small' color={BaseColors.white} />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    errText: {
        fontSize: 14,
        color: BaseColors.red,
        marginBottom: 10,
        marginTop: 10,
    },
    header: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.white,
        marginTop: StyleConstants.baseMargin,
        textAlign: 'center'
    },
    button: {
        marginTop: StyleConstants.baseMargin,
        borderRadius: 5,
        alignSelf: 'stretch',
        backgroundColor: BaseColors.primary,
        padding: StyleConstants.smallMargin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submit: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.white
    },
    input: {
        color: BaseColors.black,
        backgroundColor: BaseColors.lightWhite,
        borderRadius: 5,
        padding: 20,
        paddingLeft: '12%',
        paddingTop: 17,
        paddingBottom: 17,
        fontFamily: Fonts.secondary,
        fontSize: StyleConstants.smallFont,
    },
    svg: {
        width: normalize.width(20),
        height: normalize.width(20),
        position: 'absolute',
        left: '3%',
        zIndex: 100,
    },
    forgot: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.secondary,
        alignSelf: 'flex-end'
    },
})

export default connect(null)(LoginForm);