import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function GraphScreen({ route, navigation }) {
  const { valorFinal, valorAvista } = route.params;

  const data = {
    labels: ['À Vista', 'Parcelado'],
    datasets: [
      {
        data: [parseFloat(valorAvista), parseFloat(valorFinal)]
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comparativo</Text>

      <BarChart
        style={styles.chart}
        data={data}
        width={Dimensions.get('window').width - 40}
        height={260}
        yAxisLabel="R$ "
        chartConfig={{
          backgroundColor: '#F2F4F6',
          backgroundGradientFrom: '#F2F4F6',
          backgroundGradientTo: '#F2F4F6',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 182, 134, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        verticalLabelRotation={0}
        fromZero
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Nova Simulação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F4F6'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A1A1A',
    textAlign: 'center'
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  button: {
    marginTop: 40,
    backgroundColor: '#00B686',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
