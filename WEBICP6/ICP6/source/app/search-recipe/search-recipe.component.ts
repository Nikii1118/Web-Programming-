import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  recipeApi = 'https://api.edamam.com/search?q=';
  recipeAppid = '&app_id=6773f105';
  recipeKey = '&app_key=8e37233f8d98c932c733705fbba209a3';

  placesApi = 'https://api.foursquare.com/v2/venues/search?';
  clientId = 'client_id=IYV1WHEPVU5RRTXNFJ2ELCRS34LF4ELY4YUTIQ3JV3EXWDE';
  clientSecret = '&client_secret=STJXHE5ZKPFHOKVQDDQLBOJ10AR2VV3DWYQ152QWTNNWTXB&';
  query = '&query=restaurant';

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      this._http.get(this.recipeApi + this.recipeValue + this.recipeAppid + this.recipeKey).subscribe((res: any) => {
        console.log(res.hits);
        this.recipeList = Object.keys(res.hits).map(function (k) {
          const i = res.hits[k].recipe;
          return {name: i.label, icon: i.image, url: i.url}
        });
      });


    }
    if (this.placeValue != null && this.placeValue !== '' ) {
      this._http.get('https://api.foursquare.com/v2/venues/search?client_id=VIYV1WHEPVU5RRTXNFJ2ELCRS34LF4ELY4YUTIQ3JV3EXWDE&client_secret=STJXHE5ZKPFHOKVQDDQLBOJ10AR2VV3DWYQ152QWTNNWTXBH&v=20190926&near='+ this.placeValue + '&query=restaurant')
        .subscribe(respRestuarant=> {
          this.venueList = respRestuarant['response']['venues'];
        }, error => {});
        }
    }
  }




