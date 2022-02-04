import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ReducerProps } from '../../services';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../App';
import request from '../../services/utils/request';
import { AthleteProfileProps } from '../../services/athletes/types';
import AthleteListPreview from '../../components/athletes/ListPreview';
import ATHLETEPATHS from '../../services/athletes/ATHLETEPATHS';
import { SET_CURRENT_ATHLETE, INSERT_ATHLETE_PROFILE } from '../../services/athletes/actionTypes';
import { NetworkStackScreens } from './types';
import { UserProps, FriendStatus } from '../../services/user/types';
import { getFriends } from '../../services/user/actions';
import SearchHeader from '../../components/SearchHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyleConstants from '../../components/tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import _ from 'lodash';
import { FlatList } from 'react-native-gesture-handler';


interface Props {
    navigation: any;
    route: any;
    dispatch: AppDispatch;
    user: UserProps;
    athletes: AthleteProfileProps[];
}


const SearchAthletes = ({ dispatch, navigation, athletes, user, route }: Props) => {
    const [fetching, setFetching] = useState(false);
    const [profiles, setProfiles] = useState<AthleteProfileProps[]>([]);

    const onSearchAthletes = async (query: string) => {
        if (fetching) return;
        if (!query) return;
        setFetching(true)
        await request("GET", ATHLETEPATHS.search(query), dispatch)
            .then(({ data }: { data?: AthleteProfileProps[] }) => {
                if (data) {
                    const fitlerData = data.filter(profile => profile.blockUids.find(id => id === user.uid) ? false : true)
                    dispatch({ type: INSERT_ATHLETE_PROFILE, payload: fitlerData })
                    setProfiles(fitlerData)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        setFetching(false)
    }

    useEffect(() => {
        const { params } = route;
        if (params && params.athlete) {
            navigation.push(NetworkStackScreens.AthleteDashboard, { athlete: params.athlete })
        }
    }, [route])

    const onNavigateToProfile = (athlete: AthleteProfileProps) => {
        dispatch({ type: SET_CURRENT_ATHLETE, payload: athlete })
        navigation.push(NetworkStackScreens.AthleteDashboard, { athlete })
    }

    const renderItem = useCallback(({ item }: { item: AthleteProfileProps }) => {
        return <AthleteListPreview athlete={item} onNavigateToProfile={onNavigateToProfile} />
    }, [athletes, user])

    const onOpenDrawer = () => navigation.toggleDrawer();

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
            <SearchHeader onOpenDrawer={onOpenDrawer} onSearch={onSearchAthletes} />
            <FlatList
                data={profiles}
                keyExtractor={(item: AthleteProfileProps, index) => item.uid ? item.uid : index.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        paddingTop: StyleConstants.smallMargin,
        paddingBottom: StyleConstants.smallMargin,
        paddingLeft: StyleConstants.baseMargin,
        borderBottomWidth: .2,
        borderBottomColor: BaseColors.lightGrey
    },
    title: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.secondary
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user,
    athletes: state.athletes.profiles
})

const mapDispatchToProps = (dispatch: any) => ({
    getFriends: async () => dispatch(getFriends()),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAthletes);