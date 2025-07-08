import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const events = [
  {
    title: 'Team Building Retreat',
    date_time: '2025-08-15 09:00:00',
    location: 'Cedars Nature Reserve',
    description: 'A full-day outdoor retreat to enhance team collaboration and morale.',
    status: 'upcoming'
  },
  {
    title: 'Product Launch Event',
    date_time: '2025-07-25 18:30:00',
    location: 'Downtown Beirut Conference Hall',
    description: 'Official launch of our new mobile application with live demos and media coverage.',
    status: 'attending'
  },
  {
    title: 'Annual Performance Review',
    date_time: '2025-07-20 14:00:00',
    location: 'Main Office Meeting Room A',
    description: 'Review of employee performance and feedback from department heads.',
    status: 'maybe'
  },
  {
    title: 'Client Presentation',
    date_time: '2025-07-10 11:00:00',
    location: 'Zaitunay Bay Business Center',
    description: 'Presentation of our latest project deliverables to the client team.',
    status: 'declined'
  }
];



const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('events', events);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

