import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfilService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfilService;
describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfilService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'William smith',
            email: 'willsmith@gmail.com',
        })

        expect(updatedUser.name).toBe('William smith');
        expect(updatedUser.email).toBe('willsmith@gmail.com')
    });

    it('should not be able to show the profile of a non-existing user', async () => {

        expect(updateProfile.execute({
            user_id: 'non-existing user id',
            name: 'test name',
            email: 'test@test.com',
        })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to change another user's email", async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            old_password: '123456',
            password: '123123',
        })

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update the password without the correct old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            old_password: 'wrong password',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);
    });
})
