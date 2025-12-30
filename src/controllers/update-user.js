import { UpdateUserUseCase } from '../use-cases/update-user.js';
import {
    badRequest,
    internalServerError,
    notFound,
    ok,
    uuidInvalidResponse,
    isUserIdValid,
    invalidPasswordResponse,
    invalidEmailResponse,
    emailAlreadyInUseResponse,
    isEmailValid,
    isPasswordValid,
} from './helpers/index.js';
import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js';
import { EmailAlreadyInUseError } from '../errors/users.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const userId = httpRequest.params.userId;

            const isUserIdValidResponse = isUserIdValid(userId);
            if (!isUserIdValidResponse) {
                return uuidInvalidResponse();
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    errorMessage: 'Some field is not allowed',
                });
            }

            const postgresGetUserByIdRepository =
                new PostgresGetUserByIdRepository();

            const user = await postgresGetUserByIdRepository.execute(userId);
            if (!user) {
                return notFound({
                    errorMessage: `User with ID ${userId} not found`,
                });
            }

            if (params.password) {
                const passwordIsValid = isPasswordValid(params.password);
                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            if (params.email) {
                const isEmailValidResponse = isEmailValid(params.email);

                if (!isEmailValidResponse) {
                    return invalidEmailResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUserResult = await updateUserUseCase.execute(
                userId,
                params,
            );

            return ok(updatedUserResult);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return emailAlreadyInUseResponse();
            }
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
