import { PostgresCreateTransactionRepository, PostgresGetUserByIdRepository } from '../../repositories/postgres/transaction/create-transaction.js';
import { CreateTransactionUseCase } from '../../use-cases/transaction/create-transaction.js';


export const makeCreateTransactionController = () => {
    C