import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AppDispatch } from '../../../App';
import CalendarTodaySvg from '../../assets/CalendarToday';
import { HomeStackScreens } from '../../screens/home/types';
import { INITIATE_WORKOUT_HEADER } from '../../services/workout/actionTypes';
import { WorkoutActionProps, WorkoutProps } from '../../services/workout/types';
import BaseColors from '../../utils/BaseColors';
import Constants from '../../utils/Constants';
import DateTools from '../../utils/DateTools';
import { normalize } from '../../utils/tools';
import SecondaryText from '../elements/SecondaryText';
import StyleConstants from '../tools/StyleConstants';
import WoAdd from './components/WoAdd';
import WoItem from './components/WoItem';

interface Props {
    wos: WorkoutProps[];
    navigation: any;
    dispatch: AppDispatch;
    setViewWorkout: WorkoutActionProps['setViewWorkout'];
}

const HomeWorkouts = ({ wos, navigation, dispatch, setViewWorkout }: Props) => {
    const d = new Date()
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate())

    const onAddWoPress = () => {
        dispatch({
            type: INITIATE_WORKOUT_HEADER, payload: {
                date: DateTools.dateToStr(today)
            }
        })
        navigation.navigate(HomeStackScreens.WorkoutHeader)
    }

    const onNavToDashboard = () => {
        navigation.navigate(HomeStackScreens.Calendar)
    }

    const onNavToWorkout = (workoutUid: string) => {
        setViewWorkout(workoutUid)
        navigation.navigate(HomeStackScreens.Workout)
    }

    const renderToday = () => {
        return Constants.daysOfWeek[today.getDay()]
    }

    return (
        <View style={styles.container}>
            <View style={styles.woHeaderContainer}>
                <SecondaryText styles={styles.today} bold>{renderToday()}</SecondaryText>
                <Pressable style={styles.cal} hitSlop={5} onPress={onNavToDashboard}>
                    <CalendarTodaySvg fillColor={BaseColors.black} />
                </Pressable>
            </View>
            <View style={styles.woContainer}>
                <ScrollView pagingEnabled style={{ height: normalize.height(4.5) }}>
                    {
                        wos.length > 0 ? (
                            wos.map(w => (
                                <WoItem wo={w} onPress={() => onNavToWorkout(w._id)} key={w._id} />
                            ))
                        ) : (
                            <WoItem onPress={() => undefined} />
                        )
                    }
                    <WoAdd onPress={onAddWoPress} />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StyleConstants.smallMargin
    },
    cal: {
        height: normalize.width(18),
        width: normalize.width(18)
    },
    filterContainer: {
        flexDirection: 'row'
    },
    today: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.black,
        textTransform: 'capitalize',
    },
    woContainer: {
        paddingTop: 10,
        paddingBottom: 10
    },
    woHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: StyleConstants.baseMargin,
        marginRight: StyleConstants.baseMargin,
    },
    addText: {
        fontSize: 12,
        color: BaseColors.white
    },
    addContainer: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        backgroundColor: BaseColors.primary,
        alignItems: 'center'
    }
})
export default HomeWorkouts;