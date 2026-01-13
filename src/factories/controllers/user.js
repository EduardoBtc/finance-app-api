import {
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from '../../repositories/postgres/index.js';
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
} from '../../use-cases/index.js';
import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
} from '../../controllers/index.js';

export const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const createUserUseCase = new CreateUserUseCase(
        new PostgresGetUserByIdRepository(),
        new PostgresCreateUserRepository(),
    );
    const createUserController = new CreateUserController(createUserUseCase);
    return createUserController;
};

export const makeUpdateUserController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(
        postgresGetUserByIdRepository,
        postgresUpdateUserRepository,
    );
    const updateUserController = new UpdateUserController(
        updateUserUseCase,
        getUserByIdUseCase,
    );
    return updateUserController;
};

export const makeDeleteUserController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    );
    const deleteUserController = new DeleteUserController(
        postgresGetUserByIdRepository,
        deleteUserUseCase,
    );
    return deleteUserController;
};
