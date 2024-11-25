import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
};

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });

// Linux ou Mac pode desconsiderar o bloco acima e colocar apenas a instrução abaixo
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota para recuperar uma lista de todos os posts (get)
    app.get("/posts", listarPosts);

    // Rota para criar um novo post (post)
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;