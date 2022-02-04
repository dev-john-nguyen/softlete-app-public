import React, { useCallback } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import BaseColors from '../utils/BaseColors';
import SecondaryText from './elements/SecondaryText';
import { ExerciseProps } from '../services/exercises/types';
import StyleConstants from './tools/StyleConstants';
import { normalize } from '../utils/tools';
import LogoSvg from '../assets/LogoSvg';
import ProfileImage from './ProfileImage';
import { UserProps } from '../services/user/types';
import ExerciseVideo from './ExerciseVideo';
import ExerciseYoutubePreview from './elements/YoutubePreview';


interface Props {
    exercise: ExerciseProps;
    onPress: () => void;
    softlete?: boolean;
    user: UserProps;
}


const ExerciseSearchPreview = ({ exercise, onPress, softlete, user }: Props) => {

    const renderVideo = () => {
        if (user.uid !== exercise.userUid) {
            if (exercise.url) {
                return (
                    <ExerciseVideo props={exercise} small />
                )
            }
        } else {
            if (exercise.url || exercise.localUrl) {
                return (
                    <ExerciseVideo props={exercise} small />
                )
            }
        }

        return <ExerciseYoutubePreview id={exercise.youtubeId} small />
    }

    return (
        <Pressable style={({ pressed }) => [styles.container, {
            backgroundColor: pressed ? BaseColors.lightWhite : BaseColors.white
        }]} onPress={onPress}>
            <View style={styles.itemsContainer}>
                {
                    user.uid === exercise.userUid ?
                        <View style={styles.profileImg}>
                            <ProfileImage imageUri={user.imageUri} />
                        </View> :
                        <View style={[styles.item, {
                            backgroundColor: BaseColors.lightWhite
                        }]}>
                            <LogoSvg />
                        </View>
                }
            </View>
            <SecondaryText styles={styles.name} bold>{exercise.name}</SecondaryText>
            {renderVideo()}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: StyleConstants.baseMargin,
        marginBottom: 1
    },
    name: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.black,
        textTransform: 'capitalize',
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10
    },
    itemsContainer: {
        flexDirection: 'row'
    },
    item: {
        width: normalize.width(15),
        height: normalize.width(15),
        borderRadius: 100,
        backgroundColor: BaseColors.primary,
    },
    profileImg: {
        width: normalize.width(15),
        height: normalize.width(15)
    }
})
export default React.memo(ExerciseSearchPreview);