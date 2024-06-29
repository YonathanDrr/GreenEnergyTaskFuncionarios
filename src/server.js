import app from './app.js';
import { PORT } from './config.js'; // Importar la configuración

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
