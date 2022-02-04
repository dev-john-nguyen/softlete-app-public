import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import PersonSvg from '../assets/PersonSvg';
import BaseColors from '../utils/BaseColors';


interface Props {
    imageUri?: string
}


const ProfileImage = ({ imageUri }: Props) => {
    if (imageUri) return (
        <FastImage
            style={styles.container}
            source={{
                uri: imageUri,
                priority: 'normal'
            }}
        />
    )

    return (
        <View style={[styles.container]}>
            <View style={styles.svg}>
                <PersonSvg />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        marginRight: 5,
        borderRadius: 100,
        backgroundColor: BaseColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    svg: {
        width: '100%'
    }
})
export default ProfileImage;