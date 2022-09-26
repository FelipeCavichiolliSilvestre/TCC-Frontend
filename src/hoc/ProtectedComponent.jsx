import { useAuth } from '../contexts/AuthContext';

function ProtectedComponent(WrappedComponent) {
  function Protected(props) {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading | !isAuthenticated) return <></>;

    return <WrappedComponent {...props} />;
  }

  return Protected;
}

export default ProtectedComponent;
