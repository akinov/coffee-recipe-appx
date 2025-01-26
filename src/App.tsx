import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthButtons from './components/AuthButtons'
import { useAuth } from './auth/AuthContext'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import { createRecipe } from './services/recipeService'
import { Box } from '@mui/material'

function App() {
  const { currentUser } = useAuth()

  return (
    <>
      <div className="app-container">
        <nav className="navbar">
          <h1>コーヒーレシピアプリ</h1>
          <AuthButtons />
        </nav>

        <main>
          {currentUser ? (
            <div className="welcome-message">
              <h2>ようこそ、{currentUser.displayName}さん</h2>
              <Box sx={{ mb: 4 }}>
                <RecipeForm
                  onSubmit={async (recipeData) => {
                    try {
                      await createRecipe({
                        ...recipeData,
                        userId: currentUser.uid,
                        createdAt: new Date(),
                        updatedAt: new Date()
                      });
                      toast.success('レシピが正常に作成されました');
                    } catch (err) {
                      console.error(err);
                      toast.error('レシピの作成に失敗しました');
                    }
                  }}
                />
              </Box>
              <RecipeList userId={currentUser.uid} />
            </div>
          ) : (
            <div className="welcome-message">
              <h2>ログインしてレシピを管理しましょう</h2>
            </div>
          )}
        </main>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
