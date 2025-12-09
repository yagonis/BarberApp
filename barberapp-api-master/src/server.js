import app from './app.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Run migrations on startup in production
async function runMigrations() {
  if (process.env.NODE_ENV === 'production') {
    try {
      console.log('🔄 Running database migrations...');
      const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate');
      console.log('✅ Migrations completed successfully!');
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    } catch (error) {
      console.error('⚠️ Migration error (this is OK if tables already exist):', error.message);
    }
  }
}

const PORT = process.env.PORT || 3003;

runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}!`);
  });
});
