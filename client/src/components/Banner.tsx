import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import SecondaryText from './elements/SecondaryText';
import { normalize } from '../utils/tools';
import Colors from '../utils/BaseColors';
import { BannerProps } from '../services/banner/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BaseColors from '../utils/BaseColors';
import StyleConstants from './tools/StyleConstants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Banner = ({ banner }: { banner: BannerProps['banner'] }) => {
    const [txt, setTxt] = useState('');
    const topAdmin = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (banner.msg) {
            setTxt(banner.msg);
            onShow();
        }
    }, [banner])

    const onShow = () => {
        Animated.sequence([
            Animated.timing(topAdmin, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000
            }),
            Animated.timing(topAdmin, {
                useNativeDriver: false,
                toValue: 0,
                duration: 1000,
                delay: 3000
            })
        ]).start()
    }

    const onClose = () => {
        topAdmin.stopAnimation();
        Animated.timing(topAdmin, {
            useNativeDriver: false,
            toValue: 0,
            duration: 500,
        }).start()
    }

    return (
        <AnimatedPressable style={[styles.container, {
            top: topAdmin.interpolate({
                inputRange: [0, 1],
                outputRange: [-(normalize.height(5)), 0]
            }),
            paddingTop: insets.top
        }]}
            onPress={onClose}
        >
            <SecondaryText styles={styles.text} bold>{txt}</SecondaryText>
        </AnimatedPressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        backgroundColor: Colors.primary,
        padding: 20,
        borderBottomLeftRadius: StyleConstants.borderRadius,
        borderBottomRightRadius: StyleConstants.borderRadius,
        ...BaseColors.primaryBoxShadow
    },
    text: {
        fontSize: StyleConstants.smallerFont,
        color: Colors.white
    }
})
export default Banner;