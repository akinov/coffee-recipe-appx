import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getRecipesByUser, deleteRecipe } from '../services/recipeService';
import { Recipe } from '../types/recipe';
import EditRecipeForm from './EditRecipeForm';

interface RecipeListProps {
  userId: string;
}

const RecipeList = ({ userId }: RecipeListProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);

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

  useEffect(() => {
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
            <Box key={recipe.recipeId}>
              {editingRecipeId === recipe.recipeId ? (
                <EditRecipeForm
                  recipe={recipe}
                  onUpdate={() => {
                    setEditingRecipeId(null);
                    fetchRecipes();
                  }}
                />
              ) : (
                <ListItem sx={{ borderBottom: '1px solid #eee' }}>
                  <ListItemText
                    primary={recipe.title}
                    secondary={`粉量: ${recipe.coffeeWeight}g, お湯の量: ${recipe.waterTotal}mL`}
                  />
                  <Box>
                    <IconButton
                      onClick={() => setEditingRecipeId(recipe.recipeId)}
                      aria-label="edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        if (window.confirm('本当にこのレシピを削除しますか？')) {
                          try {
                            await deleteRecipe(recipe.recipeId);
                            fetchRecipes();
                          } catch (err) {
                            console.error(err);
                            setError('レシピの削除に失敗しました');
                          }
                        }
                      }}
                      aria-label="delete"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
              )}
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RecipeList;
