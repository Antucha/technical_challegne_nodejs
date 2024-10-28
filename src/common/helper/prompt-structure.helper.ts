
export class PromptStructureHelper {

  private prompt: any[] = [];
  private systemContent: any[] = [];
  private userContent: any[] = [];

  static create(): PromptStructureHelper {
    return new PromptStructureHelper();
  }

  setSystemContentText(content: string): PromptStructureHelper {
    this.systemContent.push({
      "type": "text",
      "text": content
    });

    return this;
  }

  public setUserContentImage(imageUrl: string): PromptStructureHelper {
    this.userContent.push({
      "type": "image_url",
      "image_url": {
        "url": imageUrl
      }
    });

    return this;
  }

  public setUserContentText(content: string): PromptStructureHelper {
    this.userContent.push({
      "type": "text",
      "text": content
    });

    return this;
  }

  public build(): any[] {
    this.prompt.push({
      "role": "system",
      "content": this.systemContent
    });

    this.prompt.push({
      "role": "user",
      "content": this.userContent
    });

    return this.prompt;
  }



  




}