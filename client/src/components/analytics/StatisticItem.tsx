import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ExercisesAnalyticsProps } from '../../services/misc/types';
import SecondaryText from '../elements/SecondaryText';
import StyleConstants from '../tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import { AnalyticsFilters } from './types';
import { normalize } from '../../utils/tools';
import PrimaryText from '../elements/PrimaryText';
import { ProgressCircle } from 'react-native-svg-charts';


interface Props {
    filter: AnalyticsFilters;
    filterItem: AnalyticsFilters;
    filterText: string;
    setFilter: React.Dispatch<React.SetStateAction<AnalyticsFilters>>;
    result: string;
    progress: number;
}


const StatisticItem = ({ filter, setFilter, filterItem, result, progress, filterText }: Props) => {
    return (
        <Pressable style={[styles.container, {
            backgroundColor: filter === filterItem ? BaseColors.primary : BaseColors.white
        }, filter === filterItem ? BaseColors.primaryBoxShadow : undefined]}
            onPress={() => setFilter(filterItem)}
        >
            <View style={{ flexDirection: 'row' }}>
                <SecondaryText styles={filter === filterItem ? styles.activeText : styles.text}>{filterText}</SecondaryText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <SecondaryText styles={filter === filterItem ? styles.activeResult : styles.result} bold numberOfLines={1}>{result}</SecondaryText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: StyleConstants.baseMargin,
        borderRadius: StyleConstants.borderRadius,
        marginLeft: 5,
        marginRight: 5,
        flex: 1
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack
    },
    activeText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.white
    },
    result: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.black,
        textAlign: 'right',
        marginTop: 5
    },
    activeResult: {
        fontSize: StyleConstants.mediumFont,
        color: BaseColors.white,
        textAlign: 'right',
        marginTop: 5
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.secondary,
    },
    activeLabel: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.white,
    }
})
export default StatisticItem;