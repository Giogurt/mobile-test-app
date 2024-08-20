import { getBasicRecommendations, type Products } from "@/lib/db/queries";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "@/components/ProductCard";

type RecommendationsScreenParams = {
  skinType: string;
  bundle: string;
};
export default function RecommendationsScreen() {
  const params = useLocalSearchParams<RecommendationsScreenParams>();

  const [recommendations, setRecommendations] = useState<Products>([]);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBasicRecommendations(
        params.skinType,
        params.bundle
      );
      console.log(result.data);

      setRecommendations(result.data);
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 items-center m-6">
      <View className="flex-1 flex-row justify-center">
        <Text>DERMA APP</Text>
      </View>
      <View
        style={{
          flex: 7,
        }}
      >
        <Text style={{ marginBottom: 32 }}>
          ¡Te recomendamos los siguientes productos!
        </Text>

        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            horizontal
            data={recommendations}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(product) => product.id.toString()}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Total $
            {recommendations.reduce((acc, product) => acc + product.price!, 0)}
          </Text>
          <Button onPress={() => setCheckout(true)} title="Comprar" />
        </View>
      </View>
    </View>
  );
}
