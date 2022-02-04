import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RulerSvg from '../../assets/RulerSvg';
import { AnalyticsProps } from '../../services/misc/types';
import BaseColors from '../../utils/BaseColors';
import { normalize } from '../../utils/tools';
import StyleConstants from '../tools/StyleConstants';
import PrimaryText from '../elements/PrimaryText';
import SecondaryText from '../elements/SecondaryText';
import { useHeaderHeight } from '@react-navigation/elements';

interface Props {
    onNavigateToExercise: () => void;
    analytics: AnalyticsProps;
}


const AnalyticsHeader = ({ onNavigateToExercise, analytics }: Props) => {
    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView style={[styles.container, { marginTop: headerHeight }]} edges={['left', 'right']}>
            <Pressable onPress={onNavigateToExercise}>
                <PrimaryText styles={styles.name}>{analytics.exercise ? analytics.exercise.name : 'Exercise'}</PrimaryText>
            </Pressable>
            <View style={styles.itemContainer}>
                <View style={styles.svg}>
                    <RulerSvg fillColor={BaseColors.primary} />
                </View>
                <SecondaryText styles={styles.text}>{analytics.exercise ? analytics.exercise.measSubCat : 'none'}</SecondaryText>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin,
        alignItems: 'flex-start',
    },
    name: {
        fontSize: StyleConstants.mediumFont,
        color: BaseColors.black,
        textTransform: 'capitalize',
    },
    itemContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.secondary,
        marginRight: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        textTransform: 'capitalize'
    },
    svg: {
        height: normalize.width(15),
        width: normalize.width(15),
        marginRight: StyleConstants.smallMargin
    }
})
export default AnalyticsHeader;