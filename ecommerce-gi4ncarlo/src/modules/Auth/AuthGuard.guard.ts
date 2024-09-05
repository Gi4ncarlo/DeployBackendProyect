import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Verificar si el header Authorization está presente
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('El header Authorization no fue enviado');
    }

    // Verificar que el formato del header sea "Basic: <email>:<password>"
    const authParts = authorizationHeader.split(' ');
    if (authParts[0] !== 'Basic' || authParts.length !== 2) {
      throw new UnauthorizedException('Formato del header Authorization inválido');
    }

    // Verificar que tenga la estructura <email>:<password>
    // const credentials = authParts[1].split(':');
    // if (credentials.length !== 2) {
    //   throw new UnauthorizedException('El header Authorization debe contener email y password separados por ":"');
    // }

    // No es necesario validar si el email y la password son correctos
    return true;  // Permitir el acceso si la estructura es correcta
  }
}