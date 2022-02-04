import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ReducerProps } from '../../services';
import { connect } from 'react-redux';
import StyleConstants from '../../components/tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import SecondaryText from '../../components/elements/SecondaryText';
import auth from '@react-native-firebase/auth';
import Input from '../../components/elements/Input';
import PrimaryButton from '../../components/elements/PrimaryButton';
import { validateEmail } from '../../utils/tools';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/elements/PrimaryText';

interface Props {
}

const ResetPassword = ({ }: Props) => {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const headerHeight = useHeaderHeight();

    const onResetPassword = () => {
        if (!email || !validateEmail(email)) return setErr("*Invalid email.")

        const user = auth().currentUser

        if (!user) return setErr('*Please logout and login to reset password.')

        const authEmail = user.email;

        if (email !== authEmail) return setErr("*Looks like you use a differen't email address for this account.")

        setLoading(true);

        auth().sendPasswordResetEmail(email)
            .then(() => {
                setSent(true)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setErr('*Failed to send email to your email address. Please try again.')
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={{ height: headerHeight }} />
            <PrimaryText styles={styles.headerText}>Reset Password</PrimaryText>
            {!!err && <SecondaryText styles={styles.errText}>{err}</SecondaryText>}
            <SecondaryText styles={styles.text}>Confirm Email</SecondaryText>
            <Input
                onChangeText={(txt) => setEmail(txt)}
                value={email}
                styles={{ marginBottom: StyleConstants.baseMargin }}
                placeholder='softlete@gmail.com'
            />
            <PrimaryButton onPress={onResetPassword} loading={loading}>{sent ? 'Email Sent' : 'Send'}</PrimaryButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: StyleConstants.baseMargin,
        marginTop: 0,
        flex: 1
    },
    errText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.red,
        marginBottom: 5,
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
        marginBottom: StyleConstants.baseMargin
    },
    text: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.lightBlack,
        marginBottom: 5
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(ResetPassword);