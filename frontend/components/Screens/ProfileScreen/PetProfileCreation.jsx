import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import firestore from '../../../Backend/firebase'; // Import firestore from the Firebase configuration file
import { collection, addDoc } from 'firebase/firestore';

export default function PetProfileCreation({ userId }) {
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  useEffect(() => {
    // Check if the pet profile is already created for the user
    const checkProfile = async () => {
      const userRef = firestore.collection('users').doc(userId); // Use firestore here
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        setIsProfileCreated(userData.petProfileCreated || false);
      }
    };

    checkProfile();
  }, [userId]);

  const handleCreateProfile = async () => {
    // Upload pet profile data to Firebase
    try {
        // Get a reference to the user's document
        //const userDocRef = firestore.collection('users').doc(userId); // Use firestore here
      
        // Add pet profile data to the "pets" subcollection of the user's document
        console.log(firestore);
        await firestore.collection(`users/${userId}/pets`).add({
          petName,
          petAge,
          petGender,
          petProfileCreated: true,
        });
      // If image is selected, upload it to storage
      if (petImage) {
        const storageRef = firebase.storage().ref().child(`petImages/${userId}`);
        await storageRef.put(petImage);
      }
      setIsProfileCreated(true);
    } catch (error) {
      console.error('abay:', error);
    }
  };

  if (isProfileCreated) {
    return null; // No need to render if profile is already created
  }

  return (
    <View>
      <Text>Create a profile for your pet</Text>
      <TextInput 
  style={{
    fontSize: 16,
    marginLeft: 6,
    marginVertical: 8, // Increased vertical margin for better spacing
    paddingHorizontal: 10, // Added horizontal padding for better aesthetics
    paddingVertical: 8, // Added vertical padding for better aesthetics
    borderRadius: 8, // Added border radius for rounded corners
    borderWidth: 1, // Added border for visual distinction
    borderColor: '#ccc', // Added border color for visual distinction
  }}
  placeholder="Pet's Name"
  value={petName}
  onChangeText={setPetName}
/>
      <TextInput
        placeholder="Pet's Age"
        value={petAge}
        onChangeText={setPetAge}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Pet's Gender"
        value={petGender}
        onChangeText={setPetGender}
      />
      
      <Button
        title="Upload Pet Image"
        onPress={() => {
          // Implement image upload functionality
        }}
      />
      {petImage && <Image source={{ uri: petImage }} style={{ width: 100, height: 100 }} />}
      <Button
        title="Create Profile"
        onPress={handleCreateProfile}
        disabled={!petName || !petAge || !petGender}
      />
    </View>
  );
}
