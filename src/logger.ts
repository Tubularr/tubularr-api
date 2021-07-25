export class Logger {
  private _logLevel = 'info';

  info(context: string, content: unknown): void {
    console.log(JSON.stringify({
      context,
      content
    }));
  }

  error(context: string, content: unknown): void {
    console.error(JSON.stringify({
      context,
      content
    }));
  }
}
