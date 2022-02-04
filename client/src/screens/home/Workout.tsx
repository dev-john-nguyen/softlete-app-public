import React, { useEffect, useState, Dispatch, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ReducerProps } from '../../services';
import { connect } from 'react-redux';
import { WorkoutActionProps, WorkoutStatus, WorkoutExerciseProps, ViewWorkoutProps, WorkoutProps, WorkoutTypes, HealthDataProps } from '../../services/workout/types';
import BaseColors from '../../utils/BaseColors';
import { ExerciseProps } from '../../services/exercises/types';
import WorkoutContainer from '../../components/workout/Container';
import { GeneratedProgramProps, ProgramActionProps, ProgramProps } from '../../services/program/types';
import { updateWorkoutStatus, completeWorkout, updateWoHealthData } from '../../services/workout/actions';
import WorkoutHeader from '../../components/workout/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackScreens } from './types';
import MoreSvg from '../../assets/MoreSvg';
import { normalize } from '../../utils/tools';
import StyleConstants from '../../components/tools/StyleConstants';
import Loading from '../../components/elements/Loading';
import { setBanner } from '../../services/banner/actions';
import { BannerTypes } from '../../services/banner/types';
import { ImageProps } from '../../services/user/types';
import OverviewContainer from '../../components/workout/overview/Container';
import { updateProgramWoHealthData } from '../../services/program/actions';
import BackButton from '../../components/BackButton';
import DashboardDemo from '../../components/demo/Demo';
import { DemoStates } from '../../services/global/types';
import { SET_DEMO_STATE } from '../../services/global/actionTypes';

interface Props {
    workout: ViewWorkoutProps;
    route: any;
    navigation: any;
    dispatch: React.Dispatch<any>;
    updateWorkoutStatus: WorkoutActionProps['updateWorkoutStatus'];
    completeWorkout: WorkoutActionProps['completeWorkout'];
    genPrograms: GeneratedProgramProps[];
    targetProgram: ProgramProps;
    updateWoHealthData: WorkoutActionProps['updateWoHealthData'];
    updateProgramWoHealthData: ProgramActionProps['updateProgramWoHealthData'];
    demoState: DemoStates;
}

//notes
///route params will determine if it's a new workout

const Workout = ({ route, navigation, workout, updateWorkoutStatus, completeWorkout, genPrograms, targetProgram, dispatch, updateWoHealthData, updateProgramWoHealthData, demoState }: Props) => {
    const [program, setProgram] = useState<GeneratedProgramProps>();

    const handleInitiateWorkout = useCallback(async () => {
        if (workout) {
            //find generated program
            const foundProgram = genPrograms.find(p => p._id === workout.programUid);

            if (foundProgram) {
                setProgram(foundProgram)
            } else {
                setProgram(undefined)
            }
        }
    }, [workout, genPrograms])

    const onBackButtonPress = () => {
        if (route.params?.goBackScreen) {
            const { workouts, ...rest } = targetProgram;
            navigation.navigate(route.params.goBackScreen, {
                program: rest
            })
            return;
        }

        if (route.params?.directToDash) {
            navigation.navigate(HomeStackScreens.Home, {
                directToDash: true
            })
            return;
        }

        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            navigation.navigate(HomeStackScreens.Home)
        }

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => workout?.status !== WorkoutStatus.inProgress && (
                <Pressable style={styles.menu} onPress={() => navigation.navigate(HomeStackScreens.WorkoutModal)}>
                    <MoreSvg fillColor={BaseColors.black} />
                </Pressable>
            ),
            headerLeft: () => <BackButton onPress={onBackButtonPress} />
        })
    }, [navigation, route, workout])

    useEffect(() => {
        handleInitiateWorkout()
    }, [workout])

    const onUpdateStatus = async (status: WorkoutStatus) => {
        if (!workout || workout.programTemplateUid) return;
        if (status === workout.status) return;

        if (status === WorkoutStatus.completed) {
            //don't allow in progress if not workouts
            if (workout.type === WorkoutTypes.TraditionalStrengthTraining && (!workout.exercises || workout.exercises.length < 1)) {
                return dispatch(setBanner(BannerTypes.warning, "Please add an exercise."))
            }
        }

        if (status === WorkoutStatus.inProgress && demoState) {
            dispatch({ type: SET_DEMO_STATE, payload: DemoStates.WO_PROGRESS })
        }

        await updateWorkoutStatus(workout._id, status)
            .catch((err) => {
                console.log(err);
            })
    }

    const onCompleteWorkout = async (strainRating: number, reflection: string, image?: ImageProps, exercises?: WorkoutExerciseProps[] | void) => {
        if (!workout) return;

        if (workout.type === WorkoutTypes.TraditionalStrengthTraining && (!workout.exercises || workout.exercises.length < 1)) return dispatch(setBanner(BannerTypes.warning, "There are no exercises in this workout. Cannot complete"))

        const completedWorkout: WorkoutProps = {
            ...workout,
            exercises: exercises ? exercises : workout.exercises
        }

        if (demoState) {
            dispatch({ type: SET_DEMO_STATE, payload: DemoStates.WO_COMPLETED })
        }

        await completeWorkout(completedWorkout, strainRating, reflection, image)
            .catch((err) => {
                console.log(err)
            })
    }

    const onNavigateToAddExercise = (group: number, order: number) => {
        if (!workout) return;
        navigation.navigate(HomeStackScreens.SearchExercises, {
            group,
            order,
            workoutUid: workout._id,
            programTemplateUid: workout.programTemplateUid,
            goBackScreen: route.params?.goBackScreen
        })
    }

    const onUpdateWoHealthData = async (workoutUid: string, data: HealthDataProps) => {
        await updateWoHealthData(workoutUid, data).catch(err => console.log(err))
    }

    const onNavigateToExercise = (exercise: ExerciseProps) => {
        navigation.navigate(HomeStackScreens.Exercise, { exercise })
    }

    if (!workout) return <Loading />

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <DashboardDemo screen={HomeStackScreens.Workout} />
            {
                workout.type === WorkoutTypes.TraditionalStrengthTraining ?
                    <WorkoutContainer
                        isProgramTemplate={workout.programTemplateUid ? true : false}
                        workout={workout}
                        onCompleteWorkout={onCompleteWorkout}
                        onNavigateToAddExercise={onNavigateToAddExercise}
                        onNavigateToExercise={onNavigateToExercise}
                        navigation={navigation}
                    /> :
                    <OverviewContainer
                        navigation={navigation}
                        workout={workout}
                        onCompleteWorkout={onCompleteWorkout}
                        updateWoHealthData={onUpdateWoHealthData}
                    />
            }
            <WorkoutHeader
                likeUids={workout.likeUids ? workout.likeUids : []}
                workout={workout}
                program={program}
                onUpdateStatus={onUpdateStatus}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerContainer: {
        backgroundColor: BaseColors.white,
        zIndex: 0
    },
    menu: {
        width: normalize.width(25),
        height: normalize.width(25),
        marginRight: StyleConstants.baseMargin
    },
})

const mapStateToProps = (state: ReducerProps) => ({
    workouts: state.workout.workouts,
    workout: state.workout.viewWorkout,
    genPrograms: state.program.generatedPrograms,
    targetProgram: state.program.targetProgram,
    demoState: state.global.demoState
})


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updateWorkoutStatus: async (workoutUid: string, status: WorkoutStatus) => dispatch(updateWorkoutStatus(workoutUid, status)),
        completeWorkout: async (workout: WorkoutProps, strainRating: number, reflection: string, image?: ImageProps) => dispatch(completeWorkout(workout, strainRating, reflection, image)),
        updateWoHealthData: async (workoutUid: string, data: HealthDataProps) => dispatch(updateWoHealthData(workoutUid, data)),
        updateProgramWoHealthData: async (programTemplateUid: string, workoutUid: string, data: HealthDataProps) => dispatch(updateProgramWoHealthData(programTemplateUid, workoutUid, data)),
        dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Workout);