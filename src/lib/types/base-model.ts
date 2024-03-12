

export abstract class BaseModel {
  constructor(private readonly authToken: string) {

  }

  inference(options: any): Promise<any> {
    throw new Error('Not implemented');
  }
}
