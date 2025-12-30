#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { MediaConverterStack } from '../lib/media-converter-stack';
import { IEnvConfig } from '../lib/interfaces';
import { ContinousDeplymentStack } from '../lib/continous-deployment-stack';
import { REGIONS } from '../lib/constants';

const app = new cdk.App();
const env = app.node.tryGetContext('env'); // Default to 'dev' if not provided
// Environment Configuration
const config: IEnvConfig = {
  dev: {
    accountId: '740994137015', // Replace with your actual account ID
    region: REGIONS.usEast1, // Replace with your desired region
    environment: 'dev',
    whiteListedIps: [
      '172.56.35.116/32',
      '162.83.152.212/32',
      '100.33.64.132/32',
      '24.146.244.22/32',
    ], // Replace with your actual IPs
    lpArtifactStorage: {
      actions: ['ssm:GetParameter', 'ssm:GetParameters', 'ssm:GetParametersByPath'],
      arn: 'arn:aws:ssm:us-east-1:740994137015:parameter/lp/dev/*',
    },
  },
};

const selectedEnvConfig = config[env];

if (!selectedEnvConfig) {
  throw new Error(`Environment configuration for '${env}' not found.`);
}

const vpcStack = new VpcStack(app, 'lp-vpcstack', selectedEnvConfig);
const mediaConverterStack = new MediaConverterStack(app, 'lp-mediaconvstack', selectedEnvConfig);
const continuousDeploymentStack = new ContinousDeplymentStack(
  app,
  'lp-cdeploystack',
  selectedEnvConfig
);
mediaConverterStack.node.addDependency(vpcStack);
mediaConverterStack.node.addDependency(continuousDeploymentStack);
continuousDeploymentStack.node.addDependency(vpcStack);
