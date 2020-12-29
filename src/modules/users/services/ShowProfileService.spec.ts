import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(
            fakeUsersRepository,
        );
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Will Smith',
            email: 'willSmithOficial@gmail.com',
            password: '123456',
        })

        const profile = await showProfile.execute({ user_id: user.id })

        expect(profile.name).toBe('Will Smith');
        expect(profile.email).toBe('willSmithOficial@gmail.com')
    });


    it('should not be able to show the profile of a non-existing user', async () => {

        expect(showProfile.execute({ user_id: 'non-existing user id' })
        ).rejects.toBeInstanceOf(AppError);
    });
});
