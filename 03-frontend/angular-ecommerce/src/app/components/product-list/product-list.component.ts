import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] | undefined;
  currentCategoryId: number | undefined;
  searchMode:boolean | undefined;

  constructor(private productListService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
    this.listProducts();
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
    }
    
  }
  handleSearchProducts() {
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;

    this.productListService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;
      }
    )
  }

  handleListProducts(){
    //check if 'id' parameter is available
    const hasCategoryId : boolean= this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the id param string, convert string to a number using the '+' symbol

      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId = 1;
    }
    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.products = data;
      }
    )

  }

}
