import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Insertar valores en Status
    await prisma.state.createMany({
      data: [
        { state_id: 1, name: 'Disponible' },
        { state_id: 2, name: 'No disponible' },
        { state_id: 3, name: 'Completado' },
        { state_id: 4, name: 'Cancelado' },
      ],
    });

    // Insertar valores en Roles
    await prisma.role.createMany({
      data: [
        { role_id: 1, name: 'Administrator', description: "Administrador: Control total del sistema, incluyendo gestión de usuarios, inventario, proveedores y configuraciones. " },
        { role_id: 2, name: 'Inventory Manager', description: "Inventory Manager: Gestiona inventario, proveedores, almacenes y realiza ventas. No puede crear usuarios ni eliminar datos." },
        { role_id: 3, name: 'Sales Associate', description: "Sales Associate: Realiza ventas y visualiza stock; acceso limitado a operaciones de venta. No puede crear usuarios ni eliminar datos." },
      ],
    });

    console.log('Datos predeterminados insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });