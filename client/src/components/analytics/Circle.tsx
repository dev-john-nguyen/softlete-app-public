import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { normalize } from '../../utils/tools';
import SecondaryText from '../elements/SecondaryText';
import StyleConstants from '../tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';

interface Props {
    progress: number;
    progressColor: string;
    value: string;
    strokeWidth: number;
}


const AnalyticsCircle = ({ progress, progressColor, value, strokeWidth }: Props) => {
    return (
        <View style={styles.container}>
            <ProgressCircle
                progress={progress}
                progressColor={progressColor}
                backgroundColor={BaseColors.medGrey}
                style={{
                    height: '100%',
                    width: '100%'
                }}
                strokeWidth={strokeWidth}
            />
            <SecondaryText styles={styles.text} bold>{value}</SecondaryText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: normalize.width(5),
        width: normalize.width(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: StyleConstants.smallMediumFont,
        position: 'absolute',
        color: BaseColors.primary
    }
})
export default AnalyticsCircle;