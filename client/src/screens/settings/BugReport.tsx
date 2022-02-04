import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import PATHS, { SERVERURL } from '../../utils/PATHS';
import PrimaryButton from '../../components/elements/PrimaryButton';
import Input from '../../components/elements/Input';
import StyleConstants from '../../components/tools/StyleConstants';
import SecondaryText from '../../components/elements/SecondaryText';
import BaseColors from '../../utils/BaseColors';
import PrimaryText from '../../components/elements/PrimaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

interface Props {

}


const BugReport = ({ }: Props) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const headerHeight = useHeaderHeight();


    const sendBugReport = async () => {
        if (loading) return;
        if (!description || !type) return Alert.alert("Description and type are required.");
        setLoading(true)
        try {
            await axios.post(SERVERURL + PATHS.bug.create, { type, description });
            Alert.alert("Bug Reported!");
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', "right", 'bottom']}>
            <View style={{ height: headerHeight }} />
            <PrimaryText styles={styles.headerText}>Issue Report Form</PrimaryText>
            <SecondaryText styles={styles.label}>Location</SecondaryText>
            <Input
                value={type}
                onChangeText={txt => setType(txt)}
                placeholder='What screen did this issue occur?'
                multiline
                maxLength={100}
            />
            <SecondaryText styles={styles.label}>Description</SecondaryText>
            <Input
                value={description}
                onChangeText={txt => setDescription(txt)}
                placeholder='Please give a detail explanation of the issue you found.'
                multiline
                maxLength={500}
            />
            <PrimaryButton loading={loading} onPress={sendBugReport} styles={styles.submit}>Submit</PrimaryButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: StyleConstants.baseMargin,
        paddingTop: 0
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary
    },
    label: {
        color: BaseColors.lightBlack,
        fontSize: StyleConstants.smallerFont,
        marginBottom: 5,
        marginTop: 20
    },
    submit: {
        marginTop: StyleConstants.baseMargin,
        borderRadius: StyleConstants.borderRadius
    }
})
export default BugReport;