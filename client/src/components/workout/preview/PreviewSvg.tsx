import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HealthActivity } from 'react-native-health';
import InProgressSvg from '../../../assets/InProgressSvg';
import KettleBell from '../../../assets/KettleBell';
import { WorkoutStatus } from '../../../services/workout/types';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import CircleCheck from '../../elements/CircleCheck';
import { WorkoutTypes } from '../../../services/workout/types';
import RunSvg from '../../../assets/RunSvg';

interface Props {
    status: WorkoutStatus;
    type: string;
}


const WorkoutPreviewSvg = ({ status, type }: Props) => {

    const renderColor = () => {
        switch (status) {
            case WorkoutStatus.completed:
                return BaseColors.green
            case WorkoutStatus.inProgress:
                return BaseColors.primary
            case WorkoutStatus.pending:
                return BaseColors.lightGrey
            default:
                return BaseColors.primary
        }
    }
    // switch (status) {
    //     case WorkoutStatus.completed:
    //         return (
    //             <View style={styles.container}>
    //                 <CircleCheck checked={true} onPress={() => undefined} />
    //             </View>
    //         )
    //     case WorkoutStatus.inProgress:
    //         return (
    //             <View style={styles.container}>
    //                 <InProgressSvg fillColor={BaseColors.primary} />
    //             </View>
    //         )
    //     case WorkoutStatus.pending:
    //     default:
    //         return (
    //             <View style={styles.container}>
    //                 {
    //                     type === WorkoutTypes.TraditionalStrengthTraining ?
    //                         <KettleBell fillColor={BaseColors.primary} strokeColor={BaseColors.primary} /> :
    //                         <RunSvg fillColor={BaseColors.primary} />
    //                 }
    //             </View>
    //         )
    // }

    return (
        <View style={styles.container}>
            {
                type === WorkoutTypes.TraditionalStrengthTraining ?
                    <KettleBell fillColor={renderColor()} strokeColor={renderColor()} /> :
                    <RunSvg fillColor={renderColor()} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: normalize.width(20),
        width: normalize.width(20),
        left: 3
    }
})
export default WorkoutPreviewSvg;