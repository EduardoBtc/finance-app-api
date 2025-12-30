import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
    internalServerError,
    userNotFoundResponse,
    ok,
    uuidInvalidResponse,
    isUserIdValid,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const userId = httpRequest.params.userId;

            const isUserIdValidResponse = isUserIdValid(userId);
            if (!isUserIdValidResponse) {
                return uuidInvalidResponse();
            }

            const user = await getUserByIdUseCase.execute(userId);

            if (!user) {
                return userNotFoundResponse(userId);
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
