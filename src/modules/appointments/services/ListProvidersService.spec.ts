import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderService = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Bot',
            email: 'bot@gmail.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'User',
            email: 'user@gmail.com',
            password: '123456',
        });

        const providers = await listProviderService.execute({
            user_id: loggedUser.id
        });

        expect(providers).toEqual([user1, user2]);
    });

});
