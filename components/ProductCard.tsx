import { type Products } from "@/lib/db/queries";
import { Image, Text, View } from "react-native";

type ProductProps = { product: Products[number] };
export function ProductCard({ product }: ProductProps) {
  return (
    <View className="flex gap-y-1 w-44 p-3 items-center">
      <Image
        className="w-36 h-36"
        style={{
          resizeMode: "contain",
        }}
        src={product.image!}
      />
      <Text className="text-center">{product.name}</Text>
      <Text>${product.price}</Text>
    </View>
  );
}
