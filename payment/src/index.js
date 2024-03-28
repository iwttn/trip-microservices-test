import ServerExpress from "./app.js";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: "../.env" });

try {
  const PORT = process.env.PAYMENT_SERVICE_PORT;
  ServerExpress.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
  });
} catch (err) {
  console.error(err.message);
}
