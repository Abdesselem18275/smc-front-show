import { Component, OnInit } from '@angular/core';
import { ProductShort } from 'src/app/product/model';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-favorites-profile',
  templateUrl: './favorites-profile.component.html',
  styleUrls: ['./favorites-profile.component.scss']
})
export class FavoritesProfileComponent implements OnInit {
  favorites: ProductShort[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserFavorites().subscribe(results => {
      this.favorites = results;
    });
  }

}
