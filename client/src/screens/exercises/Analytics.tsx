import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ReducerProps } from '../../services';
import { fetchExerciseAnalytics } from '../../services/misc/actions';
import { MiscActionProps, AnalyticsProps } from '../../services/misc/types';
import BaseColors from '../../utils/BaseColors';
import PrimaryText from '../../components/elements/PrimaryText';
import StyleConstants from '../../components/tools/StyleConstants';
import DateTools from '../../utils/DateTools';
import AnalyticsGraph from '../../components/analytics/Graph';
import EmptyAnalytics from '../../assets/EmptyAnalytics';
import { normalize } from '../../utils/tools';
import { HomeStackScreens } from '../home/types';
import _ from 'lodash';
import Statistics from '../../components/analytics/Statistics';
import Loading from '../../components/elements/Loading';
import AnalyticsHeader from '../../components/analytics/Header';
import AnalyticsBarChart from '../../components/analytics/BarChart';
import { AnalyticsFilters } from '../../components/analytics/types';


interface Props {
    route: any;
    navigation: any;
    fetchExerciseAnalytics: MiscActionProps['fetchExerciseAnalytics'];
    fetchedAnalytics: AnalyticsProps[];
}

interface ExerciseObjProps {
    [date: string]: number[]
}

const ExerciseAnalytics = ({ route, navigation, fetchExerciseAnalytics, fetchedAnalytics }: Props) => {
    const [analytics, setAnalytics] = useState<AnalyticsProps>();
    const [fromDate] = useState(DateTools.dateToStr(DateTools.getMonthPrevious(new Date(), 12)));
    const [toDate] = useState(DateTools.dateToStr(new Date()));
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = useState<Date[]>([]);
    const [data, setData] = useState<[][]>([])
    const [filter, setFilter] = useState<AnalyticsFilters>(AnalyticsFilters.AVG)

    const onFetchAndInitiate = useCallback(async () => {
        if (!route.params || !route.params.exerciseUid) {
            navigation.goBack()
            return;
        }

        const { athlete, exerciseUid } = route.params;
        setLoading(true)
        //get the most recent data 
        await fetchExerciseAnalytics(fromDate, toDate, [exerciseUid], athlete)
            .then((fetchedAnalytics) => {
                if (fetchedAnalytics && fetchedAnalytics.length > 0) {
                    setAnalytics(fetchedAnalytics[0]);
                    initiateData(fetchedAnalytics[0]);
                } else {
                    setAnalytics(undefined)
                }
            })
            .catch(err => {
                console.log(err)
                setAnalytics(undefined)
            })

        setLoading(false)
    }, [route])

    useEffect(() => {
        onFetchAndInitiate()
    }, [route])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: BaseColors.black,
            headerTitle: 'Analytics'
        })
    }, [analytics, data])

    const initiateData = (analyticsProps: AnalyticsProps) => {
        if (analyticsProps) {
            //dealing with same dates
            const exercisesObj: ExerciseObjProps = _.reduce(analyticsProps.data, (result: any, value) => {
                const key = value.date as string;

                let mapData: number[] = value.data.filter(dta => dta.performVal && !dta.warmup).map(dta => dta.performVal) as number[];

                if (!result[key]) {
                    result[key] = []
                }

                mapData.forEach(m => {
                    result[key].push(m)
                })

                return result
            }, {})


            //[[date, stats]]
            let dataStore: any = []

            for (var key in exercisesObj) {
                if (exercisesObj.hasOwnProperty(key)) {
                    let arrStore: any = [key];
                    let performVals = exercisesObj[key];

                    let mean = _.mean(performVals)
                    let max = _.max(performVals);
                    let min = _.min(performVals);

                    arrStore.push({
                        avg: mean ? mean : 0,
                        max: max ? max : 0,
                        min: min ? min : 0
                    })

                    dataStore.push(arrStore)
                }
            }

            //sort dataStore by date
            const sortedDataStore: any = dataStore.sort((a: any, b: any) => {
                const dateA = DateTools.UTCISOToLocalDate(a[0]);
                const dateB = DateTools.UTCISOToLocalDate(b[0]);
                return dateA.getTime() - dateB.getTime()
            })

            const datesStore: any = _.uniq(sortedDataStore.map((d: any) => {
                const date = DateTools.strToDate(d[0]);
                return date
            }))
            setData(sortedDataStore)
            setDates(datesStore);
        }
    }

    const onNavigateToExercise = () => {
        if (!analytics || !analytics.exercise) return;
        navigation.navigate(HomeStackScreens.Exercise, {
            exercise: analytics.exercise
        })
    }

    const renderData = () => {
        switch (filter) {
            case AnalyticsFilters.LOW:
                return data.map((d: any) => d[1].min)
            case AnalyticsFilters.HIGH:
                return data.map((d: any) => d[1].max)
            case AnalyticsFilters.AVG:
            default:
                return data.map((d: any) => d[1].avg)
        }
    }

    const renderHeaderText = () => {
        switch (filter) {
            case AnalyticsFilters.LOW:
                return "Lowest Per Day"
            case AnalyticsFilters.HIGH:
                return "Highest Per Day"
            case AnalyticsFilters.AVG:
            default:
                return "Average Per Day"
        }
    }

    const renderContent = () => {
        if (loading) return <Loading />

        if (!analytics || data.length < 5) return (
            <View style={styles.emptyContainer}>
                <PrimaryText styles={styles.emptyText}>Not Enough Data To Show.</PrimaryText>
                <View style={{ height: normalize.width(1.5), width: normalize.width(1.5) }}>
                    <EmptyAnalytics />
                </View>
            </View>
        )


        return (
            <View style={{ flex: 1 }}>
                <AnalyticsHeader analytics={analytics} onNavigateToExercise={onNavigateToExercise} />
                <Statistics analytics={analytics} filter={filter} setFilter={setFilter} />
                <ScrollView>
                    <AnalyticsBarChart data={data} filter={filter} />
                    <AnalyticsGraph data={renderData()} dates={dates} />
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderContent()}
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.black
    },
    container: {
        flex: 1,
    },
})

const mapStateToProps = (state: ReducerProps) => ({
    fetchedAnalytics: state.misc.fetchedAnalytics
})

export default connect(mapStateToProps, { fetchExerciseAnalytics })(ExerciseAnalytics);