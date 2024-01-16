import React, { useState, useCallback } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/bg.jpg')}
                resizeMode="cover"
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                    style={styles.pageStyle}
                >
                    {inspiringTitle()}
                    {inspiringDescription()}
                    {startButton()}
                </LinearGradient>
            </ImageBackground>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView >
    )

    function inspiringDescription() {
        return (
            <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding + 5.0 }}>
                The journey of a thousand miles begins with a single step
            </Text>
        )
    }

    function inspiringTitle() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor30Bold }}>
                        {`The `}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor30Bold }}>
                        Best Tour Guides
                    </Text>
                </View>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    in the Pakistan
                </Text>
            </View>
        )
    }

    function startButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Welcome')}
                >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(82, 130, 101, 0.4)', 'rgba(68, 130, 101, 0.5)', 'rgba(68, 130, 101, 0.6)']}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Regular }}>
                        Start
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    pageStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'flex-end',
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: Sizes.fixPadding * 5.0,
        marginBottom: Sizes.fixPadding,
        height: 55.0,
    },
})

export default OnboardingScreen;