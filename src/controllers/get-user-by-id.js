import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { badRequest, internalServerError, ok } from './helper.js';
import validator from 'validator';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const userId = httpRequest.params.userId;

            const isUserIdValid = validator.isUUID(userId);
            if (!isUserIdValid) {
                return badRequest({
                    errorMessage:
                        'Invalid user ID, not a valid UUID. Send a valid user ID. ',
                });
            }

            const user = await getUserByIdUseCase.execute(userId);
            return ok(user);
        } catch (error) {
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
