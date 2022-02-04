import React from 'react';
import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import { WorkoutProps, WorkoutStatus, WorkoutTypes } from '../../../services/workout/types';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';
import { HomeBoxShadow } from '../types';
import WoAerobic from './WoAerobic';
import WoExerciseItem from './WoExerciseItem';
import WoExercises from './WoExercises';


interface Props {
    wo?: WorkoutProps;
    onPress: () => void;
}


const WoItem = ({ wo, onPress }: Props) => {

    if (!wo) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <SecondaryText styles={styles.emptyText}>Rest Day</SecondaryText>
                </View>
            </View>
        )
    }

    const color = wo.status === WorkoutStatus.completed ? BaseColors.green : BaseColors.primary

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <View style={{ width: '100%' }}>
                    <SecondaryText styles={[styles.name, { color: color }]} bold numberOfLines={1}>{wo.name}</SecondaryText>
                </View>
                <ScrollView nestedScrollEnabled={true} horizontal contentContainerStyle={{ alignItems: 'flex-start' }}>
                    {
                        wo.type === WorkoutTypes.TraditionalStrengthTraining ? (
                            <WoExercises
                                exercises={wo.exercises}
                                onPress={onPress}
                                color={color}
                            />
                        ) : (
                            <WoAerobic
                                healthData={wo.healthData}
                                onPress={onPress}
                                color={color}
                            />
                        )
                    }
                </ScrollView>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: StyleConstants.baseMargin,
        marginLeft: StyleConstants.baseMargin,
        height: normalize.height(4.5),
        paddingBottom: 5,
        paddingTop: 0
    },
    content: {
        borderWidth: .3,
        flex: 1,
        borderColor: BaseColors.lightGrey,
        backgroundColor: BaseColors.white,
        borderRadius: StyleConstants.borderRadius,
        ...HomeBoxShadow
    },
    name: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.primary,
        alignSelf: 'center',
        marginBottom: 10,
        textTransform: 'capitalize',
        marginTop: StyleConstants.baseMargin,
        maxWidth: '90%'
    },
    emptyText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.secondary
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        backgroundColor: BaseColors.white,
        borderRadius: StyleConstants.borderRadius
    },
    add: {
        width: normalize.width(12),
        height: normalize.width(12),
        borderRadius: 100,
        backgroundColor: BaseColors.primary,
        padding: 10,
        marginTop: StyleConstants.smallMargin
    }
})
export default WoItem;