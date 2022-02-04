import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { WorkoutExerciseProps } from '../../../services/workout/types';
import BaseColors from '../../../utils/BaseColors';
import Constants from '../../../utils/Constants';
import { normalize } from '../../../utils/tools';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';
import { HomeBoxShadow } from '../types';


interface Props {
    exercise: WorkoutExerciseProps;
    onPress: () => void;
    color: string;
}


const WoExerciseItem = ({ exercise, onPress, color }: Props) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={[styles.groupContainer, { borderColor: color }]}>
                <SecondaryText styles={[styles.groupText, { color: color }]} bold numberOfLines={1}>{Constants.abc[exercise.group]}</SecondaryText>
            </View>
            <SecondaryText styles={styles.name} bold numberOfLines={1}>{exercise.exercise?.name}</SecondaryText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: StyleConstants.borderRadius,
        marginLeft: StyleConstants.smallMargin,
        marginRight: StyleConstants.smallMargin,
        alignItems: 'center',
        backgroundColor: BaseColors.white,
        padding: StyleConstants.baseMargin,
        maxWidth: normalize.width(1.5),
        ...HomeBoxShadow
    },
    groupContainer: {
        borderRadius: 100,
        borderWidth: 2,
        width: normalize.width(15),
        height: normalize.width(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupText: {
        fontSize: StyleConstants.smallFont
    },
    name: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        textTransform: 'capitalize',
        marginTop: 10
    },
})
export default React.memo(WoExerciseItem);