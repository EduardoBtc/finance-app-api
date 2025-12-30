import { CreateUserUseCase } from '../use-cases/create-user.js';
import {
    badRequest,
    created,
    internalServerError,
    invalidPasswordResponse,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    isPasswordValid,
    isEmailValid,
} from './helpers/index.js';

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

            const passwordIsValid = isPasswordValid(params.password);
            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            const isEmailValidResponse = isEmailValid(params.email);
            if (!isEmailValidResponse) {
                return invalidEmailResponse();
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
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
