import { EmailAlreadyInUseError } from '../errors/users.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresUpdateUserRepository,
    ) {
        this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository;

        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
    }

    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                );

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId)
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

        const updatedUserResult =
            await this.postgresUpdateUserRepository.execute(
                userId,
                updatedUser,
            );

        return updatedUserResult;
    }
}
