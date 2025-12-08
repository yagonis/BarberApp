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
        try {
            this.connection = new Sequelize(DatabaseConfig);

            models
                .map(model => model.init(this.connection))
                .map(
                    model =>
                        model.associate && model.associate(this.connection.models)
                );
            
            console.log('✅ PostgreSQL connected successfully');
        } catch (error) {
            console.warn('⚠️ PostgreSQL connection failed:', error.message);
            console.warn('⚠️ Database features will be unavailable');
        }
    }

    mongo() {
        try {
            if (!process.env.MONGO_URL) {
                console.warn('⚠️ MONGO_URL not configured');
                return;
            }
            
            this.mongoConnection = mongoose.connect(
                process.env.MONGO_URL,
                {
                    useNewUrlParser: true,
                    useFindAndModify: true,
                    useUnifiedTopology: true,
                }
            );
            
            mongoose.connection.on('connected', () => {
                console.log('✅ MongoDB connected successfully');
            });
            
            mongoose.connection.on('error', (err) => {
                console.warn('⚠️ MongoDB connection error:', err.message);
            });
        } catch (error) {
            console.warn('⚠️ MongoDB connection failed:', error.message);
            console.warn('⚠️ Notification features will be unavailable');
        }
    }
}

export default new Database();
