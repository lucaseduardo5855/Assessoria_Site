export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'STUDENT';
  phone?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
  studentProfile?: StudentProfile;
}

export interface StudentProfile {
  id: string;
  userId: string;
  height?: number;
  weight?: number;
  goals?: string;
  limitations?: string;
  totalWorkouts: number;
  totalCalories: number;
  totalDistance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description?: string;
  modality: 'RUNNING' | 'MUSCLE_TRAINING' | 'FUNCTIONAL' | 'TRAIL_RUNNING';
  type?: string;
  courseType?: string;
  status: 'PROPOSED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  order?: number;
  isFavorite: boolean;
  workoutDate: string;
  createdAt: string;
  updatedAt: string;
  exercises?: Exercise[];
  workouts?: Workout[];
}

export interface Exercise {
  id: string;
  workoutPlanId: string;
  sequence: number;
  name: string;
  description?: string;
  sets?: number;
  reps?: number;
  load?: number;
  time?: string; // Tempo em minutos ou horas (ex: "30 min" ou "1h 30min")
  distance?: number; // Distância em quilômetros
  interval?: string;
  instruction?: string;
  observation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workout {
  id: string;
  userId: string;
  workoutPlanId?: string;
  modality: 'RUNNING' | 'MUSCLE_TRAINING' | 'FUNCTIONAL' | 'TRAIL_RUNNING';
  type?: string;
  courseType?: string;
  duration?: number;
  distance?: number;
  pace?: string;
  calories?: number;
  notes?: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  workoutPlan?: WorkoutPlan;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  type: 'TRAINING' | 'COMPETITION' | 'WORKSHOP' | 'SOCIAL';
  maxAttendees?: number;
  createdAt: string;
  updatedAt: string;
  attendances?: EventAttendance[];
  _count?: {
    attendances: number;
  };
}

export interface EventAttendance {
  id: string;
  eventId: string;
  userId: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  event?: Event;
  user?: User;
}

export interface Evaluation {
  id: string;
  userId: string;
  type: 'INITIAL' | 'MONTHLY' | 'FINAL';
  weight?: number;
  height?: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
  evaluatedAt: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  birthDate?: string;
  role?: 'STUDENT' | 'ADMIN';
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  error: string;
  stack?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
  }[];
}

export interface WorkoutStats {
  period: string;
  totalWorkouts: number;
  totalDistance: number;
  totalCalories: number;
  totalDuration: number;
  paceEvolution: {
    date: string;
    pace: string;
    distance: number;
  }[];
  workouts: Workout[];
}
