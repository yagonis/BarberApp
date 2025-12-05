import ScheduleConfig from '../models/ScheduleConfig';

class ScheduleConfigController {
  // Listar horários de um provider
  async index(req, res) {
    try {
      const { provider_id } = req.params;

      const schedules = await ScheduleConfig.findAll({
        where: { provider_id },
        order: ['day_of_week'],
      });

      return res.json(schedules);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar horários' });
    }
  }

  // Criar/Atualizar horários
  async store(req, res) {
    try {
      const { provider_id } = req.params;
      const { schedules } = req.body; // Array de objetos com dia, horário inicio, fim

      if (!Array.isArray(schedules)) {
        return res.status(400).json({ error: 'Schedules deve ser um array' });
      }

      // Deletar horários antigos
      await ScheduleConfig.destroy({
        where: { provider_id },
      });

      // Criar novos horários
      const newSchedules = await Promise.all(
        schedules.map(schedule =>
          ScheduleConfig.create({
            provider_id,
            day_of_week: schedule.day_of_week,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            is_open: schedule.is_open !== false,
          })
        )
      );

      return res.status(201).json(newSchedules);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar horários' });
    }
  }

  // Atualizar um horário específico
  async update(req, res) {
    try {
      const { id } = req.params;
      const { start_time, end_time, is_open } = req.body;

      const schedule = await ScheduleConfig.findByPk(id);

      if (!schedule) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }

      await schedule.update({
        start_time: start_time || schedule.start_time,
        end_time: end_time || schedule.end_time,
        is_open: is_open !== undefined ? is_open : schedule.is_open,
      });

      return res.json(schedule);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar horário' });
    }
  }

  // Deletar um horário
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const schedule = await ScheduleConfig.findByPk(id);

      if (!schedule) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }

      await schedule.destroy();

      return res.json({ message: 'Horário deletado com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar horário' });
    }
  }
}

export default new ScheduleConfigController();
