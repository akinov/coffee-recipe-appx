export interface RecipeStep {
  stepNumber: number;
  waterAmount: number;
  waitTime: number;
}

export interface Recipe {
  recipeId: string;
  userId: string;
  title: string;
  description: string;
  coffeeWeight: number;
  waterTotal: number;
  steps: RecipeStep[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}
