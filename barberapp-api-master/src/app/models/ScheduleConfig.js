import Sequelize, { Model } from 'sequelize';

class ScheduleConfig extends Model {
  static init(sequelize) {
    super.init(
      {
        day_of_week: Sequelize.INTEGER, // 0-6 (seg-dom)
        start_time: Sequelize.TIME,
        end_time: Sequelize.TIME,
        is_open: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default ScheduleConfig;
