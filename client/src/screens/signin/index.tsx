import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Pressable, Keyboard, Linking } from 'react-native';
import PrimaryText from '../../components/elements/PrimaryText';
import StyleConstants from '../../components/tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import SecondaryText from '../../components/elements/SecondaryText';
import LogoSvg from '../../assets/LogoSvg';
import { normalize } from '../../utils/tools';
import LoginForm from './LoginForm';
import PrimaryButton from '../../components/elements/PrimaryButton';
import ForgotPassword from './ForgotPassword';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { SERVERURL } from '../../utils/PATHS';

interface Props {
    navigation: any;
}

const SignIn = ({ navigation }: Props) => {
    const [register, setRegister] = useState(false);
    const [forgot, setForgot] = useState(false);


    const onRegStateChange = () => setRegister(r => r ? false : true);

    const onNavigateToForgot = () => setForgot(f => f ? false : true);

    const onPP = async () => {
        const url = SERVERURL + 'privacy-policy'
        const canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
            Linking.openURL(url)
        }
    }
    const onTOU = async () => {
        const url = SERVERURL + 'terms'
        const canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
            Linking.openURL(url)
        }
    }

    async function onAppleButtonPress() {
        // performs login request
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // get current authentication state for user
            // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            // use credentialState response to ensure the user is authenticated
            if (credentialState === appleAuth.State.AUTHORIZED) {
                // user is authenticated
            }

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw 'Apple Sign-In failed - no identify token returned';
            }

            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

            // Sign the user in with the credential
            return auth().signInWithCredential(appleCredential);
        } catch (err) {
            console.log(err)
        }
    }

    if (forgot) return <ForgotPassword onGoBack={onNavigateToForgot} />

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BaseColors.white }}>
            <Pressable style={styles.headerContainer} onPress={() => Keyboard.dismiss()}>
                <View>
                    <View style={{ width: normalize.height(15), height: normalize.height(15) }}>
                        <LogoSvg />
                    </View>
                    <PrimaryText styles={styles.headerText}>Softlete</PrimaryText>
                    <SecondaryText styles={styles.headerSubText}>Plan, Train, Evaluate, Repeat</SecondaryText>
                    <LoginForm
                        register={register}
                        onRegStateChange={onRegStateChange}
                        onNavigateToForgot={onNavigateToForgot}
                    />
                </View>
                {
                    !register && (
                        <View>
                            <View style={styles.orContainer}>
                                <View style={styles.orLine} />
                                <SecondaryText styles={styles.headerSubText}>or</SecondaryText>
                                <View style={styles.orLine} />
                            </View>
                            <AppleButton
                                buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                                buttonType={AppleButton.Type.SIGN_IN}
                                style={{
                                    width: '100%', // You must specify a width
                                    height: normalize.height(20), // You must specify a height
                                }}
                                onPress={() => onAppleButtonPress()}
                            />
                        </View>
                    )
                }

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={styles.bottomContainer}>
                        {
                            register
                                ? <>
                                    <SecondaryText styles={styles.bottomText}>Already a member?</SecondaryText>
                                    <PrimaryButton onPress={onRegStateChange} styles={styles.btn}>Login</PrimaryButton>
                                </> :
                                <>
                                    <SecondaryText styles={styles.bottomText}>Not a member?</SecondaryText>
                                    <PrimaryButton onPress={onRegStateChange} styles={styles.btn}>Register</PrimaryButton>
                                </>
                        }
                        <View style={{ marginTop: 10, width: '100%', alignItems: 'center' }}>
                            <SecondaryText styles={styles.terms}>By using our service, you agree to the following</SecondaryText>
                            <Pressable onPress={onTOU}>
                                <SecondaryText styles={styles.txt}>Terms of Use</SecondaryText>
                            </Pressable>
                            <Pressable onPress={onPP}>
                                <SecondaryText styles={styles.txt}>Privacy Policy</SecondaryText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
        marginTop: StyleConstants.baseMargin
    },
    headerContainer: {
        flex: 1,
        margin: StyleConstants.baseMargin * 2,
        marginBottom: 0,
        marginTop: 10
    },
    terms: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.black,
        textAlign: 'center'
    },
    txt: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.black,
        textDecorationLine: 'underline',
        textDecorationColor: BaseColors.lightBlack,
        alignSelf: 'center',
        marginTop: StyleConstants.smallMargin
    },
    headerSubText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginTop: 5
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    bottomContainer: {
        margin: StyleConstants.baseMargin,
        alignItems: 'center'
    },
    bottomText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginBottom: 10
    },
    btn: {
        fontSize: StyleConstants.smallFont,
        paddingLeft: normalize.height(50),
        paddingRight: normalize.height(50),
        borderRadius: 10
    },
    orLine: {
        height: 2, backgroundColor: BaseColors.lightGrey, flex: .4,
    },
    orContainer: {
        marginBottom: StyleConstants.baseMargin,
        marginTop: StyleConstants.baseMargin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default SignIn;