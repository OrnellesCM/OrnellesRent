
const db = require('../config/db');

exports.listarVeiculos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM veiculos');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar veículos:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.cadastrarVeiculo = async (req, res) => {
    const { marca, modelo, cor, ano, placa, preco_diaria, categoria } = req.body;
    
    if (!marca || !placa || !categoria) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    const sql = `INSERT INTO veiculos (marca, modelo, cor, ano, placa, preco_diaria, categoria) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    try {
        const [result] = await db.query(sql, [marca, modelo, cor, ano, placa, preco_diaria, categoria]);
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Veículo cadastrado com sucesso!' 
        });
    } catch (error) {
        console.error("Erro ao cadastrar veículo:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Placa já cadastrada.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.buscarVeiculos = async (req, res) => {
    const { marca, modelo, preco_max, disponibilidade, categoria } = req.query; 

    let sql = 'SELECT * FROM veiculos WHERE 1=1';
    const params = [];

    if (marca) {
        sql += ' AND marca = ?';
        params.push(marca);
    }
    if (modelo) {
        sql += ' AND modelo = ?';
        params.push(modelo);
    }
    if (preco_max) {
        sql += ' AND preco_diaria <= ?';
        params.push(preco_max);
    }
    if (disponibilidade) {
        sql += ' AND disponibilidade = ?';
        params.push(disponibilidade === '1' ? 1 : 0);
    }
    if (categoria) {
        sql += ' AND categoria = ?';
        params.push(categoria);
    }

    try {
        const [rows] = await db.query(sql, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar veículos:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
