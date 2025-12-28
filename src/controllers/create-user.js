import { CreateUserUseCase } from '../use-cases/create-user.js';
import { badRequest, created, internalServerError } from './helper.js';

import validator from 'validator';
import { EmailAlreadyInUseError } from '../errors/users.js';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        errorMessage: `Field ${field} is required`,
                    });
                }
            }

            const passwordIsValid = params.password.length >= 8;
            if (!passwordIsValid) {
                return badRequest({
                    errorMessage:
                        'Password must be at least 8 characters long.',
                });
            }

            const isEmailValid = validator.isEmail(params.email);
            if (!isEmailValid) {
                return badRequest({
                    errorMessage: 'Invalid email. Send a valid email address.',
                });
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
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
