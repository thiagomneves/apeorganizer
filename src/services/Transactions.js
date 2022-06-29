import {db} from './SQLite';

export function createTableTransactions() {
  
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS transactions ( ' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'transaction_from INTEGER, ' +
          'transaction_to INTEGER, ' +
          'transaction_date TEXT, ' +
          'transaction_value FLOAT, ' +
          'type_from TEXT, ' +
          'type_to TEXT, ' +
          'observation TEXT, ' +
          'finished BOOLEAN, ' +
          'repeat BOOLEAN, ' +
          'repetitions INTEGER, ' +
          'frequency TEXT, ' +
          'category INTEGER, ' +
          'description TEXT, ' +
          'attachment TEXT, ' +
          'paymentmean TEXT, ' +
          'created TEXT, ' +
          'updated TEXT ' +
        ');',
        [],
        (sqlTxn, res) => {
          resolve('table transactions created successfully');
        },
        error => {
          reject('error on creating table ' + error.message);
        },
      );
    });
  });
}

export async function addTransaction(transaction) {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO transactions (transaction_from, type_from, transaction_to, type_to, transaction_date, observation, transaction_value, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [transaction.transaction_from, transaction.type_from, transaction.transaction_to, transaction.type_to, transaction.transaction_date, transaction.observation, transaction.transaction_value, transaction.created, transaction.updated],
        (sqlTxn, results) => {
          resolve("Transação adicionada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getTransactions() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * FROM transactions; ',
        [],
        (trans, results) => {
          resolve(results.rows.raw());
        },
        (error) => {
          console.log(error)
          reject(error)
        }
      );
    });
  });
}
export async function editTransaction(transaction) {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE transactions SET accountfrom = ?, accountto = ?, date = ?, obs = ?, value = ?, type = ? WHERE id = ?;',
        [transaction.accountFrom, transaction.accountTo, transaction.date, transaction.obs, transaction.value, transaction.type, transaction.id],
        (sqlTxn, results) => {
          resolve("Transação adicionada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}
export async function removeTransaction(transaction) {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM transactions WHERE id = ?;',
        [transaction.id],
        (txn, results) => {
          resolve("Conta removida com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

