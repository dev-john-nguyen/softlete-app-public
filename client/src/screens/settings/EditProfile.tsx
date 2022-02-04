import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import SecondaryText from '../../components/elements/SecondaryText';
import { updateProfile } from '../../services/user/actions';
import { ReducerProps } from '../../services';
import { UserProps, UserActionProps, ImageProps } from '../../services/user/types';
import Switch from '../../components/elements/Switch';
import UploadProfileImg from '../../components/UploadProfileImg';
import StyleConstants from '../../components/tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import CustomPicker from '../../components/elements/Picker';
import { Picker } from '@react-native-picker/picker';
import { capitalize } from 'lodash';
import SaveSvg from '../../assets/SaveSvg';
import { normalize } from '../../utils/tools';
import { SettingsStackScreens } from './types';
import PrimaryText from '../../components/elements/PrimaryText';

interface Props {
    user: UserProps;
    updateProfile: UserActionProps['updateProfile'];
    navigation: any;
    route: any;
}

enum AthleteTypes {
    athlete = 'athlete',
    trainer = 'trainer'
}

const EditProfile = ({ updateProfile, user, navigation, route }: Props) => {
    const [name, setName] = useState(user.name);
    const [athlete, setAthlete] = useState(user.athlete);
    const [bio, setBio] = useState(user.bio);
    const [isPrivate, setIsPrivate] = useState(user.isPrivate);
    const [loading, setLoading] = useState(false);
    const [selectedImg, setSelectedImg] = useState<ImageProps>({
        uri: '',
        base64: ''
    });
    const [saveStatus, setSaveStatus] = useState('')
    const headerHeight = useHeaderHeight();
    const [picker, setPicker] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.saveContainer}>
                    <SecondaryText styles={styles.status}>{saveStatus}</SecondaryText>
                    {loading ?
                        <ActivityIndicator size='small' color={BaseColors.black} />
                        :
                        <Pressable style={styles.save} onPress={onSave}>
                            <SaveSvg strokeColor={BaseColors.black} />
                        </Pressable>
                    }
                </View>
            )
        })
    }, [name, athlete, bio, isPrivate, loading, selectedImg, saveStatus])

    useEffect(() => {
        if (route && route.params) {
            const { value, label } = route.params;
            switch (label) {
                case 'name':
                    setName(value)
                    break;
                case 'bio':
                    setBio(value)
                    break;
            }
        }
    }, [route])

    const propsAreUpdated = () => {
        if (
            name === user.name &&
            athlete === user.athlete &&
            bio === user.bio &&
            isPrivate === user.isPrivate &&
            !selectedImg.base64
        ) return false

        return true;
    }

    const onSave = () => {
        if (loading) return;

        if (!propsAreUpdated()) {
            return setSaveStatus('No updates found.')
        }

        setLoading(true)
        updateProfile({ name, athlete, bio, isPrivate }, (selectedImg.base64 as string), (status: string) => {
            setSaveStatus(status)
        })
            .then(() => setLoading(false))
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const renderPickerItems = useCallback(() => {
        return Object.values(AthleteTypes).map(item => (
            <Picker.Item label={capitalize(item)} value={item} key={item} />
        ))
    }, [athlete])


    const onNavigationToFormInput = (label: string, value: string, maxLength: number, des?: string, mult?: boolean) => {
        navigation.navigate(SettingsStackScreens.FormInput, { label, value, des, mult, maxLength, goBackScreen: SettingsStackScreens.EditProfile })
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
            <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
                <View style={{ height: headerHeight }} />
                <PrimaryText styles={styles.headerText}>Edit Profile</PrimaryText>
                <UploadProfileImg onImageUpload={setSelectedImg} uri={selectedImg.uri ? selectedImg.uri : user.imageUri} />
                <View style={styles.itemContainer}>
                    <View>
                        <SecondaryText styles={styles.label} bold>Name:</SecondaryText>
                    </View>
                    <Pressable onPress={() => onNavigationToFormInput('name', name, 100)} style={styles.valueContainer}>
                        <SecondaryText styles={styles.value}>{capitalize(name)}</SecondaryText>
                    </Pressable>
                </View>

                <View style={styles.itemContainer}>
                    <View>
                        <SecondaryText styles={styles.label} bold>Type:</SecondaryText>
                    </View>
                    <Pressable onPress={() => setPicker(true)} style={styles.valueContainer}>
                        <SecondaryText styles={styles.value}>{capitalize(athlete)}</SecondaryText>
                    </Pressable>
                </View>

                <View style={styles.itemContainer}>
                    <View>
                        <SecondaryText styles={styles.label} bold>Bio:</SecondaryText>
                    </View>

                    <Pressable onPress={() => onNavigationToFormInput('bio', bio, 300, 'Let people know what you are up to.', true)} style={styles.valueContainer}>
                        <SecondaryText styles={styles.value}>{bio}</SecondaryText>
                    </Pressable>

                </View>

                <View style={styles.itemContainer}>
                    <Switch onSwitch={() => setIsPrivate(p => p ? false : true)} active={isPrivate} />
                    <SecondaryText
                        styles={[styles.label, { marginLeft: 10 }]}
                    >{isPrivate ? 'Private' : 'Public'}</SecondaryText>
                </View>
            </Pressable>

            <CustomPicker
                open={picker}
                setOpen={() => setPicker(false)}
                value={athlete}
                pickerItems={renderPickerItems()}
                setValue={(txt) => setAthlete(txt)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: StyleConstants.baseMargin,
        marginRight: StyleConstants.baseMargin
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
        marginBottom: StyleConstants.baseMargin,
        textAlign: 'center'
    },
    itemContainer: {
        flexDirection: 'row',
        marginTop: StyleConstants.baseMargin,
        alignItems: 'center'
    },
    valueContainer: {
        padding: 10,
        borderBottomColor: BaseColors.lightGrey,
        borderBottomWidth: 1,
        flex: 1
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginRight: StyleConstants.smallMargin,
    },
    value: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginRight: StyleConstants.smallMargin,
    },
    save: {
        width: normalize.width(20),
        height: normalize.width(20),
    },
    saveContainer: {
        flexDirection: 'row',
        marginRight: StyleConstants.baseMargin,
        alignItems: 'center'
    },
    status: {
        fontSize: 12,
        color: BaseColors.lightBlack,
        marginRight: 5
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

export default connect(mapStateToProps, { updateProfile })(EditProfile);