import { DeleteUserUseCase } from '../use-cases/index.js';
import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js';
import {
    internalServerError,
    uuidInvalidResponse,
    isUserIdValid,
    ok,
    userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isUserIdValidResponse = isUserIdValid(userId);
            if (!isUserIdValidResponse) {
                return uuidInvalidResponse();
            }

            const postgresGetUserByIdRepository =
                new PostgresGetUserByIdRepository();
            const user = await postgresGetUserByIdRepository.execute(userId);
            if (!user) {
                return userNotFoundResponse(userId);
            }

            const deleteUserUseCase = new DeleteUserUseCase();
            const deletedUser = await deleteUserUseCase.execute(userId);
            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
