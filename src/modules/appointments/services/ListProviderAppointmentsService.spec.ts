import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointmentService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 4, 20, 14, 0, 0)
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 4, 20, 15, 0, 0)
        });

        const availability = await listProviderAppointments.execute({
            provider_id: 'provider',
            day: 20,
            month: 5,
            year: 2021,
        });

        expect(availability).toEqual([
            appointment1,
            appointment2,
        ])
    })


});
