import React, { } from 'react';
import { View, StyleSheet } from 'react-native';
import BaseColors from '../../../utils/BaseColors';
import SecondaryText from '../../elements/SecondaryText';


interface Props {
    props: {
        x: number;
        y: number;
        index: number;
        indexData: number;
    }
    isActive: boolean;
    data: {
        date: Date;
        value: number;
    }[];
}


const ExerciseChartItem = ({ props, isActive, data }: Props) => {

    const getDate = () => {
        const d = data.find((_, i) => i === props.index)
        if (d) {
            const { date } = d;
            return (date.getMonth() + 1) + '/' + date.getDate()
        }
        return ''
    }


    return <View style={[{
        left: props.x - 25,
        top: props.y - 40,
        opacity: isActive ? 1 : 0,
    }, styles.container]}>
        <SecondaryText styles={{ fontSize: 10, color: BaseColors.white }}>{getDate()}</SecondaryText>
        <SecondaryText styles={{ fontSize: 14, color: BaseColors.white }} bold>{props.indexData}</SecondaryText>
    </View>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: BaseColors.primary,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 10,
        alignItems: 'center'
    }
})
export default ExerciseChartItem;