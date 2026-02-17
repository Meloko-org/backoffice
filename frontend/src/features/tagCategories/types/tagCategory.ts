export interface TagCategory {
  _id: string;
  name: string;
  description: string;
  color: string;
}

export interface TagCategoryNames {
  _id: string;
  name: string;
  color: string;
}

export interface TagCategoryForCheckbox {
  _id: string;
  name: string;
  description: string;
  color: string;
}

export interface TagCategoryListResponse {
  items: TagCategoryForCheckbox[];
}