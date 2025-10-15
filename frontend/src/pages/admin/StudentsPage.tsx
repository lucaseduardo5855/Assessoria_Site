import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  CircularProgress,
  Alert,
  Modal 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/api'; // Certifique-se de que o caminho para 'api' está correto

// Define o tipo básico para o aluno (baseado no que o backend retorna)
interface Student {
    id: string;
    name: string;
    email: string;
    // Adicione outros campos relevantes aqui
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const StudentsPage: React.FC = () => {
    const { isAuthenticated } = useAuth(); // Apenas para garantia
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStudents();
        }
    }, [isAuthenticated]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            // Chama a rota que lista todos os alunos do backend
            const paginationData = await userService.getStudents();
            setStudents(paginationData.data || []);
        } catch (err: any) {
        // ...
    } finally {
        setLoading(false);
    }
};
    
    // Placeholder para o formulário de cadastro
    const handleRegister = () => {
        // Lógica de cadastro virá aqui
        alert("Submetendo novo aluno...");
        setIsModalOpen(false);
        // Em um projeto real, você chamaria fetchStudents() novamente após o sucesso.
    };
    
    // Renderiza a tabela de alunos
    const renderStudentsTable = () => {
        if (loading) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
        }

        if (error) {
            return <Alert severity="error">{error}</Alert>;
        }
        
        if (students.length === 0) {
            return <Alert severity="info">Nenhum aluno cadastrado ainda.</Alert>;
        }

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.light' }}>
                            <TableCell sx={{ color: 'white' }}>Nome</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id} hover>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                    <Button size="small" variant="outlined" color="primary">Ver Detalhes</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Gerenciar Alunos
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Add />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Cadastrar Aluno
                </Button>
            </Box>

            <Card>
                <CardContent>
                    {renderStudentsTable()}
                </CardContent>
            </Card>

            {/* Modal de Cadastro */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Cadastrar Novo Aluno
                    </Typography>
                    
                    {/* Placeholder para o Formulário real */}
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="warning">O formulário de cadastro será implementado aqui!</Alert>
                        <Button 
                            variant="contained" 
                            color="success" 
                            fullWidth 
                            sx={{ mt: 2 }}
                            onClick={handleRegister}
                        >
                            Salvar Aluno
                        </Button>
                    </Box>

                    <Button 
                        onClick={() => setIsModalOpen(false)}
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default StudentsPage;