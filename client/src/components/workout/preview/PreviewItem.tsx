import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import MoreSvg from "../../../assets/MoreSvg";
import { WorkoutProps, WorkoutStatus, WorkoutExerciseProps, WorkoutTypes } from "../../../services/workout/types";
import BaseColors from "../../../utils/BaseColors";
import { normalize } from "../../../utils/tools";
import PrimaryText from "../../elements/PrimaryText";
import SecondaryText from "../../elements/SecondaryText";
import StyleConstants from "../../tools/StyleConstants";
import PreviewAerobic from "./PreviewAerobic";
import WorkoutPreviewSvg from "./PreviewSvg";


interface Props {
    workout: Omit<WorkoutProps, 'date'>;
    onPress: (workoutUid: string) => void;
    onLongPress?: (workoutUid: string) => void;
    athlete?: boolean;
}


const WorkoutPreviewItem = ({ workout, onPress, onLongPress, athlete }: Props) => {
    const [copied, setCopied] = useState(false);
    const mount = useRef(false);

    useLayoutEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        }
    }, [])

    const renderColor = (s: WorkoutStatus) => {
        if (!s) return BaseColors.primary;
        switch (s) {
            case WorkoutStatus.completed:
                return BaseColors.green
            case WorkoutStatus.inProgress:
                return BaseColors.primary
            case WorkoutStatus.pending:
                return BaseColors.secondary
            default:
                return BaseColors.primary
        }
    }

    const renderSecondaryColor = (s: WorkoutStatus) => {
        if (!s) return BaseColors.primary;
        switch (s) {
            case WorkoutStatus.completed:
                return BaseColors.green
            case WorkoutStatus.inProgress:
                return BaseColors.primary
            case WorkoutStatus.pending:
                return BaseColors.secondary
            default:
                return BaseColors.primary
        }
    }

    const onItemLongPress = (workoutUid: string) => {
        if (athlete) return;

        if (onLongPress) {
            setCopied(true)
            onLongPress(workoutUid)
            setTimeout(() => {
                mount.current && setCopied(false)
            }, 1000)
        }
    }

    const copiedAnimatedStyles = useAnimatedStyle(() => {
        return {
            opacity: copied ? withTiming(1) : withTiming(0),
            position: 'absolute',
            alignSelf: 'center',
            bottom: copied ? withTiming('50%') : withTiming('20%'),
            backgroundColor: workout.status === WorkoutStatus.completed ? BaseColors.green : BaseColors.primary,
            zIndex: 100,
            padding: 10,
            borderRadius: 10
        }
    }, [copied])

    const renderExercises = useCallback((e: WorkoutExerciseProps, i: number) => {
        const { exercise, data } = e;
        const sets = data.length;
        const fontColor = renderSecondaryColor(workout.status)
        return (
            <View key={e._id ? e._id : i} style={styles.exerciseContainer}>
                <SecondaryText styles={[styles.exerciseText, {
                    color: BaseColors.lightBlack
                }]} numberOfLines={1}>{exercise ? exercise.name : 'exercise'}</SecondaryText>
                <SecondaryText styles={[styles.text, {
                    color: fontColor
                }]}>{sets} set(s)</SecondaryText>
            </View>
        )
    }, [workout])



    const renderContent = useCallback(() => {

        if (workout.type === WorkoutTypes.TraditionalStrengthTraining) {
            return (
                <>
                    {
                        workout.exercises && workout.exercises.filter((e, i) => i < 4).map(renderExercises)
                    }
                    {
                        workout.exercises && workout.exercises.length > 4 && (
                            <View style={styles.moreSvg}>
                                <MoreSvg fillColor={BaseColors.secondary} />
                            </View>
                        )
                    }
                </>
            )
        }

        return (
            <PreviewAerobic data={workout.healthData} color={renderColor(workout.status)} />
        )
    }, [workout])


    return (
        <Pressable
            onPress={() => onPress(workout._id)}
            onLongPress={() => onItemLongPress(workout._id)}
            style={styles.container}
        >
            <Animated.View style={copiedAnimatedStyles}>
                <SecondaryText styles={styles.copied}>Copied!</SecondaryText>
            </Animated.View>
            <View style={styles.headerContainer}>
                <PrimaryText styles={[styles.name, { color: renderColor(workout.status) }]} numberOfLines={1}>{workout.name}</PrimaryText>
                <WorkoutPreviewSvg status={workout.status} type={workout.type} />
            </View>
            {renderContent()}
        </Pressable >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        alignSelf: 'center',
        marginBottom: StyleConstants.smallMargin,
        borderRadius: StyleConstants.borderRadius,
        borderWidth: .5,
        borderColor: BaseColors.lightGrey,
    },
    moreSvg: {
        height: normalize.width(30),
        width: normalize.width(30),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5
    },
    exerciseContainer: {
        flexDirection: 'row',
        marginBottom: 5
    },
    name: {
        fontSize: StyleConstants.smallFont,
        textTransform: 'capitalize',
        maxWidth: '90%',
    },
    exerciseText: {
        fontSize: normalize.width(28),
        color: BaseColors.secondary,
        textTransform: 'capitalize',
        flex: 1
    },
    text: {
        fontSize: normalize.width(28),
        color: BaseColors.secondary,
        flex: .3,
        textAlign: 'right'
    },
    copied: {
        color: BaseColors.white,
        fontSize: StyleConstants.extraSmallFont
    }
})
export default WorkoutPreviewItem;