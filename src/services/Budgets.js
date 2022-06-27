import {db} from './SQLite';

export function createTableBudgets() {
  return new Promise(resolve => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'budgets ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, category INTEGER, value FLOAT);',
        [],
        (sqlTxn, res) => {
          resolve('table budgets created successfully');
        },
        error => {
          reject('error on creating table ' + error.message);
        },
      );
    });
  });
}

export async function addBudget(budget) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO budgets (category, value) VALUES (?, ?);',
        [budget.category, budget.value],
        (trans, results) => {
          resolve("Orçamento adicionada com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  });
}

export async function getBudgets() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * from budgets b ' +
        'INNER JOIN categories c ON b.category = c.id;',
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

export async function editBudget(budget) {
  console.log(budget)
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE budgets SET value = ? WHERE id = ?;',
        [budget.value, budget.id],
        (trans, results) => {
          resolve("Orçamento atualizado com sucesso");
        },
        (error) => {
          reject(error)
        }
      );
    });
  })
}

export async function removeBudget(budget) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'DELETE from budgets WHERE id = ?;',
        [budget.id],
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

