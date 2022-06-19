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
        'INSERT INTO accounts (title, color, balance, sumtotal, archive) VALUES (?, ?, ?, ?, ?);',
        [account.title, account.color, account.balance, account.sumtotal, account.archive],
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

export async function getAccount(account) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from accounts WHERE id = ?;',
        [account.id],
        (trans, results) => {
          resolve(results.rows.raw()[0]);
        },
        (error) => {
          console.log(error)
          reject(error)
        }
      );
    });
  });
}

export async function getAccountsByArchive(archive) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from accounts WHERE archive = ?;',
        [archive],
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
        'SELECT SUM(balance) as balance from accounts WHERE archive = 0 AND sumtotal = 1;',
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
        'UPDATE accounts SET title = ?, color = ?, balance = ?, sumtotal = ? WHERE id = ?;',
        [account.title, account.color, account.balance, account.sumtotal, account.id],
        (trans, results) => {
          console.log(account)
          resolve("Conta atualizada com sucesso");
        },
        (error) => {
          console.log(error)
          reject(error)
        }
      );
    });
  });
}

export async function setArchiveAccount(account) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE accounts SET archive = ? WHERE id = ?;',
        [account.archive, account.id],
        (trans, results) => {
          resolve("Conta atualizada com sucesso");
        },
        (error) => {
          console.log(error)
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
