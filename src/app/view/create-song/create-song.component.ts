import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  status = 'Please fill in the form to create Song!';
  form: any = {};
  song: Song;
  error1: any = {
    message: 'noavatar'
  };
  error2: any = {
    message: 'nomp3url'
  };
  success: any = {
    message: 'yes'
  };

  constructor(private songService: SongService) {
  }

  ngSubmit() {

    this.song = new Song(
      this.form.nameSong,
      this.form.avatarSong,
      this.form.lyrics,
      this.form.mp3Url,
    );
    console.log('song = ',this.song);
    this.songService.createSong(this.song).subscribe(data => {
      console.log('ERROR1 ->', JSON.stringify(this.error1));
      console.log('data = ', data);
      if (JSON.stringify(this.error1) == JSON.stringify(data)) {
        this.status = 'Avatqar is required! Please try again!';
      }
      if (JSON.stringify(this.error2) == JSON.stringify(data)) {
        this.status = 'Mp3URL is required! Please try again!';
      }
      if (JSON.stringify(this.success) == JSON.stringify(data)) {
        this.status = 'Create song success!';
      }
    }, error => {
      this.status = 'Please login before create! '
    });
  }

  ngOnInit(): void {
  }

  onChangeAvatar($event) {


      this.form.avatarSong = $event;


  }

  onChangeFile($event) {
    this.form.mp3Url = $event;
  }
}
