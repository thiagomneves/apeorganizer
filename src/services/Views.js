import {db} from './SQLite';

export async function createViewPaymentMeans() {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'CREATE VIEW paymentmeans ' +
        'AS ' +
        '  SELECT *, ' +
        '          "account" AS paymentmean ' +
        '   FROM   accounts ' +
        '   UNION ' +
        '   SELECT *, ' +
        '          "voucher" AS paymentmean ' +
        '   FROM   vouchers;',
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
