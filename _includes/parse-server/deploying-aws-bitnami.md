## Deploying on AWS using Bitnami AMI

Here are the steps:

1. Log into your AWS account or create a new one [AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
2. Go to AWS EC2 Dashboard
3. Launch Instances
4. On **Application and OS Images (Amazon Machine Image)** search for `Parse`
5. Select **Parse Server packaged by Bitnami**
6. Click `Continue`
7. On **Instance Type** select `t2.micro` (is ok for testing and small projects which is Free tier eligible)
8. Create or select an existing `key pair`. (If you create a new one click `Download Key Pair`)
9. Click `Launch Instance`
10. On **EC2 Dashboard** select the new created instance and click `Connect`
11. Click `SSH Client` and follow the instructions

Login into the ec2 instance we perform the following commands:

```bash
cd stack/parse
```
```bash
cat config.json
```

That will show Parse configuration details, save those details for later.

<!-- WIP -->

<!-- https://docs.bitnami.com/aws/apps/parse/ -->
<!-- https://www.youtube.com/watch?v=H7KL_VKbSBM -->
<!-- https://www.youtube.com/watch?v=5WkaGuZ35jM -->
