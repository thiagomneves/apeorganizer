import {db} from './SQLite';

export function createTableCards() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'cards ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, cardlimit FLOAT, spent FLOAT, flag TEXT, closureday INTEGER, dueday INTEGER, archive BOOLEAN);',
      [],
      (sqlTxn, res) => {
        console.log('table cards created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}

export async function addCard(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO cards (title, color, cardlimit, flag, spent) VALUES (?, ?, ?, ?, 0);',
        [card.title, card.color, card.cardLimit, card.flag],
        (trans, results) => {
          resolve("Cartão adicionado com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getCards() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from cards;',
        [],
        (trans, results) => {
          resolve(results.rows.raw());
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function editCard(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE cards SET title = ?, color = ?, cardlimit = ?, flag = ? WHERE id = ?;',
        [card.title, card.color, card.cardLimit, card.flag, card.id],
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

export async function removeCard(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'DELETE FROM cards WHERE id = ?;',
        [card.id],
        (trans, results) => {
          resolve("Cartão removido com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}
