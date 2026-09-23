import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { checkAuth } from './redux/slices/authSlice';
import { AppRoutes } from './routes/AppRoutes';
import { Toast } from './components/common/Toast';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check active cookie session on initial app load
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toast />
    </>
  );
};

export default App;
