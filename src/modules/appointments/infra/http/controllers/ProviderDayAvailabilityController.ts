import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService.ts';

export default class ProviderDayAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { provider_id, day, month, year } = request.body;
        const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

        const availability = await listProviderDayAvailability.execute({
            provider_id,
            day,
            month,
            year
        });

        return response.json(availability);

    }
}