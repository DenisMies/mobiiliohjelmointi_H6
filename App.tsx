import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Meal from './types';
import { useState } from 'react';
import { TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native';

export default function App() {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [ingredient, setIngredient] = useState("");

  const fetchMeals = () => {
    console.log("Haku alkaa");
    fetch(`${process.env.EXPO_PUBLIC_API_URL}?i=${ingredient}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Something went wrong in fetch");
        }

        return response.json();
      })
      .then(data => setMeals(data.meals))
      .catch(err => console.error(err))
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Ingredient'
          value={ingredient}
          onChangeText={setIngredient}
        />
        <Button
          title='Find'
          onPress={fetchMeals}
        />
        <FlatList
          style={styles.list}
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) =>
            <View>
              <Text>{item.strMeal}</Text>
              <Image
                source={{
                  uri: item.strMealThumb
                }}
                style={styles.image}
              />
            </View>
          }
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  list: {
    marginTop: 10,
  }
});
