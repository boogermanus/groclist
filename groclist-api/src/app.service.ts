import { Injectable } from '@nestjs/common';
import * as shortid from 'shortid';
@Injectable()
export class AppService {
  public static instanceId: string = shortid.generate();
  getHello(): string {
    return 'Hello World!';
  }
}
