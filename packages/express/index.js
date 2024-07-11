/* eslint-disable @typescript-eslint/no-var-requires */
const {existsSync, mkdirSync, readdirSync, copyFileSync, unlinkSync} = require('fs');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = 3003;
const PHOTO_DIR = `data/source`;

app.use(cors());
app.use(express.json());
app.use('/photos', express.static('data/source'));

app.get('/', (req, res) => {
  if (!existsSync(PHOTO_DIR)) {
    mkdirSync(PHOTO_DIR, {recursive: true});
  }

  res.send(readdirSync(PHOTO_DIR));
});

app.post('/', (req, res) => {
  const {filename, status} = req.body;
  const path = `${PHOTO_DIR}/${filename}`;
  if (!existsSync(path)) {
    res.send('file not found');
  }

  const movedPath = PHOTO_DIR.replace('source', status);
  if (!existsSync(movedPath)) {
    mkdirSync(movedPath, {recursive: true});
  }

  copyFileSync(path, `${movedPath}/${filename}`);
  unlinkSync(path);

  res.send({message: 'ok'});
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
