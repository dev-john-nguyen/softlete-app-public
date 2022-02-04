import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, SectionList } from 'react-native';
import request from '../../services/utils/request';
import paths from '../../utils/PATHS';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../App';
import { ProgramActionProps, ProgramHeaderProps, ProgramProps } from '../../services/program/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyleConstants from '../../components/tools/StyleConstants';
import ProgramHeaderImage from '../../components/program/HeaderImage';
import SecondaryText from '../../components/elements/SecondaryText';
import BaseColors from '../../utils/BaseColors';
import { normalize } from '../../utils/tools';
import { fetchPrograms, setTargetProgram } from '../../services/program/actions';
import { ReducerProps } from '../../services';
import PlusSvg from '../../assets/PlusSvg';
import { ProgramStackScreens } from './types';
import { UserProps } from '../../services/user/types';
import { useHeaderHeight } from '@react-navigation/elements';
import PrimaryText from '../../components/elements/PrimaryText';

interface Props {
    navigation: any;
    route: any;
    dispatch: AppDispatch;
    programTemplates: ProgramProps[];
    user: UserProps;
    softleteUid: string;
    fetchPrograms: ProgramActionProps['fetchPrograms'];
}

interface SectionProps {
    title: string,
    data: ProgramProps[]
}

const Templates = ({ dispatch, navigation, programTemplates, route, user, softleteUid, fetchPrograms }: Props) => {
    const [programs, setPrograms] = useState<SectionProps[]>([]);
    const [softPrograms, setSoftPrograms] = useState<ProgramProps[]>([])
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        //softlete username
        request("GET", paths.programs.get(softleteUid), dispatch)
            .then(async ({ data }: { data?: ProgramHeaderProps[] }) => {
                if (data) setSoftPrograms(data)
            })
            .catch(err => {
                console.log(err)
            })

        //move fetchprograms to programs screen
        fetchPrograms().catch(err => console.log(err))
    }, [])


    useEffect(() => {

        let templates: SectionProps[] = [{
            title: "Softlete's Programs",
            data: softPrograms
        }]

        if (programTemplates.length > 0) {
            templates.unshift({

                title: 'My Programs',
                data: programTemplates

            })
        }

        setPrograms(templates)
    }, [programTemplates, softPrograms])

    const onNavToProgram = (program: ProgramHeaderProps, softlete?: boolean) => {
        dispatch(setTargetProgram(program, false, softlete))
        navigation.navigate(ProgramStackScreens.Program, { softlete })
    }

    const onAddPress = () => navigation.navigate(ProgramStackScreens.ProgramHeader)

    const renderItem = useCallback(({ item: program, section }: { item: ProgramProps, section: SectionProps }) => {
        return (
            <Pressable
                style={styles.contentContainer}
                onPress={() => onNavToProgram(program)}
                key={program._id}
            >
                <ProgramHeaderImage uri={program.imageUri} onPress={() => onNavToProgram(program, section.title === 'Softlete Templates')} container={styles.image} />
                <View style={styles.content}>
                    <SecondaryText styles={styles.name} numberOfLines={2} bold>{program.name}</SecondaryText>
                    <SecondaryText styles={styles.description} numberOfLines={4}>{program.description}</SecondaryText>
                </View>
            </Pressable>
        )
    }, [programTemplates])

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <SectionList
                sections={programs}
                keyExtractor={(item, index) => item._id ? item._id : index.toString()}
                contentContainerStyle={{ paddingBottom: StyleConstants.baseMargin * 2 }}
                renderItem={renderItem}
                initialNumToRender={20}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.titleContainer}>
                        <SecondaryText styles={styles.title} bold>{title}</SecondaryText>
                    </View>
                )}
                stickySectionHeadersEnabled={false}
            />
            {
                user.admin && (
                    <Pressable style={styles.add} onPress={onAddPress} hitSlop={5}>
                        <PlusSvg strokeColor={BaseColors.white} />
                    </Pressable>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StyleConstants.baseMargin
    },
    contentContainer: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: StyleConstants.baseMargin,
        borderColor: BaseColors.lightGrey,
        paddingBottom: StyleConstants.baseMargin
    },
    name: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginBottom: 5,
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    description: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.lightBlack,
        textAlign: 'center'
    },
    content: {
        marginTop: StyleConstants.baseMargin
    },
    image: {
        height: normalize.height(6)
    },
    title: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.primary,
        textTransform: 'capitalize',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: StyleConstants.baseMargin,
        borderBottomColor: BaseColors.lightGrey,
        borderBottomWidth: 1,
        marginLeft: StyleConstants.baseMargin
    },
    add: {
        height: normalize.width(8),
        width: normalize.width(8),
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: BaseColors.primary,
        position: 'absolute',
        bottom: '5%',
        zIndex: 100
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    programTemplates: state.program.programs,
    user: state.user,
    softleteUid: state.global.softleteUid
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchPrograms: async () => dispatch(fetchPrograms()),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Templates);