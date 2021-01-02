import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the hour availability from providers', async () => {
        await fakeAppointmentsRepository.create({
            user_id: 'user',
            provider_id: 'user_id',
            date: new Date(2020, 4, 20, 8, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            provider_id: 'user_id',
            date: new Date(2020, 4, 20, 14, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            user_id: 'user',
            provider_id: 'user_id',
            date: new Date(2020, 4, 20, 15, 0, 0)
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user_id',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
        ]))
    });

});
