
const db = require('../config/db');

const calcularDias = (dataInicio, dataFim) => {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diferencaMs = fim - inicio;
    return Math.ceil(diferencaMs / (1000 * 60 * 60 * 24)); 
};

exports.criarLocacao = async (req, res) => {
    const { veiculo_id, cliente_id, data_inicio, data_fim } = req.body;

    if (!veiculo_id || !cliente_id || !data_inicio || !data_fim) {
        return res.status(400).json({ message: 'Todos os campos de locação são obrigatórios.' });
    }

    let connection;
    try {
        const [veiculos] = await db.query('SELECT preco_diaria, disponibilidade FROM veiculos WHERE id = ?', [veiculo_id]);

        if (veiculos.length === 0) {
            return res.status(404).json({ message: 'Veículo não encontrado.' });
        }
        const veiculo = veiculos[0];

        if (veiculo.disponibilidade === 0) {
            return res.status(409).json({ message: 'Veículo indisponível para locação.' });
        }

        const dias = calcularDias(data_inicio, data_fim);
        if (dias <= 0) {
             return res.status(400).json({ message: 'A data final deve ser posterior à data inicial.' });
        }
        const valor_total = dias * veiculo.preco_diaria;
        
        connection = await db.getConnection();
        await connection.beginTransaction();

        const sqlLocacao = `INSERT INTO locacoes (veiculo_id, cliente_id, data_inicio, data_fim, valor_total, status) 
                            VALUES (?, ?, ?, ?, ?, 'ativa')`;
        const [locacaoResult] = await connection.query(sqlLocacao, [veiculo_id, cliente_id, data_inicio, data_fim, valor_total]);
        
        const sqlUpdateVeiculo = 'UPDATE veiculos SET disponibilidade = 0 WHERE id = ?';
        await connection.query(sqlUpdateVeiculo, [veiculo_id]);

        await connection.commit();

        res.status(201).json({ 
            id: locacaoResult.insertId, 
            valor_total: valor_total,
            message: 'Locação criada com sucesso. Veículo indisponibilizado.' 
        });

    } catch (error) {
        console.error("Erro ao criar locação:", error);
        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ message: 'Erro interno ao processar locação.' });
    } finally {
        if (connection) connection.release();
    }
};

exports.finalizarLocacao = async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        const [locacoes] = await db.query('SELECT veiculo_id, status FROM locacoes WHERE id = ?', [id]);

        if (locacoes.length === 0) {
            return res.status(404).json({ message: 'Locação não encontrada.' });
        }
        if (locacoes[0].status !== 'ativa') {
             return res.status(400).json({ message: 'Esta locação já foi concluída ou cancelada.' });
        }

        const veiculo_id = locacoes[0].veiculo_id;

        connection = await db.getConnection();
        await connection.beginTransaction();

        const sqlUpdateLocacao = "UPDATE locacoes SET status = 'concluida' WHERE id = ?";
        await connection.query(sqlUpdateLocacao, [id]);
        
        const sqlUpdateVeiculo = 'UPDATE veiculos SET disponibilidade = 1 WHERE id = ?';
        await connection.query(sqlUpdateVeiculo, [veiculo_id]);

        await connection.commit();

        res.status(200).json({ 
            message: 'Locação finalizada com sucesso. Veículo liberado.' 
        });

    } catch (error) {
        console.error("Erro ao finalizar locação:", error);
        if (connection) {
            await connection.rollback(); 
        }
        res.status(500).json({ message: 'Erro interno ao finalizar locação.' });
    } finally {
        if (connection) connection.release();
    }
};
exports.listarLocacoesAtivas = async (req, res) => {
    try {
        const sql = `
            SELECT 
                L.id, C.nome_completo AS cliente, V.marca, V.modelo, L.data_inicio, L.data_fim, L.valor_total, L.status
            FROM locacoes L
            JOIN clientes C ON L.cliente_id = C.id
            JOIN veiculos V ON L.veiculo_id = V.id
            WHERE L.status = 'ativa'
            ORDER BY L.data_inicio DESC;
        `;
        const [rows] = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar locações:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};