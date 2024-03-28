import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function createPaymentService({indentifierReserve , passengers}) {
  try {
    const mockPath = `${process.cwd()}/src/mocks/payments.mock.json`;
    const mockPayments = await fs.readFile(mockPath, "utf-8");

    if (!mockPayments) {
      throw new Error("No se pudo acceder a los pagos.");
    }
    
    const paymentCode = uuidv4();

    const jsonPayments = JSON.parse(mockPayments);
    jsonPayments.payments.push({
      reserves: indentifierReserve,
      passengers: passengers,
      paymentCode,
      paymentStatus: 0,
    });

    const newJsonPayments = JSON.stringify(jsonPayments);
    await fs.writeFile(mockPath, newJsonPayments, "utf-8");

    return { message: "Se creo el pago correctamente.", created: true, paymentCode };

  } catch (err) {
    console.error(`Error:`, err.message);
    return {
      message: "Hubo un problema al crear el pago",
      created: false,
    };
  }
}

export async function generatePayService(paymentCode) {
  try {
    const mockPath = `${process.cwd()}/src/mocks/payments.mock.json`;
    const mockPayments = await fs.readFile(mockPath, "utf-8");

    if (!mockPayments) {
      throw new Error("No se pudo acceder a los pagos.");
    }

    const jsonPayments = JSON.parse(mockPayments);
    const reservePayment = jsonPayments.payments.find(e => e.paymentCode == paymentCode);

    if(!reservePayment) return { message: "No existe un pago para esta reserva.", created: false };

    if(reservePayment.paymentStatus === 1) return { message: "La reserva ya fue pagada.", created: false };

    reservePayment.paymentStatus = 1;
    const newJsonPayments = JSON.stringify(jsonPayments);
    await fs.writeFile(mockPath, newJsonPayments, "utf-8");

    const ticketInfo = reservePayment.passengers.map(({name, lastname, seat}) => ({
      "Nombre completo" : `${name} ${lastname}`,
      "Asiento" : seat
    }))

    return { message: "Se realizo el pago correctamente.", created: true, ticket : {
      info : ticketInfo
    }};

  } catch (err) {
    console.error(`Error:`, err.message);
    return {
      message: "Hubo un problema al pagar la reserva.",
      created: false,
    };
  }
}
