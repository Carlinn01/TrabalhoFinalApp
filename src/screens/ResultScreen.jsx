"use client"

import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"

export default function ResultScreen({ route, navigation }) {
  const { valorParcela, valorFinal, totalJuros, valorAvista, parcelas, juros, produto } = route.params

  const economia = Number.parseFloat(valorFinal) - Number.parseFloat(valorAvista)
  const percentualJuros =
    ((Number.parseFloat(valorFinal) - Number.parseFloat(valorAvista)) / Number.parseFloat(valorAvista)) * 100

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <View style={estilos.header}>
        <View style={estilos.headerGradient}>
          <View style={estilos.headerContent}>
            <TouchableOpacity style={estilos.backButton} onPress={() => navigation.goBack()}>
              <Text style={estilos.backButtonText}>←</Text>
            </TouchableOpacity>
            <View style={estilos.headerTextContainer}>
              <Text style={estilos.headerTitle}>Resultado da Simulação</Text>
              <Text style={estilos.headerSubtitle}>
                {produto ? `${produto} - ` : ""}Confira os detalhes do seu parcelamento
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={estilos.content} showsVerticalScrollIndicator={false}>
        {/* Card principal com resultado */}
        <View style={estilos.mainCard}>
          <View style={estilos.cardHeader}>
            <Text style={estilos.cardIcon}>✅</Text>
            <Text style={estilos.cardTitle}>Simulação Concluída</Text>
          </View>

          {/* Valor da parcela - destaque */}
          <View style={estilos.highlightCard}>
            <View style={estilos.highlightGradient}>
              <Text style={estilos.highlightLabel}>Valor da Parcela</Text>
              <Text style={estilos.highlightValue}>R$ {valorParcela}</Text>
              <Text style={estilos.highlightSubtext}>{parcelas}x no cartão</Text>
            </View>
          </View>

          {/* Detalhes da simulação */}
          <View style={estilos.detailsContainer}>
            <View style={estilos.detailRow}>
              <View style={estilos.detailIcon}>
                <Text style={estilos.detailIconText}>💰</Text>
              </View>
              <View style={estilos.detailContent}>
                <Text style={estilos.detailLabel}>Valor à Vista</Text>
                <Text style={estilos.detailValue}>R$ {valorAvista}</Text>
              </View>
            </View>

            <View style={estilos.detailRow}>
              <View style={estilos.detailIcon}>
                <Text style={estilos.detailIconText}>💳</Text>
              </View>
              <View style={estilos.detailContent}>
                <Text style={estilos.detailLabel}>Total Parcelado</Text>
                <Text style={estilos.detailValue}>R$ {valorFinal}</Text>
              </View>
            </View>

            <View style={estilos.detailRow}>
              <View style={estilos.detailIcon}>
                <Text style={estilos.detailIconText}>📈</Text>
              </View>
              <View style={estilos.detailContent}>
                <Text style={estilos.detailLabel}>Total de Juros</Text>
                <Text style={[estilos.detailValue, estilos.detailValueRed]}>R$ {totalJuros}</Text>
              </View>
            </View>

            <View style={[estilos.detailRow, estilos.detailRowLast]}>
              <View style={estilos.detailIcon}>
                <Text style={estilos.detailIconText}>🧮</Text>
              </View>
              <View style={estilos.detailContent}>
                <Text style={estilos.detailLabel}>Taxa Aplicada</Text>
                <Text style={estilos.detailValue}>{juros}% a.m.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card de comparação */}
        <View style={estilos.analysisCard}>
          <View style={estilos.cardHeader}>
            <Text style={estilos.cardIcon}>📊</Text>
            <Text style={estilos.cardTitle}>Análise Financeira</Text>
          </View>

          <View style={estilos.analysisContainer}>
            <View style={estilos.analysisRow}>
              <Text style={estilos.analysisLabel}>Diferença total:</Text>
              <Text
                style={[estilos.analysisValue, economia > 0 ? estilos.analysisValueRed : estilos.analysisValueGreen]}
              >
                {economia > 0 ? "+" : ""}R$ {Math.abs(economia).toFixed(2)}
              </Text>
            </View>

            <View style={estilos.analysisRow}>
              <Text style={estilos.analysisLabel}>Percentual de juros:</Text>
              <Text
                style={[
                  estilos.analysisValue,
                  percentualJuros > 0 ? estilos.analysisValueRed : estilos.analysisValueGreen,
                ]}
              >
                {percentualJuros > 0 ? "+" : ""}
                {percentualJuros.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Botões de ação */}
        <View style={estilos.actionsContainer}>
          <TouchableOpacity
            style={estilos.primaryButton}
            onPress={() => navigation.navigate("Graph", { valorFinal, valorAvista, parcelas, juros })}
          >
            <View style={estilos.primaryButtonGradient}>
              <Text style={estilos.buttonIcon}>📊</Text>
              <Text style={estilos.primaryButtonText}>Ver Gráfico Comparativo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.secondaryButton} onPress={() => navigation.navigate("Marketplace")}>
            <Text style={estilos.secondaryButtonIcon}>🔄</Text>
            <Text style={estilos.secondaryButtonText}>Nova Simulação</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e2e8f0",
    marginTop: 2,
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
  highlightCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  highlightGradient: {
    backgroundColor: "#38a169",
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  highlightLabel: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 8,
  },
  highlightValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  highlightSubtext: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  detailIconText: {
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    color: "#4a5568",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a202c",
  },
  detailValueRed: {
    color: "#e53e3e",
  },
  analysisCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
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
  analysisContainer: {
    gap: 12,
  },
  analysisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  analysisLabel: {
    fontSize: 14,
    color: "#4a5568",
  },
  analysisValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  analysisValueRed: {
    color: "#e53e3e",
  },
  analysisValueGreen: {
    color: "#38a169",
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  primaryButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#2563eb",
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2563eb",
  },
  secondaryButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
})
