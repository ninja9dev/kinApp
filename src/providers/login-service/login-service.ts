import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }

  signup(data){
  	return this.http.post('adduser', data).map((res)=>{
  	  return res.json();
  	});
  }

  login(data){
  	return this.http.post('loginuser', data).map((res)=>{
	    return res.json();
  	});
  }

  updateProfile(data){
    return this.http.post('updateinfo', data).map((res)=>{
      return res.json();
    });
  }
  
  categorylisting(){
    return this.http.post('categorylist',{}).map((res)=>{
      return res.json();
    });
  }

  productslistng()
  {
    return this.http.post('productlist',{}).map((res)=>{
      return res.json();
    });
  }

  productsByID(data)
  {
    return this.http.post('productsByID',data).map((res)=>{
      return res.json();
    });
  }
  

  updateViewCount(data){
    return this.http.post('updateViewCount', data).map((res)=>{
      return res.json();
    });  
  }
}
