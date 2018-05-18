import * as qwest from 'qwest';

export const util = {
  loadTemplate: function( name: string ) {
      if ( !this._cache[ name ] ) {
          //this is required because github pages add name of repo to the url
          var path = location.pathname === '/todo/' ? 'templates/' : '/templates/';
          this._cache[ name ] = qwest.get(path + name);
      }
      return this._cache[ name ];
  },
  _cache: {}
};