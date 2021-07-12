import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      // Define the where criteria to search
      where: { provider: true },
      // Define the attributes that should be returned inside the response
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // To make a join with the File model
      include: [
        {
          model: File,
          // Alias for the File model to return
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(providers);
  }
}

export default new ProviderController();
