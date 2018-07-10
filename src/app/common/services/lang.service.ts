import { Injectable } from '@angular/core';

export interface Languages {
  id: number;
  iso: string;
  txt: string;
}

@Injectable({
  providedIn: 'root'
})
export class LangService {
  langs: Languages[] = [
    {id: 1, iso: 'es', txt: 'Español'},
    {id: 2, iso: 'en', txt: 'Ingles'},
    {id: 3, iso: 'zh', txt: 'Chino'},
    {id: 4, iso: 'de', txt: 'Aleman'},
    {id: 5, iso: 'it', txt: 'Italiano'},
    {id: 6, iso: 'pt', txt: 'Portugués'}
  ];
  constructor() { }
  getLangs() {
    return this.langs;
  }
  getLangById(id) {
    return this.langs.filter(x => x.id === id)[0];
  }
  getLangIso(iso) {
    return this.langs.filter(x => x.iso === iso)[0];
  }
}
