import {db} from './SQLite';

export function createTableCards() {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'cards ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, cardlimit FLOAT, ' +
          'spent FLOAT, flag TEXT, closureday INTEGER, dueday INTEGER, archive BOOLEAN,' + 
          'holdername TEXT, cardnumber TEXT, expirationdate TEXT, cvv TEXT, type TEXT); ',
        [],
        (sqlTxn, res) => {
          resolve('table cards created successfully');
        },
        error => {
          reject('error on creating table ' + error.message);
        },
      );
    });
  });
}

export async function addCard(card) {
    return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO cards (title, color, cardlimit, flag, spent, closureday, dueday, holdername, cardnumber, expirationdate, cvv, archive, type) VALUES (?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?);',
        [card.title, card.color, card.cardLimit, card.flag, card.closureDay, card.dueDate, card.holdername, card.cardNumber, card.expirationDate, card.cvv, card.archive, card.type],
        (trans, results) => {
          console.log(results)
          resolve("Cartão adicionado com sucesso");
        },
        (error) => {
          console.log(error)
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
        'SELECT * from cards WHERE type = "credit-card";',
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

export async function getCard(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from cards WHERE id = ?;',
        [card.id],
        (trans, results) => {
          resolve(results.rows.raw()[0]);
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getCardsByArchive(archive) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from cards WHERE type = "credit-card" AND archive = ?;',
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

export async function editCard(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE cards SET title = ?, color = ?, cardlimit = ?, flag = ?, closureday = ?, dueday = ?, holdername = ?, cardnumber = ?, expirationdate = ?, cvv = ? WHERE id = ?;',
        [card.title, card.color, card.cardLimit, card.flag, card.closureDay, card.dueDay, card.holdername, card.cardNumber, card.expirationDate, card.cvv, card.id],
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

export async function editCardSpent(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE cards SET spent = ? WHERE id = ?;',
        [card.spent, card.id],
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


export async function setArchiveCard(card) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE cards SET archive = ? WHERE id = ?;',
        [card.archive, card.id],
        (trans, results) => {
          resolve("Cartão atualizado com sucesso");
        },
        (error) => {
          console.log(error)
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
