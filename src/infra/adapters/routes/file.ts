import express from "express";
import handle_file from '../contexts/handle_files'
const app = express.Router();

app.get('/:type/:name', (req, res) => { handle_file.serveFileRequested(req, res) });

export default app;