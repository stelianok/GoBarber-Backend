import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authenticate user', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });
    it('should not be able to authenticate with non existing user', async () => {
        await expect(authenticateUser.execute({
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);

    });
    it('should not be able to authenticate with wrong email/password combination', async () => {
        await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'willSmithOficial@gmail.com',
            password: '123',
        })).rejects.toBeInstanceOf(AppError);

    });

})
