import { badRequest, notFound } from './http.js';
import validator from 'validator';

export const uuidInvalidResponse = () =>
    badRequest({
        errorMessage: 'Invalid UUID. Send a valid UUID.',
    });

export const userNotFoundResponse = (userId) =>
    notFound({
        errorMessage: `User with ID ${userId} not found`,
    });

export const invalidPasswordResponse = () =>
    badRequest({
        errorMessage: 'Password must be at least 8 characters long.',
    });

export const invalidEmailResponse = () =>
    badRequest({
        errorMessage: 'Invalid email. Send a valid email address.',
    });

export const emailAlreadyInUseResponse = () =>
    badRequest({
        errorMessage: 'Email already in use.',
    });

export const isPasswordValid = (password) => password.length >= 8;

export const isEmailValid = (email) => validator.isEmail(email);

export const isUserIdValid = (userId) => validator.isUUID(userId);
