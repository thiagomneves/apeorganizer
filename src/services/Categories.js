import {db} from './SQLite';

export function createTableCategories() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'categories ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, color TEXT, type TEXT);',
      [],
      (sqlTxn, res) => {
        console.log('table categories created successfully');
      },
      error => {
        console.log('error on creating table ' + error.message);
      },
    );
  });
}

export async function addCategory(category) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO categories (title, color, type) VALUES (?, ?, ?);',
        [category.title, category.color, category.type],
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

export async function getCategories() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from categories;',
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

export async function getCategoriesByType(category) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from categories WHERE type = ?;',
        [category.type],
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

export async function getExpenseCategoriesWithoutBudget() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT c.* from categories c ' +
        'LEFT JOIN budgets b ON c.id = b.category ' +
         'WHERE c.type = "expense" ' + 
         'AND b.category IS NULL;',
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

export async function editCategory(category) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE categories SET title = ?, color = ?, type = ? WHERE id = ?;',
        [category.title, category.color, category.type, category.id],
        (trans, results) => {
          resolve("Categoria atualizada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  })
}

export async function removeCategory(category) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'DELETE from categories WHERE id = ?;',
        [category.id],
        (trans, results) => {
          resolve("Categoria excluída com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  })
}

