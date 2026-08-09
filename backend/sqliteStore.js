const sqlite3 = require('sqlite3').verbose();

function createSqliteStore(db) {
  return {
    findUserByEmail(email) {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
          if (err) reject(err);
          else resolve(row || null);
        });
      });
    },

    createUser({ name, email, phone, company }) {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (name, email, phone, company) VALUES (?, ?, ?, ?)',
          [name, email, phone, company],
          function onInsert(err) {
            if (err) reject(err);
            else {
              resolve({
                id: this.lastID,
                name,
                email,
                phone,
                company,
              });
            }
          }
        );
      });
    },

    createInquiry({ user_id, name, email, message, type }) {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO inquiries (user_id, name, email, message, type) VALUES (?, ?, ?, ?, ?)',
          [user_id || null, name, email, message, type || 'general'],
          function onInsert(err) {
            if (err) reject(err);
            else {
              resolve({
                id: this.lastID,
                user_id: user_id || null,
                name,
                email,
                message,
                type: type || 'general',
              });
            }
          }
        );
      });
    },
  };
}

function openDatabase(dbPath) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
}

function initializeDb(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          phone TEXT,
          company TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (err) => {
          if (err) reject(err);
        }
      );
      db.run(
        `CREATE TABLE IF NOT EXISTS inquiries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          name TEXT,
          email TEXT,
          message TEXT,
          type TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  });
}

module.exports = { createSqliteStore, openDatabase, initializeDb };
