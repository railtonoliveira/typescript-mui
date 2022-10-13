import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; 
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial',
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Página inicial</Button>} />
            
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};