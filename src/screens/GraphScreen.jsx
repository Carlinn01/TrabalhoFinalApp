import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from "react-native"
import { BarChart } from "react-native-chart-kit"

export default function GraphScreen({ route, navigation }) {
  const { valorFinal, valorAvista, parcelas, juros } = route.params

  const screenWidth = Dimensions.get("window").width
  const chartWidth = screenWidth - 40

  // Dados para o gráfico de barras
  const barData = {
    labels: ["À Vista", "Parcelado"],
    datasets: [
      {
        data: [Number.parseFloat(valorAvista), Number.parseFloat(valorFinal)],
      },
    ],
  }

  // Dados para o gráfico de pizza (composição do valor parcelado)
  const valorPrincipal = Number.parseFloat(valorAvista)
  const valorJuros = Number.parseFloat(valorFinal) - Number.parseFloat(valorAvista)

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(56, 161, 105, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(74, 85, 104, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#38a169",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#e2e8f0",
      strokeWidth: 1,
    },
  }

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
              <Text style={styles.headerTitle}>Análise Gráfica</Text>
              <Text style={styles.headerSubtitle}>Comparativo visual da sua simulação</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de resumo */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryIcon}>📊</Text>
            <Text style={styles.summaryTitle}>Resumo da Simulação</Text>
          </View>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Parcelas</Text>
              <Text style={styles.summaryValue}>{parcelas}x</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Taxa</Text>
              <Text style={styles.summaryValue}>{juros}% a.m.</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Diferença</Text>
              <Text style={[styles.summaryValue, styles.economyValue]}>
                R$ {(Number.parseFloat(valorFinal) - Number.parseFloat(valorAvista)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Gráfico de barras comparativo */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartIcon}>📊</Text>
            <Text style={styles.chartTitle}>Comparativo de Valores</Text>
          </View>

          <View style={styles.chartContainer}>
            <BarChart
              style={styles.chart}
              data={barData}
              width={chartWidth - 48}
              height={220}
              yAxisLabel="R$ "
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero
              showValuesOnTopOfBars
            />
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: "#38a169" }]} />
              <Text style={styles.legendText}>Valores em Reais (R$)</Text>
            </View>
          </View>
        </View>

        {/* Gráfico de pizza simulado - composição */}
        {valorJuros > 0 && (
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartIcon}>🥧</Text>
              <Text style={styles.chartTitle}>Composição do Valor Parcelado</Text>
            </View>

            {/* Gráfico de pizza simulado com barras */}
            <View style={styles.pieSimulated}>
              <View style={styles.pieBar}>
                <View
                  style={[
                    styles.pieSegment,
                    styles.pieSegmentPrincipal,
                    { flex: valorPrincipal / Number.parseFloat(valorFinal) },
                  ]}
                />
                <View
                  style={[
                    styles.pieSegment,
                    styles.pieSegmentJuros,
                    { flex: valorJuros / Number.parseFloat(valorFinal) },
                  ]}
                />
              </View>
            </View>

            <View style={styles.pieStats}>
              <View style={styles.pieStatItem}>
                <View style={[styles.pieStatColor, { backgroundColor: "#38a169" }]} />
                <View style={styles.pieStatContent}>
                  <Text style={styles.pieStatLabel}>Valor Principal</Text>
                  <Text style={styles.pieStatValue}>R$ {valorPrincipal.toFixed(2)}</Text>
                  <Text style={styles.pieStatPercent}>
                    {((valorPrincipal / Number.parseFloat(valorFinal)) * 100).toFixed(1)}%
                  </Text>
                </View>
              </View>

              <View style={styles.pieStatItem}>
                <View style={[styles.pieStatColor, { backgroundColor: "#e53e3e" }]} />
                <View style={styles.pieStatContent}>
                  <Text style={styles.pieStatLabel}>Juros</Text>
                  <Text style={styles.pieStatValue}>R$ {valorJuros.toFixed(2)}</Text>
                  <Text style={styles.pieStatPercent}>
                    {((valorJuros / Number.parseFloat(valorFinal)) * 100).toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Card de insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={styles.insightsIcon}>💡</Text>
            <Text style={styles.insightsTitle}>Insights Financeiros</Text>
          </View>

          <View style={styles.insightsList}>
            {valorJuros === 0 ? (
              <View style={styles.insightItem}>
                <Text style={styles.insightIcon}>✅</Text>
                <Text style={styles.insightText}>Excelente! Você não pagará juros nesta compra.</Text>
              </View>
            ) : (
              <>
                <View style={styles.insightItem}>
                  <Text style={styles.insightIcon}>📈</Text>
                  <Text style={styles.insightText}>
                    Você pagará R$ {valorJuros.toFixed(2)} a mais que o valor à vista.
                  </Text>
                </View>
                <View style={styles.insightItem}>
                  <Text style={styles.insightIcon}>🧮</Text>
                  <Text style={styles.insightText}>
                    O valor dos juros representa {((valorJuros / valorPrincipal) * 100).toFixed(1)}% do valor original.
                  </Text>
                </View>
              </>
            )}

            <View style={styles.insightItem}>
              <Text style={styles.insightIcon}>💳</Text>
              <Text style={styles.insightText}>
                Cada parcela de R$ {(Number.parseFloat(valorFinal) / parcelas).toFixed(2)} será debitada mensalmente.
              </Text>
            </View>
          </View>
        </View>

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Home")}>
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonIcon}>🔄</Text>
              <Text style={styles.primaryButtonText}>Nova Simulação</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonIcon}>←</Text>
            <Text style={styles.secondaryButtonText}>Voltar aos Resultados</Text>
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
  summaryCard: {
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
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a365d",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
  },
  economyValue: {
    color: "#e53e3e",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
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
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  chartIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a365d",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  chartLegend: {
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#4a5568",
  },
  pieSimulated: {
    alignItems: "center",
    marginBottom: 20,
  },
  pieBar: {
    flexDirection: "row",
    width: "80%",
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  pieSegment: {
    height: "100%",
  },
  pieSegmentPrincipal: {
    backgroundColor: "#38a169",
  },
  pieSegmentJuros: {
    backgroundColor: "#e53e3e",
  },
  pieStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  pieStatItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  pieStatColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  pieStatContent: {
    flex: 1,
  },
  pieStatLabel: {
    fontSize: 12,
    color: "#718096",
  },
  pieStatValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
  },
  pieStatPercent: {
    fontSize: 12,
    color: "#4a5568",
  },
  insightsCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f6ad55",
  },
  insightsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  insightsIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#744210",
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  insightIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  insightText: {
    fontSize: 14,
    color: "#744210",
    flex: 1,
    lineHeight: 20,
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
    backgroundColor: "#38a169",
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
