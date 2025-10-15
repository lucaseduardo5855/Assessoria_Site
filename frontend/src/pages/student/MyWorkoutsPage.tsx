import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const MyWorkoutsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Meus Treinos
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Registrar Treino
        </Button>
      </Box>
      
      <Typography variant="body1" color="textSecondary">
        Página de registro de treinos em desenvolvimento...
      </Typography>
    </Box>
  );
};

export default MyWorkoutsPage;
