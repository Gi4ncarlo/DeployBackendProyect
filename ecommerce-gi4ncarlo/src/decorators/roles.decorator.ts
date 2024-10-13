// src/common/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/Users/enum/role.enum'; 

export const ROLES_KEY = 'roles'; // Clave para los metadatos
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
