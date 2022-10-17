import { AppRouter } from './routes/Routes';
import { ThemeModeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import CustomSnackbar from './components/CustomSnackbar';

function App() {
  return (
    <ThemeModeProvider>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        Components={{
          default: CustomSnackbar,
          error: CustomSnackbar,
          info: CustomSnackbar,
          success: CustomSnackbar,
          warning: CustomSnackbar,
        }}
      >
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeModeProvider>
  );
}
export default App;
