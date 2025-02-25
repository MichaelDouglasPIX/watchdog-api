export default {
  jwt: {
    secret: process.env.SECRET ?? 'secret',
    expiresIn: process.env.EXPIRE ? Number(process.env.EXPIRE) : 3600
  }
};
