import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


import { inject, injectable } from 'tsyringe';
interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfilService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }
    public async execute({ user_id, name, old_password, password, email }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdateEmail = await this.usersRepository.findByEmail(email);
        if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
            throw new AppError('E-mail already in use');
        }
        user.name = name;
        user.email = email;
        if (password && !old_password) {
            throw new AppError('You need to inform the old password to set a new one');
        }


        if (password && old_password) {

            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );
            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }
            user.password = await this.hashProvider.generateHash(password);
        }
        return this.usersRepository.save(user);

    }
}
export default UpdateProfilService;
