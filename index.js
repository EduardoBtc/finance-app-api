import 'dotenv/config.js';
import express from 'express';
import {
    makeGetUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);
    response.status(statusCode).json(body);
});

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);
    response.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);
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
