import {
    internalServerError,
    userNotFoundResponse,
    ok,
    uuidInvalidResponse,
    isUserIdValid,
} from './helpers/index.js';

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isUserIdValidResponse = isUserIdValid(userId);
            if (!isUserIdValidResponse) {
                return uuidInvalidResponse();
            }

            const user = await this.getUserByIdUseCase.execute(userId);

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
