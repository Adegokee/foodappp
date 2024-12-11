// import React, { useState } from 'react';
// import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
// import { launchCamera } from 'react-native-image-picker';
// import Geolocation  from '@react-native-community/geolocation';


// const CameraWithGeolocation = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [location, setLocation] = useState(null);

//   const handleTakePhoto = () => {
//     const options = {
//       mediaType: 'photo',
//       cameraType: 'back',
//     };

//     launchCamera(options, response => {
//       if (response.didCancel) {
//         Alert.alert('Camera cancelled', 'User cancelled the camera.');
//       } else if (response.errorCode) {
//         Alert.alert('Camera error', response.errorMessage);
//       } else {
//         setImageUri(response.assets[0].uri);
//         getCurrentLocation();
//       }
//     });
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       },
//       error => {
//         Alert.alert('Location error', error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take Photo" onPress={handleTakePhoto} />

//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

//       {location && (
//         <Text style={styles.text}>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//   },
//   text: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default CameraWithGeolocation;
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const App = () => {
  const [photo, setPhoto] = useState(null);

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.error(`Camera Error: ${response.errorMessage}`);
        } else {
          console.log('Camera Response: ', response);
          setPhoto(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
      {photo && (
        <Image source={{ uri: photo }} style={styles.imagePreview} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default App;

