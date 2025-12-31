# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Run the following command if running cdk deploy for the first time in aws account:

`npx cdk bootstrap --profile your-profile-name`

## Install Husky Hooks

Run the following command to install and configure husky

`npm run prepare`

## Setting up CDK

### Install the AWS CLI

FOr macOS (using Homebrew):

`brew install awscli`

### Configure AWS CLI with your AWS Credentials

`aws configure --profile <your-aws-profile>`

Note: We are using us-east-1

### Install AWS CDK on your machine

`npm install -g aws-cdk`

### Configure the CDK Deploy Profile

The project uses the cdk-deploy-dev profile, which is assumed by the bubah-dev AWS profile. If you're setting this up for the first time, follow these steps to ensure that your bubah-dev profile is used.

Create a profile for cdk-deploy-dev
Ensure that your AWS credentials are configured correctly by editing your ~/.aws/config file (or the equivalent location for your OS).

Here’s an example of how the profile should be set up:

```
[profile cdk-deploy-dev]
region = us-east-1
role_arn = arn:aws:iam::123456789012:role/YourRoleName
source_profile = bubah-dev
```

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npm run deploy:<environment>` deploy this stack to your default AWS account/region for the specified env (i.e dev, test, stage, prod)
- `npm run diff:<environment>` compare deployed stack with current state for the specified environment (i.e dev, test, stage, prod)
- `npx cdk synth` emits the synthesized CloudFormation template
