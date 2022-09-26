import { AppRouter } from './routes/Routes';
import { ThemeModeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import CloseSnackbarIcon from './components/CloseSnackbarIcon';
import { SWRConfig } from 'swr';
import { apiClient } from './api/api';

function App() {
  return (
    <ThemeModeProvider>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        action={CloseSnackbarIcon}
        autoHideDuration={1500}
        dense
      >
        <SWRConfig
          value={{
            fetcher: async (resource, query) => {
              const res = await apiClient.get(resource, {
                data: { params: query },
              });

              return res.data;
            },
          }}
        >
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </SWRConfig>
      </SnackbarProvider>
    </ThemeModeProvider>
  );
}
export default App;
