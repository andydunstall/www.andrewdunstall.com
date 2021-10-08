/* eslint max-len: "off" */

import React from 'react';

function CDCommitStage() {
  const snippet1 = `
version: 0.2
phases:
  install:
    runtime-versions: golang: 1.14
  build:
    commands:
      # Compile and package into a deployment package (function.zip).
      - go build cmd/get/main.go
      - zip function.zip main
      # Upload to S3 using the commit ID to uniquely identify the file.
      - aws s3 cp function.zip s3://$BUCKET_ID/function-$CODEBUILD_RESOLVED_SOURCE_VERSION.zip cache: paths: - '/go/pkg/**/*'
`;

  const snippet2 = `
aws lambda update-function-code
  --function-name $FUNC_NAME
  --s3-bucket $BUCKET_ID
  --s3-key function-$CODEBUILD_RESOLVED_SOURCE_VERSION.zip
  --publish
`;

  return (
    <>
      <h1>Continuous Deployment Pipeline for AWS Lambda — Commit Stage</h1>
      <h6>October 11, 2020</h6>
      <p>
        Continuous deployment is a software development practice where the release process is automated from end to end. This includes building, testing and deploying the software in a number of stages. For example this may include stages:
      </p>
      <ol>
        <li>Commit stage: Packages the release candidate and runs unit tests/static analysis,</li>
        <li>Stage deployment: Deploys the release candidate to a stage environment,</li>
        <li>Functional testing: Runs automated functional tests against the stage environment,</li>
        <li>Manual approval: Waits for manual approval to continue the deployment,</li>
        <li>Production deployment: Deploy into production and transfer user traffic to the new deployment.</li>
      </ol>
      <p>
        This article explains the pipeline infrastructure and commit stage.
      </p>

      <h2>Pipeline</h2>
      <p>
        The CI/CD pipeline automates the release process, typically triggered by a change to the source code. The pipeline contains a number of sequential stages, where each stage consists of actions that run in parallel and must succeed before the pipeline can move to the next stage. The outputs of the stages may be used as inputs for the next stages.
      </p>
      <p>
        This pipeline is implemented with AWS CodePipeline, where actions are implemented using either AWS CodeBuild, Lambda or CodeDeploy
      </p>

      <h2>Commit Stage</h2>
      <p>
        The commit stage is the first stage in the pipeline, triggered when there is a change to the source code. This stage builds the release candidate and generates reports about the last commit for the developers.
      </p>
      <p>
        The purpose of the commit stage is to run fast and quickly detect the most common errors (via testing and static analysis). It’s important this provides a clear report on failures and logging to debug issues. Therefore the stage cannot immediately exit when an error is found as this may miss further errors that could point to the cause (such as static analysis identifying why a test failed). The actions in this stage should typically be run locally before check in. Some of the actions of this stage do not have a binary pass or fail output (such as test coverage) so these outputs should be clearly reported.
      </p>
      <p>
        Here the release candidate is a new Lambda version that can be deployed to staging and production environments. Lambda versions create an immutable snapshot of your function that includes your function code, settings, runtime and environment.
      </p>
      <p>
        The actions in the stage run on AWS CodeBuild and use the source code as input.
      </p>
      <p>
        The commit stage includes:
      </p>

      <h3>Packaging</h3>
      <p>
        This compiles the source code and packages the Lambda deployment package, which is binary packaged into a ZIP file with any required dependencies.
      </p>
      <p>
        It’s important this deployment package is reproducible, meaning running the stage again with the same source code commit produces the exact same package (verifiable by hashing the output). This allows you to revert to a known good commit safely and trust the exact same package will be deployed (though this shouldn’t be an issue when using CodeDeploy).
      </p>
      <p>
        To ensure the correct package is added to the Lambda its name includes the commit ID, such as function-$CODEBUILD_RESOLVED_SOURCE_VERSION.zip.
      </p>
      <p>
        Next the package must be uploaded to S3. This is both to add to the Lambda later and provide easy access for developers. Alternatively this can be an output artifact but that requires most setup.
      </p>
      <p>
        An example buildspec.yml for this action using Golang:
      </p>
      <pre>
        {snippet1}
      </pre>

      <h3>Unit Tests</h3>
      <p>
        Runs all unit tests and measures code coverage. The coverage output should be clearly reported to developers in the logs, and possibly add a threshold to fail the action if the coverage drops too low. This could be extended to send notifications or push these stats to a Lambda to process and distribute.
      </p>

      <h3>Static Analysis</h3>
      <p>
        Runs static analysis, linters, formatters, cyclomatic complexity checkers and any other tools to keep a high code standard and help detect bugs. Most of these checks are not binary outputs (success or fail) so should be logged clearly. As with unit testing can extend the reporting beyond just logging.
      </p>

      <h2>Publish Version</h2>
      <p>
        Once the commit stage completes successfully, the deployment package should be published to create a new Lambda version.
      </p>
      <p>
        Versions are immutable snapshots of the Lambda. These can be pointed to by aliases, which are used to route traffic to specific versions. This is why it’s important clients of the Lambda invoke aliases rather than just the unpublished Lambda. Such as configuring API Gateway to involve the prod alias. Then to deploy the new version you simply update the alias to point to the new version (more on this in the next article as there’s lots of interesting things that can be done with incrementally shifting traffic to a new version using AWS CodeDeploy).
      </p>
      <p>
        This stage has a single action that publishes the new version created in the commit stage, which acts as a release candidate for future deployments. Note this will not be deployed as the alias points to older versions.
      </p>
      <pre>
        {snippet2}
      </pre>

      <h2>Next Steps</h2>
      <p>
        Now the commit stage has run as a first check of the update and release candidate has been created, the next step is to deploy this to a staging environment for functional testing, before approval and finally deployment.
      </p>
      <p>
        Also a better way to report static analysis and test coverage results would be useful, for example posting to a Lambda that can provide dashboards and build badges.
      </p>
    </>
  );
}

export default CDCommitStage;
