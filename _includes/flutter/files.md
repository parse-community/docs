# Files

There are three different file classes in this SDK:

- `ParseFileBase` is an abstract class and is the foundation of every file class that can be handled by the SDK.
- `ParseFile` extends `ParseFileBase` and is by default used as the file class on every platform but web. This class uses a `File` from `dart:io` for storing the raw file. The class was formerly the only file class in the SDK.
- `ParseWebFile` is the equivalent of `ParseFile` used for Flutter Web. This class uses a `Uint8List` for storing the raw file data.

The classes above are used by default to represent files, but you can also build your own class extending `ParseFileBase` and provide a custom `ParseFileConstructor` similar to the `SubClasses`.

Have a look at the example application for a small (non web) example.

When uploading or downloading a file, you can use the `progressCallback`-parameter to track the progress of the http request.
```dart
//A short example for showing an image from a ParseFileBase
Widget buildImage(ParseFileBase image){
  return FutureBuilder<ParseFileBase>(
    future: image.download(),
    builder: (BuildContext context,
    AsyncSnapshot<ParseFileBase> snapshot) {
      if (snapshot.hasData) {
        if (kIsWeb) {
          return Image.memory((snapshot.data as ParseWebFile).file);
        } else {
          return Image.file((snapshot.data as ParseFile).file);
        }
      } else {
        return CircularProgressIndicator();
      }
    },
  );
}
```
```dart
//A short example for storing a selected picture
//libraries: image_picker (https://pub.dev/packages/image_picker), image_picker_for_web (https://pub.dev/packages/image_picker_for_web)
PickedFile pickedFile = await ImagePicker().getImage(source: ImageSource.gallery);
ParseFileBase parseFile;
if (kIsWeb) {
  //Seems weird, but this lets you get the data from the selected file as an Uint8List very easily. 
  ParseWebFile file = ParseWebFile(null, name: null, url: pickedFile.path);
  await file.download();
  parseFile = ParseWebFile(file.file, name: file.name);
} else {
  parseFile = ParseFile(File(pickedFile.path));
}
someParseObject.set("image", parseFile);
//This saves the ParseObject as well as all of its children, and the ParseFileBase is such a child. 
await someParseObject.save();
```
```dart
//progressCallback example
file.upload(progressCallback: (int count, int total) => print("$count of $total"));
```
