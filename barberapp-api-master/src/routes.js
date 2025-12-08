/* eslint-disable no-unused-vars */
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js';

import UserController from './app/controllers/UserController.js';
import ProviderController from './app/controllers/ProviderController.js';
import SessionController from './app/controllers/SessionController.js';
import FileController from './app/controllers/FileController.js';
import AppointmentController from './app/controllers/AppointmentController.js';
import ScheduleController from './app/controllers/ScheduleController.js';
import NotificationController from './app/controllers/NotificationController.js';
import AvailableController from './app/controllers/AvailableController.js';

import authMiddleware from './app/middlewares/auth.js';

const routes = new Router();
const upload = multer(multerConfig);

// Health check route
routes.get('/', (req, res) => {
  return res.json({ 
    message: 'BarberApp API is running 🚀',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        sessions: 'POST /sessions',
        register: 'POST /users'
      },
      authenticated: {
        users: 'PUT /users',
        providers: 'GET /providers',
        appointments: 'GET/POST/DELETE /appointments',
        schedule: 'GET /schedule',
        notifications: 'GET/PUT /notifications',
        files: 'POST /files'
      }
    }
  });
});

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
