import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [juros, setJuros] = useState('');

  const handleCalcular = () => {
    const v = parseFloat(valor);
    const p = parseInt(parcelas);
    const j = parseFloat(juros);

    if (!v || !p || isNaN(j)) return;

    let valorFinal = 0;
    let valorParcela = 0;

    if (j === 0) {
      valorFinal = v;
      valorParcela = v / p;
    } else {
      valorFinal = v * Math.pow(1 + j / 100, p);
      valorParcela = valorFinal / p;
    }

    const totalJuros = valorFinal - v;

    navigation.navigate('Result', {
      valorParcela: valorParcela.toFixed(2),
      valorFinal: valorFinal.toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      valorAvista: v.toFixed(2)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simule sua Compra</Text>

      <Text style={styles.label}>Valor da Compra (R$)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 1000"
      />

      <Text style={styles.label}>Número de Parcelas</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={parcelas}
        onChangeText={setParcelas}
        placeholder="Ex: 12"
      />

      <Text style={styles.label}>Taxa de Juros ao mês (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={juros}
        onChangeText={setJuros}
        placeholder="Ex: 2.5 (0 para sem juros)"
      />

      <TouchableOpacity style={styles.button} onPress={handleCalcular}>
        <Text style={styles.buttonText}>Calcular</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#00B686',
    padding: 16,
    borderRadius: 16,
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
