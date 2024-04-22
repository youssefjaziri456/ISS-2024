import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PetProfileCreation from './PetProfileCreation';
import firebase from 'firebase/app';

export default function ProfileScreen() {
  const [userId, setUserId] = useState(null);
  const [isPetProfileCreated, setIsPetProfileCreated] = useState(false);

  useEffect(() => {
    // Simulate getting the user ID, replace this with your actual logic
    const fetchUserId = async () => {
      // Replace this with your actual authentication logic
      const user = firebase.auth().currentUser;
      if (user) {
        setUserId(user.uid);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Check if the user has a pet profile
    const checkPetProfile = async () => {
      if (!userId) return; // Ensure userId is available

      const userRef = firebase.firestore().collection('users').doc(userId);
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        setIsPetProfileCreated(userData.petProfileCreated || false);
      }
    };

    checkPetProfile();
  }, [userId]);

  return (
    <View>
      <PetProfileCreation />
    </View>
  );
}
