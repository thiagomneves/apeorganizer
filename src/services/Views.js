import {db} from './SQLite';

export async function createViewPaymentMeans() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'CREATE VIEW paymentmeans ' +
        'AS ' +
        '  SELECT id, title, ' +
        '          "account" AS paymentmean ' +
        '   FROM   accounts ' +
        '   UNION ' +
        '   SELECT id, title, ' +
        '          "voucher" AS paymentmean ' +
        '   FROM   vouchers ' +
        '   UNION ' +
        '   SELECT id, title, ' +
        '          "creditcard" AS paymentmean ' +
        '   FROM   cards;',
        [],
        (trans, results) => {
          resolve('view paymentmeans created successfully');
        },
        (error) => {
          console.log(error)
          reject('error on creating view ' + error.message);
        }
      );
    });
  });
}
