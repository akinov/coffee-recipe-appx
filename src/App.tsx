import './App.css'
import AuthButtons from './components/AuthButtons'
import { useAuth } from './auth/AuthContext'

function App() {
  const { currentUser } = useAuth()

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>コーヒーレシピアプリ</h1>
        <AuthButtons />
      </nav>

      <main>
        {currentUser ? (
          <div className="welcome-message">
            <h2>ようこそ、{currentUser.displayName}さん</h2>
            {/* レシピ管理機能をここに追加 */}
          </div>
        ) : (
          <div className="welcome-message">
            <h2>ログインしてレシピを管理しましょう</h2>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
