import { Injectable } from "@angular/core";
import { ImageSource, knownFolders, path } from "@nativescript/core";
import * as camera from "nativescript-camera";
import { ImageAsset } from "@nativescript/core";

@Injectable({
  providedIn: "root"
})
export class CameraService {
  takePicture(): Promise<string> {
    return new Promise((resolve, reject) => {
      camera.requestPermissions().then(
        () => {
          const options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: false
          };

          camera.takePicture(options).then(
            (imageAsset: ImageAsset) => {
              const source = new ImageSource();
              source.fromAsset(imageAsset).then((imageSource: ImageSource) => {
                const folderPath = knownFolders.documents().path;
                const fileName = `product_${Date.now()}.jpg`;
                const filePath = path.join(folderPath, fileName);

                const saved = imageSource.saveToFile(filePath, "jpg");
                if (saved) {
                  resolve(filePath);
                } else {
                  reject(new Error("Failed to save image"));
                }
              }).catch((err) => {
                reject(err);
              });
            },
            (err) => {
              reject(err);
            }
          );
        },
        () => {
          reject(new Error("Camera permission denied"));
        }
      );
    });
  }
}
