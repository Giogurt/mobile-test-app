import { type Products } from "@/lib/db/queries";
import { Image, Text, View } from "react-native";

type ProductProps = { product: Products[number] };
export function ProductCard({ product }: ProductProps) {
  return (
    <View
      style={{
        width: 226,
        padding: 16,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 144,
          height: 144,
          resizeMode: "contain",
          marginBottom: 4,
        }}
        src={product.image!}
      />
      <Text style={{ marginBottom: 4, textAlign: "center" }}>
        {product.name}
      </Text>
      <Text style={{ marginBottom: 4 }}>${product.price}</Text>
    </View>
  );
}
