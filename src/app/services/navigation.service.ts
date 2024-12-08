import { Injectable } from '@angular/core';
import { Pages } from '../models/pages';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }
  public setActivepage(page: Pages) {
    this.router.navigate([page]);
  }

}
