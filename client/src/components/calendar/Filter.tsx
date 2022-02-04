import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, Pressable, View, Alert } from 'react-native';
import { GeneratedProgramProps, ProgramProps, ProgramActionProps } from '../../services/program/types';
import { FlatList } from 'react-native-gesture-handler';
import StyleConstants from '../tools/StyleConstants';
import BaseColors, { rgba } from '../../utils/BaseColors';
import SecondaryText from '../elements/SecondaryText';
import DateTools from '../../utils/DateTools';
import { connect } from 'react-redux';
import { ReducerProps } from '../../services';
import { removeGeneratedProgram } from '../../services/program/actions';
import { AppDispatch } from '../../../App';
import { SET_FILTER_BY_PROGRAM } from '../../services/workout/actionTypes';
import { normalize } from '../../utils/tools';
import TrashSvg from '../../assets/TrashSvg';


interface Props {
    programs: GeneratedProgramProps[];
    selectedProgram: string;
    removeGeneratedProgram: ProgramActionProps['removeGeneratedProgram'];
    dispatch: AppDispatch;
    athlete?: boolean;
}


const DashboardFilter = ({ programs, selectedProgram, removeGeneratedProgram, dispatch, athlete }: Props) => {
    const [deleteItem, setDeleteItem] = useState('');
    const timeout: any = useRef();

    useEffect(() => {
        if (athlete) return;
        if (deleteItem) {
            clearTimeout(timeout.current)
            timeout.current = setTimeout(async () => {
                await removeGeneratedProgram(deleteItem)
                setDeleteItem('')
            }, 2000);
        } else {
            clearTimeout(timeout.current)
        }
    }, [deleteItem])

    const renderItemText = (item: GeneratedProgramProps) => {
        //get state
        const dObj = DateTools.UTCISOToLocalDate(item.startDate);
        if (!dObj) return item.name;
        const dStr = DateTools.dateToStr(dObj)
        const monthDayStr = DateTools.strToMMDD(dStr)

        return item.name
    }

    const onProgramSelect = (programUid: string) => !athlete && dispatch({ type: SET_FILTER_BY_PROGRAM, payload: programUid });

    const onPressIn = (id: string) => {
        if (athlete) return;
        //set timer
        if (selectedProgram === id) {
            setDeleteItem(id)
        }
    }

    const onPressOut = () => {
        //end 
        if (athlete) return;
        setDeleteItem('')
    }

    const renderListHeaderComponent = useCallback(() => (
        <Pressable
            onPress={() => onProgramSelect('')}
            style={({ pressed }) => [styles.itemContainer, {
                backgroundColor: pressed ? rgba(BaseColors.primary, .5) : !selectedProgram ? BaseColors.primary : BaseColors.lightGrey
            }]}

        >
            <SecondaryText styles={[styles.itemText, {
                color: !selectedProgram ? BaseColors.white : BaseColors.secondary
            }]} bold={true} numberOfLines={1}>All</SecondaryText>
        </Pressable>
    ), [selectedProgram])

    const renderItem = useCallback(({ item }: { item: GeneratedProgramProps }) => {
        return (
            <Pressable
                onPressIn={() => onPressIn(item._id)}
                onPressOut={onPressOut}
                onPress={() => onProgramSelect(item._id)}
                style={({ pressed }) => [styles.itemContainer, {
                    backgroundColor: pressed ? rgba(BaseColors.primaryRgb, .5) : selectedProgram === item._id ? BaseColors.primary : BaseColors.lightGrey
                }]}

            >
                <SecondaryText styles={[styles.itemText, {
                    color: selectedProgram === item._id ? BaseColors.white : BaseColors.secondary
                }]} bold={true} numberOfLines={1}>{renderItemText(item)}</SecondaryText>
                {
                    deleteItem === item._id && <View style={{
                        position: 'absolute',
                        left: '-5%',
                        alignSelf: 'center',
                        height: normalize.width(20),
                        width: normalize.width(20)
                    }}>
                        <TrashSvg fillColor={BaseColors.primary} />
                    </View>
                }
            </Pressable>
        )
    }, [programs, selectedProgram, deleteItem])

    return (
        <View style={styles.container}>
            <FlatList
                data={athlete ? [] : programs}
                horizontal={true}
                style={{ flexGrow: 1 }}
                ListHeaderComponent={renderListHeaderComponent}
                contentContainerStyle={{ alignItems: 'flex-start' }}
                renderItem={renderItem}
                keyExtractor={(item, index) => item._id ? item._id : index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StyleConstants.smallMargin,
        marginLeft: StyleConstants.baseMargin,
        marginRight: StyleConstants.baseMargin
    },
    itemContainer: {
        padding: 10,
        marginRight: StyleConstants.smallMargin,
        borderRadius: 100,
    },
    itemText: {
        fontSize: 10,
        textTransform: 'capitalize'
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    programs: state.program.generatedPrograms,
    selectedProgram: state.workout.filterByProgramUid,
})

const mapDispatchToProps = (dispatch: any) => ({
    removeGeneratedProgram: async (programUid: string) => dispatch(removeGeneratedProgram(programUid)),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardFilter);