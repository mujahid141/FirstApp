import React, { useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const SoilAnalysis = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Function to pick image from gallery
  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, response => {
      if (!response.didCancel && !response.error && response.assets) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        processImage(selectedImage.base64);
      }
    });
  };

  // Function to capture image from camera
  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo', includeBase64: true }, response => {
      if (!response.didCancel && !response.error && response.assets) {
        const capturedImage = response.assets[0];
        setImageUri(capturedImage.uri);
        processImage(capturedImage.base64);
      }
    });
  };

  // Function to send the image for analysis
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Soil Health Analysis</Text>
      
      {/* Display the selected image */}
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginVertical: 10 }} />}
      
      {/* Display loading indicator */}
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {/* Display analysis result */}
      {analysisResult && (
        <View>
          <Text>Phosphorus (P): {analysisResult.P}</Text>
          <Text>pH Level: {analysisResult.pH}</Text>
          <Text>Organic Matter (OM): {analysisResult.OM}</Text>
          <Text>Electrical Conductivity (EC): {analysisResult.EC}</Text>
        </View>
      )}

      {/* Buttons to capture or pick an image */}
      <Button title="Take Photo" onPress={handleTakePhoto} />
      <Button title="Choose from Gallery" onPress={handleChoosePhoto} />
    </View>
  );
};

export default SoilAnalysis;
