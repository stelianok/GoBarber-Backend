import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
        );

    })
    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        })
        const appointment = await createAppointment.execute({
            date: new Date(2021, 4, 10, 12),
            user_id: '123456',
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('should not be able to create a new appointment at the same time', async () => {
        const appointmentDate = new Date(2021, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123456',
            provider_id: '123123123',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '123456',
                provider_id: '123123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '123456',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create an appointment with the same as the provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '123123',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                user_id: 'user-id',
                provider_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                user_id: 'user-id',
                provider_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);

    });
})
