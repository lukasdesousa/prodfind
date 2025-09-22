import { UserServices } from '../services/UserServices.js';
import type { UserType } from '../types/user/UserTypes.js';

export class UserController {
    private userServices: UserServices;

    constructor() {
        this.userServices = new UserServices();
    }

    async createUser(data: UserType) {
        try {
            const { name, email, password } = data;

            if (!name || !email || !password) {
                throw new Error("All fields are required!")
            }

            return this.userServices.createUser({ name, email, password });
        } catch (err) {
           throw new Error(`Error: ${(err as Error).message}`)
        }
    }

    async loginUser(data: UserType) {
        try {
            const { email, password } = data;

             if (!email || !password) {
                throw new Error("All fields are required!")
            }

            return this.userServices.loginUser({ email, password });

        } catch(error) {

        }
    }
}