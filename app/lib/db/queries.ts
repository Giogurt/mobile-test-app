import axios from "axios";

type BasicSurveyData = {
  age: number;
  gender: string;
  skinType: string;
  email: string;
};

export async function createBasicSurvey(surveyData: BasicSurveyData) {
  return axios.post("http://localhost:3000/api/basicSurvey", surveyData);
}

export async function getBasicRecommendations(
  skinType: string,
  bundle: string
) {
  return axios.get(
    `http://localhost:3000/api/recommendations?skinType=${skinType}&bundle=${bundle}`
  );
}
