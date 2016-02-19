### Setup your bucket and permission

1. Log into your [AWS account](https://console.aws.amazon.com/) or create a new one
2. Head to the S3 service and choose **Create Bucket**
3. Fill out a unique **Bucket Name** (also it should not contain any period '.' for directAccess to work) and click **Create** (all other defaults are OK)
4. Now head to the Identity and Access Management (IAM) service
5. Click the **Users** tab, then **Create New User**
6. Fill out at least one user name and make sure **Generate an access key for each user** is selected before clicking **Create**
7. Make sure to **Download Credentials** on the next screen
8. Now select the **Policies** tab, then **Create Policy**
9. Select **Create Your Own Policy**, fill out a **Policy Name**
10. Copy the following config in **Policy Document**, changing **BUCKET_NAME** for the name of the bucket you created earlier. (note: this is a little more permissive than we need, but it works for now)

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
11. Make sure to **Validate Policy** first, then click **Create Policy**
12. Go back to the **Users** tab and select the user you created earlier
13. In Permissions, select **Attach Policy** and find the policy we just created to attach it

### Using the S3Adapter

### S3Adapter options