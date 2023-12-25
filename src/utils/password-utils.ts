const bcrypt = require('bcrypt');
const saltRounds = 10;

async function
hashPassword(
  password: string,
): Promise<string> {
  return await bcrypt.genSalt(saltRounds)
    .then(async salt => {
      return await bcrypt.hash(password, salt);
    });
}
