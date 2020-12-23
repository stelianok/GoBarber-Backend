import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('Create User', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        });

        expect(createUser.execute({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });
})