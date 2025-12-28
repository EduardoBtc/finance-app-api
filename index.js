import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './src/controllers/create-user.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (request, response) => {
    console.log('request', request);
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).json(body);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
