import { getBasicRecommendations, type Products } from "@/lib/db/queries";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Button from "@/components/Button";
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

      setRecommendations(result.data);
    };
    fetchData();
  }, []);

  return (
    <View className="flex items-center p-4 gap-y-10">
      <View className="flex">
        <Text className="pb-14 text-center font-poppins-medium text-lg font-bold">
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
          <Text className="text-base leading-4 font-poppins font-bold">
            Total $
            {recommendations.reduce((acc, product) => acc + product.price!, 0)}
          </Text>
          <Button onPress={() => setCheckout(true)}>Comprar</Button>
        </View>
      </View>
    </View>
  );
}
