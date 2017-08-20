import * as mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

type MongoConnection = undefined | Promise<mongodb.Db>;

const settings = {
  mongoConfig: {
    serverUrl: "mongo://localhost:27017/",
    database : "structures-cms"
  }
};

const fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection: MongoConnection = undefined;

const connectDb = () => {
  if (!_connection) {
    _connection = MongoClient.connect(fullMongoUrl)
      .then(db => {
          return db;
      });
  }

  return _connection;
};

export default connectDb;
