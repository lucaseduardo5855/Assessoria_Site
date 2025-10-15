import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const WorkoutPlansPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Planilhas de Treino
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Criar Planilha
        </Button>
      </Box>
      
      <Typography variant="body1" color="textSecondary">
        Página de configuração de planilhas de treino em desenvolvimento...
      </Typography>
    </Box>
  );
};

export default WorkoutPlansPage;
