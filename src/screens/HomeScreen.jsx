"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"

export default function HomeScreen({ navigation }) {
  const [valor, setValor] = useState("")
  const [parcelas, setParcelas] = useState("")
  const [juros, setJuros] = useState("")

  const handleCalcular = () => {
    const valorNum = Number.parseFloat(valor.replace(",", "."))
    const numParcelas = Number.parseInt(parcelas)
    const jurosNum = Number.parseFloat(juros.replace(",", "."))

    if (!valorNum || !numParcelas || isNaN(jurosNum)) return

    const valorFinal = jurosNum === 0 ? valorNum : valorNum * Math.pow(1 + jurosNum / 100, numParcelas)

    const valorParcela = valorFinal / numParcelas
    const totalJuros = valorFinal - valorNum

    navigation.navigate("Result", {
      valorParcela: valorParcela.toFixed(2),
      valorFinal: valorFinal.toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      valorAvista: valorNum.toFixed(2),
      parcelas: numParcelas,
      juros: jurosNum,
    })
  }

  const formatarValor = (texto) => {
    const numeros = texto.replace(/[^0-9]/g, "")
    const numeroFloat = Number.parseFloat(numeros) / 100 || 0
    return numeroFloat.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const aoAlterarValor = (texto) => {
    setValor(formatarValor(texto))
  }

  // Verifica se foi inserido os dados e libera o botão
  const formularioValido = valor && parcelas && juros !== ""

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <View style={estilos.header}>
        <View style={estilos.headerGradient}>
          <View style={estilos.headerContent}>
            <Text style={estilos.headerTitle}>Simulador de Parcelamento</Text>
            <Text style={estilos.headerSubtitle}>Calcule suas parcelas com facilidade</Text>
          </View>
        </View>
      </View>

      <ScrollView style={estilos.content} showsVerticalScrollIndicator={false}>
        <View style={estilos.mainCard}>
          <View style={estilos.cardHeader}>
            <Text style={estilos.cardIcon}>🧮</Text>
            <Text style={estilos.cardTitle}>Dados da Compra</Text>
          </View>

          {/* Valor da compra */}
          <View style={estilos.inputGroup}>
            <Text style={estilos.inputLabel}>💰 Valor da Compra</Text>
            <View style={estilos.inputContainer}>
              <Text style={estilos.currencySymbol}>R$</Text>
              <TextInput
                style={estilos.textInput}
                value={valor}
                onChangeText={aoAlterarValor}
                placeholder="0,00"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Parcelas */}
          <View style={estilos.inputGroup}>
            <Text style={estilos.inputLabel}>📅 Número de Parcelas</Text>
            <View style={estilos.inputContainer}>
              <TextInput
                style={estilos.textInput}
                value={parcelas}
                onChangeText={setParcelas}
                placeholder="12"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
              <Text style={estilos.inputSuffix}>x</Text>
            </View>
          </View>

          {/* Juros */}
          <View style={estilos.inputGroup}>
            <Text style={estilos.inputLabel}>📈 Taxa de Juros Mensal</Text>
            <View style={estilos.inputContainer}>
              <TextInput
                style={estilos.textInput}
                value={juros}
                onChangeText={setJuros}
                placeholder="2,5"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
              <Text style={estilos.inputSuffix}>% a.m.</Text>
            </View>
            <Text style={estilos.helperText}>Digite 0 para compras sem juros</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[estilos.calculateButton, !formularioValido && estilos.calculateButtonDisabled]}
          onPress={handleCalcular}
          disabled={!formularioValido}
        >
          <View style={[estilos.calculateButtonGradient, !formularioValido && estilos.calculateButtonGradientDisabled]}>
            <Text style={estilos.buttonIcon}>🧮</Text>
            <Text style={estilos.calculateButtonText}>Calcular Parcelas</Text>
          </View>
        </TouchableOpacity>

        <View style={estilos.tipsCard}>
          <View style={estilos.tipsHeader}>
            <Text style={estilos.tipsIcon}>💡</Text>
            <Text style={estilos.tipsTitle}>Dicas Importantes</Text>
          </View>
          <Text style={estilos.tipsText}>
            • Compare sempre o valor total com o preço à vista{"\n"}• Considere sua capacidade de pagamento mensal{"\n"}
            • Juros compostos aumentam significativamente o valor final
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
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
  inputLabel: {
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
  textInput: {
    flex: 1,
    fontSize: 18,
    color: "#1a202c",
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
  calculateButtonDisabled: {
    opacity: 0.6,
  },
  calculateButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#38a169",
  },
  calculateButtonGradientDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  calculateButtonText: {
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
