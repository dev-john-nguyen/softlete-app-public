import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AthleteProfileProps } from '../../services/athletes/types';
import FastImage from 'react-native-fast-image';
import PersonSvg from '../../assets/PersonSvg';
import { normalize } from '../../utils/tools';
import StyleConstants from '../tools/StyleConstants';
import SecondaryText from '../elements/SecondaryText';
import BaseColors from '../../utils/BaseColors';
import _ from 'lodash';


interface Props {
    onNavigateToProfile: (athlete: AthleteProfileProps) => void;
    athlete: AthleteProfileProps;
}


const AthleteListPreview = ({ onNavigateToProfile, athlete }: Props) => {

    const onPress = () => {
        onNavigateToProfile(athlete);
    }

    return (
        <Pressable style={styles.container} onPress={onPress} hitSlop={5}>
            <View style={styles.left}>
                {
                    !!athlete.imageUri ? <FastImage
                        style={styles.image}
                        source={{
                            uri: athlete.imageUri,
                            priority: 'normal'
                        }}
                    /> :
                        <View style={styles.image}>
                            <View style={styles.svg}>
                                <PersonSvg />
                            </View>
                        </View>
                }
                <View>
                    <SecondaryText styles={styles.username} bold>{athlete.username}</SecondaryText>
                    <SecondaryText styles={styles.athlete}>{_.capitalize(athlete.athlete)}</SecondaryText>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: BaseColors.white,
        padding: StyleConstants.baseMargin,
        borderRadius: StyleConstants.borderRadius,
        alignItems: 'center',
        borderBottomWidth: .2,
        borderBottomColor: BaseColors.lightGrey
    },
    left: {
        flexDirection: 'row'
    },
    rightItemSvg: {
        width: normalize.width(20),
        height: normalize.width(20)
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    username: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black
    },
    athlete: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.secondary
    },
    image: {
        width: normalize.width(10),
        height: normalize.width(10),
        borderRadius: 100,
        marginRight: StyleConstants.smallMargin,
    },
    svg: {
        width: '100%'
    }
})
export default React.memo(AthleteListPreview);