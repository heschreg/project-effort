import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-up-down',
  templateUrl: './image-up-down.component.html',
  styleUrls: ['./image-up-down.component.css']
})
export class ImageUpDownComponent implements OnInit {

    selectedFileImg: File;
    selectedFilePdf: File;
    retrievedImage: any;
    base64ImgData: any;
    base64PdfData: any;

    responseFile: any;
    fileUrl: string;

    retrieveResponse: any;
    message: string;

    imageName: any;
    pdfName: any;

    constructor(private httpClient: HttpClient)  {
    }

    ngOnInit(): void {
      // this.fileUrl = "http://localhost:8081/image/binaryfile/0d9691ee-c96c-4e35-8837-a787b459da2c";
    }
    //Gets called when the user selects an image
    public onFileChangedImg(event: any) {
      this.selectedFileImg = event.target.files[0];
    }

    public onFileChangedPdf(event: any) {
      this.selectedFilePdf = event.target.files[0];
    }

    //Gets called when the user clicks on submit to upload the image
    public onUploadImg() {

      console.log(this.selectedFileImg);

      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFileImg, this.selectedFileImg.name);

      /*
      this.httpClient.post('http://localhost:8081/binary/uploadimg', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
            if (response.status === 200) {... } else { ... }
          });
      */

      /* Upload von Bilddateien */
      this.httpClient.post('http://localhost:8081/binary/uploadimg', uploadData)
        .subscribe( (res) => {
          console.log(res);
        });

    }

    //Gets called when the user clicks on submit to upload ap pdf-Datei
    public onUploadPdf() {

      console.log(this.selectedFilePdf);

      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFilePdf, this.selectedFilePdf.name);

      /*
      this.httpClient.post('http://localhost:8081/binary/uploadpdf', uploadData, { observe: 'response' })
        .subscribe((response) => {
            if (response.status === 200) {... } else { ... }
          });
      */

      /* Upload von Pdfdateien */
      this.httpClient.post('http://localhost:8081/binary/uploadpdf', uploadData)
        .subscribe( (res) => {
          console.log(res);
        });
    }

    //Gets called when the user clicks on retieve image button to get the image from back end

    public getImage() {
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8081/binary/get/' + this.imageName)
        .subscribe(
          res => {
            this.retrieveResponse = res;
            this.base64ImgData = this.retrieveResponse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64ImgData;
          }
        );
    }

    // In der Praxis holt man sich alle Dokumente eines Bewerbers und stellt diese in einer Table dar
    // Die Urls der einzelnen Dokumente hat man dann schon zur Verfügung.
    // SObald man eines der Dokumente downloaden möchte, ruft man window.open(mit der zugehörigen url auf.)
    // Die Kunst ist die Generierung der Urls im Backend

    public getPdfUrl(id: string) {

      //beim Aufruf hat man schon die benptigte Id des anzuzeigenden Pdf-Dokumentes
      this.fileUrl = 'http://localhost:8081/binary/file/' + id;

      // z.B.: "http://localhost:8081/binary/file/0d9691ee-c96c-4e35-8837-a787b459da2c";
      // Wenn man in der HTML den pdf-Viewer ausblendet, so kommt die PDF als Download,
      // was man evtl auch so haben möchte
      window.open(this.fileUrl);

      /*** das ist überflüssig, da man den Lik auf die konkrete Binary schon längst hat
      const urlPdf = 'http://localhost:8081/binary/file/' +  id;
      this.httpClient.get(urlPdf)
        .subscribe( (res) => {
            // diese Url wandert in das pdf-Viewer-Tag
            // Man bekommt folgenden Json vom Typ "ResponseFile": name, type, size, url
            this.responseFile = res;

          }
        );
      ***/
    }

    // Noch zu realisiern, dass man den Namen einer pdf-Datei übergibt, dann einen Request
    // an die Server schickt, um diese Datei in der Tabelle zu finden und die zugehörige
    // Url zurückzugeben
    public getPdfName() {
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8081/image/get/' + this.pdfName)
        .subscribe(
          res => {
            /*
            this.retrieveResponse = res;
            this.base64PdfData = this.retrieveResponse.picByte;
            var file = new Blob([this.base64PdfData], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            */
          }
        );
    }

  }

