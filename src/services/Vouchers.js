import {db} from './SQLite';

export function createTableVouchers() {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'vouchers ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, balance FLOAT, sumtotal BOOLEAN, archive BOOLEAN, type TEXT, flag TEXT);',
        [],
        (sqlTxn, res) => {
          resolve('table vouchers created successfully');
        },
        error => {
          reject('error on creating table ' + error.message);
        },
      );
    });
  });
}

export async function addVoucher(voucher) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO vouchers (title, color, balance, sumtotal, type, flag, archive) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [voucher.title, voucher.color, voucher.balance, voucher.sumtotal, voucher.type, voucher.flag, voucher.archive],
        (trans, results) => {
          resolve("Voucher adicionado com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getVouchers() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from vouchers;',
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

export async function getVoucher(voucher) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from vouchers WHERE id = ?;',
        [voucher.id],
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

export async function getVouchersByArchive(archive) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from vouchers WHERE archive = ?;',
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

export async function getVoucherTotalBalance() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT SUM(balance) as balance from vouchers WHERE archive = 0 AND sumtotal = 1;',
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

export async function setArchiveVoucher(voucher) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE vouchers SET archive = ? WHERE id = ?;',
        [voucher.archive, voucher.id],
        (trans, results) => {
          resolve("Voucher atualizado com sucesso");
        },
        (error) => {
          console.log(error)
          reject(error)
        }
      );
    });
  });
}

export async function editVoucher(voucher) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE vouchers SET title = ?, color = ?, balance = ?, sumtotal = ?, type = ?, flag = ? WHERE id = ?;',
        [voucher.title, voucher.color, voucher.balance, voucher.sumtotal, voucher.type, voucher.flag, voucher.id],
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

export async function removeVoucher(voucher) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'DELETE FROM vouchers WHERE id = ?;',
        [voucher.id],
        (trans, results) => {
          resolve("Voucher removido com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}
