import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BaseColors from '../../utils/BaseColors';

interface Props {
    white?: boolean
}


const Loading = ({ white }: Props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={white ? BaseColors.white : BaseColors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BaseColors.lightWhite
    }
})
export default Loading;