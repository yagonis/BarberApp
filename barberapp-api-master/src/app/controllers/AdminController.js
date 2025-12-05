import User from '../models/User';
import ScheduleConfig from '../models/ScheduleConfig';
import File from '../models/File';

class AdminController {
  // Listar todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'provider', 'admin', 'avatar_id'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  // Criar novo usuário
  async store(req, res) {
    try {
      const { name, email, password, provider, admin } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await User.create({
        name,
        email,
        password,
        provider: provider || false,
        admin: admin || false,
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        admin: user.admin,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  // Atualizar usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, provider, admin } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res.status(400).json({ error: 'Email já está em uso' });
        }
      }

      await user.update({
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
        provider: provider !== undefined ? provider : user.provider,
        admin: admin !== undefined ? admin : user.admin,
      });

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        admin: user.admin,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  // Deletar usuário
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();

      return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}

export default new AdminController();
