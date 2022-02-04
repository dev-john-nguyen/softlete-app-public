import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import BaseColors from '../../utils/BaseColors';
import StyleConstants from '../tools/StyleConstants';
import FastImage from 'react-native-fast-image';
import Constants from '../../utils/Constants';
import { getYoutubeThumbNail, getYoutubeUrl, validateUrl } from '../../utils/tools';


interface Props {
    id: string | undefined;
    small?: boolean;
}


const ExerciseYoutubePreview = ({ id, small }: Props) => {
    const [failed, setFailed] = useState(false);
    const [thumbNail, setThumbNail] = useState('');

    useEffect(() => {
        getThumbNail()
    }, [id])

    const getThumbNail = async () => {
        if (!id) return;
        setThumbNail(getYoutubeThumbNail(id))
        setFailed(false)
    }

    const onOpenUrl = async () => {
        if (!id) return;
        const url = getYoutubeUrl(id)
        const supportedUrl = await Linking.canOpenURL(url)
            .catch((err) => {
                console.log(err)
            })

        if (supportedUrl) {
            await Linking.openURL(url)
                .catch((err) => {
                    console.log(err)
                    console.log('Failed to open youtube url');
                })
        } else {
            console.log('Failed to open youtube url');
        }
    }


    const videoStyle = {
        ...small ? Constants.videoSmallDim : Constants.videoMedDim,
        borderColor: BaseColors.lightGrey,
        borderWidth: 1,
        borderRadius: small ? 5 : StyleConstants.borderRadius,
    }

    return (
        <View style={styles.container}>
            {!!thumbNail && !failed ?
                <Pressable onPress={onOpenUrl}>
                    <FastImage source={{ uri: thumbNail }} onError={() => setFailed(true)} style={videoStyle} />
                </Pressable>
                :
                <View style={videoStyle} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: StyleConstants.borderRadius,
        marginLeft: StyleConstants.baseMargin,
        marginRight: StyleConstants.baseMargin
    },
    url: {
        textDecorationLine: 'underline',
        fontSize: StyleConstants.smallFont,
        color: BaseColors.primary
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black
    },
    errorContainer: {
        marginLeft: 10,
        marginTop: 2
    },
    previewImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    image: {
        height: '100%',
        width: '100%',
        backgroundColor: BaseColors.white,
    },
    preview: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.primary,
        margin: 10
    },
})
export default ExerciseYoutubePreview;