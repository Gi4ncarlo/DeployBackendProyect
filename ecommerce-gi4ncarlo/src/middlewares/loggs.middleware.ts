/* eslint-disable prettier/prettier */

// import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

// @Injectable()
// export class LoggsMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const dateActual = new Date();
//     console.log(
//       `Estas ejecutando un metodo ${req.method} en la ruta ${req.url}, en la hora ${dateActual}`,
//     );
//     next();
//   }
// }

export function loggsGlobal(req: Request, res: Response, next: NextFunction){
    const dateActual = new Date();
    console.log(
        `Estas ejecutando un metodo ${req.method} en la ruta ${req.url}, en la fecha ${dateActual}`,
      );
      next();
}
