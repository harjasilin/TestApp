
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('AdminHomeScreen');
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://tse4.mm.bing.net/th?id=OIP.KrXLoszgUcfedzDZoRLksgAAAA&pid=Api&P=0&h=180' }} style={styles.logo} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
