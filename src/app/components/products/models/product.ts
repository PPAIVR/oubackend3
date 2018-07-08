export interface ProductResponse {
  data: Product[];
}

export interface Product {

  id: number;
  points: number;
  images:ProductImage[];
  description:string;
  name: string;
  lang: ProductLang;

}

export interface ProductImage {
  url:string;
  product_id:number;
}

export interface ProductLang {
  name:string;
  description:string;
}
