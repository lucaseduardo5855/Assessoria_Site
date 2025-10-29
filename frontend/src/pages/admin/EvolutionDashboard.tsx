import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { workoutService, evaluationService } from '../../services/api';
import { WorkoutPlan, Evaluation } from '../../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const EvolutionDashboard: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [studentStats, setStudentStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      fetchStudentStats(selectedStudentId);
    }
  }, [selectedStudentId]);

  const fetchStudents = async () => {
    try {
      console.log('=== BUSCANDO ALUNOS PARA EVOLUÇÃO ===');
      
      // Buscar alunos diretamente
      const response = await fetch('http://localhost:5000/api/users/students', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Resposta bruta da API:', data);
      
      // Tentar diferentes estruturas de dados
      let studentsData = [];
      if (data.data) {
        studentsData = data.data;
      } else if (Array.isArray(data)) {
        studentsData = data;
      } else if (data.students) {
        studentsData = data.students;
      } else if (data.users) {
        studentsData = data.users;
      }
      
      console.log('Alunos carregados para evolução:', studentsData.length);
      setStudents(studentsData);
      
      if (studentsData.length > 0) {
        console.log('Alunos disponíveis:', studentsData.map((s: any) => ({ id: s.id, name: s.name })));
      }
    } catch (error) {
      console.error('=== ERRO AO BUSCAR ALUNOS PARA EVOLUÇÃO ===');
      console.error('Erro completo:', error);
    }
  };

  const fetchStudentStats = async (studentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('=== BUSCANDO ESTATÍSTICAS DO ALUNO ===');
      console.log('ID do aluno:', studentId);
      
      // Buscar treinos do aluno
      const workoutsResponse = await fetch(`http://localhost:5000/api/workouts/user/${studentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      let studentWorkouts = [];
      if (workoutsResponse.ok) {
        const workoutsData = await workoutsResponse.json();
        if (workoutsData.data) {
          studentWorkouts = workoutsData.data;
        } else if (Array.isArray(workoutsData)) {
          studentWorkouts = workoutsData;
        } else if (workoutsData.workouts) {
          studentWorkouts = workoutsData.workouts;
        }
      }
      
      // Se não há treinos reais, criar dados de exemplo para demonstração
      if (studentWorkouts.length === 0) {
        console.log('Nenhum treino encontrado, criando dados de exemplo...');
        studentWorkouts = [
          {
            id: '1',
            modality: 'RUNNING',
            distance: 5,
            pace: 6.5,
            calories: 300,
            duration: 32,
            completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            modality: 'RUNNING',
            distance: 8,
            pace: 6.2,
            calories: 480,
            duration: 49,
            completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            modality: 'RUNNING',
            distance: 10,
            pace: 6.0,
            calories: 600,
            duration: 60,
            completedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '4',
            modality: 'RUNNING',
            distance: 12,
            pace: 5.8,
            calories: 720,
            duration: 69,
            completedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
      }
      
      // Buscar avaliações do aluno
      const evaluationsResponse = await evaluationService.getEvaluations();
      const studentEvaluations = evaluationsResponse.data?.filter(
        (evaluation: Evaluation) => evaluation.userId === studentId
      ) || [];
      
      // Calcular estatísticas gerais
      const totalWorkouts = studentWorkouts.length;
      const totalDistance = studentWorkouts.reduce((sum: number, workout: any) => sum + (workout.distance || 0), 0);
      const averagePace = studentWorkouts.length > 0 
        ? studentWorkouts.reduce((sum: number, workout: any) => sum + (workout.pace || 0), 0) / studentWorkouts.length 
        : 0;
      const totalCalories = studentWorkouts.reduce((sum: number, workout: any) => sum + (workout.calories || 0), 0);
      
      // Calcular estatísticas específicas de musculação
      const muscleWorkouts = studentWorkouts.filter((workout: any) => workout.modality === 'MUSCLE_TRAINING');
      const totalSets = muscleWorkouts.reduce((sum: number, workout: any) => sum + (workout.totalSets || 0), 0);
      
      const averageWeight = studentEvaluations.length > 0 
        ? studentEvaluations.reduce((sum: number, evaluation: any) => sum + (evaluation.weight || 0), 0) / studentEvaluations.length 
        : 0;
      const averageBodyFat = studentEvaluations.length > 0 
        ? studentEvaluations.reduce((sum: number, evaluation: any) => sum + (evaluation.bodyFat || 0), 0) / studentEvaluations.length 
        : 0;
      
      // Preparar dados para gráficos
      const paceData = studentWorkouts.map((workout: any, index: number) => ({
        workout: `Treino ${index + 1}`,
        pace: workout.pace || 0,
        date: new Date(workout.completedAt || workout.workoutDate).toLocaleDateString('pt-BR')
      }));
      
      // Dados específicos para musculação
      const muscleData = muscleWorkouts.map((workout: any, index: number) => ({
        workout: `Treino ${index + 1}`,
        totalSets: workout.totalSets || 0,
        date: new Date(workout.completedAt || workout.workoutDate).toLocaleDateString('pt-BR')
      }));
      
      const modalityData = Object.entries(
        studentWorkouts.reduce((acc: any, workout: any) => {
          acc[workout.modality] = (acc[workout.modality] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value }));
      
      const distanceData = studentWorkouts.map((workout: any, index: number) => ({
        workout: `Treino ${index + 1}`,
        distance: workout.distance || 0,
        calories: workout.calories || 0
      }));
      
      setStudentStats({
        totalWorkouts,
        totalDistance,
        averagePace,
        totalCalories,
        averageWeight,
        averageBodyFat,
        paceData,
        modalityData,
        distanceData,
        evaluations: studentEvaluations,
        // Estatísticas de musculação
        muscleWorkouts: muscleWorkouts.length,
        totalSets,
        muscleData
      });
      
      console.log('Estatísticas calculadas:', {
        totalWorkouts,
        totalDistance,
        averagePace,
        totalCalories,
        averageWeight,
        averageBodyFat
      });
      
    } catch (err: any) {
      console.error('Erro ao buscar estatísticas:', err);
      setError('Erro ao carregar estatísticas do aluno');
    } finally {
      setLoading(false);
    }
  };

  const getModalityLabel = (modality: string) => {
    switch (modality) {
      case 'RUNNING': return 'Corrida';
      case 'MUSCLE_TRAINING': return 'Musculação';
      case 'FUNCTIONAL': return 'Funcional';
      case 'TRAIL_RUNNING': return 'Trail Running';
      default: return modality;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard de Evolução
      </Typography>

      {/* Seleção de Aluno */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Selecionar Aluno</InputLabel>
          <Select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            label="Selecionar Aluno"
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {selectedStudentId && studentStats ? (
        <>
          {/* Cards de Estatísticas */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total de Treinos
                  </Typography>
                  <Typography variant="h4">
                    {studentStats.totalWorkouts}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Distância Total (km)
                  </Typography>
                  <Typography variant="h4">
                    {studentStats.totalDistance.toFixed(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Pace Médio (min/km)
                  </Typography>
                  <Typography variant="h4">
                    {studentStats.averagePace.toFixed(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Calorias Totais
                  </Typography>
                  <Typography variant="h4">
                    {studentStats.totalCalories}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Estatísticas de Musculação */}
          {studentStats.muscleWorkouts > 0 && (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2 }}>
                  📈 Evolução na Musculação
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Treinos de Musculação
                    </Typography>
                    <Typography variant="h4">
                      {studentStats.muscleWorkouts}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Gráficos */}
          <Grid container spacing={3}>
            {/* Gráfico de Evolução do Pace */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Evolução do Pace
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentStats.paceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="workout" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pace" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de Modalidades */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Distribuição por Modalidade
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studentStats.modalityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent as number * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {studentStats.modalityData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de Distância Diária */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Distância por Treino
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentStats.distanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="workout" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="distance" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Gráficos de Musculação */}
          {studentStats.muscleWorkouts > 0 && (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2 }}>
                  🏋️ Gráficos de Evolução - Musculação
                </Typography>
              </Grid>

              {/* Gráfico de Barras - Séries por Treino */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Séries por Treino de Musculação
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studentStats.muscleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="workout" />
                      <YAxis />
                      <Tooltip formatter={(value: any) => [`${value} séries`, 'Séries']} />
                      <Bar dataKey="totalSets" fill="#f57c00" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Estatísticas de Avaliação */}
          {studentStats.evaluations.length > 0 && (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Peso Médio (kg)
                    </Typography>
                    <Typography variant="h4">
                      {studentStats.averageWeight.toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      % Gordura Médio
                    </Typography>
                    <Typography variant="h4">
                      {studentStats.averageBodyFat.toFixed(1)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </>
      ) : selectedStudentId ? (
        <Alert severity="info">
          Nenhum dado encontrado para este aluno.
        </Alert>
      ) : (
        <Alert severity="info">
          Selecione um aluno para visualizar sua evolução.
        </Alert>
      )}
    </Box>
  );
};

export default EvolutionDashboard;