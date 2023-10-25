import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const AddEmployee = ({ navigation, route }) => {
    const { empData } = route.params
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [empId, setEmpId] = useState('')
    const [empPhone, setPhone] = useState('')
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        if (empData) {

            setEmail(empData.email);
            setName(empData.name);
            setEmpId(empData.empId);
            setImageURL(empData.imageURL);
            setPhone(empData.empPhone);
        }
    }, [empData]);
    const loadFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('empData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    };

    const handleAddShoe = () => {
        if (!email || !name || !imageURL || !empPhone || !empId) {
            alert('Please fill in all fields.');
            return;
        }
        if (empPhone.length !== 10) {
            alert('Please enter valid phone number');
            return;
        }
        if (empId.length !== 6) {
            alert('Employee Id should be 6 digit');
            return;
        }
        const newUser = {
            id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
            email,
            name,
            imageURL,
            empPhone,
            empId,
        };
        if (empData) {
            let filteredData = data.filter((itm) => itm.id != empData.id)
            setEmail('');
            setName('');
            setImageURL('');
            setPhone('');
            setEmpId('');
            setData([...filteredData, newUser]);
            saveToStorage([...filteredData, newUser]);
        } else {
            setData((prev) => [...prev, newUser]);
            setEmail('');
            setName('');
            setImageURL('');
            setEmpId('');
            setPhone('');
            saveToStorage([...data, newUser]);
        }
        navigation.push('AdminHomeScreen')
    };
    useEffect(() => {
        const loadData = async () => {
            const storedData = await loadFromStorage();
            if (storedData) {
                setShoes(storedData);
            }
            empData && handleEdit()
        };
        navigation.addListener('focus', () => {
            loadData();
        });
        loadData()
    }, []);
    const handleEdit = () => {
        setEmail(empData.email);
        setName(empData.name);
        setEmpId(empData.empId);
        setImageURL(empData.imageURL)
        setPhone(empData.empPhone)
    };

    const saveToStorage = async (newValue) => {
        try {
            const jsonValue = JSON.stringify(newValue);
            await AsyncStorage.setItem('empData', jsonValue);
        } catch (e) {

        }
    };

    const onpickerClick = async () => {
        const options = {

        }
        const result = await launchImageLibrary(options);
        setImageURL(result.assets[0]?.uri)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ height: 90, width: '100%', backgroundColor: '#1f1f5d', borderBottomRightRadius: 100, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Employee Register Screen</Text>
            </View>
            <TouchableOpacity onPress={onpickerClick} style={{ marginTop: 50, alignSelf: 'center', }}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageURL ? imageURL : 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' }} style={{ height: 100, width: 100, borderRadius: 50 }} />
                </View>
                <Text style={{ color: '#1f1f5d' }}>Click here to upload image</Text>
            </TouchableOpacity>
            <TextInput style={styles.input}
                placeholder='Enter employee name'
                value={name}
                onChangeText={(e) => setName(e)} />
            <TextInput style={styles.input}
                placeholder='Enter employee email'
                value={email}
                onChangeText={(e) => setEmail(e)} />
            <TextInput style={styles.input}
                placeholder='Enter employee ID'
                value={empId}
                keyboardType='numeric'
                maxLength={6}
                onChangeText={(e) => setEmpId(e)} />
            <TextInput style={styles.input}
                placeholder='Enter employee phone number'
                value={empPhone}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(e) => setPhone(e)} />
            <TouchableOpacity
                style={
                    styles.button
                } onPress={handleAddShoe}>
                <Text style={{ fontSize: 18, color: 'white' }}>{empData ? "Save employee" : "Add Employee"}</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input:
    {
        height: 45,
        width: '90%',
        borderWidth: 1.5,
        borderColor: '#1f1f5d',
        marginTop: 20,
        borderRadius: 12,
        alignSelf: 'center'
    }
    ,
    sizeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sizeButton: {
        borderColor: 'red',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedSize: {
        backgroundColor: 'red',
    },
    sizeText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1f1f5d',
        height: 50, width: '90%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    imageContainer: {
        height: 103,
        width: 103,
        borderRadius: 51,
        borderColor: '#1f1f5d',
        alignSelf: 'center',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AddEmployee;