/* eslint-disable no-unused-vars */
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import AdminController from './app/controllers/AdminController';
import ScheduleConfigController from './app/controllers/ScheduleConfigController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

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

// Admin Routes
routes.use(adminMiddleware);
routes.get('/admin/users', AdminController.index);
routes.post('/admin/users', AdminController.store);
routes.put('/admin/users/:id', AdminController.update);
routes.delete('/admin/users/:id', AdminController.destroy);

routes.get('/admin/schedule-config/:provider_id', ScheduleConfigController.index);
routes.post('/admin/schedule-config/:provider_id', ScheduleConfigController.store);
routes.put('/admin/schedule-config/:id', ScheduleConfigController.update);
routes.delete('/admin/schedule-config/:id', ScheduleConfigController.destroy);

export default routes;
