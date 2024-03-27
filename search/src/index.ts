import server from "./server";
import { config as dotenvConfig } from 'dotenv';

/** Config to read environment variables */
dotenvConfig({path: '../.env'});

try {
    const PORT = process.env.SEARCH_SERVICE_PORT;
    server.listen(PORT, () => {
        console.log(`Server run on port ${PORT}`);
    });
} catch (err) {
  console.error(err);
}
