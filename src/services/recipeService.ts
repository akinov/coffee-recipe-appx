import { Recipe } from '../types/recipe';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@firebase/firestore';

export const createRecipe = async (recipe: Omit<Recipe, 'recipeId'>) => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipe);
    return { ...recipe, recipeId: docRef.id };
  } catch (error) {
    console.error('Error adding recipe: ', error);
    throw error;
  }
};

export const getRecipesByUser = async (userId: string) => {
  try {
    const q = query(collection(db, 'recipes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      recipeId: doc.id,
    })) as Recipe[];
  } catch (error) {
    console.error('Error getting recipes: ', error);
    throw error;
  }
};

export const updateRecipe = async (recipeId: string, recipe: Partial<Recipe>) => {
  try {
    const recipeRef = doc(db, 'recipes', recipeId);
    await updateDoc(recipeRef, recipe);
  } catch (error) {
    console.error('Error updating recipe: ', error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId: string) => {
  try {
    await deleteDoc(doc(db, 'recipes', recipeId));
  } catch (error) {
    console.error('Error deleting recipe: ', error);
    throw error;
  }
};
