
# Challenge API

API REST desarrollada con **NestJS + TypeORM + PostgreSQL**.  
Incluye autenticación JWT, manejo de roles y permisos, versionado de endpoints, migraciones, seeds y tests automatizados.

---

## 🚀 Tecnologías
- [NestJS](https://nestjs.com/) v11
- [TypeORM](https://typeorm.io/)
- PostgreSQL 16
- Docker & Docker Compose
- JWT (passport-jwt)
- Jest (unit tests & e2e)
- Swagger (API docs)
- Postman (colecciones de prueba)

---

## 🐳 Levantar con Docker

1. **Importante**: antes de levantar los contenedores, asegurate de tener un archivo `.env`.  
Si no existe, podés crearlo duplicando el `.env.example`:

```bash
cp .env.example .env
```
Editar env a su gusto y necesidades. 
2. Montar API :
   ```bash
   docker compose up --build -d
   ```

   Esto levanta:
   - **pg_nest** → PostgreSQL
   - **nest_api** → API NestJS (con migraciones y seeds al inicio)

3.Ya esta listo para usar:
   - API: [http://localhost:3000/v1](http://localhost:3000/v1)

---

## 🛠️ Scripts útiles

```bash
# Desarrollo
npm run start:dev

# Compilación
npm run build

# Migraciones
npm run migration:generate
npm run migration:run

# Seeds
npm run seed
npm run seed:prod

# Tests
npm run test
```

---

## 🔑 Autenticación

- **Login**: \`POST /v1/auth/login\`
- Devuelve un \`accessToken\`.
- El token debe enviarse en los demás requests:
  ```http
  Authorization: Bearer <token>
  ```

- **Auth Me**: \`GET /v1/auth/me\`

---

## 📂 Endpoints principales

### Users
- \`POST /v1/users\` → Crear usuario
- \`GET /v1/users\` → Listar usuarios (requiere permiso)
- \`GET /v1/users/:id\` → Ver un usuario
- \`PATCH /v1/users/:id\` → Actualizar usuario
- \`DELETE /v1/users/:id\` → Eliminar usuario

### Roles
- \`POST /v1/roles\` → Crear rol
- \`GET /v1/roles\` → Listar roles
- \`GET /v1/roles/:id\` → Ver rol
- \`PATCH /v1/roles/:id\` → Actualizar rol
- \`DELETE /v1/roles/:id\` → Eliminar rol

### Permissions
- \`POST /v1/permissions\` → Crear permiso
- \`GET /v1/permissions\` → Listar permisos
- \`GET /v1/permissions/:id\` → Ver permiso
- \`PATCH /v1/permissions/:id\` → Actualizar permiso
- \`DELETE /v1/permissions/:id\` → Eliminar permiso

---

## 🧪 Testing

###  Jest
```bash
npm install
npm run test
```

### Postman & Newman
La colección \`Challenge API.postman_collection.json\` incluye los request de toda la api.


Tambien cuenta con una carpeta llamada E2E Flow que si se ejecuta el RUN de esa carpeta en postman , se puede ver lo siguiente :
1. Login User → no ve salary ni usuarios
2. Login Manager → ve salary y usuarios, no puede actualizar roles
3. Login Admin → puede actualizar roles

---
## 🔒 Roles & Permissions

El sistema implementa **Role-Based Access Control (RBAC)** con un nivel adicional de permisos granulares.

### Roles
- Cada **usuario** tiene asignado un **rol** (ej: `user`, `manager`, `admin`).
- Los roles agrupan un conjunto de **permisos**.

### Permisos
- Definidos en la entidad `Permission`.
- Cada permiso tiene:
   - `name`: nombre descriptivo (ej. "View all users")
   - `slug`: identificador único (ej. `view_all_users`)
   - `fields_show`: array de strings que indica qué campos sensibles puede ver el usuario (ej. `["salary"]`).

### Guards
Se utilizan guards para validar:
- **JwtAuthGuard** → valida que el request tenga un token JWT válido.
- **RolesPermissionsGuard** → valida que el usuario tenga el rol o permisos necesarios para ejecutar la acción.
- **UserOwnershipGuard** → asegura que un usuario solo pueda acceder a sus propios recursos, salvo que tenga permisos globales.

### Ejemplos
- Un usuario con rol **User**:
   - Puede acceder a `/auth/me` → pero no ve el campo `salary`.
   - No puede listar otros usuarios.
- Un **Manager**:
   - Puede ver usuarios con sus `salary`.
   - No puede modificar roles.
- Un **Admin**:
   - Tiene permisos completos (crear, actualizar y eliminar roles, usuarios y permisos).

Este diseño permite **flexibilidad**: los permisos se pueden asignar dinámicamente a distintos roles sin cambiar el código.

## ✅ Escenarios probados
- Acceso autorizado vs. no autorizado
- Recursos propios vs. recursos de otros usuarios
- Restricciones de roles y permisos
- Filtrado de atributos sensibles (ej. \`salary\`)
---

## 📌 Makefile (atajos para prod)
```makefile
build:
docker compose build

up:
docker compose up --build -d

migrate:
docker compose exec api npm run migration:run:prod

seed:
docker compose exec api npm run seed:prod

test:
docker compose exec api npm run test
```

---

