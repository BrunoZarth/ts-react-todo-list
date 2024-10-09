var { expressjwt: jwt } = require("express-jwt");

// Middleware de autenticação
export const authMiddleware = jwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ['HS256'],
  credentialsRequired: true,
}).unless({
  path: ['/api/users/login'], 
});
