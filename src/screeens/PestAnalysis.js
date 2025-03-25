import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PestAnalysis = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, response => {
      if (!response.didCancel && !response.error && response.assets) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        processImage(selectedImage.base64);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo', includeBase64: true }, response => {
      if (!response.didCancel && !response.error && response.assets) {
        const capturedImage = response.assets[0];
        setImageUri(capturedImage.uri);
        processImage(capturedImage.base64);
      }
    });
  };

  const processImage = async (base64Image) => {
    setLoading(true);
    try {
      const response = await axios.post('http://<your-server-url>/api/predict/', { inputImage: base64Image });
      setAnalysisResult(response.data);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pest Analysis</Text>
      <Text style={styles.subHeader}>Analyze Pests on Crops</Text>
      <Text style={styles.description}>Take or upload a clear photo of the affected crop</Text>
      
      <View style={styles.imageContainer}>
        <Icon name="camera" size={40} color="#4CAF50" />
        <Text style={styles.imageText}>{imageUri ? 'Image Selected' : 'No image selected'}</Text>
      </View>
      
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {analysisResult && (
        <View style={styles.resultContainer}>
          <Text>Pest Type: {analysisResult.pestType}</Text>
          <Text>Severity Level: {analysisResult.severity}</Text>
          <Text>Recommended Treatment: {analysisResult.treatment}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleTakePhoto}>
        <Icon name="camera" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonSecondary} onPress={handleChoosePhoto}>
        <Icon name="image" size={20} color="#000" />
        <Text style={styles.buttonTextSecondary}>Upload Photo</Text>
      </TouchableOpacity>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Tips for best results:</Text>
        <Text>• Ensure good lighting conditions</Text>
        <Text>• Focus on the affected area</Text>
        <Text>• Avoid blurry images</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 10
  },
  imageText: {
    color: 'gray'
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10
  },
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8
  },
  buttonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5
  },
  buttonTextSecondary: {
    color: '#000',
    fontSize: 16,
    marginLeft: 8
  },
  tipsContainer: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: '100%'
  },
  tipsHeader: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});

export default PestAnalysis;
