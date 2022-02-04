import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WorkoutProps, WorkoutActionProps } from '../../services/workout/types';
import WorkoutPreviewList from '../workout/preview/PreviewList';
import { AppDispatch } from '../../../App';
import { INITIATE_WORKOUT_HEADER, SET_COPY_WORKOUT } from '../../services/workout/actionTypes';
import { ReducerProps } from '../../services';
import { setViewWorkout } from '../../services/workout/actions';
import { connect } from 'react-redux';
import { ProgramHeaderProps } from '../../services/program/types';
import StyleConstants from '../tools/StyleConstants';
import _ from 'lodash';
import { PinExerciseProps } from '../../services/misc/types';
import DateTools from '../../utils/DateTools';
import { HomeStackScreens } from '../../screens/home/types';
import BaseColors from '../../utils/BaseColors';
import { setTargetProgram } from '../../services/program/actions';
import { updatePinExercises } from '../../services/user/actions';
import Constants from '../../utils/Constants';
import SecondaryText from '../elements/SecondaryText';


interface Props {
    selectedDate: string;
    workouts: WorkoutProps[];
    dispatch: AppDispatch;
    navigation: any;
    setViewWorkout: WorkoutActionProps['setViewWorkout'];
    loading: boolean;
}

const DashboardContent = ({ workouts, dispatch, navigation, setViewWorkout, selectedDate, loading }: Props) => {
    const onNavToAddWorkout = () => {
        dispatch({
            type: INITIATE_WORKOUT_HEADER, payload: {
                date: selectedDate
            }
        })
        navigation.navigate(HomeStackScreens.WorkoutHeader, { directToDash: true })
    }

    const onNavToViewWorkout = async (workoutUid: string) => {
        setViewWorkout(workoutUid)
        navigation.navigate(HomeStackScreens.Workout, { directToDash: true })
    }


    const onCopyWorkout = (workoutUid: string) => {
        dispatch({ type: SET_COPY_WORKOUT, payload: workoutUid })
    }

    const renderDate = () => {
        const d = DateTools.strToDate(selectedDate);
        if (!d) return;
        return (
            <View style={styles.dateContainer}>
                <SecondaryText styles={styles.date} bold>{Constants.months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()}</SecondaryText>
                <SecondaryText styles={styles.day} bold>{Constants.daysOfWeek[d.getDay()]}</SecondaryText>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading ?
                <ActivityIndicator size='small' color={BaseColors.primary} />
                :
                <View style={{ flex: 1 }}>
                    {renderDate()}
                    <WorkoutPreviewList
                        workouts={workouts}
                        onPress={onNavToViewWorkout}
                        onLongPress={onCopyWorkout}
                        onAddWorkout={onNavToAddWorkout}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin,
        paddingTop: StyleConstants.smallMargin
    },
    day: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        textTransform: 'capitalize'
    },
    date: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
    },
    dateContainer: {
        marginBottom: StyleConstants.smallMargin,
        paddingBottom: 5,
        borderBottomColor: BaseColors.lightGrey,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

const mapStateToProps = (state: ReducerProps) => ({
    selectedDate: state.workout.selectedDate,
    workouts: state.workout.selectedDateWorkouts,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        setViewWorkout: async (workoutUid: string) => dispatch(setViewWorkout(workoutUid)),
        setTargetProgram: (programProps: ProgramHeaderProps) => dispatch(setTargetProgram(programProps)),
        updatePinExercises: (pinProps: PinExerciseProps, pin: boolean) => dispatch(updatePinExercises(pinProps, pin)),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);