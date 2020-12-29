import { Request, Response } from "express";
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {

    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = showProfile.execute({ user_id });

        return response.json(user);
    }
    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;
        const updateUserProfile = container.resolve(UpdateProfileService);
        const updatedUser = await updateUserProfile.execute({
            user_id: user_id,
            name,
            email,
            old_password,
            password,
        });
        return response.json(updatedUser);
    }

}
