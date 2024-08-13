import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
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
        id: "1", // acts as primary key, should be unique and non-empty string
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
        id: "1", // acts as primary key, should be unique and non-empty string
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

    await createBasicSurvey({
      age: parseInt(age),
      gender,
      skinType,
      email,
    });

    router.replace(`/recommendations?skinType=${skinType}&bundle=favorite`);
  }

  function renderStep() {
    switch (step) {
      case 0:
        return imageQuestion();
      case 1:
        return ageQuestion();
      case 2:
        return genderQuestion();
      case 3:
        return skinTypeQuestion();
      case 4:
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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function imageQuestion() {
    return (
      <View style={{ alignItems: "center" }}>
        <Text>Solo demostrativo</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
      </View>
    );
  }

  // Bait end

  function ageQuestion() {
    return (
      <View
        style={{
          gap: 24,
          justifyContent: "center",
        }}
      >
        <Text style={styles.titleText}>¿Qué edad tienes?</Text>
        <TextInput
          style={{ fontSize: 16, height: 40, borderWidth: 1, padding: 10 }}
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
      <View
        style={{
          gap: 24,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text style={styles.titleText}>¿Cuál es tu sexo biológico?</Text>
        <RadioGroup
          labelStyle={{ fontSize: 16, flex: 1 }}
          radioButtons={genderOptions}
          onPress={setSelectedGenderId}
          selectedId={selectedGenderId}
        />
      </View>
    );
  }

  function skinTypeQuestion() {
    return (
      <View
        style={{
          gap: 24,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text style={styles.titleText}>Tipo de piel</Text>
        <RadioGroup
          containerStyle={{ gap: 8 }}
          labelStyle={{ fontSize: 16, flex: 1 }}
          radioButtons={skinTypeOptions}
          onPress={setSelectedSkinTypeId}
          selectedId={selectedSkinTypeId}
        />
      </View>
    );
  }

  function emailQuestion() {
    return (
      <View
        style={{
          gap: 24,
          justifyContent: "center",
        }}
      >
        <Text style={styles.titleText}>
          ¡Sé parte del lanzamiento de Derma App!
        </Text>
        <TextInput
          style={{ fontSize: 16, height: 40, borderWidth: 1, padding: 10 }}
          placeholder="contacto@dermaapp.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        margin: 24,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text>DERMA APP</Text>
      </View>
      <View
        style={{
          flex: 5,
          gap: 24,
        }}
      >
        {renderStep()}
        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}
        >
          {step > 0 && <Button onPress={() => handleStep(-1)} title="Atrás" />}
          {step < steps - 1 && (
            <Button onPress={() => handleStep(1)} title="Siguiente" />
          )}
          {step === steps - 1 && (
            <Button onPress={handleSendSurvey} title="Ver mis resultados" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
  },
  // stepContainer: {
  //   gap: 24,
  // },
  // reactLogo: {
  //   height: 178,
  //   width: 290,
  //   bottom: 0,
  //   left: 0,
  //   position: "absolute",
  // },
});
