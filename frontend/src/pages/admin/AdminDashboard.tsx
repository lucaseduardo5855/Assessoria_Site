import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  People,
  FitnessCenter,
  Event,
  Assessment,
  TrendingUp,
  DirectionsRun,
  CalendarToday,
  BarChart,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userService, workoutService, eventService, evaluationService } from 'services/api';
import { User, Workout, Event as EventType, Evaluation } from '@/types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalWorkouts: 0,
    totalEvents: 0,
    recentWorkouts: [] as Workout[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userStats, workoutStats, eventStats, evaluationStats] = await Promise.all([
          userService.getStats(),
          workoutService.getStats(),
          eventService.getStats(),
          evaluationService.getStats(),
        ]);

        setStats({
          totalStudents: userStats.totalStudents,
          totalWorkouts: userStats.totalWorkouts,
          totalEvents: userStats.totalEvents,
          recentWorkouts: userStats.recentWorkouts,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Alunos',
      value: stats.totalStudents,
      icon: <People />,
      color: '#1976d2',
      path: '/admin/students',
    },
    {
      title: 'Planilhas Criadas',
      value: stats.totalWorkouts,
      icon: <FitnessCenter />,
      color: '#388e3c',
      path: '/admin/workout-plans',
    },
    {
      title: 'Eventos Ativos',
      value: stats.totalEvents,
      icon: <Event />,
      color: '#f57c00',
      path: '/admin/events',
    },
    {
      title: 'Avaliações',
      value: stats.totalEvents, // Usar dados de avaliações quando disponível
      icon: <Assessment />,
      color: '#d32f2f',
      path: '/admin/evaluations',
    },
  ];

  const quickActions = [
    {
      title: 'Cadastrar Aluno',
      description: 'Adicionar novo aluno ao sistema',
      icon: <People />,
      path: '/admin/students',
      color: '#1976d2',
    },
    {
      title: 'Criar Planilha',
      description: 'Criar nova planilha de treino',
      icon: <FitnessCenter />,
      path: '/admin/workout-plans',
      color: '#388e3c',
    },
    {
      title: 'Novo Evento',
      description: 'Criar evento ou competição',
      icon: <Event />,
      path: '/admin/events',
      color: '#f57c00',
    },
    {
      title: 'Nova Avaliação',
      description: 'Registrar avaliação física',
      icon: <Assessment />,
      path: '/admin/evaluations',
      color: '#d32f2f',
    },
  ];

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case 'RUNNING':
        return <DirectionsRun />;
      case 'MUSCLE_TRAINING':
        return <FitnessCenter />;
      case 'FUNCTIONAL':
        return <TrendingUp />;
      default:
        return <FitnessCenter />;
    }
  };

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case 'RUNNING':
        return '#1976d2';
      case 'MUSCLE_TRAINING':
        return '#388e3c';
      case 'FUNCTIONAL':
        return '#f57c00';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Carregando dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard Administrativo
      </Typography>

      {/* Cards de estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate(stat.path)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Ações rápidas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ações Rápidas
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => navigate(action.path)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            backgroundColor: action.color,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {action.title}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {action.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Treinos recentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">
                Treinos Recentes
              </Typography>
              <Tooltip title="Ver todos os treinos">
                <IconButton
                  size="small"
                  onClick={() => navigate('/admin/workout-plans')}
                >
                  <BarChart />
                </IconButton>
              </Tooltip>
            </Box>
            
            {stats.recentWorkouts.length > 0 ? (
              <List>
                {stats.recentWorkouts.slice(0, 5).map((workout, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          backgroundColor: getModalityColor(workout.modality),
                          width: 32,
                          height: 32,
                        }}
                      >
                        {getModalityIcon(workout.modality)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" fontWeight="medium">
                            {workout.user?.name}
                          </Typography>
                          <Chip
                            label={workout.modality}
                            size="small"
                            sx={{
                              backgroundColor: getModalityColor(workout.modality),
                              color: 'white',
                              fontSize: '0.7rem',
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="textSecondary">
                          {new Date(workout.completedAt).toLocaleDateString('pt-BR')}
                          {workout.distance && ` • ${workout.distance}km`}
                          {workout.duration && ` • ${workout.duration}min`}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary" textAlign="center" py={2}>
                Nenhum treino registrado ainda
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
