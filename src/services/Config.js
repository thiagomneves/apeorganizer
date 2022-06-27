import {db} from './SQLite';

export function createTableConfigs() {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'configs ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, configset TEXT);',
        [],
        (sqlTxn, res) => {
          resolve('table config created successfully');
        },
        error => {
          reject('error on creating table ' + error.message);
        },
      );
    });
  });
}

export async function getConfigs() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from configs;',
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

export async function getConfig(conf) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from configs WHERE title = ?;',
        [conf.title],
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

export async function addConfig(config) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO configs (title, configset) VALUES (?, ?);',
        [config.title, config.configset],
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

export async function editConfig(config) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE configs SET configset = ? WHERE title = ?;',
        [config.configset, config.title],
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
