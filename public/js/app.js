const API_BASE_URL = 'http://localhost:3000/api';
const contentArea = document.getElementById('content-area');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPageContent(page);
    });
});

function loadPageContent(page) {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    contentArea.innerHTML = `<h2>Carregando ${page}...</h2>`;
    
    switch (page) {
        case 'veiculos':
            renderVeiculosPage();
            break;
        case 'clientes':
            renderClientesPage();
            break;
        case 'locacoes':
            break;
        default:
            contentArea.innerHTML = '<h1>Bem-vindo!</h1>';
    }
}
async function fetchVeiculos() {
    try {
        const response = await fetch(`${API_BASE_URL}/veiculos`);
        if (!response.ok) throw new Error('Falha ao buscar veículos.');
        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        contentArea.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        return [];
    }
}

async function renderVeiculosPage() {
    const veiculos = await fetchVeiculos();
    
    let html = `
        <h2 class="mb-4">Gerenciamento de Veículos</h2>
        <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalCadastroVeiculo">
            + Cadastrar Novo Veículo
        </button>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="bg-primary text-white">
                    <tr>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Diária (R$)</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
    `;

    veiculos.forEach(v => {
        const statusBadge = v.disponibilidade 
            ? '<span class="badge bg-success">Disponível</span>' 
            : '<span class="badge bg-danger">Locado</span>';
            
        html += `
            <tr>
                <td>${v.placa}</td>
                <td>${v.marca}</td>
                <td>${v.modelo}</td>
                <td>${v.ano}</td>
                <td>${v.preco_diaria.toFixed(2)}</td>
                <td>${v.categoria.toUpperCase()}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-warning">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;
    
    contentArea.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadPageContent('veiculos');
});

async function fetchClientes() {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes`);
        if (!response.ok) throw new Error('Falha ao buscar clientes.');
        return await response.json();
    } catch (error) {
        console.error("Erro na API de Clientes:", error);
        return [];
    }
}

async function renderClientesPage() {
    const clientes = await fetchClientes();
    
    let html = `
        <h2 class="mb-4">Gerenciamento de Clientes</h2>
        <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalCadastroCliente">
            + Cadastrar Novo Cliente
        </button>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="bg-info text-white">
                    <tr>
                        <th>Nome Completo</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Nasc.</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
    `;

    clientes.forEach(c => {
        const dataNasc = new Date(c.data_nascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            
        html += `
            <tr>
                <td>${c.nome_completo}</td>
                <td>${c.email}</td>
                <td>${c.telefone || 'N/A'}</td>
                <td>${dataNasc}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="viewHistorico(${c.id}, '${c.nome_completo}')">Histórico</button>
                    <button class="btn btn-sm btn-warning">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
        `;
    
    contentArea.innerHTML = html;
}
async function viewHistorico(clienteId, nomeCliente) {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes/${clienteId}/historico`);
        const data = await response.json();
        
        let historicoHtml = `<h4>Histórico de Locações para ${nomeCliente}</h4>`;
        
        if (data.historico && data.historico.length === 0 || data.length === 0) {
            historicoHtml += '<p class="alert alert-warning">Este cliente não possui locações registradas.</p>';
        } else {
            const locacoes = data.historico || data;
            historicoHtml += `<ul class="list-group">`;
            locacoes.forEach(loc => {
                const inicio = new Date(loc.data_inicio).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                const fim = new Date(loc.data_fim).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                const statusBadge = loc.status === 'concluida' 
                    ? '<span class="badge bg-success">CONCLUÍDA</span>' 
                    : '<span class="badge bg-primary">ATIVA</span>';

                historicoHtml += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            Veículo: <strong>${loc.marca} ${loc.modelo}</strong> (${loc.placa}) <br>
                            Período: ${inicio} a ${fim} | Total: R$ ${loc.valor_total.toFixed(2)}
                        </div>
                        ${statusBadge}
                    </li>
                `;
            });
            historicoHtml += `</ul>`;
        }

        document.getElementById('historico-modal-body').innerHTML = historicoHtml;
        const historicoModal = new bootstrap.Modal(document.getElementById('historicoModal'));
        historicoModal.show();

    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        alert('Não foi possível carregar o histórico de locações.');
    }
}
async function fetchLocacoesAtivas() {
    try {
        const response = await fetch(`${API_BASE_URL}/locacoes/ativas`);
        if (!response.ok) throw new Error('Falha ao buscar locações ativas.');
        return await response.json();
    } catch (error) {
        console.error("Erro na API de Locações:", error);
        return [];
    }
}

async function renderLocacoesPage() {
    const locacoes = await fetchLocacoesAtivas();
    
    let html = `
        <h2 class="mb-4">Locações Ativas</h2>
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalCriarLocacao">
            + Criar Nova Locação
        </button>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="bg-warning text-dark">
                    <tr>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Início</th>
                        <th>Fim</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
    `;

    locacoes.forEach(loc => {
        const inicio = new Date(loc.data_inicio).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        const fim = new Date(loc.data_fim).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

        html += `
            <tr>
                <td>${loc.cliente}</td>
                <td>${loc.marca} ${loc.modelo}</td>
                <td>${inicio}</td>
                <td>${fim}</td>
                <td>R$ ${loc.valor_total.toFixed(2)}</td>
                <td><span class="badge bg-primary">${loc.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="confirmDevolucao(${loc.id})">Devolução</button>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;
    
    contentArea.innerHTML = html;
}


async function confirmDevolucao(locacaoId) {
    if (!confirm('Tem certeza que deseja finalizar e registrar a devolução desta locação?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/locacoes/${locacaoId}/devolucao`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao finalizar locação.');
        }

        alert('Devolução registrada com sucesso! Veículo liberado.');
        renderLocacoesPage();

    } catch (error) {
        console.error("Erro na devolução:", error);
        alert(`Erro: ${error.message}`);
    }
}

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
async function carregarDadosLocacaoModal() {
    const selectCliente = document.getElementById('selectCliente');
    const selectVeiculo = document.getElementById('selectVeiculo');

    try {
        const clientes = await fetchClientes(); 
        selectCliente.innerHTML = '<option value="" disabled selected>Selecione o Cliente</option>';
        clientes.forEach(c => {
            selectCliente.innerHTML += `<option value="${c.id}">${c.nome_completo} (${c.email})</option>`;
        });
    } catch (e) {
        selectCliente.innerHTML = '<option value="" disabled selected>Erro ao carregar clientes</option>';
    }

    try {
        const response = await fetch(`${API_BASE_URL}/veiculos/busca?disponibilidade=1`);
        const veiculos = await response.json();
        selectVeiculo.innerHTML = '<option value="" disabled selected>Selecione o Veículo</option>';
        veiculos.forEach(v => {
            selectVeiculo.innerHTML += `<option value="${v.id}" data-preco="${v.preco_diaria}">${v.marca} ${v.modelo} (${v.placa}) - R$ ${v.preco_diaria.toFixed(2)}/dia</option>`;
        });
    } catch (e) {
        selectVeiculo.innerHTML = '<option value="" disabled selected>Erro ao carregar veículos</option>';
    }
}

document.getElementById('modalCriarLocacao').addEventListener('show.bs.modal', carregarDadosLocacaoModal);

const formCliente = document.getElementById('formCliente');

formCliente.addEventListener('submit', async (e) => {
    e.preventDefault();

    const clienteData = {
        nome_completo: document.getElementById('nomeCliente').value,
        email: document.getElementById('emailCliente').value,
        telefone: document.getElementById('telefoneCliente').value,
        endereco: document.getElementById('enderecoCliente').value,
        sexo: document.getElementById('sexoCliente').value,
        data_nascimento: document.getElementById('dataNascCliente').value,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao cadastrar cliente.');
        }

        alert('Cliente cadastrado com sucesso!');
        bootstrap.Modal.getInstance(document.getElementById('modalCadastroCliente')).hide();
        formCliente.reset();
        renderClientesPage();

    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert(`Erro: ${error.message}`);
    }
});


const dataInicioInput = document.getElementById('dataInicio');
const dataFimInput = document.getElementById('dataFim');
const selectVeiculoLocacao = document.getElementById('selectVeiculo');
const valorTotalDisplay = document.getElementById('valorTotalDisplay');

function calcularValorLocacao() {
    const dataInicio = dataInicioInput.value;
    const dataFim = dataFimInput.value;
    const veiculoOption = selectVeiculoLocacao.options[selectVeiculoLocacao.selectedIndex];
    
    if (!dataInicio || !dataFim || !veiculoOption || !veiculoOption.value) {
        valorTotalDisplay.innerHTML = 'Preencha datas e selecione o veículo.';
        return 0;
    }

    const precoDiaria = parseFloat(veiculoOption.getAttribute('data-preco'));
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (fim <= inicio) {
        valorTotalDisplay.innerHTML = '<span class="text-danger">A data de devolução deve ser posterior à de início.</span>';
        return 0;
    }

    const diferencaMs = fim - inicio;
    const dias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
    const valorTotal = dias * precoDiaria;

    valorTotalDisplay.innerHTML = `Valor total (estimado para ${dias} diárias): **R$ ${valorTotal.toFixed(2)}**`;
    return valorTotal;
}

dataInicioInput.addEventListener('change', calcularValorLocacao);
dataFimInput.addEventListener('change', calcularValorLocacao);
selectVeiculoLocacao.addEventListener('change', calcularValorLocacao);


const formLocacao = document.getElementById('formLocacao');

formLocacao.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const valor_total_calculado = calcularValorLocacao();

    if (valor_total_calculado <= 0) {
        alert("Não foi possível criar a locação. Verifique as datas e a seleção do veículo.");
        return;
    }

    const locacaoData = {
        veiculo_id: parseInt(document.getElementById('selectVeiculo').value),
        cliente_id: parseInt(document.getElementById('selectCliente').value),
        data_inicio: document.getElementById('dataInicio').value,
        data_fim: document.getElementById('dataFim').value,

    };

    try {
        const response = await fetch(`${API_BASE_URL}/locacoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locacaoData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao criar locação.');
        }

        alert(`Locação criada com sucesso! Valor final: R$ ${result.valor_total.toFixed(2)}`);
        
        bootstrap.Modal.getInstance(document.getElementById('modalCriarLocacao')).hide();
        formLocacao.reset();
        renderLocacoesPage(); 

    } catch (error) {
        console.error("Erro na criação da locação:", error);
        alert(`Erro: ${error.message}`);
    }
});