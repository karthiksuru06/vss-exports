const express = require('express');
const cors = require('cors');
const path = require('path');
const { loginUser, submitInquiry } = require('../api/lib/handlers');
const { createSqliteStore, openDatabase, initializeDb } = require('./sqliteStore');

const PORT = process.env.PORT || 5000;
const dbPath = path.resolve(__dirname, 'vss.db');

async function start() {
  const db = await openDatabase(dbPath);
  await initializeDb(db);
  const store = createSqliteStore(db);

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api', (_req, res) => {
    res.json({ message: 'VV Marine API is running (local SQLite)' });
  });

  app.post('/api/login', async (req, res) => {
    try {
      const result = await loginUser(store, req.body);
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error('login error', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  app.post('/api/inquire', async (req, res) => {
    try {
      const result = await submitInquiry(store, req.body);
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error('inquire error', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`VV Marine backend: http://localhost:${PORT}`);
    console.log(`SQLite database: ${dbPath}`);
  });
}

start().catch((err) => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});
