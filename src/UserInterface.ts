import { ReadLine, createInterface } from 'readline';

const rl: ReadLine = createInterface({
  input: process.stdin,
  output: process.stdout
});

export async function awaitableQuestion(query: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(query, answer => resolve(answer));
  }).then();
}
