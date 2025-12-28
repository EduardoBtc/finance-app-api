import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
});

export const PostgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect();
        const result = await client.query(query, params);
        await client.release();
        return result;
    },
};
