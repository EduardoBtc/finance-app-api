import { DeleteUserUseCase } from '../use-cases/index.js';
import {
    internalServerError,
    uuidInvalidResponse,
    isUserIdValid,
    ok,
} from './helpers/index.js';

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isUserIdValidResponse = isUserIdValid(userId);
            if (!isUserIdValidResponse) {
                return uuidInvalidResponse();
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
