import { useAuth } from '../auth/AuthContext';
import { signInWithGoogle, signOut } from '../firebase';
import Button from '@mui/material/Button';

const AuthButtons = () => {
  const { currentUser } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {currentUser ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignOut}
        >
          ログアウト
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
        >
          Googleでログイン
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
