const express = require('express');
const app = express();
const pool = require('./db'); // Conexão com o banco de dados
app.use(express.json()); // Para parsear JSON no body das requisições

// Rota para criar uma nova campanha
app.post('/api/campaigns', async (req, res) => {
  try {
    const { name, description, rule_system, user_id } = req.body;

    // Insere a nova campanha no banco
    const newCampaign = await pool.query(
      'INSERT INTO campaigns (name, description, rule_system, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, rule_system, user_id]
    );

    res.json(newCampaign.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para listar todas as campanhas
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await pool.query('SELECT * FROM campaigns');
    res.json(campaigns.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para obter uma campanha por ID
app.get('/api/campaigns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await pool.query('SELECT * FROM campaigns WHERE id = $1', [id]);

    if (campaign.rows.length === 0) {
      return res.status(404).send('Campanha não encontrada');
    }

    res.json(campaign.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para deletar uma campanha
app.delete('/api/campaigns/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCampaign = await pool.query('DELETE FROM campaigns WHERE id = $1', [id]);

    if (deleteCampaign.rowCount === 0) {
      return res.status(404).send('Campanha não encontrada');
    }

    res.send('Campanha deletada com sucesso');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
