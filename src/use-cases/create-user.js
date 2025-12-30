import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js';
import { EmailAlreadyInUseError } from '../errors/users.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const uuid = uuidv4();

        const passwordHash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            ID: uuid,
            password: passwordHash,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        const createdUser = await postgresCreateUserRepository.execute(user);
        return createdUser;
    }
}
