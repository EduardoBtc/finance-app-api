import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controllers/index.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);
    response.status(statusCode).json(body);
});

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);
    response.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = new DeleteUserController();
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
