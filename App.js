
import { StyleSheet, Text, View } from 'react-native';
import AnimatedApiExample from './components/AnimatedApiExample';
import ReanimatedExample from './components/ReanimatedExample';
import CameraWithGeolocation from './components/CameraWithGeolocation';
import RecipeSearchApp from './components/RecipeSearchApp';
import FoodSearchApp from './components/FoodSearchApp';

// import 'nativewind/tailwind.css';


// Call this function when you need to request permissions, such as when the user opens the camera

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="bg-black">Open up App.js to start working on your app!</Text>
      {/* <AnimatedApiExample/>
      <ReanimatedExample/> */}

      {/* <CameraWithGeolocation /> */}
      {/* <RecipeSearchApp /> */}
        <FoodSearchApp />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
