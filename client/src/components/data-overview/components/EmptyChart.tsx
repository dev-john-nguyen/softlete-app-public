import React from 'react';
import { View, StyleSheet } from 'react-native';
import HideSvg from '../../../assets/HideSvg';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';

interface Props {

}


const EmptyChart = ({ }: Props) => {
    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptySvg}>
                <HideSvg fillColor={BaseColors.lightGrey} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    emptySvg: {
        width: normalize.width(15),
        height: normalize.width(15),
    },
    emptyContainer: {
        width: normalize.width(1),
        height: normalize.height(4),
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default EmptyChart;