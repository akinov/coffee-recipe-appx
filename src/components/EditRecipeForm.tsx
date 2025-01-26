import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Recipe, RecipeStep } from '../types/recipe';
import { updateRecipe } from '../services/recipeService';

interface EditRecipeFormProps {
  recipe: Recipe;
  onUpdate: () => void;
}

const EditRecipeForm = ({ recipe, onUpdate }: EditRecipeFormProps) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [coffeeWeight, setCoffeeWeight] = useState(recipe.coffeeWeight);
  const [waterTotal, setWaterTotal] = useState(recipe.waterTotal);
  const [steps, setSteps] = useState<RecipeStep[]>(recipe.steps);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRecipe(recipe.recipeId, {
        title,
        description,
        coffeeWeight,
        waterTotal,
        steps,
        updatedAt: new Date()
      });
      onUpdate();
      alert('レシピが更新されました');
    } catch (err) {
      console.error(err);
      alert('レシピの更新に失敗しました');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        レシピを編集
      </Typography>

      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        label="コーヒーの粉量 (g)"
        type="number"
        value={coffeeWeight}
        onChange={(e) => setCoffeeWeight(Number(e.target.value))}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="お湯の総量 (mL)"
        type="number"
        value={waterTotal}
        onChange={(e) => setWaterTotal(Number(e.target.value))}
        fullWidth
        margin="normal"
        required
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          ドリップステップ
        </Typography>

        {steps.map((step, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography variant="subtitle1">ステップ {index + 1}</Typography>
            <TextField
              label="お湯の量 (mL)"
              type="number"
              value={step.waterAmount}
              onChange={(e) => {
                const newSteps = [...steps];
                newSteps[index].waterAmount = Number(e.target.value);
                setSteps(newSteps);
              }}
              sx={{ mr: 2, width: '150px' }}
            />
            <TextField
              label="待機時間 (秒)"
              type="number"
              value={step.waitTime}
              onChange={(e) => {
                const newSteps = [...steps];
                newSteps[index].waitTime = Number(e.target.value);
                setSteps(newSteps);
              }}
              sx={{ width: '150px' }}
            />
            <Button
              onClick={() => {
                const newSteps = steps.filter((_, i) => i !== index);
                setSteps(newSteps);
              }}
              color="error"
              sx={{ ml: 2 }}
            >
              削除
            </Button>
          </Box>
        ))}

        <Button
          onClick={() => {
            setSteps([...steps, { stepNumber: steps.length + 1, waterAmount: 0, waitTime: 0 }]);
          }}
          variant="outlined"
          sx={{ mt: 1 }}
        >
          ステップを追加
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button type="submit" variant="contained" color="primary">
          レシピを更新
        </Button>
      </Box>
    </Box>
  );
};

export default EditRecipeForm;
