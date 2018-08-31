# Configuring File Adapters

Parse Server allows developers to choose from several options when hosting files:

* `GridStoreAdapter`, which is backed by MongoDB;
* `S3Adapter`, which is backed by [Amazon S3](https://aws.amazon.com/s3/); or
* `GCSAdapter`, which is backed by [Google Cloud Storage](https://cloud.google.com/storage/)

`GridStoreAdapter` is used by default and requires no setup, but if you're interested in using S3 or Google Cloud Storage, additional configuration information is available below.

When using files on Parse, you will need to use the `publicServerURL` option in your Parse Server config. This is the URL that files will be accessed from, so it should be a URL that resolves to your Parse Server. Make sure to include your mount point in this URL.

## Configuring `S3Adapter`

If you'd like to use Amazon S3, follow these instructions to configure Parse Server to use `S3Adapter`.

### Set up your bucket and permissions

First you will create a bucket in S3 to hold these files.

1. Log into your [AWS account](https://console.aws.amazon.com/) or create a new one.
2. Head to the S3 service and choose **Create Bucket**
3. Fill out a unique **Bucket Name** and click **Create**. The bucket name should not contain any period '.' for `directAccess` to work. All other defaults are OK.
4. Now head to the Identity and Access Management (IAM) service.
5. Click the **Users** tab, then **Create New User**.
6. Fill out at least one user name and make sure **Generate an access key for each user** is selected before clicking **Create**.
7. Make sure to **Download Credentials** on the next screen.
8. Now select the **Policies** tab, then **Create Policy**.
9. Select **Create Your Own Policy**, fill out a **Policy Name**.
10. Copy the following config in **Policy Document**, changing **BUCKET_NAME** for the name of the bucket you created earlier. (note: this is a little more permissive than Parse Server needs, but it works for now)

    ```js
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:*"
                ],
                "Resource": [
                    "arn:aws:s3:::BUCKET_NAME",
                    "arn:aws:s3:::BUCKET_NAME/*"
                ]
            }
         ]
     }
    ```
11. Make sure to **Validate Policy** first, then click **Create Policy**.
12. Go back to the **Users** tab and select the user you created earlier.
13. In Permissions, select **Attach Policy** and find the policy we just created to attach it.

### Configuration options

Writing to your Amazon S3 bucket from Parse Server is as simple as configuring and using the S3 files adapter.

#### Using environment variables

If you're running a standalone Parse Server, you can use the following environment variables to configure the S3 adapter:

| Variable Name | Description | Notes |
| ------------- | ----------- | ----- |
| PARSE_SERVER_FILES_ADAPTER  | Set this variable to './Files/S3Adapter.js'. | Required |
| S3_ACCESS_KEY               | The AWS access key for a user that has the required permissions. | Required |
| S3_SECRET_KEY               | The AWS secret key for the user. | Required |
| S3_BUCKET                   | The name of your S3 bucket. Needs to be globally unique in all of S3. | Required |
| S3_REGION                   | The AWS region to connect to. | Optional. Default: 'us-east-1' |
| S3_BUCKET_PREFIX            | Create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. | Optional. |
| S3_DIRECT_ACCESS            | Whether reads are going directly to S3 or proxied through your Parse Server. If set to true, files will be made publicly accessible, and reads will not be proxied. | Optional. Default: false |

#### Passing as options

If you're using Node.js/Express:

```javascript
...
var S3Adapter = require('parse-server').S3Adapter;

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  appId: process.env.APP_ID || 'APPLICATION_ID',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY',
  ...
  filesAdapter: new S3Adapter(
    "S3_ACCESS_KEY",
    "S3_SECRET_KEY",
    "S3_BUCKET",
    {directAccess: true}
  ),
  ...
});
```

Don't forget to change **S3_ACCESS_KEY**, **S3_SECRET_KEY** and **S3_BUCKET** to their correct value.

##### S3Adapter constructor options

```js
new S3Adapter(accessKey, secretKey, bucket, options)
```

| Parameter | Description | Notes |
| --------- | ----------- | ----- |
| accessKey    | The AWS access key for a user that has the required permissions | Required. |
| secretKey    | The AWS secret key for the user | Required. |
| bucket       | The name of your S3 bucket. | Required. |
| options      | JavaScript object (map) that can contain: | |
| region       | Key in `options`. Set the AWS region to connect to. | Optional. Default: 'us-east-1' |
| bucketPrefix | Key in `options`. Set to create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. | Optional. Default: '' |
| directAccess | Key in `options`. Controls whether reads are going directly to S3 or proxied through your Parse Server. If set to true, files will be made publicly accessible, and reads will not be proxied. | Optional. Default: false |


## Configuring `GCSAdapter`

Unlike the S3 adapter, you must create a new Cloud Storage bucket, as this is not created automatically. See the Google Cloud guide on [Authentication](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/master/guides/authentication) for more details.

To generate a private key in the Cloud Platform Console follow [these instructions](https://cloud.google.com/storage/docs/authentication#generating-a-private-key).

### Installation

Starting 2.2.6, GCS Adapter is not provided by default by parse-server. To install run:

```
npm install --save parse-server-gcs-adapter
```

### Configuration options

Writing to your Google Cloud Storage bucket from Parse Server is as simple as configuring and using the GCS files adapter.

#### Using environment variables

You can use Google Cloud Storage to host your static files by setting the following environment variables:

| Variable Name | Description | Notes |
| ------------- | ----------- | ----- |
| PARSE_SERVER_FILES_ADAPTER  | Set this variable to 'parse-server-gcs-adapter'. | Required. |
| GCP_PROJECT_ID              | The project ID from the Google Developer's Console. | Required. |
| GCP_KEYFILE_PATH            | Full path to the a .json, .pem, or .p12 key downloaded from the Google Developers Console. | Required. |
| GCS_BUCKET                  | The name of your GCS bucket. | Required. |
| GCS_BUCKET_PREFIX           | Create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. | Optional. |
| GCS_DIRECT_ACCESS           | Whether reads are going directly to GCS or proxied through your Parse Server. | Optional. Default: false |

#### Passing as options

If you're using Node.js/Express:

```javascript
...
var GCSAdapter = require('parse-server-gcs-adapter');

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  appId: process.env.APP_ID || 'APPLICATION_ID',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY',
  ...
  filesAdapter: new GCSAdapter(
    "GCP_PROJECT_ID",
    "GCP_KEYFILE_PATH",
    "GCS_BUCKET",
    {directAccess: true}
  ),
  ...
});
```

##### S3Adapter configuration for Digital Ocean Spaces

Spaces is an S3 equivalent prodivided by Digital Ocean. It's use the same api as S3 so you can use it with the S3 Adapter.
You just need to change the AWS Endpoint to point to your Spaces endpoint.

```javascript
...
var S3Adapter = require('parse-server').S3Adapter;
var AWS = require("aws-sdk");

//Set Digital Ocean Spaces EndPoint
const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT);
//Define S3 options
var s3Options = {
  bucket: process.env.SPACES_BUCKET_NAME,
  baseUrl: process.env.SPACES_BASE_URL,
  region: process.env.SPACES_REGION,
  directAccess: true,
  globalCacheControl: "public, max-age=31536000",
  bucketPrefix: process.env.SPACES_BUCKET_PREFIX,
  s3overrides: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
    endpoint: spacesEndpoint
  }
};

var s3Adapter = new S3Adapter(s3Options);

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  appId: process.env.APP_ID || 'APPLICATION_ID',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY',
  ...
  filesAdapter: s3Adapter
  ...
});
```


##### GCSAdapter constructor options

```js
new GCSAdapter(projectId, keyfilePath, bucket, options)
```

| Parameter | Description | Notes |
| --------- | ----------- | ----- |
| projectId    | The project ID from the Google Developer's Console. | Required. |
| keyfilePath  | Full path to the a .json, .pem, or .p12 key downloaded from the Google Developers Console. | Required. |
| bucket       | The name of your GCS bucket. | Required. |
| options      | JavaScript object (map) that can contain: | |
| bucketPrefix | Key in `options`. Set to create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. | Optional. Default: '' |
| directAccess | Key in `options`. Controls whether reads are going directly to GCS or proxied through your Parse Server. | Optional. Default: false |
