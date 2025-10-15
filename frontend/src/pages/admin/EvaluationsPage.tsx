import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const EvaluationsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Avaliações Físicas
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Nova Avaliação
        </Button>
      </Box>
      
      <Typography variant="body1" color="textSecondary">
        Página de avaliações físicas em desenvolvimento...
      </Typography>
    </Box>
  );
};

export default EvaluationsPage;
