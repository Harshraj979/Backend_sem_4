const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
console.log("DB URL:", process.env.DATABASE_URL);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Customer
const createCustomer = async (name, email) => {
    const customer = await prisma.customer.create({
        data: { name, email },
    });
    console.log("Created:", customer);
};

// Get Customers
const getCustomers = async () => {
    const customers = await prisma.customer.findMany();
    console.log("All Customers:", customers);
};

// Update Customer
const updateCustomer = async (id, name) => {
    const customer = await prisma.customer.update({
        where: { id },
        data: { name },
    });
    console.log("Updated:", customer);
};

// Delete Customer (safe version)
const deleteCustomer = async (id) => {
    const result = await prisma.customer.deleteMany({
        where: { id },
    });
    console.log("Deleted:", result);
};

// Main Function
async function main() {
    console.log("Running...");

    await createCustomer("Anuj", "anuj@example.com");
    await createCustomer("Rahul", "rahul@example.com");

    await getCustomers();

    await updateCustomer(1, "Updated Name");

    await getCustomers();

    await deleteCustomer(1);

    await getCustomers();
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());