import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApilinkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApilinkProvider extends BaseRequestOptions {

  merge(options?: RequestOptionsArgs): RequestOptions {
    return new CommonRequestOptions(super.merge(extracted(options)));
  }
}

/**
 * for inner merge when using post put patch delete...others method
 */
export class CommonRequestOptions extends RequestOptions {
  merge(options?: RequestOptionsArgs): RequestOptions { 
    return new RequestOptions(super.merge(extracted(options)));
  }
}

/**
 * inject default values
 *
 * @param options
 * @returns {RequestOptionsArgs}
 */
export function extracted(options: RequestOptionsArgs)
{
  if(!validUrl(options.url))
  {
    options.url = 'http://35.153.16.86:3000/' + (options.url ? options.url : "");
  }
  return options;
}

/**
 * validate url
 *
 * @param url
 * @returns {boolean}
 */
export function validUrl(url: string) {
  return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
}