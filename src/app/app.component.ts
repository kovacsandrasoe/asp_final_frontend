import { Component } from '@angular/core';
import {Word} from './word';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WordApp';
  public collection: Array<Word>;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  refresh() {
    this.collection = new Array<Word>();
    this.getWords().subscribe(w => {
      this.collection = w;
    });
    this.collection = this.collection.reverse();
  }

  getWords(): Observable<Word[]> {
    return this.http
      .get<Word[]>(`https://kawordapi.azurewebsites.net/api/word`);
  }

  createWord(word: Word): Observable<Word> {
    return this.http.post<Word>('https://kawordapi.azurewebsites.net/api/word', word);
  }

  public NewWord(hw: HTMLInputElement, fw: HTMLInputElement) {
    const w = new Word(hw.value, fw.value);
    this.createWord(w).subscribe(a => {
      this.refresh();
    });

  }
}
