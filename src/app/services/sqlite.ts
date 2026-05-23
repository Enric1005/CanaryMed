import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  async init() {
    this.db = await this.sqlite.createConnection('favoritosDB', false, 'no-encryption', 1, false);
    await this.db.open();
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS favoritos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT NOT NULL,
        item TEXT NOT NULL,
        UNIQUE(uid, item)
      );
    `);
  }

  async addFavorito(uid: string, item: string) {
    await this.db.run(`INSERT OR IGNORE INTO favoritos (uid, item) VALUES (?, ?)`, [uid, item]);
  }

  async removeFavorito(uid: string, item: string) {
    await this.db.run(`DELETE FROM favoritos WHERE uid = ? AND item = ?`, [uid, item]);
  }

  async getFavoritos(uid: string): Promise<string[]> {
    const result = await this.db.query(`SELECT item FROM favoritos WHERE uid = ?`, [uid]);
    return result.values?.map((r: any) => r.item) ?? [];
  }

  async isFavorito(uid: string, item: string): Promise<boolean> {
    const result = await this.db.query(`SELECT id FROM favoritos WHERE uid = ? AND item = ?`, [
      uid,
      item,
    ]);
    return (result.values?.length ?? 0) > 0;
  }
}
