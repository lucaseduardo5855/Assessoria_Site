import React from 'react';
import { Box, Typography } from '@mui/material';

const MyEventsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Meus Eventos
      </Typography>
      
      <Typography variant="body1" color="textSecondary">
        Página de eventos do aluno em desenvolvimento...
      </Typography>
    </Box>
  );
};

export default MyEventsPage;
