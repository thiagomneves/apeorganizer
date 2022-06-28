import {db} from './SQLite';

export function createTableReminders() {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS reminders ( ' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'title TEXT, ' +
          'reminder_date TEXT ' +
        ');',
        [],
        (sqlTxn, res) => {
          resolve('table reminders created successfully');
        },
        error => {
          reject('error on creating table ' + error.message);
        },
      );
    });
  });
}
