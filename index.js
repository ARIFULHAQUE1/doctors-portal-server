const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aznqac8.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
      try {
            await client.connect();
            const serviceCollection = client.db('doctors-portal').collection('services')

            app.get('/service', async (req, res) => {
                  const query = {};
                  const cursor = serviceCollection.find(query);
                  const service = await cursor.toArray();
                  res.send(service);
            })
      }
      catch {

      }

      finally {

      }

}
run().catch(console.dir())


app.get('/', (req, res) => {
      res.send('Hello Doctor mosahai!')
})

app.listen(port, () => {
      console.log(`Doctor listening on port ${port}`)
})