# Files

## Creating a Parse.File

`Parse.File` lets you store application files in the cloud that would otherwise be too large or cumbersome to fit into a regular `Parse.Object`. The most common use case is storing images, but you can also use it for documents, videos, music, and any other binary data (up to 10 megabytes).

Getting started with `Parse.File` is easy. There are a couple of ways to create a file. The first is with a base64-encoded String.

```javascript
var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
var file = new Parse.File("myfile.txt", { base64: base64 });
```

Alternatively, you can create a file from an array of byte values:

```javascript
var bytes = [ 0xBE, 0xEF, 0xCA, 0xFE ];
var file = new Parse.File("myfile.txt", bytes);
```

Parse will auto-detect the type of file you are uploading based on the file extension, but you can specify the `Content-Type` with a third parameter:

```javascript
var file = new Parse.File("myfile.zzz", fileData, "image/png");
```

### Client Side
In a browser, you'll want to use an html form with a file upload control. To do this, create a file input tag which allows the user to pick a file from their local drive to upload:

```html
<input type="file" id="profilePhotoFileUpload">
```

Then, in a click handler or other function, get a reference to that file:

```javascript
var fileUploadControl = $("#profilePhotoFileUpload")[0];
if (fileUploadControl.files.length > 0) {
  var file = fileUploadControl.files[0];
  var name = "photo.jpg";

  var parseFile = new Parse.File(name, file);
}
```

Notice in this example that we give the file a name of `photo.jpg`. There's two things to note here:

*   You don't need to worry about filename collisions. Each upload gets a unique identifier so there's no problem with uploading multiple files named `photo.jpg`.
*   It's important that you give a name to the file that has a file extension. This lets Parse figure out the file type and handle it accordingly. So, if you're storing PNG images, make sure your filename ends with `.png`.

Next you'll want to save the file up to the cloud. As with `Parse.Object`, there are many variants of the `save` method you can use depending on what sort of callback and error handling suits you.

```javascript
parseFile.save().then(function() {
  // The file has been saved to Parse.
}, function(error) {
  // The file either could not be read, or could not be saved to Parse.
});
```

### Server Side
In Cloud Code you can fetch images or other files and store them as a `Parse.File`.

```js
const request = require('request-promise');
const Parse = require('parse/node');

....

const options = {
  uri: 'https://bit.ly/2zD8fgm',
  resolveWithFullResponse: true,
  encoding: null, // <-- this is important for binary data like images.
};

request(options)
  .then((response) => {
    const data = Array.from(Buffer.from(response.body, 'binary'));
    const contentType = response.headers['content-type'];
    const file = new Parse.File('logo', data, contentType);
    return file.save();
  })
  .then((file => console.log(file.url())))
  .catch(console.error);
```

### Embedding files in other objects
Finally, after the save completes, you can associate a `Parse.File` with a `Parse.Object` just like any other piece of data:

```javascript
var jobApplication = new Parse.Object("JobApplication");
jobApplication.set("applicantName", "Joe Smith");
jobApplication.set("applicantResumeFile", parseFile);
jobApplication.save();
```

## Retrieving File Contents

How to best retrieve the file contents back depends on the context of your application. Because of cross-domain request issues, it's best if you can make the browser do the work for you. Typically, that means rendering the file's URL into the DOM. Here we render an uploaded profile photo on a page with jQuery:

```javascript
var profilePhoto = profile.get("photoFile");
$("profileImg")[0].src = profilePhoto.url();
```

If you want to process a File's data in Cloud Code, you can retrieve the file using our http networking libraries:

```javascript
Parse.Cloud.httpRequest({ url: profilePhoto.url() }).then(function(response) {
  // The file contents are in response.buffer.
});
```

You can delete files that are referenced by objects using the [REST API]({{ site.baseUrl }}/rest/guide/#deleting-files). You will need to provide the master key in order to be allowed to delete a file.

If your files are not referenced by any object in your app, it is not possible to delete them through the REST API.
