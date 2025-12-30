import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { internalServerError, notFound, ok } from './helpers/http.js';
import { uuidInvalidResponse, isUserIdValid } from './helpers/user.js';
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
                return notFound({
                    errorMessage: `User with ID ${userId} not found`,
                });
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
