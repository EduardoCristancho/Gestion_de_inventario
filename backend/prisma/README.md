# Configuración Inicial del Proyecto

1. Base de Datos:
   - Crear una base de datos en PostgreSQL llamada "db_inventario".
   - Crear un usuario con los permisos necesarios o utilizar el usuario predeterminado.

2. Archivo `.env`:
   - Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/BASE_DE_DATOS"

3. Generar Cliente de Prisma:
- Ubicate en la carpeta `backend` en el terminal.
- Ejecuta `npx prisma generate` para generar el cliente de Prisma.

4. Aplicar Migraciones:
- Ejecuta `npx prisma migrate dev --name tu_nombre_de_migracion` para crear las tablas en la base de datos.
- Por ejemplo: `npx prisma migrate dev --name add_initial_tables`

y listo :)))))