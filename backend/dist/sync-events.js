"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function syncEventAttendances() {
    try {
        console.log('🔄 Iniciando sincronização de eventos...');
        const allStudents = await prisma.user.findMany({
            where: { role: 'STUDENT' },
            select: { id: true, name: true, email: true }
        });
        console.log(`📚 Total de alunos encontrados: ${allStudents.length}`);
        const allEvents = await prisma.event.findMany({
            select: { id: true, title: true }
        });
        console.log(`📅 Total de eventos encontrados: ${allEvents.length}`);
        let createdCount = 0;
        let skippedCount = 0;
        for (const student of allStudents) {
            for (const event of allEvents) {
                const existing = await prisma.eventAttendance.findUnique({
                    where: {
                        eventId_userId: {
                            eventId: event.id,
                            userId: student.id
                        }
                    }
                });
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
                }
                else {
                    skippedCount++;
                }
            }
        }
        console.log('\n📊 Resumo da sincronização:');
        console.log(`   • Registros criados: ${createdCount}`);
        console.log(`   • Registros já existentes: ${skippedCount}`);
        console.log('✅ Sincronização concluída com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro na sincronização:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
syncEventAttendances();
//# sourceMappingURL=sync-events.js.map