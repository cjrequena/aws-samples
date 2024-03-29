# hello-world

This project contains source code and supporting files for a serverless application that you can deploy
with the SAM CLI. It includes the following files and folders.

- src - Code for the application's Lambda function written in TypeScript.
- events - Invocation events that you can use to invoke the function.
- template.yaml - A template that defines the application's AWS resources.

## Prerequisites

You will need to install
- aws-cli - [How to install and configure aws cli](https://cjrequena.com/markdowns/docs/aws/aws-cli)
- aws-sam-cli

Also you will need to configure aws credentials for aws-cli and also assign the permission on AWS IAM.

Verify that you have completed the following:

- [AWS SAM prerequisites](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/prerequisites.html)      
- [Installing the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

## To build and deploy your application for the first time, run the following in your shell:

```bash
$ npm install
$ npm run compile
$ sam build
$ sam deploy --guided
```

## Run functions locally and invoke them with the `sam local invoke` command.

```bash
$ sam local invoke HelloWorldFunction --event events/event.json
```

## The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
$ sam local start-api
$ curl http://localhost:3000/
```

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
$ sam logs -n HelloWorldFunction --stack-name {stack-name} --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).


## Unit tests

Tests are defined in the `hello-world-ts-sample-2/tests` folder in this project. Use NPM to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
$ npm install
$ npm run compile
$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name hello-world-ts-sample-2
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
