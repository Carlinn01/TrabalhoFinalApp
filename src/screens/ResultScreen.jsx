import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native"

export default function ResultScreen({ route, navigation }) {
  const { valorParcela, valorFinal, totalJuros, valorAvista, parcelas, juros } = route.params

  const economia = Number.parseFloat(valorFinal) - Number.parseFloat(valorAvista)
  const percentualJuros =
    ((Number.parseFloat(valorFinal) - Number.parseFloat(valorAvista)) / Number.parseFloat(valorAvista)) * 100

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Resultado da Simulação</Text>
              <Text style={styles.headerSubtitle}>Confira os detalhes do seu parcelamento</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card principal com resultado */}
        <View style={styles.mainResultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultIcon}>✅</Text>
            <Text style={styles.resultTitle}>Simulação Concluída</Text>
          </View>

          {/* Valor da parcela - destaque */}
          <View style={styles.highlightCard}>
            <View style={styles.highlightGradient}>
              <Text style={styles.highlightLabel}>Valor da Parcela</Text>
              <Text style={styles.highlightValue}>R$ {valorParcela}</Text>
              <Text style={styles.highlightSubtext}>{parcelas}x no cartão</Text>
            </View>
          </View>

          {/* Detalhes da simulação */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>💰</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Valor à Vista</Text>
                <Text style={styles.detailValue}>R$ {valorAvista}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>💳</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Total Parcelado</Text>
                <Text style={styles.detailValue}>R$ {valorFinal}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>📈</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Total de Juros</Text>
                <Text style={[styles.detailValue, styles.jurosValue]}>R$ {totalJuros}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>🧮</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Taxa Aplicada</Text>
                <Text style={styles.detailValue}>{juros}% a.m.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card de comparação */}
        <View style={styles.comparisonCard}>
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonIcon}>📊</Text>
            <Text style={styles.comparisonTitle}>Análise Financeira</Text>
          </View>

          <View style={styles.comparisonContent}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Diferença total:</Text>
              <Text style={[styles.comparisonValue, economia > 0 ? styles.negative : styles.positive]}>
                {economia > 0 ? "+" : ""}R$ {Math.abs(economia).toFixed(2)}
              </Text>
            </View>

            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Percentual de juros:</Text>
              <Text style={[styles.comparisonValue, percentualJuros > 0 ? styles.negative : styles.positive]}>
                {percentualJuros > 0 ? "+" : ""}
                {percentualJuros.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Graph", { valorFinal, valorAvista, parcelas, juros })}
          >
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonIcon}>📊</Text>
              <Text style={styles.primaryButtonText}>Ver Gráfico Comparativo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.secondaryButtonIcon}>🔄</Text>
            <Text style={styles.secondaryButtonText}>Nova Simulação</Text>
          </TouchableOpacity>
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
  backIcon: {
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
  mainResultCard: {
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
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  resultIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  resultTitle: {
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
    padding: 24,
    alignItems: "center",
    backgroundColor: "#38a169",
  },
  highlightLabel: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 8,
  },
  highlightValue: {
    fontSize: 32,
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
    color: "#2d3748",
  },
  jurosValue: {
    color: "#e53e3e",
  },
  comparisonCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  comparisonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  comparisonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a365d",
  },
  comparisonContent: {
    gap: 12,
  },
  comparisonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  comparisonLabel: {
    fontSize: 15,
    color: "#4a5568",
  },
  comparisonValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  positive: {
    color: "#38a169",
  },
  negative: {
    color: "#e53e3e",
  },
  actionButtons: {
    gap: 12,
    marginBottom: 30,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#3182ce",
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
    borderColor: "#3182ce",
  },
  secondaryButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: "#3182ce",
    fontSize: 16,
    fontWeight: "600",
  },
})
