import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadFile = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private httpClient: HttpClient,
              private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  //Khi upload file qua the input type="file" dưới dạng 1 hoặc nhiều File thì tệp đó thì sự kiện change(event) được kích hoạt. Và file đó được lưu trữ ở
  //trong event.targe --> Vì thế nên ta có thể truy xuất các phần tử ở trong đó
  onFileChanged(event){
    this.selectedFile = event.target.files[0]; //Lưu ý : files chứ không được dùng file không có s
  }
  onUpload(){
    this.checkUploadFile = true;
    //Moi file se co 1 ID rieng
    const id = Math.random().toString(36).substring(2); //Tao ra 1 string random
    //truyen bien string ran dom o tren qua ham xu ly firebase store service --> truyen len Firebase
    this.ref = this.afStorage.ref(id);
    //Convert dang file sang tra ve 1 chuoi duong link
    this.ref.put(this.selectedFile)
      .then(snapshot =>{
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL =>{ //Chuyen value tu component con sang component cha
        this.downloadURL = downloadURL;
        this.giveURLtoCreate.emit(this.downloadURL);
        console.log('Avatar --->',downloadURL);
        this.checkUploadFile = false;
        return downloadURL;
      })
      .catch(error =>{
        console.log(`Failed to upload avatar and get link -${error}`);
      })
  }

}
