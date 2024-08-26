import { Text, TextInput, View } from "react-native";
import Button from "@/components/Button";
import { createBasicSurvey } from "@/lib/db/queries";
import { useMemo, useState } from "react";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

export default function Index() {
  const steps = 5;
  const [step, setStep] = useState(0);

  // Form
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
    if (!validateField()) {
      setError(true);
      return;
    }

    setError(false);

    if (step + nextStep === steps) {
      return;
    }
    if (step + nextStep < 0) {
      return;
    }

    setStep(step + nextStep);
  }

  function selectedGender() {
    return genderOptions.find((option) => option.id === selectedGenderId);
  }

  function selectedSkinType() {
    return skinTypeOptions.find((option) => option.id === selectedSkinTypeId);
  }
  async function handleSendSurvey() {
    const gender = selectedGender()!.value!;
    const skinType = selectedSkinType()!.value!;

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
      case 4:
        return questionsPreview();
      default:
        return ageQuestion();
    }
  }

  function validateField() {
    if (step === 0) {
      const intAge = parseInt(age);
      return age.length > 0 && intAge > 0 && intAge < 120;
    }
    if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && email.length > 0;
    }
    return true;
  }

  function ageQuestion() {
    return (
      <View className="flex gap-y-6 justify-center">
        <Text className=" text-lg font-bold">¿Qué edad tienes?</Text>
        <TextInput
          className="h-16  rounded-none text-base leading-4 border-none bg-doia-tertiary px-5 text-doia-dark"
          placeholder="21"
          keyboardType="numeric"
          value={age}
          onChangeText={(value) => {
            setAge(value);
            if (error) {
              setError(false);
            }
          }}
        />
        {error && (
          <Text className="text-red-500">
            Por favor, ingresa una edad válida
          </Text>
        )}
      </View>
    );
  }

  function genderQuestion() {
    return (
      <View className="flex gap-y-6 justify-center">
        <View className="flex gap-y-2">
          <Text className=" text-lg font-bold">
            ¿Cuál es tu sexo biológico?
          </Text>
          <Text className=" text-sm">
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
          <Text className="text-lg font-bold">Tipo de piel</Text>
          <Text className="text-sm">
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
          <Text className="text-lg font-bold">
            ¡Sé parte del lanzamiento de Derma App!
          </Text>
          <Text className="text-sm">
            Comparte tu correo electrónico con nosotros para enterarte de
            futuros productos y recomendaciones para ti.
          </Text>
        </View>
        <TextInput
          className="h-16 rounded-none text-base leading-4 border-none bg-doia-tertiary px-5 text-doia-dark"
          placeholder="contacto@dermaapp.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (error) {
              setError(false);
            }
          }}
        />
        {error && (
          <Text className="text-red-500">
            Por favor, ingresa un correo electrónico válido
          </Text>
        )}
      </View>
    );
  }

  function questionsPreview() {
    return (
      <View className="gap-y-6">
        <Text className="font-bold text-lg">
          Estos son los datos que se enviarán
        </Text>
        <View className="bg-doia-tertiary gap-y-2 p-5">
          <Text className="text-base">Edad: {age}</Text>
          <Text className="text-base">Género: {selectedGender()!.label}</Text>
          <Text className="text-base">
            Tipo de piel: {selectedSkinType()!.label}
          </Text>
          <Text className="text-base">Correo: {email}</Text>
        </View>
        <View className="flex-row gap-x-2 items-center">
          <Checkbox
            className="border-doia-dark"
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#454954" : undefined}
          />
          <Text className="text-sm">Acepto compartir estos datos</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex p-4 gap-y-20 bg-white h-screen">
      <View className="flex gap-6">
        {renderStep()}
        <View className="flex-row justify-end gap-2">
          {step > 0 && <Button onPress={() => handleStep(-1)}>Atrás</Button>}
          {step < steps - 1 && (
            <Button disabled={error} onPress={() => handleStep(1)}>
              Siguiente
            </Button>
          )}
          {step === steps - 1 && (
            <Button disabled={!isChecked} onPress={handleSendSurvey}>
              Ver mis resultados
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
