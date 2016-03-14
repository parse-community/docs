# Configuring File Adapters

Parse Server allows developers to choose from several options when hosting files:

* `GridStoreAdapter`, which is backed by MongoDB;
* `S3Adapter`, which is backed by [Amazon S3](https://aws.amazon.com/s3/); or
* `GCSAdapter`, which is backed by [Google Cloud Storage](https://cloud.google.com/storage/)

`GridStoreAdapter` is used by default and requires no setup, but if you're interested in using S3 or Google Cloud Storage, additional configuration information is available below.

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

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:*"
                ],
                "Resource": [
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

If you're running a standalone Parse Server, you can use the following environment variables to enable the S3 adapter:

```bash
S3_ACCESS_KEY     # The AWS access key for a user that has the required permissions. Required.
S3_SECRET_KEY     # The AWS secret key for the user. Required.
S3_BUCKET         # The name of your S3 bucket. Needs to be globally unique in all of S3. Required.
S3_REGION         # The AWS region to connect to. Optional. (Default: 'us-east-1')
S3_BUCKET_PREFIX  # Create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. Optional. (Default: '')
S3_DIRECT_ACCESS  # Whether reads are going directly to S3 or proxied through your Parse Server. Optional. (Default: false)
```

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
    "BUCKET_NAME",
    {directAccess: true}
  ),
  ...
});
```

Don't forget to change **S3_ACCESS_KEY**, **S3_SECRET_KEY** and **BUCKET_NAME** to their correct value.

##### S3Adapter constructor options

``` new S3Adapter(accessKey, secretKey, bucket, options) ```

Required:
* **accessKey**: the AWS access key for a user that has the required permissions
* **secretKey**: the AWS secret key for the user
* **bucket**: the name of your S3 bucket. Needs to be globally unique in all of S3

```options``` is a Javascript object (map) that can contain:
* **region**: the AWS region to connect to. Default: 'us-east-1'
* **bucketPrefix**: create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. Default: ''
* **directAccess**: whether reads are going directly to S3 or proxied through your Parse Server. Default: false

## Configuring `GCSAdapter`

You can use the following environment variable setup to enable the GCS adapter:

```js
GCP_PROJECT_ID
GCP_KEYFILE_PATH
GCS_BUCKET
GCS_BUCKET_PREFIX
GCS_DIRECT_ACCESS
```
