"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, StyleSheet, Image } from "react-native"

export default function MarketplaceScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("todos")

  // Taxa fixa para o marketplace (pode ser configurável)
  const TAXA_FIXA = 2.5

  const produtos = [
    {
      id: 1,
      nome: "iPhone 15 Pro",
      preco: 8999.0,
      categoria: "eletronicos",
      imagem: "/iphone-15-pro.png",
      descricao: "Smartphone Apple com chip A17 Pro",
    },
    {
      id: 2,
      nome: "MacBook Air M2",
      preco: 12999.0,
      categoria: "eletronicos",
      imagem: "/macbook-air-laptop.png",
      descricao: "Notebook Apple com chip M2",
    },
    {
      id: 3,
      nome: 'Smart TV 65"',
      preco: 3499.0,
      categoria: "eletronicos",
      imagem: "/smart-tv-65-inch-television.png",
      descricao: "TV 4K UHD com sistema Android",
    },
    {
      id: 4,
      nome: "Sofá 3 Lugares",
      preco: 1899.0,
      categoria: "casa",
      imagem: "/modern-3-seat-sofa-furniture.png",
      descricao: "Sofá confortável em tecido premium",
    },
    {
      id: 5,
      nome: "Mesa de Jantar",
      preco: 2299.0,
      categoria: "casa",
      imagem: "/dining-table-wooden-furniture.png",
      descricao: "Mesa em madeira maciça para 6 pessoas",
    },
    {
      id: 6,
      nome: "Tênis Esportivo",
      preco: 399.0,
      categoria: "moda",
      imagem: "/sports-sneakers-running-shoes.png",
      descricao: "Tênis para corrida e academia",
    },
    {
      id: 7,
      nome: "Jaqueta Jeans",
      preco: 189.0,
      categoria: "moda",
      imagem: "/denim-jacket-fashion-clothing.png",
      descricao: "Jaqueta jeans clássica unissex",
    },
    {
      id: 8,
      nome: "Fone Bluetooth",
      preco: 299.0,
      categoria: "eletronicos",
      imagem: "/bluetooth-headphones-wireless.png",
      descricao: "Fone sem fio com cancelamento de ruído",
    },
  ]

  const categorias = [
    { id: "todos", nome: "Todos", icone: "🛍️" },
    { id: "eletronicos", nome: "Eletrônicos", icone: "📱" },
    { id: "casa", nome: "Casa", icone: "🏠" },
    { id: "moda", nome: "Moda", icone: "👕" },
  ]

  const produtosFiltrados =
    selectedCategory === "todos" ? produtos : produtos.filter((produto) => produto.categoria === selectedCategory)

  const handleSelecionarProduto = (produto) => {
    // Calcula automaticamente para 12x com taxa fixa
    const numParcelas = 12
    const valorFinal = produto.preco * Math.pow(1 + TAXA_FIXA / 100, numParcelas)
    const valorParcela = valorFinal / numParcelas
    const totalJuros = valorFinal - produto.preco

    navigation.navigate("Result", {
      valorParcela: valorParcela.toFixed(2),
      valorFinal: valorFinal.toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      valorAvista: produto.preco.toFixed(2),
      parcelas: numParcelas,
      juros: TAXA_FIXA,
      produto: produto.nome, // Informação adicional do produto
    })
  }

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <View style={estilos.header}>
        <View style={estilos.headerGradient}>
          <View style={estilos.headerContent}>
            <Text style={estilos.headerTitle}>Marketplace</Text>
            <Text style={estilos.headerSubtitle}>Escolha um produto e simule o parcelamento</Text>
          </View>
        </View>
      </View>

      <ScrollView style={estilos.content} showsVerticalScrollIndicator={false}>
        <View style={estilos.mainCard}>
          <View style={estilos.cardHeader}>
            <Text style={estilos.cardIcon}>🏷️</Text>
            <Text style={estilos.cardTitle}>Categorias</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.categoriesScroll}>
            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.id}
                style={[estilos.categoryButton, selectedCategory === categoria.id && estilos.categoryButtonActive]}
                onPress={() => setSelectedCategory(categoria.id)}
              >
                <Text style={estilos.categoryIcon}>{categoria.icone}</Text>
                <Text style={[estilos.categoryText, selectedCategory === categoria.id && estilos.categoryTextActive]}>
                  {categoria.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={estilos.tipsCard}>
          <View style={estilos.tipsHeader}>
            <Text style={estilos.tipsIcon}>📊</Text>
            <Text style={estilos.tipsTitle}>Condições de Pagamento</Text>
          </View>
          <Text style={estilos.tipsText}>
            • Parcelamento em até 12x com taxa de {TAXA_FIXA}% a.m.{"\n"}• Compare o valor à vista com o parcelado{"\n"}
            • Todos os preços já incluem impostos
          </Text>
        </View>

        <View style={estilos.productsGrid}>
          {produtosFiltrados.map((produto) => (
            <TouchableOpacity
              key={produto.id}
              style={estilos.productCard}
              onPress={() => handleSelecionarProduto(produto)}
            >
              <Image
                source={{ uri: produto.imagem || "/placeholder.svg" }}
                style={estilos.productImage}
                resizeMode="cover"
              />

              <View style={estilos.productInfo}>
                <Text style={estilos.productName}>{produto.nome}</Text>
                <Text style={estilos.productDescription}>{produto.descricao}</Text>

                <View style={estilos.priceContainer}>
                  <Text style={estilos.cashPrice}>
                    R${" "}
                    {produto.preco.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                  <Text style={estilos.cashLabel}>à vista</Text>
                </View>

                <View style={estilos.installmentContainer}>
                  <Text style={estilos.installmentText}>
                    ou 12x de R${" "}
                    {((produto.preco * Math.pow(1 + TAXA_FIXA / 100, 12)) / 12).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>

                <View style={estilos.simulateButton}>
                  <Text style={estilos.simulateButtonText}>📊 Simular Parcelamento</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={estilos.customSimulatorButton} onPress={() => navigation.navigate("Home")}>
          <View style={estilos.customSimulatorGradient}>
            <Text style={estilos.buttonIcon}>🧮</Text>
            <Text style={estilos.customSimulatorText}>Simulador Personalizado</Text>
          </View>
        </TouchableOpacity>
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
    marginBottom: 16,
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
  categoriesScroll: {
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4a5568",
  },
  categoryTextActive: {
    color: "#fff",
  },
  tipsCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f6ad55",
    marginBottom: 20,
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
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "48%",
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a365d",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 12,
    lineHeight: 16,
  },
  priceContainer: {
    marginBottom: 8,
  },
  cashPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38a169",
  },
  cashLabel: {
    fontSize: 12,
    color: "#718096",
  },
  installmentContainer: {
    marginBottom: 12,
  },
  installmentText: {
    fontSize: 12,
    color: "#4a5568",
    fontWeight: "500",
  },
  simulateButton: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  simulateButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  customSimulatorButton: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: "hidden",
  },
  customSimulatorGradient: {
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
  customSimulatorText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
})
