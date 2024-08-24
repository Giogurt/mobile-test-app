import { Image, Text, View } from "react-native";
import Button from "@/components/Button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const takeImage = async () => {
    const cameraPermissions = await ImagePicker.getCameraPermissionsAsync();

    if (!cameraPermissions.granted) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex items-center p-4 pt-10">
      <Text className="text-center font-poppins text-lg font-bold pb-5">
        Toma una foto o elige una imagen
      </Text>
      <View className="flex flex-row gap-x-2 pb-10">
        <Button variant="outline" className="rounded-full" onPress={takeImage}>
          Toma una foto
        </Button>
        <Button variant="outline" className="rounded-full" onPress={pickImage}>
          Seleccionar imagen
        </Button>
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          className="rounded-full w-[300px] h-[300px]"
        />
      )}

      {!image && (
        <Text className="text-center font-poppins text-lg font-bold">
          No ha seleccionado una imagen
        </Text>
      )}
      <StatusBar />
    </View>
  );
}
