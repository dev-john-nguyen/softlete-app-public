import React, { useState, useEffect, useCallback, } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, Keyboard, ScrollView } from 'react-native';
import { normalize, validateUrl, capitalize, getYoutubeThumbNail, getYoutubeUrl } from '../../utils/tools';
import BaseColors from '../../utils/BaseColors';
import { ExerciseActionProps, Categories, ExerciseProps, MuscleGroups, Equipments, ExerciseBaseProps } from '../../services/exercises/types';
import SecondaryText from '../../components/elements/SecondaryText';
import { updateExercise, createNewExercise, removeExercise, fetchMusclesAndEquipments } from '../../services/exercises/actions';
import { connect } from 'react-redux';
import TrashSvg from '../../assets/TrashSvg';
import ConfirmModal from '../../components/modal/ConfirmModal';
import StyleConstants from '../../components/tools/StyleConstants';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { IndexStackList } from '../../screens/types';
import Input from '../../components/elements/Input';
import { ReducerProps } from '../../services';
import FastImage from 'react-native-fast-image';
import CustomPicker from '../../components/elements/Picker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import PrimaryText from '../../components/elements/PrimaryText';
import SaveSvg from '../../assets/SaveSvg';
import Constants from '../../utils/Constants';
import ExerciseVideo from '../../components/ExerciseVideo';
import { AdminStackList } from '../screens/types';

interface Props {
    navigation: any;
    route: any;
    createNewExercise: ExerciseActionProps['createNewExercise'];
    updateExercise: ExerciseActionProps['updateExercise'];
    removeExercise: ExerciseActionProps['removeExercise'];
    fetchMusclesAndEquipments: ExerciseActionProps['fetchMusclesAndEquipments'];
    equipments: ExerciseBaseProps['equipments'];
    exerciseProps?: ExerciseProps;
}

enum PickerOptions {
    cats = 'cats',
    measCats = 'measCats',
    measSubCats = 'measSubCats',
    equipment = 'equipment',
    muscleGroup = 'muscleGroup',
    disable = ''
}

const EditExercise = ({ route, navigation, updateExercise, createNewExercise, removeExercise, fetchMusclesAndEquipments, equipments, exerciseProps }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeThumbnail, setYoutubeThumnnail] = useState('')
    const [category, setCategory] = useState<Categories>(Categories.other);
    const [muscleGroup, setMuscleGroup] = useState<MuscleGroups>(MuscleGroups.other);
    const [equipment, setEquipment] = useState<Equipments>(Equipments.none);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [keyboardShow, setKeyboardShow] = useState(false);
    const [picker, setPicker] = useState<PickerOptions>(PickerOptions.disable);
    const _keyboardHeight = useSharedValue(normalize.height(2));
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        if (!exerciseProps) {
            navigation.navigate(IndexStackList.HomeStack)
            return;
        }

        fetchMusclesAndEquipments()

        setName(exerciseProps.name ? capitalize(exerciseProps.name) : '');
        setDescription(exerciseProps.description ? exerciseProps.description : '')
        setYoutubeUrl(exerciseProps.youtubeId ? getYoutubeUrl(exerciseProps.youtubeId) : '');
        setYoutubeThumnnail(exerciseProps.youtubeId ? getYoutubeThumbNail(exerciseProps.youtubeId) : '')
        setCategory(exerciseProps.category ? exerciseProps.category : Categories.other)
        setMuscleGroup(exerciseProps.muscleGroup);
        setEquipment(exerciseProps.equipment)

        //reset all states
        setConfirm(false);
        setLoading(false);
        setErrors([])

    }, [route])

    useEffect(() => {
        if (youtubeUrl) {
            fetchUrl()
        }
    }, [youtubeUrl])

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardWillShow', (e) => {
            _keyboardHeight.value = e.endCoordinates.height
            setKeyboardShow(true)
        })

        const hideSub = Keyboard.addListener('keyboardWillHide', (e) => {
            setKeyboardShow(false)
        })

        return () => {
            showSub.remove()
            hideSub.remove()
        }
    }, [])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: keyboardShow ? withTiming(_keyboardHeight.value) : withTiming(50),
        }
    }, [keyboardShow])

    const onSubmit = async () => {
        if (loading || !exerciseProps) return;

        let errorsStore = [];

        setLoading(true)

        if (!name) errorsStore.push('Name is required.');

        let youtubeId;

        if (youtubeUrl) {
            youtubeId = await fetchUrl()
            if (!youtubeId) errorsStore.push('Invalid youtube url');
        }

        if (errorsStore.length > 0) {
            setLoading(false);
            setErrors(errorsStore);
            return;
        }

        setErrors([])

        let admin = false;

        if (route.params && route.params.admin) {
            admin = true
        }

        const exerciseToSave: any = {
            name,
            description,
            youtubeId: youtubeId,
            localUrl: exerciseProps.localUrl,
            category,
            muscleGroup,
            equipment,
            videoId: exerciseProps.videoId,
            localThumbnail: exerciseProps.localThumbnail,
        }

        let requestErr = false;
        try {
            if (!exerciseProps._id) {
                await createNewExercise(exerciseToSave, true)
            } else {
                //insert uid
                const dataToSave = {
                    ...exerciseToSave,
                    _id: exerciseProps._id,
                    softlete: exerciseProps.softlete
                }

                await updateExercise(dataToSave, true, true)
            }
        } catch (err) {
            console.log(err)
            requestErr = true;
        }

        setLoading(false);
        setSaveMsg('')
        !requestErr && navigation.navigate(AdminStackList.AdminExercises);
    }

    const onDelete = async () => {
        if (loading) return;

        if (!confirm) return setConfirm(true);

        if (!exerciseProps?._id) return navigation.goBack();

        setLoading(true);

        await removeExercise(exerciseProps._id);

        setLoading(false);
        navigation.navigate(AdminStackList.AdminExercises);
    }

    const fetchUrl = async () => {
        if (!youtubeUrl) return;

        const res = await validateUrl(youtubeUrl);

        if (!res) return;

        const { invalid, id } = res;

        if (invalid || !id) {
            return;
        }

        setYoutubeThumnnail(getYoutubeThumbNail(id))
        return id;
    }

    const renderPickeritems = useCallback(() => {
        switch (picker) {
            case PickerOptions.cats:
                return Object.values(Categories).map(item => (
                    <Picker.Item label={capitalize(item)} value={item} key={item} />
                ));
            case PickerOptions.equipment:
                return equipments.map(item => (
                    <Picker.Item label={capitalize(item)} value={item} key={item} />
                ))
            case PickerOptions.muscleGroup:
                return Object.values(MuscleGroups).map(item => (
                    <Picker.Item label={capitalize(item)} value={item} key={item} />
                ))
        }
        return []
    }, [picker])

    const onPickerValueChange = (val: any) => {
        switch (picker) {
            case PickerOptions.cats:
                return setCategory(val);
            case PickerOptions.equipment:
                return setEquipment(val)
            case PickerOptions.muscleGroup:
                return setMuscleGroup(val)
        }
    }


    const renderPickerValue = useCallback(() => {
        switch (picker) {
            case PickerOptions.cats:
                return category;
            case PickerOptions.equipment:
                return equipment
            case PickerOptions.muscleGroup:
                return muscleGroup
        }
        return ''
    }, [picker])

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>

            <View style={[styles.actionContainer, { height: headerHeight }]}>
                {
                    loading ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ActivityIndicator color={BaseColors.primary} />
                            <SecondaryText styles={[styles.label, { marginLeft: 10 }]}>{saveMsg}</SecondaryText>
                        </View>
                        :
                        (
                            <>
                                {
                                    (exerciseProps?._id) &&
                                    <Pressable style={styles.svg} onPress={onDelete}>
                                        <TrashSvg fillColor={BaseColors.primary} />
                                    </Pressable>
                                }

                                <Pressable style={styles.svg} onPress={onSubmit}>
                                    <SaveSvg strokeColor={BaseColors.primary} />
                                </Pressable>
                            </>
                        )
                }
            </View>

            {confirm && <ConfirmModal onConfirm={onDelete} onDeny={() => setConfirm(false)} header={`Are you sure you want to remove ${name}?`} />}
            <ScrollView style={{ paddingLeft: StyleConstants.baseMargin, paddingRight: StyleConstants.baseMargin }}>
                <PrimaryText styles={styles.headerText}>Exercise Details</PrimaryText>
                <SecondaryText styles={styles.headerSubText}>Fill out the form below.</SecondaryText>
                <ExerciseVideo small props={{
                    url: exerciseProps?.url,
                    localThumbnail: exerciseProps?.localThumbnail,
                    thumbnail: exerciseProps?.thumbnail,
                    localUrl: exerciseProps?.localUrl
                }} />
                <View style={styles.errorContainer}>
                    {
                        errors.length > 0 && errors.map((e, i) => (
                            <SecondaryText styles={styles.errorText} key={Math.random()}>*{e}</SecondaryText>
                        ))
                    }
                </View>


                <SecondaryText styles={styles.label}>Name</SecondaryText>
                <Input
                    placeholder='Name'
                    onChangeText={(txt) => setName(txt)}
                    value={name}
                    autoCapitalize='words'
                    maxLength={50}
                    styles={{ marginBottom: StyleConstants.smallMargin }}
                />

                <SecondaryText styles={styles.label}>Description</SecondaryText>
                <Input
                    placeholder='Description'
                    onChangeText={(txt) => setDescription(txt)}
                    value={description}
                    multiline={true}
                    maxLength={100}
                    styles={{ marginBottom: StyleConstants.smallMargin }}
                />


                <View>
                    <SecondaryText styles={styles.label}>Category</SecondaryText>
                    <Pressable style={[styles.itemContainer, { backgroundColor: BaseColors.white }]} onPress={() => setPicker(PickerOptions.cats)}>
                        <SecondaryText styles={[styles.text, {
                            color: BaseColors.black
                        }]}>{category ? category : 'Category'}</SecondaryText>
                    </Pressable>
                </View>


                <View>
                    <SecondaryText styles={styles.label}>Muscle Group</SecondaryText>
                    <Pressable style={[styles.itemContainer, { backgroundColor: BaseColors.white }]} onPress={() => setPicker(PickerOptions.muscleGroup)}>
                        <SecondaryText styles={[styles.text, {
                            color: BaseColors.black
                        }]}>{muscleGroup}</SecondaryText>
                    </Pressable>
                </View>

                <View>
                    <SecondaryText styles={styles.label}>Equipment</SecondaryText>
                    <Pressable style={[styles.itemContainer, { backgroundColor: BaseColors.white }]} onPress={() => setPicker(PickerOptions.equipment)}>
                        <SecondaryText styles={[styles.text, {
                            color: BaseColors.black
                        }]}>{equipment}</SecondaryText>
                    </Pressable>
                </View>

                <SecondaryText styles={styles.label}>Youtube Url (can also be found under share options)</SecondaryText>
                <Input
                    placeholder='Youtube URL'
                    onChangeText={(txt) => setYoutubeUrl(txt)}
                    value={youtubeUrl}
                    maxLength={500}
                />
                <View style={styles.youtube}>
                    <FastImage source={{ uri: youtubeThumbnail }} style={styles.image} />
                </View>

                <Animated.View style={animatedStyles} />
            </ScrollView>
            <CustomPicker
                open={!!picker}
                setOpen={() => setPicker(PickerOptions.disable)}
                value={renderPickerValue()}
                pickerItems={renderPickeritems()}
                setValue={onPickerValueChange}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: StyleConstants.mediumFont,
        color: BaseColors.primary
    },
    headerSubText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginBottom: StyleConstants.smallMargin
    },
    label: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.lightBlack,
        marginBottom: 5
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: StyleConstants.smallMargin,
        marginRight: StyleConstants.baseMargin
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
    },
    infoText: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.black,
        margin: 5
    },
    headerContainer: {
        alignItems: 'flex-end'
    },
    errorContainer: {
        marginBottom: 5,
        marginTop: 5
    },
    svg: {
        height: normalize.width(15),
        width: normalize.width(15),
        marginLeft: StyleConstants.baseMargin
    },
    errorText: {
        fontSize: normalize.width(30),
        color: BaseColors.red
    },
    youtube: {
        ...Constants.videoSmallDim,
        alignSelf: 'flex-start',
        top: 0,
        marginTop: StyleConstants.smallMargin,
        borderColor: BaseColors.lightGrey,
        borderWidth: 1,
        borderRadius: 5
    },
    info: {
        height: normalize.width(20),
        width: normalize.width(20),
        alignSelf: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: StyleConstants.borderRadius,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: BaseColors.white,
        padding: 15,
        borderRadius: StyleConstants.borderRadius,
        borderWidth: 1,
        borderColor: BaseColors.lightGrey,
        marginBottom: StyleConstants.smallMargin
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginLeft: 5,
        textTransform: 'capitalize'
    },
})

const mapStateToProps = (state: ReducerProps) => ({
    equipments: state.exercises.equipments,
    exerciseProps: state.exercises.targetExercise
})

export default connect(mapStateToProps, { updateExercise, createNewExercise, removeExercise, fetchMusclesAndEquipments })(EditExercise);