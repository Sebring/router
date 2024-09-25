import { createServerFn } from '@tanstack/start'
import { z } from 'zod'

export const withUseServer = createServerFn({
  method: 'GET',
  fn: async function () {
    console.info('Fetching posts...')
    await new Promise((r) => setTimeout(r, 500))
    return axios
      .get<Array<PostType>>('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.data.slice(0, 10))
  },
})

export const withArrowFunction = createServerFn({
  method: 'GET',
  fn: async () => null,
})

export const withArrowFunctionAndFunction = createServerFn({
  method: 'GET',
  fn: async () => test(),
})

export const withoutUseServer = createServerFn({
  method: 'GET',
  fn: async () => {
    console.info('Fetching posts...')
    await new Promise((r) => setTimeout(r, 500))
    return axios
      .get<Array<PostType>>('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.data.slice(0, 10))
  },
})

export const withVariable = createServerFn({
  method: 'GET',
  fn: abstractedFunction,
})

async function abstractedFunction() {
  console.info('Fetching posts...')
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .get<Array<PostType>>('https://jsonplaceholder.typicode.com/posts')
    .then((r) => r.data.slice(0, 10))
}

function zodValidator<TSchema extends z.ZodSchema, TResult>(
  schema: TSchema,
  fn: (input: z.output<TSchema>) => TResult,
) {
  return async (input: unknown) => {
    return fn(schema.parse(input))
  }
}

export const withZodValidator = createServerFn({
  method: 'GET',
  fn: zodValidator(z.number(), (input) => {
    return { 'you gave': input }
  }),
})

export const withValidatorFn = createServerFn({
  method: 'GET',
  serverValidator: z.number(),
  fn: async ({ payload }) => {
    return null
  },
})
