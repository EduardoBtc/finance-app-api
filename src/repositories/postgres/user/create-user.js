import { PostgresHelper } from '../../../db/postgres/helper.js';

export class PostgresCreateUserRepository {
    async execute(creatUserParams) {
        await PostgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                creatUserParams.ID,
                creatUserParams.first_name,
                creatUserParams.last_name,
                creatUserParams.email,
                creatUserParams.password,
            ],
        );

        const userCreated = await PostgresHelper.query(
            'SELECT * FROM users WHERE id = $1',
            [creatUserParams.ID],
        );

        console.log('userCreated', userCreated);
        return userCreated.rows[0];
    }
}
