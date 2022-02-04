import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AdminStackList } from './types';
import StyleConstants from '../../components/tools/StyleConstants';
import Chevron from '../../assets/ChevronSvg';
import PrimaryText from '../../components/elements/PrimaryText';
import BaseColors from '../../utils/BaseColors';
import { normalize } from '../../utils/tools';
import { useHeaderHeight } from '@react-navigation/elements';
import SecondaryText from '../../components/elements/SecondaryText';

interface Props {
    navigation: any;
}


const AdminHome = ({ navigation }: Props) => {
    const headerHeight = useHeaderHeight();

    const onCreateExercise = () => {
        navigation.navigate(AdminStackList.AdminExercises);
    }

    return (
        <View style={styles.container}>
            <View style={{ height: headerHeight }} />
            <PrimaryText styles={styles.headerText}>Admin</PrimaryText>
            <Pressable style={styles.selectContainer} onPress={onCreateExercise}>
                <SecondaryText styles={styles.text} bold>Exercises</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: StyleConstants.baseMargin,
        paddingTop: 0
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary
    },
    selectContainer: {
        padding: StyleConstants.baseMargin,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: BaseColors.white,
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: BaseColors.lightBlack,
        fontSize: StyleConstants.smallerFont
    },
    chev: {
        width: normalize.width(30),
        height: normalize.width(30),
        transform: [{ rotateY: '180deg' }]
    },
})
export default AdminHome;