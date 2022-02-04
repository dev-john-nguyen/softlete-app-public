import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as IAP from 'expo-in-app-purchases';
import auth from '@react-native-firebase/auth';
import SignIn from './screens/signin';
import SettingsStack from './screens/settings';
import { connect } from 'react-redux';
import { ReducerProps } from './services';
import { logout, login, handleSubscriptionPurchased } from './services/user/actions';
import Banner from './components/Banner';
import { StyleSheet, View } from 'react-native';
import { UserActionProps, UserProps } from './services/user/types';
import { IndexStackParamsList } from './screens/types';
import BaseColors from './utils/BaseColors';
import CustomDrawerMenu from './components/CustomDrawerMenu';
import HomeStack from './screens/home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InitUser from './screens/init';
import TourForm from './screens/init/Tour';
import NetworkStack from './screens/network';
import AdminStack from './admin/screens';
import axios from 'axios';
import paths, { SERVERURL } from './utils/PATHS';
import messaging from '@react-native-firebase/messaging';
import VerifyEmail from './screens/signin/VerifyEmail';
import HelpStack from './screens/help';
import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";
import StyleConstants from './components/tools/StyleConstants';
import { BannerProps } from './services/banner/types';
import { navigationRef } from './RootNavigation';
import { AppDispatch } from '../App';
import { SET_CONNECT_APP_STORE, SET_OFFLINE } from './services/global/actionTypes';
import { normalize } from './utils/tools';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health'
import LogoSvg from './assets/LogoSvg';
import ProgramStack from './screens/program';
import notifee from '@notifee/react-native';

const permissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
            AppleHealthKit.Constants.Permissions.ActivitySummary,
            AppleHealthKit.Constants.Permissions.DistanceCycling,
            AppleHealthKit.Constants.Permissions.DistanceSwimming,
            AppleHealthKit.Constants.Permissions.StepCount,
            AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
            AppleHealthKit.Constants.Permissions.Workout,
            AppleHealthKit.Constants.Permissions.HeartRate
        ],
        write: [],
    },
} as HealthKitPermissions

AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */
    if (error) console.log('[ERROR] Cannot grant permissions!');
})

const Drawer = createDrawerNavigator<IndexStackParamsList>();

interface Props {
    banner: BannerProps['banner'];
    user: UserProps;
    logout: any;
    login: any;
    isNewUser: boolean;
    handleSubscriptionPurchased: UserActionProps['handleSubscriptionPurchased'];
    dispatch: AppDispatch;
}

const Main = ({ banner, logout, login, user, isNewUser, handleSubscriptionPurchased, dispatch }: Props) => {
    const [loading, setLoading] = useState(false);
    const [verify, setVerfiy] = useState(false);


    const initIAP = async () => {
        try {
            await IAP.connectAsync().then((res) => {
                console.log(res)
                dispatch({ type: SET_CONNECT_APP_STORE })
            })

            IAP.setPurchaseListener(async ({ responseCode, results, errorCode }) => {
                // Purchase was successful
                if (responseCode === IAP.IAPResponseCode.OK) {

                    if (!results || !user.uid) return;

                    for (let i = 0; i < results.length; i++) {
                        const purchase: IAP.InAppPurchase = results[i];

                        if (!purchase.acknowledged && purchase.transactionReceipt) {
                            // Process transaction here and unlock content...
                            // await subscriptionPurchased(purchase.productId, purchase.purchaseTime, purchase.originalOrderId ? purchase.originalOrderId : purchase.orderId)
                            await handleSubscriptionPurchased(purchase.transactionReceipt, purchase.originalOrderId ? purchase.originalOrderId : purchase.orderId, purchase.productId)
                            // Then when you're done
                            IAP.finishTransactionAsync(purchase, true);
                        }

                    }

                    return;
                }

                // Else find out what went wrong
                if (responseCode === IAP.IAPResponseCode.USER_CANCELED) {
                    console.log('warning', 'You canceled the transaction');
                } else if (responseCode === IAP.IAPResponseCode.DEFERRED) {
                    console.log('warning', 'You do not have permissions to buy but requested parental approval (iOS only)');
                } else {
                    console.log('error', `Something went wrong with the purchase. Received errorCode ${errorCode}`);
                }
            });

        } catch (err) {
            console.log(err)
        }
    }

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            // get  the token
            const fcmToken = await messaging().getToken();
            if (fcmToken && fcmToken !== user.notificationToken) {
                await axios.post(SERVERURL + paths.user.token, { notificationToken: fcmToken }).then(() => console.log('token saved'))
            }
        }

    }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.type === NetInfoStateType.none || state.isInternetReachable === false) {
                dispatch({ type: SET_OFFLINE })
            } else {
                // dispatch({ type: SET_ONLINE })
            }
        });

        notifee.setBadgeCount(0).catch(err => console.log(err))

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (user.uid) {
            initIAP()
            requestUserPermission().catch(err => console.log(err))
        }
    }, [user.uid])

    useEffect(() => {
        let subscribe = auth().onAuthStateChanged(async (authUser) => {
            setLoading(true)
            if (authUser) {
                if (authUser.emailVerified) {
                    //login
                    setVerfiy(false);
                    await authUser.getIdToken()
                        .then((token) => login(token))
                        .catch((err) => {
                            console.log(err)
                            login('')
                        })
                } else {
                    //complete login process
                    setVerfiy(true)
                }
            } else {
                setVerfiy(false)
                logout()
            }
            setLoading(false)
        })

        return () => {
            subscribe();
        }
    }, [])

    return (
        <SafeAreaProvider>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: normalize.width(8), height: normalize.width(8) }}>
                            <LogoSvg />
                        </View>
                    </View>
                    :
                    <NavigationContainer theme={{
                        ...DefaultTheme,
                        colors: {
                            ...DefaultTheme.colors,
                            background: BaseColors.lightWhite,
                            primary: BaseColors.black
                        }
                    }} ref={navigationRef}>
                        <Drawer.Navigator
                            drawerContent={(props) => <CustomDrawerMenu drawerProps={props} logout={logout} user={user} />}
                            screenOptions={({ navigation }) => ({
                                headerShown: false,
                                drawerPosition: "right",
                            })}>
                            {
                                verify ?
                                    <Drawer.Screen name="VerifyEmail" component={VerifyEmail} />
                                    :
                                    user.token ?
                                        isNewUser ?
                                            <>
                                                <Drawer.Screen name="Init" component={InitUser} options={{ swipeEnabled: false }} />
                                                <Drawer.Screen name="TourForm" component={TourForm} options={{ swipeEnabled: false }} />
                                            </>
                                            :
                                            <>
                                                <Drawer.Screen name="HomeStack" component={HomeStack} initialParams={user} options={{ swipeEnabled: false }} />
                                                <Drawer.Screen name="ProgramStack" component={ProgramStack} options={{ swipeEnabled: false }} />
                                                <Drawer.Screen name="NetworkStack" component={NetworkStack} options={{ swipeEnabled: false }} />
                                                <Drawer.Screen name="SettingsStack" component={SettingsStack} initialParams={user} options={{ swipeEnabled: false }} />
                                                <Drawer.Screen name='HelpStack' component={HelpStack} options={{ swipeEnabled: false }} />
                                                <Drawer.Screen name='AdminStack' component={AdminStack} options={{ swipeEnabled: false }} />
                                            </>
                                        :
                                        <>
                                            <Drawer.Screen name="SignIn" component={SignIn} options={{ swipeEnabled: false }} />
                                        </>
                            }
                        </Drawer.Navigator>
                    </NavigationContainer>
            }
            <Banner banner={banner} />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: '20%',
        paddingLeft: StyleConstants.baseMargin,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user,
    banner: state.banner.banner,
    isNewUser: state.global.isNewUser,
    notificationToken: state.global.notificationToken,
    register: state.global.register
})

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logout()),
    login: (token: string) => dispatch(login(token)),
    handleSubscriptionPurchased: (transactionReceipt: string, originalOrderId: string, productId: string) => dispatch(handleSubscriptionPurchased(transactionReceipt, originalOrderId, productId)),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);