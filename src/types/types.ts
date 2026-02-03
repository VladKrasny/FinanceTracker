export type TransactionType = "income" | "expense";

export type TransactionTypeFilter = TransactionType | "All";

export type TransactionTypeOption = {
  value: TransactionType;
  label: string;
};

export type TransactionTypeFilterOption = {
  value: TransactionTypeFilter;
  label: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description: string;
};

export type NewEntry = Omit<Transaction, "id">;

export type CategoryOption = {
  value: string;
  label: string;
  type: TransactionType;
};

export type CategoryFilterOption = Pick<CategoryOption, "value" | "label">;
