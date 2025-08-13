"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native"

export default function HomeScreen({ navigation }) {
  const [valor, setValor] = useState("")
  const [parcelas, setParcelas] = useState("")
  const [juros, setJuros] = useState("")

  const handleCalcular = () => {
    const v = Number.parseFloat(valor.replace(/[^0-9,]/g, "").replace(",", "."))
    const p = Number.parseInt(parcelas)
    const j = Number.parseFloat(juros.replace(",", "."))

    if (!v || !p || isNaN(j)) return

    let valorFinal = 0
    let valorParcela = 0

    if (j === 0) {
      valorFinal = v
      valorParcela = v / p
    } else {
      valorFinal = v * Math.pow(1 + j / 100, p)
      valorParcela = valorFinal / p
    }

    const totalJuros = valorFinal - v

    navigation.navigate("Result", {
      valorParcela: valorParcela.toFixed(2),
      valorFinal: valorFinal.toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      valorAvista: v.toFixed(2),
      parcelas: p,
      juros: j,
    })
  }

  const formatCurrency = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "")
    const formattedValue = (numericValue / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formattedValue
  }

  const handleValorChange = (text) => {
    const formatted = formatCurrency(text)
    setValor(formatted)
  }

  const isFormValid = valor && parcelas && juros !== ""

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />

      {/* Header com gradiente simulado */}
      <View style={styles.header}>
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>💳</Text>
            <Text style={styles.headerTitle}>Simulador de Parcelamento</Text>
            <Text style={styles.headerSubtitle}>Calcule suas parcelas com facilidade</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card principal */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🧮</Text>
            <Text style={styles.cardTitle}>Dados da Compra</Text>
          </View>

          {/* Valor da compra */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>💰 Valor da Compra</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>R$</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={valor}
                onChangeText={handleValorChange}
                placeholder="0,00"
                placeholderTextColor="#a0aec0"
              />
            </View>
          </View>

          {/* Número de parcelas */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📅 Número de Parcelas</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={parcelas}
                onChangeText={setParcelas}
                placeholder="12"
                placeholderTextColor="#a0aec0"
              />
              <Text style={styles.inputSuffix}>x</Text>
            </View>
          </View>

          {/* Taxa de juros */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📈 Taxa de Juros Mensal</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={juros}
                onChangeText={setJuros}
                placeholder="2,5"
                placeholderTextColor="#a0aec0"
              />
              <Text style={styles.inputSuffix}>% a.m.</Text>
            </View>
            <Text style={styles.helperText}>Digite 0 para compras sem juros</Text>
          </View>
        </View>

        {/* Botão de calcular */}
        <TouchableOpacity
          style={[styles.calculateButton, !isFormValid && styles.buttonDisabled]}
          onPress={handleCalcular}
          disabled={!isFormValid}
        >
          <View style={[styles.buttonGradient, !isFormValid && styles.buttonGradientDisabled]}>
            <Text style={styles.buttonIcon}>🧮</Text>
            <Text style={styles.buttonText}>Calcular Parcelas</Text>
          </View>
        </TouchableOpacity>

        {/* Card de dicas */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Text style={styles.tipsIcon}>💡</Text>
            <Text style={styles.tipsTitle}>Dicas Importantes</Text>
          </View>
          <Text style={styles.tipsText}>
            • Compare sempre o valor total com o preço à vista{"\n"}• Considere sua capacidade de pagamento mensal{"\n"}
            • Juros compostos aumentam significativamente o valor final
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  header: {
    backgroundColor: "#1a365d",
  },
  headerGradient: {
    backgroundColor: "#2d5a87",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e2e8f0",
    marginTop: 4,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -15,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a365d",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4a5568",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    height: 56,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4a5568",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#2d3748",
    fontWeight: "500",
  },
  inputSuffix: {
    fontSize: 16,
    color: "#718096",
    fontWeight: "500",
  },
  helperText: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
    fontStyle: "italic",
  },
  calculateButton: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: "#38a169",
  },
  buttonGradientDisabled: {
    backgroundColor: "#a0aec0",
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  tipsCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f6ad55",
    marginBottom: 30,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipsIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#744210",
  },
  tipsText: {
    fontSize: 14,
    color: "#744210",
    lineHeight: 20,
  },
})
