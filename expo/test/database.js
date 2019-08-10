import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('db');

export default db;