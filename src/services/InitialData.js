import { addAccount } from "./Accounts";
import { addCategory } from "./Categories";

export function inititalAccounts() {
  let accounts = [
    {"title": "Carteira", "color": "#070", "balance": 0, "sumtotal": 1, "type": "wallet", "archive": 0,},
  ]
  try {
    accounts.forEach(account => addAccount(account));    
    return true;
  } catch (error) {
    return error;
  }

}

export function initialCategories() {
  let categories = [
    {title: "Alimentação", color: "#E74C3C", type: "expense"},
    {title: "Educação", color: "#27AE60", type: "expense"},
    {title: "Lazer", color: "#1ABC9C", type: "expense"},
    {title: "Moradia", color: "#9B59B6", type: "expense"},
    {title: "Pagamentos", color: "#212121", type: "expense"},
    {title: "Roupas", color: "#3498DB", type: "expense"},
    {title: "Saúde", color: "#EC407A", type: "expense"},
    {title: "Transporte", color: "#F1C40F", type: "expense"},
    
    {title: "Investimentos", color: "#0669CC", type: "revenue"},
    {title: "Outros", color: "#621E6B", type: "revenue"},
    {title: "Presentes", color: "#20BCC9", type: "revenue"},
    {title: "Salário", color: "#27AE60", type: "revenue"},
  ];

  try {
    categories.forEach(category => addCategory(category));
    return true;
  } catch (error) {
    return error;
  }
}

