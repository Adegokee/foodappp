import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";

const RecipeSearchApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://api.spoonacular.com/recipes/random?number=50&apiKey=0fa499dd1b0c4c4caa72ea602f40b1e5"
      );
      const data = await response.json();
      setRecipes(data.recipes);
      setFilteredRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipe}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default RecipeSearchApp;
