import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getRecipesByUser } from '../services/recipeService';
import { Recipe } from '../types/recipe';

interface RecipeListProps {
  userId: string;
}

const RecipeList = ({ userId }: RecipeListProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userRecipes = await getRecipesByUser(userId);
        setRecipes(userRecipes);
      } catch (err) {
        setError('レシピの取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [userId]);

  if (loading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        マイレシピ
      </Typography>

      {recipes.length === 0 ? (
        <Typography>レシピがありません</Typography>
      ) : (
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.recipeId} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText
                primary={recipe.title}
                secondary={`粉量: ${recipe.coffeeWeight}g, お湯の量: ${recipe.waterTotal}mL`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RecipeList;
