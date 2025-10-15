import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const EventsPage: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Eventos e Competições
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Criar Evento
        </Button>
      </Box>
      
      <Typography variant="body1" color="textSecondary">
        Página de gerenciamento de eventos em desenvolvimento...
      </Typography>
    </Box>
  );
};

export default EventsPage;
