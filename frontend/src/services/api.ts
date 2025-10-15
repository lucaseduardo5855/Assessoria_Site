import axios, { AxiosResponse } from 'axios';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  User, 
  WorkoutPlan, 
  Workout, 
  Event, 
  EventAttendance, 
  Evaluation,
  WorkoutStats,
  PaginationResponse
} from '@/types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de Autenticação
export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await api.post('/auth/register', userData);
    return response.data.user;
  },

  verifyToken: async (): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await api.get('/auth/verify');
    return response.data.user;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// Serviços de Usuários
export const userService = {
  getStudents: async (page = 1, limit = 10, search = ''): Promise<PaginationResponse<User>> => {
    const response: AxiosResponse<PaginationResponse<User>> = await api.get('/users/students', {
      params: { page, limit, search }
    });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await api.get('/users/profile');
    return response.data.user;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await api.put('/users/profile', data);
    return response.data.user;
  },

  getStudentDetails: async (id: string): Promise<User> => {
    const response: AxiosResponse<{ student: User }> = await api.get(`/users/students/${id}`);
    return response.data.student;
  },

  deleteStudent: async (id: string): Promise<void> => {
    await api.delete(`/users/students/${id}`);
  },

  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

// Serviços de Treinos
export const workoutService = {
  createPlan: async (planData: Partial<WorkoutPlan>): Promise<WorkoutPlan> => {
    const response: AxiosResponse<{ workoutPlan: WorkoutPlan }> = await api.post('/workouts/plans', planData);
    return response.data.workoutPlan;
  },

  getPlans: async (page = 1, limit = 10, modality?: string, status?: string): Promise<PaginationResponse<WorkoutPlan>> => {
    const response: AxiosResponse<PaginationResponse<WorkoutPlan>> = await api.get('/workouts/plans', {
      params: { page, limit, modality, status }
    });
    return response.data;
  },

  getPlan: async (id: string): Promise<WorkoutPlan> => {
    const response: AxiosResponse<{ workoutPlan: WorkoutPlan }> = await api.get(`/workouts/plans/${id}`);
    return response.data.workoutPlan;
  },

  updatePlan: async (id: string, planData: Partial<WorkoutPlan>): Promise<WorkoutPlan> => {
    const response: AxiosResponse<{ workoutPlan: WorkoutPlan }> = await api.put(`/workouts/plans/${id}`, planData);
    return response.data.workoutPlan;
  },

  deletePlan: async (id: string): Promise<void> => {
    await api.delete(`/workouts/plans/${id}`);
  },

  recordWorkout: async (workoutData: Partial<Workout>): Promise<Workout> => {
    const response: AxiosResponse<{ workout: Workout }> = await api.post('/workouts/record', workoutData);
    return response.data.workout;
  },

  getMyWorkouts: async (page = 1, limit = 10, modality?: string, startDate?: string, endDate?: string): Promise<PaginationResponse<Workout>> => {
    const response: AxiosResponse<PaginationResponse<Workout>> = await api.get('/workouts/my-workouts', {
      params: { page, limit, modality, startDate, endDate }
    });
    return response.data;
  },

  getStats: async (period = 'month'): Promise<WorkoutStats> => {
    const response: AxiosResponse<WorkoutStats> = await api.get('/workouts/stats', {
      params: { period }
    });
    return response.data;
  },

  generatePDF: async (id: string): Promise<Blob> => {
    const response = await api.get(`/workouts/plans/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },
};

// Serviços de Eventos
export const eventService = {
  createEvent: async (eventData: Partial<Event>): Promise<Event> => {
    const response: AxiosResponse<{ event: Event }> = await api.post('/events', eventData);
    return response.data.event;
  },

  getEvents: async (page = 1, limit = 10, type?: string, upcoming = 'true'): Promise<PaginationResponse<Event>> => {
    const response: AxiosResponse<PaginationResponse<Event>> = await api.get('/events', {
      params: { page, limit, type, upcoming }
    });
    return response.data;
  },

  getEvent: async (id: string): Promise<Event> => {
    const response: AxiosResponse<{ event: Event }> = await api.get(`/events/${id}`);
    return response.data.event;
  },

  updateEvent: async (id: string, eventData: Partial<Event>): Promise<Event> => {
    const response: AxiosResponse<{ event: Event }> = await api.put(`/events/${id}`, eventData);
    return response.data.event;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`);
  },

  attendEvent: async (id: string, confirmed: boolean): Promise<EventAttendance> => {
    const response: AxiosResponse<{ attendance: EventAttendance }> = await api.post(`/events/${id}/attend`, { confirmed });
    return response.data.attendance;
  },

  getMyAttendances: async (page = 1, limit = 10, confirmed?: boolean): Promise<PaginationResponse<EventAttendance>> => {
    const response: AxiosResponse<PaginationResponse<EventAttendance>> = await api.get('/events/my/attendances', {
      params: { page, limit, confirmed }
    });
    return response.data;
  },

  getEventAttendances: async (id: string, page = 1, limit = 10, confirmed?: boolean): Promise<PaginationResponse<EventAttendance>> => {
    const response: AxiosResponse<PaginationResponse<EventAttendance>> = await api.get(`/events/${id}/attendances`, {
      params: { page, limit, confirmed }
    });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/events/stats/overview');
    return response.data;
  },
};

// Serviços de Avaliações
export const evaluationService = {
  createEvaluation: async (evaluationData: Partial<Evaluation> & { userId: string }): Promise<Evaluation> => {
    const response: AxiosResponse<{ evaluation: Evaluation }> = await api.post('/evaluations', evaluationData);
    return response.data.evaluation;
  },

  getEvaluations: async (page = 1, limit = 10, userId?: string, type?: string): Promise<PaginationResponse<Evaluation>> => {
    const response: AxiosResponse<PaginationResponse<Evaluation>> = await api.get('/evaluations', {
      params: { page, limit, userId, type }
    });
    return response.data;
  },

  getEvaluation: async (id: string): Promise<Evaluation> => {
    const response: AxiosResponse<{ evaluation: Evaluation }> = await api.get(`/evaluations/${id}`);
    return response.data.evaluation;
  },

  updateEvaluation: async (id: string, evaluationData: Partial<Evaluation>): Promise<Evaluation> => {
    const response: AxiosResponse<{ evaluation: Evaluation }> = await api.put(`/evaluations/${id}`, evaluationData);
    return response.data.evaluation;
  },

  deleteEvaluation: async (id: string): Promise<void> => {
    await api.delete(`/evaluations/${id}`);
  },

  getStudentEvaluations: async (userId: string) => {
    const response = await api.get(`/evaluations/student/${userId}`);
    return response.data;
  },

  getMyEvaluations: async () => {
    const response = await api.get('/evaluations/my/evaluations');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/evaluations/stats/overview');
    return response.data;
  },

  getEvolutionChart: async (userId: string) => {
    const response = await api.get(`/evaluations/charts/evolution/${userId}`);
    return response.data;
  },
};

export default api;
