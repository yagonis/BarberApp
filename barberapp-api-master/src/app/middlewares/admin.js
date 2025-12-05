import User from '../models/User';

export default async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user || !user.admin) {
      return res.status(403).json({ error: 'Acesso negado. Apenas admins podem acessar.' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao verificar permissões' });
  }
};
