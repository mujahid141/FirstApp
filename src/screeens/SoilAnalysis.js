import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const SoilAnalysis = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const requestPermission = async (type) => {
    let permissionResult;
    if (type === 'gallery') {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    } else {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    }
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', `App needs permission to access the ${type}.`);
    }
    return permissionResult.granted;
  };

  const handleImageSelection = async (type) => {
    const hasPermission = await requestPermission(type);
    if (!hasPermission) return;

    const result = type === 'gallery'
      ? await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true })
      : await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true });

    if (!result.canceled && result.assets[0]?.base64) {
      setImageUri(result.assets[0].uri);
      processImage(result.assets[0].base64);
    } else {
      Alert.alert('Error', 'Unable to retrieve image data.');
    }
  };

  const processImage = async (base64Image) => {
    setLoading(true);
    try {
        // Ensure only the base64 part is sent
        const base64Only = base64Image.split(',').pop();

        const response = await axios.post(
            'http://192.168.43.197:8000/api/soil_analysis/predict/',
            { inputImage: base64Only }, // JSON format without JSON.stringify
            { headers: { 'Content-Type': 'application/json' } }
        );

        setAnalysisResult(response.data);
    } catch (error) {
        console.error('Error during image analysis:', error.message);
        Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soil Health Analysis</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {analysisResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Phosphorus (P): {analysisResult.P}</Text>
          <Text style={styles.resultText}>pH Level: {analysisResult.pH}</Text>
          <Text style={styles.resultText}>Organic Matter (OM): {analysisResult.OM}</Text>
          <Text style={styles.resultText}>Electrical Conductivity (EC): {analysisResult.EC}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleImageSelection('camera')}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleImageSelection('gallery')}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultContainer: {
    marginVertical: 20,
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#00796b',
    fontWeight: '500',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SoilAnalysis;
