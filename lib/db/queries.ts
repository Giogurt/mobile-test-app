import axios from "axios";

type BasicSurveyData = {
  age: number;
  gender: string;
  skinType: string;
  email: string;
};

export type Products = {
  id: number;
  name: string | null;
  brand: string | null;
  price: number | null;
  skinType: string | null;
  type: string | null;
  image: string | null;
  favorite: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;
}[];

export async function createBasicSurvey(surveyData: BasicSurveyData) {
  return axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}api/basicSurvey`,
    surveyData
  );
}

export async function getBasicRecommendations(
  skinType: string,
  bundle: string
) {
  return axios.get<Products>(
    `${process.env.EXPO_PUBLIC_API_URL}api/recommendations?skinType=${skinType}&bundle=${bundle}`
  );
}
