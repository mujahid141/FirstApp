import React, { useContext, useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ProfileScreen = () => {
    const { user } = useContext(AuthContext); // Access user from AuthContext
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        location: '',
        bio: '',
        account_type: ''
    });

    useEffect(() => {
        if (user) {
            // Fetch profile data if the user is authenticated
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://<your-server-url>/api/profile/${user.id}/`);
            if (response.data) {
                setProfile(response.data);
                setFormData({
                    address: response.data.address,
                    location: response.data.location,
                    bio: response.data.bio,
                    account_type: response.data.account_type
                });
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            Alert.alert("Error", "Unable to fetch profile data.");
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSaveProfile = async () => {
        try {
            if (profile) {
                // Update existing profile
                await axios.put(`http://<your-server-url>/api/profile/${user.id}/`, formData);
            } else {
                // Create new profile
                await axios.post(`http://<your-server-url>/api/profile/`, { ...formData, user: user.id });
            }
            fetchProfile();
            setIsEditing(false);
            Alert.alert("Success", "Profile saved successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            Alert.alert("Error", "Unable to save profile data.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            
            {profile && !isEditing ? (
                // Display Profile Information
                <View>
                    <Text style={styles.label}>Name: {user.name}</Text>
                    <Text style={styles.label}>Address: {profile.address}</Text>
                    <Text style={styles.label}>Location: {profile.location}</Text>
                    <Text style={styles.label}>Bio: {profile.bio}</Text>
                    <Text style={styles.label}>Account Type: {profile.account_type}</Text>
                    <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
                </View>
            ) : (
                // Profile Creation / Edit Form
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={formData.address}
                        onChangeText={(value) => handleInputChange("address", value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        value={formData.location}
                        onChangeText={(value) => handleInputChange("location", value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        value={formData.bio}
                        onChangeText={(value) => handleInputChange("bio", value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Account Type"
                        value={formData.account_type}
                        onChangeText={(value) => handleInputChange("account_type", value)}
                    />
                    <Button title="Save Profile" onPress={handleSaveProfile} />
                    {profile && <Button title="Cancel" color="red" onPress={() => setIsEditing(false)} />}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    form: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ProfileScreen;
