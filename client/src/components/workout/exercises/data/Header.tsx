import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PrimaryText from '../../../elements/PrimaryText';
import StyleConstants from '../../../tools/StyleConstants';
import BaseColors from '../../../../utils/BaseColors';
import { WorkoutStatus } from '../../../../services/workout/types';
import { MeasSubCats } from '../../../../services/exercises/types';
import InfoSvg from '../../../../assets/InfoSvg';
import { normalize } from '../../../../utils/tools';
import SecondaryText from '../../../elements/SecondaryText';


interface Props {
    status: WorkoutStatus;
    measSubCat: MeasSubCats;
    athlete?: boolean;
}


const ExerciseDataHeader = ({ status, measSubCat, athlete }: Props) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ flex: .4, alignItems: 'center', marginRight: StyleConstants.smallMargin }}>
                <PrimaryText styles={styles.text}>Sets</PrimaryText>
            </View>
            <View style={{ flex: .4, alignItems: 'center', marginRight: StyleConstants.smallMargin }}>
                <PrimaryText styles={styles.text}>Reps</PrimaryText>
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginRight: StyleConstants.smallMargin }}>
                {
                    athlete ? <PrimaryText styles={[styles.text, { color: BaseColors.lightGrey }]}>Unknown</PrimaryText> :
                        <>
                            <Pressable style={styles.infoContainer} onPress={() => setShowInfo(s => s ? false : true)} hitSlop={5}>
                                <View style={styles.infoSvg}>
                                    <InfoSvg fillColor={BaseColors.secondary} />
                                </View>
                                {
                                    showInfo && (
                                        <SecondaryText styles={styles.infoText}>
                                            To change measurement, visit the exercise edit form.
                                        </SecondaryText>
                                    )
                                }
                            </Pressable>
                            <PrimaryText styles={[styles.text, { color: BaseColors.secondary }]}>{measSubCat ? measSubCat : 'pounds'}</PrimaryText>
                        </>
                }

            </View>
            <View style={{ flex: .5, alignItems: 'center' }}>
                <PrimaryText styles={styles.text}>{status !== WorkoutStatus.inProgress ? 'Pct' : ''}</PrimaryText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: StyleConstants.smallMargin,
        zIndex: 100,
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin,
    },
    text: {
        color: BaseColors.secondary,
        fontSize: StyleConstants.extraSmallFont,
        textTransform: 'capitalize',
    },
    infoSvg: {
        width: normalize.width(25),
        height: normalize.width(25)
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
        padding: 5,
        borderRadius: StyleConstants.borderRadius,
        top: -5,
        backgroundColor: BaseColors.lightWhite
    },
    infoText: {
        color: BaseColors.black,
        fontSize: StyleConstants.extraSmallFont,
        paddingTop: 5
    }
})
export default ExerciseDataHeader;