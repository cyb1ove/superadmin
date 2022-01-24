import mongoose, { ConnectOptions } from 'mongoose';
import config from './index';

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
