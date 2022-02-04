import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { WorkoutProps } from '../../../services/workout/types';
import WorkoutPreviewItem from './PreviewItem';
import CircleAdd from '../../elements/CircleAdd';
import { FlatList } from 'react-native-gesture-handler';
import StyleConstants from '../../tools/StyleConstants';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';

interface Props {
    workouts: Omit<WorkoutProps, 'date'>[];
    onPress: (workoutUid: string) => void;
    onLongPress?: (workoutUid: string) => void;
    onAddWorkout?: () => void;
    athlete?: boolean;
}


const WorkoutPreviewList = ({ workouts, onPress, onLongPress, onAddWorkout, athlete }: Props) => {

    const renderItem = useCallback(({ item }: { item: Omit<WorkoutProps, 'date'> }) => (
        <WorkoutPreviewItem
            onPress={onPress}
            onLongPress={onLongPress}
            workout={item}
            athlete={athlete}
        />
    ), [workouts, athlete])

    const renderListEmptyComponent = useCallback(() => (
        <View style={styles.emptyContainer}>
        </View>
    ), [])

    return (
        <View style={styles.container}>
            <FlatList
                data={workouts}
                contentContainerStyle={{ paddingBottom: normalize.height(20) }}
                ListEmptyComponent={renderListEmptyComponent}
                keyExtractor={(item, index) => item._id ? item._id : index}
                renderItem={renderItem}
            />
            {!athlete && onAddWorkout && <CircleAdd onPress={onAddWorkout} />}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: normalize.height(10)
    },
    emptyText: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.secondary
    }
})
export default WorkoutPreviewList;