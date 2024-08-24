import { Image, Text, TextInput, View } from "react-native";
import Button from "@/components/Button";
import { createBasicSurvey } from "@/lib/db/queries";
import { useMemo, useState } from "react";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Index() {
  const steps = 4;
  const [step, setStep] = useState(0);

  // Form
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Radio buttons
  const genderOptions: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Femenino",
        value: "female",
      },
      {
        id: "2",
        label: "Masculino",
        value: "male",
      },
      {
        id: "3",
        label: "Prefiero no decir",
        value: "other",
      },
    ],
    []
  );
  const [selectedGenderId, setSelectedGenderId] = useState<string>("1");

  const skinTypeOptions: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Sensible",
        value: "dry",
        description:
          "Se enrojece, pica y arde con facilidad al exponerse al sol, cambios de clima o productos cosméticos. Presenta áreas de resequedad y descamación. Intolerante a muchos ingredientes activos.",
      },
      {
        id: "2",
        label: "Grasa",
        value: "oily",
        description:
          "La piel es brillante, especialmente en la frente, la nariz y el mentón. Es grasa al tacto. Los poros son grandes. Tienden a tener acné.",
      },
      {
        id: "3",
        label: "Mixta",
        value: "combination",
        description:
          "La zona T (frente, nariz y barbilla) tiende a ser grasa con poros grandes. Resto de la piel es normal.",
      },
    ],
    []
  );
  const [selectedSkinTypeId, setSelectedSkinTypeId] = useState<string>("1");

  function handleStep(nextStep: number) {
    if (step + nextStep === steps) {
      return;
    }
    if (step + nextStep < 0) {
      return;
    }

    setStep(step + nextStep);
  }

  async function handleSendSurvey() {
    const gender = genderOptions.find(
      (option) => option.id === selectedGenderId
    )!.value!;
    const skinType = skinTypeOptions.find(
      (option) => option.id === selectedSkinTypeId
    )!.value!;

    // await createBasicSurvey({
    //   age: parseInt(age),
    //   gender,
    //   skinType,
    //   email,
    // });

    router.replace(`/recommendations?skinType=${skinType}&bundle=favorite`);
  }

  function renderStep() {
    switch (step) {
      case 0:
        return ageQuestion();
      case 1:
        return genderQuestion();
      case 2:
        return skinTypeQuestion();
      case 3:
        return emailQuestion();
      default:
        return ageQuestion();
    }
  }

  // Bait
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  function imageQuestion() {
    return (
      <View className="flex items-center">
        <Text className="text-center font-poppins text-lg font-bold pb-5">
          Toma una foto o elige una imagen
        </Text>
        <View className="flex flex-row gap-x-2 pb-10">
          <Button
            variant="outline"
            className="rounded-full"
            onPress={takeImage}
          >
            Toma una foto
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onPress={pickImage}
          >
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
      </View>
    );
  }

  // Bait end

  function ageQuestion() {
    return (
      <View className="flex gap-y-6 justify-center">
        <Text className="font-poppins-medium text-lg font-bold">
          ¿Qué edad tienes?
        </Text>
        <TextInput
          className="h-16 font-poppins rounded-none text-base leading-4 border-none bg-doia-tertiary px-5 text-doia-dark"
          placeholder="21"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>
    );
  }

  function genderQuestion() {
    return (
      <View className="flex gap-y-6 justify-center">
        <View className="flex gap-y-2">
          <Text className="font-poppins-medium text-lg font-bold">
            ¿Cuál es tu sexo biológico?
          </Text>
          <Text className="font-poppins text-sm">
            Selecciona la opción que más se adecue a ti.
          </Text>
        </View>
        <View className="flex items-start">
          <RadioGroup
            containerStyle={{
              gap: 8,
              backgroundColor: "#F9F9F9",
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}
            labelStyle={{
              fontFamily: "poppins",
              fontSize: 18,
              flex: 1,
              backgroundColor: "#F9F9F9",
              paddingVertical: 10,
            }}
            radioButtons={genderOptions}
            onPress={setSelectedGenderId}
            selectedId={selectedGenderId}
          />
        </View>
      </View>
    );
  }

  function skinTypeQuestion() {
    return (
      <View className="flex gap-y-6 justify-center">
        <View className="flex gap-y-2">
          <Text className="font-poppins-medium text-lg font-bold">
            Tipo de piel
          </Text>
          <Text className="font-poppins text-sm">
            Selecciona el tipo de piel que más se adecue a tu piel.
          </Text>
        </View>
        <View className="flex items-start">
          <RadioGroup
            containerStyle={{
              gap: 8,
              backgroundColor: "#F9F9F9",
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}
            labelStyle={{
              fontFamily: "poppins",
              fontSize: 18,
              flex: 1,
              backgroundColor: "#F9F9F9",
            }}
            radioButtons={skinTypeOptions}
            onPress={setSelectedSkinTypeId}
            selectedId={selectedSkinTypeId}
          />
        </View>
      </View>
    );
  }

  function emailQuestion() {
    return (
      <View className="flex gap-y-6 justify-center">
        <View className="flex gap-y-2">
          <Text className="font-poppins-medium text-lg font-bold">
            ¡Sé parte del lanzamiento de Derma App!
          </Text>
          <Text className="font-poppins text-sm">
            Comparte tu correo electrónico con nosotros para enterarte de
            futuros productos y recomendaciones para ti.
          </Text>
        </View>
        <TextInput
          className="h-16 font-poppins rounded-none text-base leading-4 border-none bg-doia-tertiary px-5 text-doia-dark"
          placeholder="contacto@dermaapp.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
    );
  }

  return (
    <View className="flex p-4 gap-y-20">
      <View className="flex gap-6">
        {renderStep()}
        <View className="flex-row justify-end gap-2">
          {step > 0 && <Button onPress={() => handleStep(-1)}>Atrás</Button>}
          {step < steps - 1 && (
            <Button onPress={() => handleStep(1)}>Siguiente</Button>
          )}
          {step === steps - 1 && (
            <Button onPress={handleSendSurvey}>Ver mis resultados</Button>
          )}
        </View>
      </View>
    </View>
  );
}
