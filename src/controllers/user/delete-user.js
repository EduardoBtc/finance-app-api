import {
    internalServerError,
    uuidInvalidResponse,
    isUserIdValid,
    ok,
    userNotFoundResponse,
} from '../helpers/index.js';

export class DeleteUserController {
    constructor(postgresGetUserByIdRepository, deleteUserUseCase) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isUserIdValidResponse = isUserIdValid(userId);
            if (!isUserIdValidResponse) {
                return uuidInvalidResponse();
            }

            const user =
                await this.postgresGetUserByIdRepository.execute(userId);
            if (!user) {
                return userNotFoundResponse(userId);
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId);
            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
