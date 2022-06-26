import {db} from './SQLite';

export function createTableVouchers() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'vouchers ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, balance FLOAT, sumtotal BOOLEAN, archive BOOLEAN, type TEXT, flag TEXT);',
      [],
      (sqlTxn, res) => {
        console.log('table vouchers created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}
