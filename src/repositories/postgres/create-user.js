import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresCreateUserRepository {
    async execute(creatUserParams) {
        const result = await PostgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                creatUserParams.ID,
                creatUserParams.first_name,
                creatUserParams.last_name,
                creatUserParams.email,
                creatUserParams.password,
            ],
        );
        return result.rows[0];
    }
}
