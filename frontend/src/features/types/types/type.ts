/* backend format */
export interface Type {
  _id: string;
  name: string;
  slug: string;
  label: string;
  image: string;
  description: string;
}

export interface TypeNames {
  _id: string;
  name: string;
}


/* UI format */
export interface TypeForSelect {
  _id: string;
  name: string;
}

export interface TypeListResponse {
  items: TypeForSelect[];
}

