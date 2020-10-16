import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../errors/AppError';
 interface RequestDTO {
     provider_id: string;
     date: Date;
 }

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository;

    public async execute({ date, provider_id }: RequestDTO): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if(findAppointmentsInSameDate){
            throw new AppError('This appointment is already booked');
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date:  appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
