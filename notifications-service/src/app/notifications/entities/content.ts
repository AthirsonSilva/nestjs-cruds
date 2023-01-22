export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  constructor(content: string) {
    const isContentValid = this.ensureContentIsValid(content);
    if (!isContentValid) throw new Error('Content is not valid');

    this.content = content;
  }

  private ensureContentIsValid(content: string) {
    if (!content.length) {
      throw new Error('Content cannot be empty');
    } else if (content.length > 100) {
      throw new Error('Content cannot be longer than 100 characters');
    } else if (content.length < 5) {
      throw new Error('Content cannot be shorter than 5 characters');
    }

    return true;
  }
}
