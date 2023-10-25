import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminHomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const storedData = await loadFromStorage();
            if (storedData) {
                setData(storedData);
            }
        };
        navigation.addListener('focus', () => {
            loadData();
        });
        loadData();
    }, [navigation]);

    const handleEditShoe = (empData) => {
        navigation.navigate('AddEmployee', { empData })
    };

    const handleDeleteShoe = (index) => {
        const updatedEmp = [...data];
        updatedEmp.splice(index, 1);
        setData(updatedEmp);
        saveToStorage(updatedEmp);
    };

    const saveToStorage = async (empData) => {
        try {
            const jsonValue = JSON.stringify(empData);
            await AsyncStorage.setItem('userData', jsonValue);
        } catch (e) {

        }
    };

    const loadFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Employee Management</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddEmployee', { empData: null })} style={styles.buttonStyles}>
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
            {data.length === 0 && <View style={{ marginTop: '50%' }}>
                <Text style={{ ...styles.buttonText, color: '#1f1f5d' }} >Employee list is empty</Text>
            </View>}
            <View style={styles.shoeContainer} >
                {data.map((shoe, index) => (
                    <View key={index} style={{ elevation: 9, padding: 10, backgroundColor: '#DBE9FA', borderRadius: 10 }} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: shoe.imageURL }}
                                style={{ height: 100, width: 100, borderRadius: 50 }}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.shoeText}>{shoe.name}</Text>
                                <Text style={styles.shoeText}>{shoe.email}</Text>
                                <Text style={styles.shoeText}>Emp. ID : {shoe.empId}</Text>
                                <Text style={styles.shoeText}>Emp. Phone : {shoe.empPhone}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'center', marginBottom: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: '#1f1f5d', height: 30, width: 80, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} onPress={() => handleEditShoe(shoe)} >
                                <Text style={{ fontSize: 12, color: 'white' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'red', height: 30, width: 80, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} onPress={() => handleDeleteShoe(index)}>
                                <Text style={{ fontSize: 12, color: 'white' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                ))}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        textDecorationLine: 'underline',
        color: '#1f1f5d'
    },
    buttonStyles: {
        backgroundColor: '#1f1f5d',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fff'
    },
    shoeContainer: {
        marginVertical: 10,
        gap: 10
    },
    shoeImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    shoeText: {
        fontSize: 15,
        marginBottom: 5,
        color: 'black',
        fontWeight: '500'
    },
});

export default AdminHomeScreen;