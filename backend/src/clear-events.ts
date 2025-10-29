import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearEvents() {
  try {
    console.log('🗑️ Iniciando limpeza de eventos...');
    
    // Buscar todos os eventos
    const allEvents = await prisma.event.findMany({
      select: { id: true, title: true }
    });

    console.log(`📅 Total de eventos encontrados: ${allEvents.length}`);

    if (allEvents.length === 0) {
      console.log('✅ Nenhum evento para deletar');
      return;
    }

    // Deletar todos os registros de attendance primeiro (cascade)
    const deleteAttendances = await prisma.eventAttendance.deleteMany({});
    console.log(`🗑️ Removidos ${deleteAttendances.count} registros de presença`);

    // Deletar todos os eventos
    const deleteEvents = await prisma.event.deleteMany({});
    console.log(`🗑️ Removidos ${deleteEvents.count} eventos`);
    
    console.log('✅ Limpeza concluída com sucesso!');
    console.log('📝 Agora você pode criar novos eventos como treinador');
    
  } catch (error) {
    console.error('❌ Erro na limpeza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearEvents();

