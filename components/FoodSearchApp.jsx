import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const FoodSearchApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch random recipes when the app loads
  useEffect(() => {
    const fetchRandomRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=50&apiKey=0fa499dd1b0c4c4caa72ea602f40b1e5`
        );
        const data = await response.json();
        if (data.recipes) {
          setRecipes(data.recipes);
        } else {
          setError("Failed to load random recipes.");
        }
      } catch (err) {
        setError("Failed to fetch random recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipes();
  }, []);

  // Fetch recipes based on search query
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=50&apiKey=0fa499dd1b0c4c4caa72ea602f40b1e5`
      );
      const data = await response.json();
      if (data.results) {
        setRecipes(data.results);
      } else {
        setRecipes([]);
        setError("No recipes found. Try another search!");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchRecipes(searchQuery.trim());
    } else {
      setError("Please enter a valid search query.");
    }
  };

  // Render each recipe card
  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.image  }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food Search App</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipe}
          contentContainerStyle={styles.list}
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  searchInput: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  list: {
    paddingBottom: 10,
  },
});

export default FoodSearchApp;
