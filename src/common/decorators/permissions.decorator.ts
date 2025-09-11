import { SetMetadata } from '@nestjs/common';
import {PermissionName} from "../constants/index";

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...perms: PermissionName[]) =>
    SetMetadata(PERMISSIONS_KEY, perms);
