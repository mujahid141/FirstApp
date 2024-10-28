import React from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header with Icons */}
      <View style={styles.header}>
        <Text style={styles.farmName}>Farm's Name</Text>
        <View style={styles.iconContainer}>
          <Icon name="user" size={24} color="gray" style={styles.icon} onPress={()=>navigation.navigate('Profile')} />
          <Icon name="bell" size={24} color="green" style={styles.icon}onPress={()=>navigation.navigate('Notifictions')} />
          <Icon name="cog" size={24} color="green" style={styles.icon} onPress={()=>navigation.navigate('Settings')}/>
        </View>
      </View>

      {/* Weather Section */}
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherHeader}>Current Weather</Text>
        <Text style={styles.weatherSubHeader}>Your farm is Stress Free</Text>
        <Text style={styles.weatherLocation}>Near Akola</Text>
        
        <View style={styles.temperatureContainer}>
          <Image
            source={require('../../assets/sun.jpg')} // Replace with your icon URL
            style={styles.weatherIcon}
          />
          <Text style={styles.temperatureText}>28.23°C</Text>
        </View>
        <Text style={styles.weatherDescription}>Clear</Text>
        <Text style={styles.weatherDetails}>Cloud: 5</Text>

        <View style={styles.weatherStatsContainer}>
          <Text style={styles.weatherStat}>Humidity: 42%</Text>
          <Text style={styles.weatherStat}>Wind: 1.7m/s</Text>
          <Text style={styles.weatherStat}>Pressure: 1013hPa</Text>
        </View>
      </View>

      {/* Buttons for Soil and Pest Analysis */}
      <View style={styles.analysisContainer}>
      <TouchableOpacity style={styles.analysisButton} onPress={() =>navigation.navigate('Soilanalysis')}>
        <Text style={styles.analysisButtonText}>Soil Health Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.analysisButton} onPress={() => alert('Pest Analysis and Insights')}>
        <Text style={styles.analysisButtonText}>Pest Analysis and Insights</Text>
      </TouchableOpacity>

      {/* Placeholder buttons for additional features */}
      <TouchableOpacity style={styles.analysisButton} onPress={() => alert('Additional Feature 1')}>
        <Text style={styles.analysisButtonText}>Additional Feature 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.analysisButton} onPress={() => alert('Additional Feature 2')}>
        <Text style={styles.analysisButtonText}>Additional Feature 2</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f5',
    padding: 16,
    marginTop:35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  farmName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 8,
  },
  weatherContainer: {
    backgroundColor: '#e6f5f3',
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
  },
  weatherHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherSubHeader: {
    color: '#6b8e23',
    fontSize: 14,
    marginTop: 4,
  },
  weatherLocation: {
    color: '#6b8e23',
    fontSize: 14,
    marginBottom: 12,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  weatherStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherStat: {
    fontSize: 14,
    color: '#555',
  },
  analysisContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  analysisButton: {
    width: '45%',
    height: 100,
    backgroundColor: '#a2dec8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  analysisButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;
