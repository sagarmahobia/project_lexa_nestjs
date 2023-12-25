import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

const saltRounds = 10;


@Injectable()
export class PasswordUtils {

  constructor() {
  }

  async hashPassword(
    password: string,
  ): Promise<string> {
    return await bcrypt.genSalt(saltRounds)
      .then(async salt => {
        return await bcrypt.hash(password, salt);
      });
  }


  async comparePass(password: string, toCompare: string) {
    return bcrypt.compare(password, toCompare);
  }


}
