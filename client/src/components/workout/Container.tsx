import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { WorkoutExerciseProps, WorkoutExerciseDataProps, WorkoutActionProps, DataArrProps, WorkoutStatus, ViewWorkoutProps } from '../../services/workout/types';
import WorkoutNavbar from './Navbar';
import ExercisesContainer from './exercises/Container';
import _ from 'lodash';
import Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { removeWorkoutExercise, updateWoHealthData, updateWorkoutExerciseData, updateWorkoutExercises } from '../../services/workout/actions';
import { removeProgramWorkoutExercise, updateProgramExerciseData } from '../../services/program/actions';
import { ProgramActionProps } from '../../services/program/types';
import { ReducerProps } from '../../services';
import { ExerciseProps } from '../../services/exercises/types';
import StyleConstants from '../tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import { normalize } from '../../utils/tools';
import { ImageProps } from '../../services/user/types';
import PlusSvg from '../../assets/PlusSvg';

interface Props {
    isProgramTemplate?: boolean;
    workout: ViewWorkoutProps;
    updateWorkoutExerciseData?: WorkoutActionProps['updateWorkoutExerciseData'];
    onCompleteWorkout?: (strainRating: number, reflection: string, image?: ImageProps, exercises?: WorkoutExerciseProps[] | void) => Promise<void>;
    updateWorkoutExercises?: WorkoutActionProps['updateWorkoutExercises'];
    onNavigateToAddExercise?: (group: number, order: number) => void;
    updateProgramExerciseData: ProgramActionProps['updateProgramExerciseData'];
    onNavigateToExercise: (exercise: ExerciseProps) => void;
    removeWorkoutExercise: WorkoutActionProps['removeWorkoutExercise'];
    athlete?: boolean;
    navigation: any;
    removeProgramWorkoutExercise: ProgramActionProps['removeProgramWorkoutExercise'];
    updateWoHealthData: WorkoutActionProps['updateWoHealthData']
}


const WorkoutContainer = ({ workout, navigation, updateWorkoutExerciseData, onCompleteWorkout, onNavigateToAddExercise, isProgramTemplate, updateProgramExerciseData, onNavigateToExercise, athlete, removeWorkoutExercise, removeProgramWorkoutExercise, updateWoHealthData }: Props) => {
    const [groupKeys, setGroupKeys] = useState<number[]>([]);
    const [groupState, setGroupState] = useState({
        prev: 0,
        cur: 0
    });
    const [navGroupState, setNavGroupState] = useState({ group: 0 })
    const [exercises, setExercises] = useState<WorkoutExerciseProps[]>([]);
    const [curEx, setCurEx] = useState<WorkoutExerciseProps>()
    const navIsActive = useRef(false);
    const mount = useRef(false);
    const saving = useRef(false);
    const statusRef = useRef('');
    const exercisePropsRef: any = useRef([])

    const handleUpdateWorkoutStates = useCallback(() => {
        if (!workout.exercises) return;
        let cloneExs = _(workout.exercises).cloneDeep();
        cloneExs = _.sortBy(cloneExs, (e) => [e.group, e.order]);
        let groupCount = 0;
        let prevGroup = 0;

        cloneExs.forEach((e, i) => {
            if (i === 0) {
                prevGroup = e.group;
                e.group = groupCount;
            } else {
                if (prevGroup !== e.group) {
                    groupCount++
                }
                prevGroup = e.group
                e.group = groupCount
            }
        })

        const keys = _.sortedUniq(_.sortBy(cloneExs.map(e => e.group)))

        setExercises(cloneExs)
        setGroupKeys(keys)
    }, [workout.exercises])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <WorkoutNavbar
                    status={workout.status}
                    groupKeys={groupKeys}
                    onGroupPress={(key) => setNavGroupState({ group: key })}
                    curGroup={groupState.cur}
                    onAddExercise={onAddExercise}
                    athlete={athlete}
                />
            )
        })
    }, [athlete, workout, groupKeys, groupState])

    useEffect(() => {
        handleUpdateWorkoutStates();
        exercisePropsRef.current = workout.exercises;
    }, [workout.exercises])


    useEffect(() => {
        mount.current = true

        const saveInterval = setInterval(() => {
            saveExercisesData()
        }, Constants.autoSaveDuration);

        return () => {
            mount.current = false
            clearInterval(saveInterval)
            saveExercisesData()
        }
    }, [])

    useEffect(() => {
        if (statusRef.current !== workout.status) {
            statusRef.current = workout.status;
            navIsActive.current = true;
            setGroupState({
                prev: 0,
                cur: 0
            })
            setNavGroupState({ group: 0 })
        }
    }, [workout])

    const saveExercisesData = async () => {
        if (athlete || !updateWorkoutExerciseData || saving.current) return;
        saving.current = true;

        let stateExercises: WorkoutExerciseProps[] = [];
        //need to get the most up to date state of exercises
        setExercises((e) => {
            stateExercises = [...e]
            return e
        })

        const stateData = stateExercises.map(e => {
            return {
                _id: e._id,
                tempId: e.tempId,
                calcRef: e.calcRef ? parseFloat(e.calcRef.toString()) : 0,
                data: e.data.map((d) => ({
                    ...d,
                    predictVal: d.predictVal ? parseFloat(d.predictVal.toString()) : 0,
                    performVal: d.performVal ? parseFloat(d.performVal.toString()) : 0
                }))
            }
        })

        const refData = exercisePropsRef.current?.map((e: WorkoutExerciseProps) => {
            return {
                _id: e._id,
                tempId: e.tempId,
                calcRef: e.calcRef ? parseFloat(e.calcRef.toString()) : 0,
                data: e.data.map((d) => ({
                    ...d,
                    predictVal: d.predictVal ? parseFloat(d.predictVal.toString()) : 0,
                    performVal: d.performVal ? parseFloat(d.performVal.toString()) : 0
                }))
            }
        })

        const changes = _.differenceWith(stateData, refData, _.isEqual);

        if (changes.length < 1) {
            saving.current = false;
            return
        }

        const dataArr: DataArrProps[] = changes.filter((e) => e._id || e.tempId).map(e => (
            {
                _id: e._id ? e._id : '',
                tempId: e.tempId,
                calcRef: e.calcRef ? parseFloat(e.calcRef.toString()) : 0,
                data: e.data.map((d) => ({
                    ...d,
                    predictVal: d.predictVal ? parseFloat(d.predictVal.toString()) : 0,
                    performVal: d.performVal ? parseFloat(d.performVal.toString()) : 0
                }))
            }
        ))

        let res: undefined | void | WorkoutExerciseProps[];

        if (dataArr.length > 0) {
            if (isProgramTemplate) {
                //save to program
                res = await updateProgramExerciseData(dataArr).catch(err => console.log(err))
            } else {
                //save to real workout
                res = await updateWorkoutExerciseData(dataArr).catch(err => console.log(err))
            }
        }

        saving.current = false
        return res;
    }

    const onGroupSelect = (g: number) => {
        navIsActive.current = true;
        setGroupState(s => ({
            prev: s.cur,
            cur: g
        }))
    };

    const onUpdateData = (updatedData: WorkoutExerciseDataProps[], index: number) => {
        if (athlete) return;
        exercises[index].data = [...updatedData]
        setExercises([...exercises])
    }

    const onCalcRefUpdate = (calc: number | string, index: number) => {
        if (athlete) return;
        exercises[index].calcRef = calc as number //but this is actually a string;
        exercises[index].data = exercises[index].data.map(d => {
            //take percentage and multiply by calc ref to get predicted val
            let predictVal = 0;
            if (d.pct) {
                let val = (d.pct / 100) * parseFloat(calc as string)
                predictVal = parseFloat(val.toFixed(2))
            }
            return {
                ...d,
                predictVal: predictVal ? predictVal : 0
            }
        })
        setExercises([...exercises])
    }

    const onAddExercise = (newGroup?: Boolean) => {
        if (workout.status === WorkoutStatus.completed || athlete || !onNavigateToAddExercise) return;

        let groupProps = 0;

        let keys: number[] = [];

        setGroupKeys(k => {
            keys = k
            return k
        })

        if (newGroup) {
            if (keys.length < 1) {
                groupProps = 0
            } else {
                //get the last group and plus one
                groupProps = keys[keys.length - 1] + 1
            }
        } else {
            groupProps = groupState.cur;
        }
        const order = newGroup ? 0 : exercises ? exercises.length - 1 : 0;
        //save exercise data if there are any changes
        saveExercisesData();
        onNavigateToAddExercise(groupProps, order);
    }

    const handleOnCompleteWorkout = async (strainRating: number, reflection: string, image?: ImageProps) => {
        if (athlete) return;
        //cannot complete a program workout
        if (isProgramTemplate || !onCompleteWorkout) return;
        const res = await saveExercisesData().catch(err => console.log(err));
        await onCompleteWorkout(strainRating, reflection, image, res)
    }

    const onRemoveExercise = async (exercise: WorkoutExerciseProps) => {
        if (isProgramTemplate) {
            await removeProgramWorkoutExercise(exercise)
        } else {
            await removeWorkoutExercise(exercise)
        }
    }

    const shouldRenderAddCom = () => {
        if (athlete) return false;
        if (workout.status === WorkoutStatus.pending) return true;
        if (workout.programTemplateUid) return true;
        return false;
    }

    return (
        <View style={styles.container}>
            <ExercisesContainer
                updateWoHealthData={updateWoHealthData}
                exercises={exercises}
                onUpdateData={onUpdateData}
                curGroup={groupState.cur}
                onGroupSelect={onGroupSelect}
                onCompleteWorkout={handleOnCompleteWorkout}
                navIsActive={navIsActive}
                workout={workout}
                setCurEx={setCurEx}
                onNavigateToExercise={onNavigateToExercise}
                onCalcRefUpdate={onCalcRefUpdate}
                athlete={athlete}
                removeWorkoutExercise={onRemoveExercise}
                navGroupState={navGroupState}
            />
            {shouldRenderAddCom() && (
                <Pressable style={({ pressed }) => [styles.addContainer, { backgroundColor: pressed ? BaseColors.lightPrimary : BaseColors.primary }]} onPress={() => onAddExercise()}>
                    <PlusSvg strokeColor={BaseColors.white} />
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
    },
    addContainer: {
        height: normalize.width(8),
        width: normalize.width(8),
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: StyleConstants.baseMargin
    },
})

const mapStateToProps = (state: ReducerProps) => ({
})

export default connect(mapStateToProps, { updateWorkoutExerciseData, updateWorkoutExercises, updateProgramExerciseData, removeWorkoutExercise, removeProgramWorkoutExercise, updateWoHealthData })(WorkoutContainer);