import { addCategory } from "./Categories";

function initialData() {
  initialCategories();
}

function initialCategories() {
  let categories = [
    {title: "Alimentação", color: "#E74C3C", type: "revenue"},
    {title: "Educação", color: "#27AE60", type: "revenue"},
    {title: "Lazer", color: "#1ABC9C", type: "revenue"},
    {title: "Moradia", color: "#9B59B6", type: "revenue"},
    {title: "Pagamentos", color: "#212121", type: "revenue"},
    {title: "Roupas", color: "#3498DB", type: "revenue"},
    {title: "Saúde", color: "#EC407A", type: "revenue"},
    {title: "Transporte", color: "#F1C40F", type: "revenue"},
    {title: "Investimentos", color: "#0669CC", type: "expense"},
    {title: "Outros", color: "#621E6B", type: "expense"},
    {title: "Presentes", color: "#20BCC9", type: "expense"},
    {title: "Salário", color: "#27AE60", type: "expense"},
  ];

  categories.forEach(category => addCategory(category));
}

