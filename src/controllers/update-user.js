import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { badRequest, internalServerError, notFound, ok } from './helper.js';
import validator from 'validator';
import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js';
import { EmailAlreadyInUseError } from '../errors/users.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body;
            const userId = httpRequest.params.userId;

            const isUserIdValid = validator.isUUID(userId);
            if (!isUserIdValid) {
                return badRequest({
                    errorMessage:
                        'Invalid user ID, not a valid UUID. Send a valid user ID. ',
                });
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
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

            if (updateUserParams.password) {
                const passwordIsValid = updateUserParams.password.length >= 8;
                if (!passwordIsValid) {
                    return badRequest({
                        errorMessage:
                            'Password must be at least 8 characters long.',
                    });
                }
            }

            if (updateUserParams.email) {
                const isEmailValid = validator.isEmail(updateUserParams.email);
                if (!isEmailValid) {
                    return badRequest({
                        errorMessage:
                            'Invalid email. Send a valid email address.',
                    });
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUserResult = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );

            return ok(updatedUserResult);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    errorMessage: error.message,
                });
            }
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
