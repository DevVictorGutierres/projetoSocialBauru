import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import projectRouter from './routes/project.routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Gerenciamento de Projetos!');
});