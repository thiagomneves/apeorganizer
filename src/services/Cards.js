import {db} from './SQLite';

export function createTable() {
  db.transaction(txn => {
    txn.executeSql(
      // 'DROP TABLE cards;' +
      'CREATE TABLE IF NOT EXISTS ' +
        'cards ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, cardlimit FLOAT, spent FLOAT, flag TEXT, closureday INTEGER, dueday INTEGER);',
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

/*
// ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
//   db.transaction((trans) => {
//     trans.executeSql(sql, params, (trans, results) => {
//       resolve(results);
//     },
//       (error) => {
//         reject(error);
//       });
//   });
// });
export async function getCards() {
  return new Promise((resulve, reject) => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * from cards;',
      [],
      (sqlTxn, res) => {
        console.log(sqlTxn, res)
        // console.log('passou por aqui #001');
      },
      error => {
        console.log('passou por aqui #002 ' + error.message);
      },)
    })
  })
  ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    // console.log('porra')
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

  // async SelectQuery(){
    let selectQuery = await this.ExecuteQuery("SELECT * FROM users",[]);
    var rows = selectQuery.rows;
    for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        console.log(item);
    }
  // }


  console.log('getCards hue')
  // return new Promise(resolve => {
  //   db.transaction(transaction => {
  //     transaction.executeSql(
  //       'SELECT * from cards;',
  //       [],
  //       (transaction, result) => {
  //         resolve(result.rows._array);
  //       },
  //     );
  //   });
  // });
  return "huehuehue"
}
*/
