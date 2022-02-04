import _, { endsWith } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import ClockSvg from '../../assets/ClockSvg';
import FireSvg from '../../assets/FireSvg';
import GraphSvg from '../../assets/GraphSvg';
import HeartSvg from '../../assets/HeartSvg';
import RulerSvg from '../../assets/RulerSvg';
import { HomeStackScreens } from '../../screens/home/types';
import { HealthDataProps } from '../../services/workout/types';
import BaseColors from '../../utils/BaseColors';
import DateTools from '../../utils/DateTools';
import { normalize } from '../../utils/tools';
import StyleConstants from '../tools/StyleConstants';
import { convertMsToTime } from '../workout/overview/helpers/format';
import StatsItem from './components/StatsItem';
import AppleHealthKit, { HealthInputOptions, HealthValue } from 'react-native-health'
import PhoneSvg from '../../assets/PhoneSvg';
import HeartRateChart from '../workout/overview/HeartRateChart';
import SecondaryText from '../elements/SecondaryText';

interface Props {
    healthData: HealthDataProps[];
    navigation: any;
}

const HomeStats = ({ healthData, navigation }: Props) => {
    const [cal, setCal] = useState(0);
    const [basal, setBasal] = useState(0);
    const [hrs, setHrs] = useState<number[]>([])
    const [tdCal, setTdCal] = useState(0);
    const [dis, setDis] = useState(0);
    const [dur, setDur] = useState(0);
    const [avgHr, setAvgHr] = useState(0);
    const [hrDates, setHrDates] = useState<string[]>([])
    const [showHrs, setShowHrs] = useState(false);
    const d = new Date()
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate())


    const initHealthData = useCallback(() => {
        let calTotal = 0;
        let disTotal = 0;
        let durTotal = 0;
        let heartRates: number[] = [];

        const data = healthData?.filter(d => {
            if (!d.date) return;
            const hDate = new Date(d.date);
            return DateTools.isSameDate(hDate, today)
        })

        data.forEach((d) => {
            calTotal += d.calories;
            disTotal += d.distance;
            durTotal += d.duration;
            d.heartRates?.forEach(h => {
                heartRates.push(h)
            })
        })

        setCal(_.round(calTotal));
        setDis(_.round(disTotal));
        setDur(_.round(durTotal))
        setAvgHr(calcHrAvg(heartRates))
    }, [healthData])

    const fetchHealthData = () => {
        const options: HealthInputOptions = {
            startDate: today.toISOString()
        }

        AppleHealthKit.getBasalEnergyBurned(
            (options),
            (err: Object, results: HealthValue[]) => {
                if (err) {
                    console.log(err)
                    return
                }

                let totalBasal = 0
                results.forEach(r => {
                    totalBasal += r.value
                })

                setBasal(_.round(totalBasal))
            },
        )

        AppleHealthKit.getActiveEnergyBurned(
            (options),
            (err: Object, results: HealthValue[]) => {
                if (err) {
                    return
                }
                let totalActive = 0
                results.forEach(r => {
                    totalActive += r.value
                })
                setTdCal(_.round(totalActive))
            },
        )

        let heartOptions = {
            unit: 'bpm', // optional; default 'bpm'
            startDate: today.toISOString(), // required
            ascending: false, // optional; default false,
        } as HealthInputOptions

        AppleHealthKit.getHeartRateSamples(
            heartOptions,
            (callbackError: string, results: HealthValue[]) => {
                /* Samples are now collected from HealthKit */
                if (callbackError) {
                    console.log(callbackError)
                    return;
                }

                //get per hour
                results.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                setHrs(results.map(r => r.value))
                const hours = results.map(r => new Date(r.startDate).getHours().toString())
                setHrDates(_.uniq(hours))
            },
        )

    }

    const calcHrAvg = (data: number[]) => {
        const avg = _.mean(data);
        return _.round(avg ? avg : 0);
    }

    useEffect(() => {
        initHealthData()
        fetchHealthData()
    }, [healthData])

    const onNavigateToOverview = () => navigation.navigate(HomeStackScreens.DataOverview);

    if (showHrs) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <SecondaryText styles={styles.headerText} bold>Health</SecondaryText>
                    <Pressable style={styles.graphContainer} onPress={onNavigateToOverview} hitSlop={5}>
                        <GraphSvg fillColor={BaseColors.black} />
                    </Pressable>
                </View>
                <View style={styles.chartContainer}>
                    <HeartRateChart data={hrs} onBack={() => setShowHrs(false)} dates={hrDates} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <SecondaryText styles={styles.headerText} bold>Health</SecondaryText>
                <Pressable style={styles.graphContainer} onPress={onNavigateToOverview} hitSlop={5}>
                    <GraphSvg fillColor={BaseColors.black} />
                </Pressable>
            </View>
            <ScrollView style={styles.contentConatiner} horizontal contentContainerStyle={{ paddingRight: StyleConstants.baseMargin }}>
                <StatsItem num={`${cal} kcal`} label={'Workouts'} svg={<FireSvg fillColor={BaseColors.primary} />} />
                <StatsItem num={`${dis} mi`} label={'Distance'} svg={<RulerSvg fillColor={BaseColors.primary} />} />
                <StatsItem num={`${convertMsToTime(dur)}`} label={'Activity'} svg={<ClockSvg fillColor={BaseColors.primary} />} />

                {
                    hrs.length > 0 ? (
                        <StatsItem
                            num={`${calcHrAvg(hrs)} bpm`}
                            label={'Avg HR'}
                            svg={<HeartSvg fillColor={BaseColors.primary} />}
                            topLeftSvg={<PhoneSvg fillColor={BaseColors.secondary} />}
                            topRightSvg={<GraphSvg fillColor={BaseColors.primary} />}
                            onPress={() => setShowHrs(true)}
                        />
                    ) : (
                        <StatsItem num={`${avgHr} bpm`} label={'Avg'} svg={<HeartSvg fillColor={BaseColors.primary} />} />
                    )
                }

                {
                    basal > 0 && (
                        <StatsItem
                            num={`${basal + tdCal} kcal`}
                            label={'Total'}
                            svg={<FireSvg fillColor={BaseColors.primary} />}
                            topLeftSvg={<PhoneSvg fillColor={BaseColors.secondary} />}

                        />
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StyleConstants.baseMargin,
    },
    chartContainer: {
        marginRight: StyleConstants.baseMargin,
        marginLeft: StyleConstants.baseMargin,
        marginTop: StyleConstants.smallMargin
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: StyleConstants.baseMargin,
        marginLeft: StyleConstants.baseMargin,
        marginBottom: StyleConstants.smallMargin
    },
    headerText: {
        color: BaseColors.black,
        fontSize: StyleConstants.smallMediumFont
    },
    monthContainer: {
        borderColor: BaseColors.primary,
        borderWidth: 1,
        borderRadius: 100,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    monthText: {
        color: BaseColors.primary,
        fontSize: StyleConstants.extraSmallFont
    },
    contentConatiner: {
        flexDirection: 'row',
        paddingRight: StyleConstants.baseMargin,
        paddingLeft: StyleConstants.baseMargin
    },
    graphContainer: {
        width: normalize.width(20),
        height: normalize.width(20)
    }
})
export default HomeStats;