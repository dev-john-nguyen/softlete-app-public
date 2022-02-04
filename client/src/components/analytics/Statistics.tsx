import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnalyticsProps, ExercisesAnalyticsProps } from '../../services/misc/types';
import StyleConstants from '../tools/StyleConstants';
import { AnalyticsFilters } from './types';
import StatisticItem from './StatisticItem';
import { MeasSubCats } from '../../services/exercises/types';


interface Props {
    analytics: AnalyticsProps;
    filter: AnalyticsFilters;
    setFilter: React.Dispatch<React.SetStateAction<AnalyticsFilters>>;
}



const Statistics = ({ analytics, filter, setFilter }: Props) => {

    const renderAbbrevMeas = () => {
        const measKeys = Object.keys(MeasSubCats);
        //@ts-ignore
        const abbrev = measKeys.find((k) => MeasSubCats[k] === analytics.exercise?.measSubCat)
        if (abbrev) {
            //@ts-ignore
            return abbrev
        } else {
            if (analytics.exercise) {
                return analytics.exercise.measSubCat
            } else {
                return ''
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatisticItem
                filterItem={AnalyticsFilters.AVG}
                filter={filter}
                setFilter={setFilter}
                filterText={'Avg'}
                result={analytics ? analytics.analytics.avg.toString() + ' ' + renderAbbrevMeas() : '0'}
                progress={.5}
            />
            <StatisticItem
                filterItem={AnalyticsFilters.LOW}
                filter={filter}
                filterText={'Low'}
                setFilter={setFilter}
                result={analytics ? analytics.analytics.min.toString() + ' ' + renderAbbrevMeas() : '0'}
                progress={.1}
            />
            <StatisticItem
                filterItem={AnalyticsFilters.HIGH}
                filter={filter}
                setFilter={setFilter}
                filterText={'Max'}
                result={analytics ? analytics.analytics.max.toString() + ' ' + renderAbbrevMeas() : '0'}
                progress={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: StyleConstants.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
export default Statistics;