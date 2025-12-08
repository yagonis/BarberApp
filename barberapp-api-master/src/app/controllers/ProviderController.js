/* eslint-disable no-unused-vars */
import User from '../models/User.js';
import File from '../models/File.js';

class ProviderController {
    async index(req, res) {
        const providers = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            ],
        });

        return res.json(providers);
    }
}

export default new ProviderController();
