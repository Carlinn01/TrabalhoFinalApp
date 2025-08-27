"use client"

import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"

export default function GraphScreen({ route, navigation }) {
  const { valorFinal, valorAvista, parcelas, juros } = route.params

  const valorAvistaNum = Number(valorAvista)
  const valorFinalNum = Number(valorFinal)
  const valorJuros = valorFinalNum - valorAvistaNum

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <View style={estilos.header}>
        <View style={estilos.headerGradient}>
          <TouchableOpacity style={estilos.backButton} onPress={() => navigation.goBack()}>
            <Text style={estilos.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={estilos.headerTextContainer}>
            <Text style={estilos.headerTitle}>Análise Gráfica</Text>
            <Text style={estilos.headerSubtitle}>Comparativo visual da sua simulação</Text>
          </View>
        </View>
      </View>

      <ScrollView style={estilos.content} showsVerticalScrollIndicator={false}>
        {/* Resumo */}
        <View style={estilos.summaryCard}>
          <Text style={estilos.cardTitle}>Resumo da Simulação 📊</Text>
          <View style={estilos.summaryRow}>
            <View style={estilos.summaryItem}>
              <Text style={estilos.summaryLabel}>Parcelas</Text>
              <Text style={estilos.summaryValue}>{parcelas}x</Text>
            </View>
            <View style={estilos.summaryItem}>
              <Text style={estilos.summaryLabel}>Taxa</Text>
              <Text style={estilos.summaryValue}>{juros}% a.m.</Text>
            </View>
            <View style={estilos.summaryItem}>
              <Text style={estilos.summaryLabel}>Diferença</Text>
              <Text style={[estilos.summaryValue, estilos.summaryValueRed]}>R$ {valorJuros.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Gráfico visual simples */}
        <View style={estilos.chartCard}>
          <Text style={estilos.cardTitle}>Comparativo de Valores 📊</Text>

          <View style={estilos.chartContainer}>
            <View style={estilos.chartItem}>
              <View style={estilos.chartHeader}>
                <Text style={estilos.chartLabel}>À Vista</Text>
                <Text style={estilos.chartValue}>R$ {valorAvistaNum.toFixed(2)}</Text>
              </View>
              <View style={estilos.chartBarContainer}>
                <View
                  style={[
                    estilos.chartBar,
                    estilos.chartBarGreen,
                    { width: `${(valorAvistaNum / valorFinalNum) * 100}%` },
                  ]}
                >
                  <Text style={estilos.chartBarText}>{((valorAvistaNum / valorFinalNum) * 100).toFixed(0)}%</Text>
                </View>
              </View>
            </View>

            <View style={estilos.chartItem}>
              <View style={estilos.chartHeader}>
                <Text style={estilos.chartLabel}>Parcelado</Text>
                <Text style={estilos.chartValue}>R$ {valorFinalNum.toFixed(2)}</Text>
              </View>
              <View style={estilos.chartBarContainer}>
                <View style={[estilos.chartBar, estilos.chartBarRed, { width: "100%" }]}>
                  <Text style={estilos.chartBarText}>100%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Composição do valor */}
        {valorJuros > 0 && (
          <View style={estilos.compositionCard}>
            <Text style={estilos.cardTitle}>Composição do Valor Parcelado 🥧</Text>
            <View style={estilos.pieChart}>
              <View style={[estilos.pieSegment, estilos.pieSegmentGreen, { flex: valorAvistaNum / valorFinalNum }]} />
              <View style={[estilos.pieSegment, estilos.pieSegmentRed, { flex: valorJuros / valorFinalNum }]} />
            </View>
            <View style={estilos.compositionLegend}>
              <View style={estilos.legendItem}>
                <Text style={estilos.legendLabel}>Valor Principal</Text>
                <Text style={estilos.legendValue}>R$ {valorAvistaNum.toFixed(2)}</Text>
                <Text style={estilos.legendPercentage}>{((valorAvistaNum / valorFinalNum) * 100).toFixed(1)}%</Text>
              </View>
              <View style={estilos.legendItem}>
                <Text style={estilos.legendLabel}>Juros</Text>
                <Text style={estilos.legendValue}>R$ {valorJuros.toFixed(2)}</Text>
                <Text style={estilos.legendPercentage}>{((valorJuros / valorFinalNum) * 100).toFixed(1)}%</Text>
              </View>
            </View>
          </View>
        )}

        {/* Dicas */}
        <View style={estilos.tipsCard}>
          <Text style={estilos.tipsTitle}>Dicas Financeiras 💡</Text>
          {valorJuros === 0 ? (
            <Text style={estilos.tipsText}>✅ Excelente! Você não pagará juros nesta compra.</Text>
          ) : (
            <View style={estilos.tipsContainer}>
              <Text style={estilos.tipsText}>
                📈 Você pagará R$ {valorJuros.toFixed(2)} a mais que o valor à vista.
              </Text>
              <Text style={estilos.tipsText}>
                🧮 O valor dos juros representa {((valorJuros / valorAvistaNum) * 100).toFixed(1)}% do valor original.
              </Text>
            </View>
          )}
          <Text style={estilos.tipsText}>
            💳 Cada parcela de R$ {(valorFinalNum / parcelas).toFixed(2)} será debitada mensalmente.
          </Text>
        </View>

        {/* Ações */}
        <View style={estilos.actionsContainer}>
          <TouchableOpacity style={estilos.primaryButton} onPress={() => navigation.navigate("Marketplace")}>
            <View style={estilos.primaryButtonGradient}>
              <Text style={estilos.primaryButtonText}>🔄 Nova Simulação</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={estilos.secondaryButtonText}>← Voltar aos Resultados</Text>
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
  summaryCard: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a365d",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#4a5568",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a202c",
  },
  summaryValueRed: {
    color: "#e53e3e",
  },
  chartCard: {
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
  chartContainer: {
    gap: 16,
  },
  chartItem: {
    gap: 4,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  chartLabel: {
    fontSize: 14,
    color: "#4a5568",
  },
  chartValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a202c",
  },
  chartBarContainer: {
    width: "100%",
    height: 24,
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
  },
  chartBar: {
    height: 24,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 8,
  },
  chartBarGreen: {
    backgroundColor: "#38a169",
  },
  chartBarRed: {
    backgroundColor: "#e53e3e",
  },
  chartBarText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  compositionCard: {
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
  pieChart: {
    flexDirection: "row",
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: "10%",
    marginBottom: 16,
  },
  pieSegment: {
    height: 40,
  },
  pieSegmentGreen: {
    backgroundColor: "#38a169",
  },
  pieSegmentRed: {
    backgroundColor: "#e53e3e",
  },
  compositionLegend: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendItem: {
    flex: 1,
    alignItems: "center",
  },
  legendLabel: {
    fontSize: 14,
    color: "#4a5568",
  },
  legendValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a202c",
  },
  legendPercentage: {
    fontSize: 12,
    color: "#718096",
  },
  tipsCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f6ad55",
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#744210",
    marginBottom: 8,
  },
  tipsContainer: {
    gap: 4,
  },
  tipsText: {
    fontSize: 14,
    color: "#744210",
    lineHeight: 20,
    marginBottom: 8,
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#38a169",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2563eb",
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
})
