import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BaseColors from '../../utils/BaseColors';
import Fonts from '../../utils/Fonts';
import { normalize } from '../../utils/tools';
import StyleConstants from '../tools/StyleConstants';


interface Props {
    setValue: (val: string) => void;
    setOpen: (active: boolean) => void;
    pickerItems: React.ReactElement[];
    value: string;
    open: boolean;
    hidebgColor?: boolean;
}

const AnimatedPicker = Animated.createAnimatedComponent(Picker);

const CustomPicker = ({ pickerItems, value, setOpen, setValue, open, hidebgColor }: Props) => {
    const fullWidth = useSharedValue(normalize.width(1));
    const fullHeight = useSharedValue(normalize.height(1))


    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: open ? withTiming(1, { duration: 100 }) : withTiming(0, { duration: 100 }),
            position: 'absolute',
            zIndex: open ? 100 : withTiming(-100),
            width: fullWidth.value,
            bottom: 0,
            height: fullHeight.value,
            backgroundColor: hidebgColor ? 'transparent' : `rgba(208, 208, 208, .5)`,
            justifyContent: 'flex-end'
        }
    }, [open])

    const animatedPickerStyles = useAnimatedStyle(() => {
        return {
            bottom: open ? withTiming(0) : withTiming(-100)
        }
    }, [open])

    return (
        <Animated.View style={animatedStyles}>
            <Pressable onPress={() => setOpen(false)} style={styles.container}>
                <AnimatedPicker
                    selectedValue={value}
                    itemStyle={styles.itemStyle}
                    style={[styles.pickerContainer, animatedPickerStyles]}
                    enabled={false}
                    onValueChange={(itemValue: any, itemIndex) => {
                        setValue(itemValue)
                        setOpen(false)
                    }}>
                    {pickerItems}
                </AnimatedPicker>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: BaseColors.white,
        borderRadius: StyleConstants.borderRadius,
    },
    itemStyle: {
        fontSize: StyleConstants.smallMediumFont,
        fontFamily: Fonts.secondary,
        color: BaseColors.black,
        textTransform: 'capitalize'
    }
})
export default CustomPicker;