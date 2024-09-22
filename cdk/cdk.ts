import { App, Duration, Stack, StackProps } from 'aws-cdk-lib'
import lambda from 'aws-cdk-lib/aws-lambda'
import ecr from 'aws-cdk-lib/aws-ecr'
import iam from 'aws-cdk-lib/aws-iam'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import apiGateway from 'aws-cdk-lib/aws-apigatewayv2'

export class AppStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const ecrRepoArn = ecr.Repository.fromRepositoryArn(
      this,
      'test-deno-hono',
      'arn:aws:ecr:ap-northeast-1:123456789000:repository/test-deno-hono',
    )

    const iamRole = new iam.Role(this, 'TestDenoHonoRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    })

    const testDenoHonoLambda = new lambda.DockerImageFunction(
      this,
      'TestDenoHono',
      {
        code: lambda.DockerImageCode.fromEcr(ecrRepoArn),
        memorySize: 512,
        timeout: Duration.seconds(180),
        role: iamRole,
      },
    )

    const integration = new HttpLambdaIntegration(
      'TestDenoHonoApiIntegration',
      testDenoHonoLambda,
    )

    new apiGateway.HttpApi(this, 'TestDenoHonoApi', {
      defaultIntegration: integration,
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [
          apiGateway.CorsHttpMethod.GET,
          apiGateway.CorsHttpMethod.POST,
          apiGateway.CorsHttpMethod.OPTIONS,
        ],
        exposeHeaders: ['*'],
      },
    })
  }
}

new AppStack(new App(), 'test-deno-hono-lambda-stack', {
  env: { region: 'ap-northeast-1', account: '123456789000' },
})
