import Dexie, { Table } from 'dexie';

import { Note } from './models';

export class MyNoteDB extends Dexie {
  note!: Table<Note>;

  constructor() {
    super('MyNoteDB');
    this.version(1).stores({
      note: '&id, updatedAt',
    });
  }
}

export const db = new MyNoteDB();
