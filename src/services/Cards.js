import {db} from './SQLite';

export function createTable() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'cards ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, cardlimit FLOAT, spent FLOAT, flag TEXT);',
      [],
      (sqlTxn, res) => {
        console.log('table created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}

export async function addCard(card) {
  console.log(card, 'card')
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO cards (title, color, cardlimit, flag, spent) VALUES (?, ?, ?, ?, 0);',
        [card.title, card.color, card.cardLimit, card.flag],
        () => {
          resolve("Cartão adicionado com sucesso");
        },
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
        (transaction, result) => {
          resolve(result.rows._array);
        },
      );
    });
  });
}
