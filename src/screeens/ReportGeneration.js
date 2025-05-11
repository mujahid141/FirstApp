import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportGeneration = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity> */}
        <Text style={styles.header}>Report & Insights</Text>
        <TouchableOpacity>
          <Icon name="share-variant" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Soil Analysis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soil Analysis</Text>
        <Text style={styles.label}>Soil Health Score</Text>
        <View style={styles.healthScoreContainer}>
          <ProgressBar progress={0.8} color="#4CAF50" style={styles.progressBar} />
          <Text style={styles.goodText}>Good</Text>
        </View>
      </View>

      {/* Pest Analysis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pest Analysis</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Common Pests</Text>
          <View style={styles.pestItem}>
            <Text>Aphids</Text>
            <ProgressBar progress={0.7} color="#2E7D32" />
          </View>
          <View style={styles.pestItem}>
            <Text>Spider Mites</Text>
            <ProgressBar progress={0.5} color="#2E7D32" />
          </View>
          <View style={styles.pestItem}>
            <Text>Whiteflies</Text>
            <ProgressBar progress={0.3} color="#2E7D32" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 20, fontWeight: 'bold' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 16, marginTop: 10 },
  healthScoreContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  progressBar: { flex: 1, height: 8, borderRadius: 5 },
  goodText: { marginLeft: 10, fontWeight: 'bold', color: '#4CAF50' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginTop: 10, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  pestItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 },
});

export default ReportGeneration;
