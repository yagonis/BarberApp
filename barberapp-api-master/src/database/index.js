/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User.js';
import File from '../app/models/File.js';
import Appointment from '../app/models/Appointment.js';

import DatabaseConfig from '../config/database.js';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(DatabaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            }
        );
    }
}

export default new Database();
