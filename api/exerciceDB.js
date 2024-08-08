import { bodyPartsMapping } from '../data/bodyPartsMapping';

export const fetchExerciceByBodyPart = async (bodyPart) => {
  try {
    const formattedBodyPart = bodyPart.replace(/\s+/g, '').toLowerCase();
    const data = bodyPartsMapping[formattedBodyPart];
    if (!data) {
      throw new Error(`No data found for body part: ${bodyPart}`);
    }
    return data;
  } catch (error) {
    console.log('Error loading JSON file:', error.message);
    return [];
  }
};
