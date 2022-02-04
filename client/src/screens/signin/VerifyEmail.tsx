import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import PrimaryButton from '../../components/elements/PrimaryButton';
import SecondaryButton from '../../components/elements/SecondaryButton';
import BaseColors from '../../utils/BaseColors';
import { connect } from 'react-redux';
import { logout } from '../../services/user/actions';
import { setBanner } from '../../services/banner/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/elements/PrimaryText';
import StyleConstants from '../../components/tools/StyleConstants';
import SendMailSvg from '../../assets/SendMailSvg';
import { normalize } from '../../utils/tools';
import SecondaryText from '../../components/elements/SecondaryText';
import { BannerTypes } from '../../services/banner/types';

interface Props {
    dispatch: any;
}




const VerifyEmail = ({ dispatch }: Props) => {
    const [sent, setSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const mount = useRef(false);

    useEffect(() => {
        mount.current = true;
        sendEmailVerification()
        return () => {
            mount.current = false;
        }
    }, [])

    const sendEmailVerification = () => {
        const { currentUser } = auth();

        if (!currentUser) return logout();

        if (!sent) {
            setSent(true)
            currentUser.sendEmailVerification()
                .then(() => {
                    setTimeout(() => {
                        mount.current && setSent(false)
                    }, 20000);
                })
                .catch(err => {
                    console.log(err)
                    mount.current && setErrMsg("Unexpected error occurred while sending your email verification. Please try refreshing the app.")
                    mount.current && setSent(false)
                })
        }
    }

    const onVerify = async () => {
        if (auth().currentUser) {
            await auth().currentUser?.reload()
            if (auth().currentUser?.emailVerified) {
                dispatch(setBanner(BannerTypes.default, "Email Verified. Please login again."));
                dispatch(logout())
            }
        }
    }

    const onDone = async () => {
        if (verified) return;
        setVerified(true)
        await onVerify().catch(err => {
            console.log(err)
            mount.current && setErrMsg("Unexpected error occurred while verifying your email. Please try refreshing the app.")
        })
        setVerified(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <PrimaryText styles={styles.headerText}>Verfiy your Email</PrimaryText>
                <SecondaryText styles={styles.headerSubText}>Shortly you should receive an email. Please follow the directions in the email to verify your email.</SecondaryText>
            </View>
            <View style={styles.svgContainer}>
                <View style={styles.svg}>
                    <SendMailSvg fillColor={BaseColors.primary} />
                </View>
            </View>
            <View>
                <PrimaryButton onPress={onDone}>{verified ? 'Refreshing...' : "I verified my email"}</PrimaryButton>
                {
                    !sent && (
                        <SecondaryButton onPress={sendEmailVerification} styles={{ color: sent ? BaseColors.secondary : BaseColors.black, marginTop: 10 }}>Resend Verification Email</SecondaryButton>
                    )
                }
            </View>
            <Pressable onPress={() => logout}>
                <SecondaryText styles={styles.logout}>Logout</SecondaryText>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: BaseColors.lightWhite,
        justifyContent: 'space-evenly'
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary
    },
    headerSubText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black
    },
    svgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    svg: {
        height: normalize.width(2),
        width: normalize.width(2)
    },
    logout: {
        alignSelf: 'flex-end',
        marginTop: StyleConstants.baseMargin,
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        textDecorationLine: 'underline'
    }
})
export default connect()(VerifyEmail);