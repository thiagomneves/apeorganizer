import {db} from './SQLite';
//id, titulo, valor total (pode pegar dos itens), quantidade de itens, data, archived

export function createTableShoppingLists() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'shoppinglists ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, created TEXT, archive BOOLEAN);',
      [],
      (sqlTxn, res) => {
        console.log('table shoppinglists created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}

export async function addShoppingList(shopppinglist) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO shoppinglists (title, color, created, archive) VALUES (?, ?, ?, ?);',
        [shopppinglist.title, shopppinglist.color, shopppinglist.created, shopppinglist.archive],
        (trans, results) => {
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
        'SELECT l.*, '+
        '(SELECT count(i.list_id) FROM shoppinglistitem i WHERE i.list_id = l.id ) as amount, ' +
        '(SELECT count(d.list_id) from shoppinglistitem d WHERE d.list_id = l.id  AND done = 1) as totaldone, ' +
        '(SELECT sum(v.estimatedprice) FROM shoppinglistitem v WHERE v.list_id = l.id) as estimated ' +
        'from shoppinglists l ' +
        'ORDER BY created;',
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
