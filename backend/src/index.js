import express from 'express';
import cors from 'cors';
import CONFIG from './utils/config.js';
import routes from './routes/index.js';

const app = express();
const main = () => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use('/', routes);
    app.listen(CONFIG.PORT, () => console.log(`Server running on port ${CONFIG.PORT}`));
  } catch (error) {
    console.log(error);
  }
};

main();
