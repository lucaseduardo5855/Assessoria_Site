import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncEventAttendances() {
  try {
    console.log('🔄 Iniciando sincronização de eventos...');
    
    // Buscar todos os alunos
    const allStudents = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true }
    });

    console.log(`📚 Total de alunos encontrados: ${allStudents.length}`);

    // Buscar todos os eventos
    const allEvents = await prisma.event.findMany({
      select: { id: true, title: true }
    });

    console.log(`📅 Total de eventos encontrados: ${allEvents.length}`);

    let createdCount = 0;
    let skippedCount = 0;

    // Garantir que todos os alunos tenham access a todos os eventos
    for (const student of allStudents) {
      for (const event of allEvents) {
        // Verificar se já existe o registro
        const existing = await prisma.eventAttendance.findUnique({
          where: {
            eventId_userId: {
              eventId: event.id,
              userId: student.id
            }
          }
        });

        // Se não existe, criar
        if (!existing) {
          await prisma.eventAttendance.create({
            data: {
              eventId: event.id,
              userId: student.id,
              confirmed: false
            }
          });
          createdCount++;
          console.log(`✅ Criado: ${student.name} -> ${event.title}`);
        } else {
          skippedCount++;
        }
      }
    }

    console.log('\n📊 Resumo da sincronização:');
    console.log(`   • Registros criados: ${createdCount}`);
    console.log(`   • Registros já existentes: ${skippedCount}`);
    console.log('✅ Sincronização concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncEventAttendances();

