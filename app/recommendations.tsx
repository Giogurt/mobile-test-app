import { getBasicRecommendations, type Products } from "@/lib/db/queries";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Button from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";

type RecommendationsScreenParams = {
  skinType: string;
  bundle: string;
};
export default function RecommendationsScreen() {
  const params = useLocalSearchParams<RecommendationsScreenParams>();

  const [recommendations, setRecommendations] = useState<Products>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBasicRecommendations(
        params.skinType,
        params.bundle
      );

      setLoading(false);
      setRecommendations(result.data);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex pt-40 h-screen bg-white">
        <ActivityIndicator size="large" color="#454954" />
      </View>
    );
  }

  return (
    <View className="flex items-center p-4 gap-y-10 h-screen bg-white">
      <View className="flex">
        <Text className="pb-14 text-center text-lg font-bold">
          ¡Te recomendamos los siguientes productos!
        </Text>

        <View className="basis-2/5 items-center">
          <FlatList
            horizontal
            data={recommendations}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(product) => product.id.toString()}
          />
        </View>
        <View className="flex gap-y-4 items-center">
          <Text className="text-base leading-4 font-bold">
            Total $
            {recommendations.reduce((acc, product) => acc + product.price!, 0)}
          </Text>
          <Button
            onPress={() => {
              router.replace("/(tabs)/");
            }}
          >
            Realizar el test otra vez
          </Button>
        </View>
      </View>
    </View>
  );
}
