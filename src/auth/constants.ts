export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'changeMe',
  authName: 'jwt-token',
};
