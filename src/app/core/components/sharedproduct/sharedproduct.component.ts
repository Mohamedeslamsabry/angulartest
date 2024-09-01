import { NgClass } from '@angular/common';
import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../interfaces/iproduct';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-sharedproduct',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './sharedproduct.component.html',
  styleUrl: './sharedproduct.component.scss',
})
export class SharedproductComponent  {
  @Input() shareproduct!: Iproduct;

  


/*   share:InputSignal<Iproduct>= input.required()
 */
  private readonly _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  private _WishlistService = inject(WishlistService);
  private _Router = inject(Router);

  //!add to cart



  isloading:boolean=false;
  addproducttocart(id: string) {
    if(this.isloading) return;
    this.isloading=true;
    this._CartService.AddproductToCart(id).subscribe({
      next: (res) => {
        /* this._CartService.numberofcart.next(res.numOfCartItems); */
        this._CartService.numberofcart.set(res.numOfCartItems)
        this.isloading=false;
        this._ToastrService.success(res.message, '', {
          positionClass: 'toast-top-right',
        });
        this._Router.navigate(['/cart'])
      },
      error: (err) => {
       this.isloading=false;
        console.log(err);
      },
    });
  }




  colorIconId:[]=[];

  coloricon: boolean = false;
  
  //!add to wishlist
  addtowishlist(id: string) {
    this._WishlistService.AddproductToWishlist(id).subscribe({
      next: (res) => { 
        this.coloricon = true;
        this.colorIconId = res.data;
        this._ToastrService.success(res.message);
        this._Router.navigate(['/wishlist'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
 

}
