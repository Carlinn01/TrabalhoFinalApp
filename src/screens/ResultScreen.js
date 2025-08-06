import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { valorParcela, valorFinal, totalJuros, valorAvista } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resultado da Simulação</Text>

      <View style={styles.resultBox}>
        <Text style={styles.label}>Valor da parcela:</Text>
        <Text style={styles.value}>R$ {valorParcela}</Text>

        <Text style={styles.label}>Total a pagar:</Text>
        <Text style={styles.value}>R$ {valorFinal}</Text>

        <Text style={styles.label}>Total de juros:</Text>
        <Text style={styles.value}>R$ {totalJuros}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Graph', { valorFinal, valorAvista })}>
        <Text style={styles.buttonText}>Ver Gráfico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Nova Simulação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F6',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A1A1A'
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00B686',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  }
});
