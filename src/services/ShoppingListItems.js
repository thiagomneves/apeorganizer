import {db} from './SQLite';
//nome not null, preço estimado, list_id, preço pago

export function createTableShoppingListItem() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'shoppinglistitem ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, list_id INTEGER, estimatedprice FLOAT, paidprice FLOAT, done BOOLEAN);',
      [],
      (sqlTxn, res) => {
        console.log('table shoppinglistitem created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}

export async function addShoppingListItem(shopppinglistitem) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO shoppinglistitem (title, list_id, estimatedprice, paidprice, done) VALUES (?, ?, ?, ?, ?);',
        [shopppinglistitem.title, shopppinglistitem.list_id, shopppinglistitem.estimatedprice, shopppinglistitem.paidprice, shopppinglistitem.done],
        (trans, results) => {
          console.log(results)
          resolve("Lista de Compras adicionada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getShoppingLists() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from shoppinglistitem;',
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

export async function getShoppingListItems(id) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from shoppinglistitem WHERE list_id = ?;',
        [id],
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

export async function checkShoppingListItem(item) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE shoppinglistitem SET done = ? WHERE id = ?;',
        [item.done, item.id],
        (trans, results) => {
          resolve("Cartão atualizado com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function editShoppingListItem(item) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE shoppinglistitem SET title = ?, estimatedprice = ? WHERE id = ?;',
        [item.title, item.estimatedprice, item.id],
        (trans, results) => {
          resolve("Cartão atualizado com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}
