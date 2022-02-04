import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReducerProps } from '../../services';
import { connect } from 'react-redux';
import StyleConstants from '../../components/tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import SecondaryText from '../../components/elements/SecondaryText';
import { UserProps } from '../../services/user/types';
import Products from '../../utils/Products';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/elements/PrimaryText';

interface Props {
    user: UserProps
}


const Subscription = ({ user }: Props) => {
    const headerHeight = useHeaderHeight();

    const renderSubscription = () => {
        if (user.subscriptionType) {
            switch (user.subscriptionType) {
                case Products.monthlyId_00_99:
                    return "$0.99"
                case Products.monthlyId_05_99:
                    return "$5.99"
                default:
                    return 'Free'
            }
        }
        return "Free"
    }
    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={{ height: headerHeight }} />
            <PrimaryText styles={styles.headerText}>Subscription</PrimaryText>
            <SecondaryText styles={styles.header} bold>All Access ({renderSubscription()}) Subscription</SecondaryText>
            <SecondaryText styles={styles.text}>With this subscription you have all access to the tools that we offer. Thank you for subscribing :).</SecondaryText>
            <SecondaryText styles={styles.header} bold>How To Update Subscription?</SecondaryText>
            <SecondaryText styles={styles.text}>To update your subscription, go to settings on your phone, tap the My Account button or your profile picture at the top right, then tap Subscriptions. You can change or cancel an existing subscription, or resubscribe to an expired subscription.</SecondaryText>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: StyleConstants.baseMargin,
        paddingTop: 0,
        flex: 1,
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
    },
    header: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginTop: StyleConstants.baseMargin
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginTop: 5
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(Subscription);