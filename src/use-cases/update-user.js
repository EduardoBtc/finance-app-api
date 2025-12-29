import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';
import { internalServerError } from '../controllers/helper.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyInUseError } from '../errors/users.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        try {
            if (updateUserParams.email) {
                const postgresGetUserByEmailRepository =
                    new PostgresGetUserByEmailRepository();

                const userWithProvidedEmail =
                    await postgresGetUserByEmailRepository.execute(
                        updateUserParams.email,
                    );

                if (userWithProvidedEmail)
                    throw new EmailAlreadyInUseError(updateUserParams.email);
            }

            const updatedUser = {
                ...updateUserParams,
            };

            if (updateUserParams.password) {
                const passwordHash = await bcrypt.hash(
                    updateUserParams.password,
                    10,
                );
                updatedUser.password = passwordHash;
            }

            const postgresUpdateUserRepository =
                new PostgresUpdateUserRepository();

            const updatedUserResult =
                await postgresUpdateUserRepository.execute(userId, updatedUser);

            return updatedUserResult;
        } catch (error) {
            console.error(error);
            return internalServerError({
                errorMessage: 'Internal server error',
            });
        }
    }
}
