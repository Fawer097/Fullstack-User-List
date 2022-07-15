import express from 'express';
import config from 'config';
import admin from 'firebase-admin';
import serviceAccount from './config/databaseKey.json' assert { type: 'json' };
import cors from 'cors';
const app = express();
const PORT = config.get('port') || 3003;
app.use(express.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://fullstack-app-eebb5-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();
const getRef = db.ref('/UserList');

app.post('/api/userData', (req, res) => {
  const userData = { id: Date.now(), ...req.body };
  db.ref('/UserList' + '/User' + userData.id).set(userData);
  res.status(201).json(userData);
});

app.get('/api/userData', (req, res) => {
  getRef.once('value', (snapshot) => {
    const data = snapshot.val();
    const arr = [];
    for (let key in data) {
      arr.push(data[key]);
    }
    res.status(201).json(arr);
  });
});

app.delete('/api/userData', (req, res) => {
  getRef.once('value', (snapshot) => {
    const data = snapshot.val();
    if (req.body.type == 'lastUser') {
      const lastUserKey = Object.keys(data).pop();
      db.ref('/UserList/' + lastUserKey).set(null);
    } else if (req.body.type == 'allUsers') {
      db.ref('/UserList/').set(null);
    }
    res.status(201).json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
