# Files

## Uploading Files

To upload a file to Parse, send a POST request to the files URL, postfixed with the name of the file. The request must contain the `Content-Type` header associated with the file. Keep in mind that files are limited to 10 megabytes. Here's a simple example that'll create a file named `hello.txt` containing a string:

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: text/plain" \
  -d 'Hello, World!' \
  https://api.parse.com/1/files/hello.txt
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/files/hello.txt', 'Hello, World!', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "text/plain"
     })
result = json.loads(connection.getresponse().read())
print result
```

When the file upload is successful, the HTTP response is a `201 Created` and the `Location` header which contains the URL for the file:

```js
Status: 201 Created
Location: http://files.parsetfss.com/bc9f32df-2957-4bb1-93c9-ec47d9870a05/tfss-db295fb2-8a8b-49f3-aad3-dd911142f64f-hello.txt
```

The response body is a JSON object containing the `name` of the file, which is the original file name prefixed with a unique identifier in order to prevent name collisions. This means you can save files with the same name, and the files will not overwrite one another.

```json
{
  "url": "http://files.parsetfss.com/bc9f32df-2957-4bb1-93c9-ec47d9870a05/tfss-db295fb2-8a8b-49f3-aad3-dd911142f64f-hello.txt",
  "name": "db295fb2-8a8b-49f3-aad3-dd911142f64f-hello.txt"
}
```

To upload an image, the syntax is a little bit different. Here's an example that will upload the image `myPicture.jpg` from the current directory.

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: image/jpeg" \
  --data-binary '@myPicture.jpg' \
  https://api.parse.com/1/files/pic.jpg
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/files/pic.jpg', open('myPicture.jpg', 'rb').read(), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "image/jpeg"
     })
result = json.loads(connection.getresponse().read())
print result
```

## Associating with Objects

After files are uploaded, you can associate them with Parse objects:

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Andrew",
        "picture": {
          "name": "...profile.png",
          "__type": "File"
        }
      }' \
  https://api.parse.com/1/classes/PlayerProfile
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/PlayerProfile', json.dumps({
       "name": "Andrew",
       "picture": {
         "name": "...profile.png",
         "__type": "File"
       }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

Note that the name of the file in the request is not the local file name, but the name in the response of the previous upload operation.


## Deleting Files

Users holding the master key are allowed to delete files using the REST API. To delete a file, send a DELETE request to the files URL, postfixed with the name of the file. Note that the name of the file must be the name in the response of the upload operation, rather than the original filename. Note that the `X-Parse-Master-Key` must be provided in headers.

```bash
curl -X DELETE \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  https://api.parse.com/1/files/...profile.png
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('DELETE', '/1/files/...profile.png', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
```

Note that deleting a PFObject with a file associated with it will not delete the file. All files stored on Parse should be deleted by using the above explained API.
