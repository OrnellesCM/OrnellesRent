
const db = require('../config/db');

exports.cadastrarCliente = async (req, res) => {
    const { nome_completo, email, telefone, endereco, sexo, data_nascimento } = req.body;
    
    if (!nome_completo || !email || !data_nascimento) {
        return res.status(400).json({ message: 'Nome, e-mail e data de nascimento são obrigatórios.' });
    }

    const sql = `INSERT INTO clientes (nome_completo, email, telefone, endereco, sexo, data_nascimento) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    try {
        const [result] = await db.query(sql, [nome_completo, email, telefone, endereco, sexo, data_nascimento]);
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Cliente cadastrado com sucesso!' 
        });
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'E-mail já cadastrado.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.listarClientes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, nome_completo, email, telefone, data_nascimento FROM clientes ORDER BY nome_completo ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.modificarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome_completo, email, telefone, endereco, sexo, data_nascimento } = req.body;

    const sql = `UPDATE clientes SET 
                 nome_completo = ?, email = ?, telefone = ?, endereco = ?, sexo = ?, data_nascimento = ?
                 WHERE id = ?`;
    
    try {
        const [result] = await db.query(sql, [nome_completo, email, telefone, endereco, sexo, data_nascimento, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        console.error("Erro ao modificar cliente:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.excluirCliente = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.mostrarHistorico = async (req, res) => {
    const { id } = req.params;
    
    const sqlHistorico = `
        SELECT 
            L.id AS locacao_id, 
            L.data_inicio, 
            L.data_fim, 
            L.valor_total, 
            L.status,
            V.marca, 
            V.modelo, 
            V.placa,
            V.categoria
        FROM locacoes L
        JOIN veiculos V ON L.veiculo_id = V.id
        WHERE L.cliente_id = ?
        ORDER BY L.data_inicio DESC;
    `;
    
    try {
        const [locacoes] = await db.query(sqlHistorico, [id]);
        
        if (locacoes.length === 0) {
            return res.status(200).json({ message: 'Nenhuma locação encontrada para este cliente.', historico: [] });
        }

        res.status(200).json(locacoes);
    } catch (error) {
        console.error("Erro ao buscar histórico de locação:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};