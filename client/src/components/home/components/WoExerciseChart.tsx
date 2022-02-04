import _, { capitalize } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Chevron from '../../../assets/ChevronSvg';
import { ExerciseProps } from '../../../services/exercises/types';
import { AnalyticsProps } from '../../../services/misc/types';
import BaseColors from '../../../utils/BaseColors';
import Constants from '../../../utils/Constants';
import DateTools from '../../../utils/DateTools';
import { normalize } from '../../../utils/tools';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';
import ExerciseChart from './ExerciseChart';


interface Props {
    analytics: AnalyticsProps[];
    selectedEx?: ExerciseProps;
    chartFilter: string;
    setPicker: React.Dispatch<React.SetStateAction<string | undefined>>;
}


const WoExerciseChart = ({ analytics, selectedEx, chartFilter, setPicker }: Props) => {
    const [data, setData] = useState<{
        date: Date,
        value: number,
    }[]>([]);

    const initData = useCallback(() => {
        //populate data with all of the performed values for the selectedEx
        if (!selectedEx) return setData([]);

        const targetAnalytics = analytics.find(a => a.exerciseUid === selectedEx?._id)

        if (!targetAnalytics) return setData([])

        const numStore: {
            date: Date,
            value: number
        }[] = []

        const sortedData = targetAnalytics.data.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })

        sortedData.forEach(item => {
            let dataStore: number[] = []
            item.data.forEach(d => {
                if (d.performVal && !d.warmup) dataStore.push(d.performVal)
            })
            //calc avg
            let num = 0;

            switch (chartFilter) {
                case 'min':
                    const min = _.min(dataStore)
                    num = min ? _.round(min) : 0
                    break;
                case 'max':
                    const max = _.max(dataStore)
                    num = max ? _.round(max) : 0
                    break;
                case 'avg':
                default:
                    const mean = _.mean(dataStore)
                    num = mean ? _.round(mean) : 0
            }

            //format date 
            const d = DateTools.UTCISOToLocalDate(item.date);

            numStore.push({
                date: d,
                value: num
            });
        })

        setData(numStore)
    }, [analytics, chartFilter, selectedEx])

    useEffect(() => {
        initData()
    }, [analytics, chartFilter, selectedEx])

    const renderLabel = () => {
        return selectedEx && selectedEx.measSubCat ? selectedEx.measSubCat : ''
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <SecondaryText styles={styles.label}>{capitalize(renderLabel())}</SecondaryText>
                <Pressable onPress={() => setPicker('chartFilter')} style={styles.filterContainer} hitSlop={5}>
                    <SecondaryText styles={styles.headerText} bold>{chartFilter} per day</SecondaryText>
                    <View style={styles.chev}>
                        <Chevron strokeColor={BaseColors.lightBlack} />
                    </View>
                </Pressable>
                <View />
            </View>
            <ExerciseChart data={data} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: normalize.height(40),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: StyleConstants.baseMargin,
        marginRight: StyleConstants.baseMargin,
        marginBottom: 5
    },
    label: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.secondary,
        right: '20%'
    },
    headerText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        textTransform: 'capitalize'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chev: {
        width: normalize.width(30),
        height: normalize.width(30),
        transform: [{ rotate: '-90deg' }],
        marginLeft: StyleConstants.smallMargin,
    }
})
export default WoExerciseChart;