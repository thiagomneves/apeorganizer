import {db} from './SQLite';

export function createTableAccounts() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'accounts ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, balance FLOAT, sumtotal BOOLEAN, archive BOOLEAN);',
      [],
      (sqlTxn, res) => {
        console.log('table accounts created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}

export async function addAccount(account) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO accounts (title, color, balance) VALUES (?, ?, ?);',
        [account.title, account.color, account.balance],
        (trans, results) => {
          resolve("Conta adicionada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getAccounts() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from accounts;',
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

export async function getTotalBalance() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT SUM(balance) as balance from accounts;',
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

export async function editAccount(account) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE accounts SET title = ?, color = ?, balance = ? WHERE id = ?;',
        [account.title, account.color, account.balance, account.id],
        (trans, results) => {
          resolve("Conta atualizada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function removeAccount(account) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'DELETE FROM accounts WHERE id = ?;',
        [account.id],
        (trans, results) => {
          resolve("Conta removida com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}
