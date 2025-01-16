import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed');
        process.exit(1);
    }
}
export { prisma };

export default connectDatabase;
