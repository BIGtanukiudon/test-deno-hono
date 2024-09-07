import { assertSnapshot } from '@std/testing/snapshot'
import { Template } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'
import { AppStack } from '$/cdk/cdk.ts'

Deno.test('Snapshot Test', async (t) => {
  const stack = new AppStack(new App(), 'test-deno-hono-lambda-stack')
  await assertSnapshot(t, Template.fromStack(stack).toJSON())
})
