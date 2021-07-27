import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Song} from '../model/Song';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private API_SONG = environment.API+'song';
  constructor(private http: HttpClient) {
  }
  createSong(song: Song): Observable<Song>{
    return this.http.post<Song>(this.API_SONG, song);
  }
}