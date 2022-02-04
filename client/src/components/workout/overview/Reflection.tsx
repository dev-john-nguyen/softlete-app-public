import React from 'react';
import { View, StyleSheet, Pressable, Keyboard, ActivityIndicator } from 'react-native';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';;
import { WorkoutProps, WorkoutStatus } from '../../../services/workout/types';
import Input from '../../elements/Input';
import { ImageProps } from '../../../services/user/types';
import ReflectionImage from './ReflectionImage';
import CheckedSvg from '../../../assets/CheckedSvg';
import PrimaryText from '../../elements/PrimaryText';


interface Props {
    onSubmit: () => void;
    workout: WorkoutProps;
    header?: boolean;
    hide?: boolean;
    setImage: (img: ImageProps) => void;
    image?: ImageProps;
    reflection: string;
    setReflection: (txt: string) => void;
    loading: boolean;
}

const WorkoutReflection = ({ onSubmit, workout, header, hide, image, setImage, reflection, setReflection, loading }: Props) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => Keyboard.dismiss()}>

                {
                    header ? <ReflectionImage
                        setImage={setImage}
                        image={image}
                        imageUri={workout.imageUri ? workout.imageUri : workout.localImageUri}
                        allowUpload={workout.status === WorkoutStatus.inProgress}
                    /> : <View>
                        <Input
                            value={reflection}
                            onChangeText={(txt) => setReflection(txt)}
                            placeholder='Write a caption...'
                            multiline={true}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            blurOnSubmit={true}
                            maxLength={200}
                            styles={{ maxHeight: normalize.height(10), borderRadius: 0 }}
                        />
                    </View>
                }

                {
                    header ?
                        <View style={styles.txtContainer}>
                            <SecondaryText styles={styles.txt}>{workout.reflection}</SecondaryText>
                        </View> : <ReflectionImage
                            setImage={setImage}
                            image={image}
                            imageUri={workout.imageUri ? workout.imageUri : workout.localImageUri}
                            allowUpload={workout.status === WorkoutStatus.inProgress}
                        />
                }
            </Pressable>
            {
                !header && (
                    <Pressable
                        style={({ pressed }) => [styles.completeContainer, { backgroundColor: pressed ? BaseColors.lightGreen : BaseColors.green }]}
                        onPress={onSubmit}
                    >
                        {
                            loading ?
                                <ActivityIndicator color={BaseColors.white} /> :
                                (
                                    <PrimaryText styles={styles.completeText}>Complete Workout</PrimaryText>
                                )
                        }
                    </Pressable>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: normalize.width(1),
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        flex: 1
    },
    completeContainer: {
        padding: 15,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
        margin: StyleConstants.baseMargin
    },
    completeText: {
        fontSize: StyleConstants.smallerFont,
        textTransform: 'capitalize',
        color: BaseColors.white
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginBottom: 5
    },
    txtContainer: {
        marginBottom: StyleConstants.baseMargin,
    },
    txt: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.lightBlack,
        padding: StyleConstants.baseMargin
    },
    shareContainer: {
        alignSelf: 'flex-end',
        fontSize: StyleConstants.extraSmallFont
    },
})
export default WorkoutReflection;