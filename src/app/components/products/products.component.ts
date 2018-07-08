import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service'
import { Product } from './models/product'
import {ServiceService} from "@app/components/products/services/service.service";
import {Service} from "@app/components/products/models/service";

@Component({
  selector: 'anms-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  services: Service[];
  constructor(private productService: ProductService, private serviceService: ServiceService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
    });

    this.serviceService.getServices().subscribe(data => {
      this.services = data.data;
    })
  }

}
