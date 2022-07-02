import { createTableAccounts } from '../services/Accounts';
import { createTableBudgets } from '../services/Budgets';
import { createTableCards } from '../services/Cards';
import { createTableCategories } from '../services/Categories';
import { createTableTransactions } from '../services/Transactions';
import { createTableVouchers } from '../services/Vouchers';
import { createTableShoppingLists } from '../services/ShoppingLists';
import { createTableShoppingListItem } from '../services/ShoppingListItems';
import { createTableConfigs, addConfig, editConfig, getConfig, getConfigs } from "../services/Config";

import { initialCategories, inititalAccounts } from "../services/InitialData";
import { createTableReminders } from '../services/Reminders';
import { createViewPaymentMeans } from '../services/Views';

export async function configTheme(theme) {
  const config = {
    title: 'theme',
    configset: theme
  }
  const alreadySaved = await getConfig(config);
  if (alreadySaved.length) {
    await editConfig(config)
  } else {
    await addConfig(config)
  }
}

export async function configureEverything() {
  await createTableConfigs();
  const configurations = await getConfigs();
  await createAllTables(configurations);
  await createAllViews(configurations);

  await initialData(configurations);
}

async function initialData(configurations) {
  const initialaccounts = configurations.filter(item => item.title === 'initialaccounts')
  if (!initialaccounts.length) {
    let result = await inititalAccounts();
    if (result === true) {
      await addConfig({title: 'initialaccounts', configset: true})
    }
  }

  const initialcategories = configurations.filter(item => item.title === 'initialcategories')
  if (!initialcategories.length) {
    let result = await initialCategories();
    if (result === true) {
      await addConfig({title: 'initialcategories', configset: true})
    }
  }
}

async function createAllViews(configurations) {
  const viewpaymentMeans = configurations.filter(item => item.title === 'viewpaymentMeans')
  if (!viewpaymentMeans.length) {
    let result = await createViewPaymentMeans();
    if (result === 'view paymentmeans created successfully') {
      await addConfig({title: 'viewpaymentMeans', configset: true})
    }
  }
}

async function createAllTables(configurations) {

  const tableaccounts = configurations.filter(item => item.title === 'tableaccounts')
  if (!tableaccounts.length) {
    let result = await createTableAccounts()
    if (result === 'table accounts created successfully') {
      await addConfig({title: 'tableaccounts', configset: true})
    }
  }

  const tableacards = configurations.filter(item => item.title === 'tableacards')
  if (!tableacards.length) {
    let result = await createTableCards()
    if (result === 'table cards created successfully') {
      await addConfig({title: 'tableacards', configset: true})
    }
  }

  const tablecategories = configurations.filter(item => item.title === 'tablecategories')
  if (!tablecategories.length) {
    let result = await createTableCategories()
    if (result === 'table categories created successfully') {
      await addConfig({title: 'tablecategories', configset: true})
    }
  }

  const tabletransactions = configurations.filter(item => item.title === 'tabletransactions')
  if (!tabletransactions.length) {
    let result = await createTableTransactions()
    if (result === 'table transactions created successfully') {
      await addConfig({title: 'tabletransactions', configset: true})
    }
  }

  const tablebudgets = configurations.filter(item => item.title === 'tablebudgets')
  if (!tablebudgets.length) {
    let result = await createTableBudgets()
    if (result === 'table budgets created successfully') {
      await addConfig({title: 'tablebudgets', configset: true})
    }
  }

  const tablevouchers = configurations.filter(item => item.title === 'tablevouchers')
  if (!tablevouchers.length) {
    let result = await createTableVouchers()
    if (result === 'table vouchers created successfully') {
      await addConfig({title: 'tablevouchers', configset: true})
    }
  }

  const tableshoppinglists = configurations.filter(item => item.title === 'tableshoppinglists')
  if (!tableshoppinglists.length) {
    let result = await createTableShoppingLists()
    if (result === 'table shoppinglists created successfully') {
      await addConfig({title: 'tableshoppinglists', configset: true})
    }
  }

  const tableshoppinglistsitem = configurations.filter(item => item.title === 'tableshoppinglistsitem')
  if (!tableshoppinglistsitem.length) {
    let result = await createTableShoppingListItem()
    if (result === 'table shoppinglistitem created successfully') {
      await addConfig({title: 'tableshoppinglistsitem', configset: true})
    }
  }

  const tablereminders = configurations.filter(item => item.title === 'tablereminders')
  if (!tablereminders.length) {
    let result = await createTableReminders()
    if (result === 'table tablereminders created successfully') {
      await addConfig({title: 'tablereminders', configset: true})
    }
  }
}
