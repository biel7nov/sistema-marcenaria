import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// --- ÍCONES SVG PUROS ---
const IconDashboard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
const IconPedidos = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
const IconEstoque = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
const IconEquipe = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IconDiarias = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconCompras = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
const IconMarcenaria = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8h14v12"/><path d="M9 12h6"/><path d="M12 8V4"/></svg>

function App() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard')

  // --- ESTADOS ---
  const [nome, setNome] = useState(''); const [cargo, setCargo] = useState(''); const [valorDiaria, setValorDiaria] = useState('');
  const [funcionarios, setFuncionarios] = useState([])

  const [dataCompra, setDataCompra] = useState(''); const [descricaoCompra, setDescricaoCompra] = useState(''); const [valorCompra, setValorCompra] = useState(''); const [numeroNota, setNumeroNota] = useState(''); const [compradorId, setCompradorId] = useState('');
  const [compras, setCompras] = useState([])

  // NOVO: Adicionado tipoMaterial nos estados de pedidos
  const [clienteNome, setClienteNome] = useState(''); const [descricaoProjeto, setDescricaoProjeto] = useState(''); const [tipoMaterial, setTipoMaterial] = useState(''); const [valorTotal, setValorTotal] = useState(''); const [dataEntrega, setDataEntrega] = useState(''); const [responsavelId, setResponsavelId] = useState(''); const [statusPedido, setStatusPedido] = useState('Orçamento');
  const [pedidos, setPedidos] = useState([])

  const [nomeItem, setNomeItem] = useState(''); const [qtdAtual, setQtdAtual] = useState(''); const [qtdMinima, setQtdMinima] = useState('');
  const [estoque, setEstoque] = useState([]); const [estoqueEmEdicao, setEstoqueEmEdicao] = useState(null);

  const [dataTrabalho, setDataTrabalho] = useState(''); const [funcionarioDiariaId, setFuncionarioDiariaId] = useState(''); const [valorDiariaAplicado, setValorDiariaAplicado] = useState(''); const [horasTrabalhadas, setHorasTrabalhadas] = useState('8');
  const [diarias, setDiarias] = useState([])

  // --- CARGA INICIAL ---
  useEffect(() => {
    buscarFuncionarios(); buscarCompras(); buscarPedidos(); buscarEstoque(); buscarDiarias();
  }, [])

  // --- FUNÇÕES DE BUSCA ---
  const buscarFuncionarios = async () => { const { data } = await supabase.from('funcionarios').select('*').order('criado_em', { ascending: false }); if (data) setFuncionarios(data) }
  const buscarCompras = async () => { const { data } = await supabase.from('compras_notas').select('*, funcionarios(nome)').order('data_compra', { ascending: false }); if (data) setCompras(data) }
  const buscarPedidos = async () => { const { data } = await supabase.from('pedidos').select('*, funcionarios(nome)').order('data_entrega', { ascending: true }); if (data) setPedidos(data) }
  const buscarEstoque = async () => { const { data } = await supabase.from('estoque').select('*').order('nome_item', { ascending: true }); if (data) setEstoque(data) }
  const buscarDiarias = async () => { const { data } = await supabase.from('registro_diarias').select('*, funcionarios(nome)').order('data_trabalho', { ascending: false }); if (data) setDiarias(data) }

  // --- CÁLCULOS DO DASHBOARD ---
  const totalPedidos = pedidos.reduce((acc, ped) => acc + (ped.valor_total || 0), 0)
  const totalCompras = compras.reduce((acc, comp) => acc + (comp.valor || 0), 0)
  const totalDiariasPagas = diarias.filter(d => d.pago).reduce((acc, d) => acc + (d.valor_diaria_aplicado || 0), 0)
  const totalDiariasPendentes = diarias.filter(d => !d.pago).reduce((acc, d) => acc + (d.valor_diaria_aplicado || 0), 0)
  const lucroEstimado = totalPedidos - totalCompras - totalDiariasPagas - totalDiariasPendentes

  // --- FUNÇÕES DE CADASTRO E EDIÇÃO ---
  const cadastrarFuncionario = async (e) => { e.preventDefault(); const { error } = await supabase.from('funcionarios').insert([{ nome, cargo, valor_diaria: parseFloat(valorDiaria) }]); if (!error) { setNome(''); setCargo(''); setValorDiaria(''); buscarFuncionarios() } }
  const cadastrarCompra = async (e) => { e.preventDefault(); const { error } = await supabase.from('compras_notas').insert([{ data_compra: dataCompra, descricao_compra: descricaoCompra, valor: parseFloat(valorCompra), numero_nota: numeroNota, comprador_id: compradorId || null }]); if (!error) { setDataCompra(''); setDescricaoCompra(''); setValorCompra(''); setNumeroNota(''); setCompradorId(''); buscarCompras() } }
  
  const cadastrarPedido = async (e) => { 
    e.preventDefault(); 
    const { error } = await supabase.from('pedidos').insert([{ 
      cliente_nome: clienteNome, 
      descricao_projeto: descricaoProjeto, 
      tipo_material: tipoMaterial, // NOVO: Salvando o tipo de material
      valor_total: parseFloat(valorTotal), 
      data_entrega: dataEntrega, 
      responsavel_id: responsavelId || null, 
      status: statusPedido 
    }]); 
    if (!error) { 
      setClienteNome(''); setDescricaoProjeto(''); setTipoMaterial(''); setValorTotal(''); setDataEntrega(''); setResponsavelId(''); setStatusPedido('Orçamento'); 
      buscarPedidos(); 
    } 
  }

  const alterarStatusPedido = async (id, novoStatus) => { const { error } = await supabase.from('pedidos').update({ status: novoStatus }).eq('id', id); if (!error) buscarPedidos() }
  const salvarItemEstoque = async (e) => { e.preventDefault(); if (estoqueEmEdicao) { const { error } = await supabase.from('estoque').update({ nome_item: nomeItem, quantidade_atual: parseInt(qtdAtual), quantidade_minima: parseInt(qtdMinima) }).eq('id', estoqueEmEdicao); if (!error) { setNomeItem(''); setQtdAtual(''); setQtdMinima(''); setEstoqueEmEdicao(null); buscarEstoque() } } else { const { error } = await supabase.from('estoque').insert([{ nome_item: nomeItem, quantidade_atual: parseInt(qtdAtual), quantidade_minima: parseInt(qtdMinima) }]); if (!error) { setNomeItem(''); setQtdAtual(''); setQtdMinima(''); buscarEstoque() } } }
  const iniciarEdicaoEstoque = (item) => { setNomeItem(item.nome_item); setQtdAtual(item.quantidade_atual); setQtdMinima(item.quantidade_minima); setEstoqueEmEdicao(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  const cancelarEdicaoEstoque = () => { setNomeItem(''); setQtdAtual(''); setQtdMinima(''); setEstoqueEmEdicao(null); }

  const handleSelecionarFuncionarioDiaria = (e) => {
    const idSelecionado = e.target.value; setFuncionarioDiariaId(idSelecionado)
    const funcEncontrado = funcionarios.find(f => f.id === idSelecionado)
    if (funcEncontrado) setValorDiariaAplicado(funcEncontrado.valor_diaria)
    else setValorDiariaAplicado('')
  }
  const registrarDiaria = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('registro_diarias').insert([{ funcionario_id: funcionarioDiariaId, data_trabalho: dataTrabalho, valor_diaria_aplicado: parseFloat(valorDiariaAplicado), horas_trabalhadas: parseFloat(horasTrabalhadas), pago: false }])
    if (!error) { setDataTrabalho(''); setFuncionarioDiariaId(''); setValorDiariaAplicado(''); setHorasTrabalhadas('8'); buscarDiarias() } else alert('Erro ao registrar diária: ' + error.message)
  }
  const alternarPagamentoDiaria = async (id, statusAtual) => { const { error } = await supabase.from('registro_diarias').update({ pago: !statusAtual }).eq('id', id); if (!error) buscarDiarias() }
  
  const corStatus = (status) => { if (status === 'Concluído') return '#22c55e'; if (status === 'Produção') return '#eab308'; return '#cbd5e1'; }

  const btnStyle = (aba) => ({
    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', cursor: 'pointer', border: 'none', 
    backgroundColor: abaAtiva === aba ? '#0f172a' : '#f1f5f9', 
    color: abaAtiva === aba ? '#fff' : '#475569', 
    fontWeight: 'bold', borderRadius: '8px', transition: 'all 0.2s'
  })

  return (
    <div style={{ maxWidth: '950px', margin: '40px auto', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#1e293b' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <IconMarcenaria />
          <div>
            <h1 style={{ margin: 0, color: '#0f172a', fontSize: '24px' }}>Vidal Design e Móveis</h1>
            <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Sistema Interno de Gestão</p>
          </div>
        </div>
        
        {/* MENU COM ÍCONES SVG */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', backgroundColor: '#fff', padding: '10px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <button onClick={() => setAbaAtiva('dashboard')} style={btnStyle('dashboard')}><IconDashboard /> Dashboard</button>
          <button onClick={() => setAbaAtiva('pedidos')} style={btnStyle('pedidos')}><IconPedidos /> Pedidos</button>
          <button onClick={() => setAbaAtiva('estoque')} style={btnStyle('estoque')}><IconEstoque /> Estoque</button>
          <button onClick={() => setAbaAtiva('equipe')} style={btnStyle('equipe')}><IconEquipe /> Equipe</button>
          <button onClick={() => setAbaAtiva('diarias')} style={btnStyle('diarias')}><IconDiarias /> Diárias</button>
          <button onClick={() => setAbaAtiva('compras')} style={btnStyle('compras')}><IconCompras /> Compras</button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        
        {/* TELA 0: DASHBOARD */}
        {abaAtiva === 'dashboard' && (
          <div>
            <h2 style={{ marginTop: 0 }}>Visão Geral da Marcenaria</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
              <div style={{ flex: '1 1 200px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '6px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Total em Pedidos</h4>
                <h2 style={{ margin: 0, color: '#0f172a', fontSize: '28px' }}>R$ {totalPedidos.toFixed(2)}</h2>
              </div>
              <div style={{ flex: '1 1 200px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '6px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Gasto c/ Materiais</h4>
                <h2 style={{ margin: 0, color: '#0f172a', fontSize: '28px' }}>R$ {totalCompras.toFixed(2)}</h2>
              </div>
              <div style={{ flex: '1 1 200px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '6px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Diárias a Pagar</h4>
                <h2 style={{ margin: 0, color: '#0f172a', fontSize: '28px' }}>R$ {totalDiariasPendentes.toFixed(2)}</h2>
              </div>
              <div style={{ flex: '1 1 200px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', borderLeft: `6px solid ${lucroEstimado >= 0 ? '#10b981' : '#ef4444'}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Saldo Estimado</h4>
                <h2 style={{ margin: 0, color: lucroEstimado >= 0 ? '#10b981' : '#ef4444', fontSize: '28px' }}>R$ {lucroEstimado.toFixed(2)}</h2>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '20px' }}>* O saldo estimado diminui o gasto com materiais e as diárias (pagas e pendentes) do valor total dos pedidos cadastrados.</p>
          </div>
        )}

        {/* PADRONIZAÇÃO DE INPUTS PARA AS OUTRAS TELAS */}
        <style>{`
          input, select { border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font-size: 14px; outline: none; transition: border-color 0.2s; }
          input:focus, select:focus { border-color: #3b82f6; }
          th { background-color: #f8fafc; padding: 12px 8px; border-bottom: 2px solid #e2e8f0; color: #475569; }
          td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; }
          button[type="submit"] { background-color: #3b82f6; border-radius: 6px; font-weight: bold; transition: background-color 0.2s; }
          button[type="submit"]:hover { background-color: #2563eb; }
        `}</style>

        {/* TELA 1: PEDIDOS */}
        {abaAtiva === 'pedidos' && (
          <div>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><IconPedidos /> Novo Pedido</h2>
            <form onSubmit={cadastrarPedido} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              <input type="text" placeholder="Nome do Cliente" value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} required />
              <input type="text" placeholder="Descrição do Móvel (ex: Armário Cozinha)" value={descricaoProjeto} onChange={(e) => setDescricaoProjeto(e.target.value)} required />
              
              {/* NOVO: Campo de Tipo de Material */}
              <input type="text" placeholder="Tipo de Material (ex: MDF Branco TX 15mm)" value={tipoMaterial} onChange={(e) => setTipoMaterial(e.target.value)} required />

              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="number" step="0.01" placeholder="Valor Cobrado (R$)" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} required style={{ flex: 1 }} />
                
                {/* Campo de Data de Entrega já existente e destacado */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: 'bold' }}>Prazo de Entrega:</label>
                  <input type="date" value={dataEntrega} onChange={(e) => setDataEntrega(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <select value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)} style={{ flex: 1 }}>
                  <option value="">Sem responsável ainda...</option>
                  {funcionarios.map(func => (<option key={func.id} value={func.id}>{func.nome}</option>))}
                </select>
                <select value={statusPedido} onChange={(e) => setStatusPedido(e.target.value)} required style={{ flex: 1 }}>
                  <option value="Orçamento">Orçamento</option><option value="Produção">Em Produção</option><option value="Concluído">Concluído</option>
                </select>
              </div>
              <button type="submit" style={{ padding: '12px', color: '#fff', border: 'none', cursor: 'pointer' }}>Salvar Pedido</button>
            </form>

            <h3>Painel de Produção</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead><tr><th>ID</th><th>Cliente</th><th>Projeto / Material</th><th>Prazo Entrega</th><th>Responsável</th><th>Status</th></tr></thead>
              <tbody>
                {pedidos.map(ped => (
                  <tr key={ped.id}>
                    <td style={{ fontWeight: 'bold', color: '#64748b' }}>{ped.codigo_pedido || 'N/A'}</td>
                    <td style={{ fontWeight: 'bold' }}>{ped.cliente_nome}</td>
                    <td>
                      {ped.descricao_projeto}
                      {/* NOVO: Exibindo o material logo abaixo da descrição */}
                      {ped.tipo_material && <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Material: {ped.tipo_material}</span>}
                    </td>
                    <td style={{ fontWeight: '500' }}>{ped.data_entrega.split('-').reverse().join('/')}</td>
                    <td>{ped.funcionarios?.nome || 'N/A'}</td>
                    <td>
                      <select value={ped.status} onChange={(e) => alterarStatusPedido(ped.id, e.target.value)} style={{ padding: '6px 10px', backgroundColor: corStatus(ped.status), color: ped.status === 'Orçamento' ? '#333' : '#fff', borderRadius: '6px', border: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>
                        <option value="Orçamento" style={{backgroundColor: '#fff', color: '#333'}}>Orçamento</option><option value="Produção" style={{backgroundColor: '#fff', color: '#333'}}>Em Produção</option><option value="Concluído" style={{backgroundColor: '#fff', color: '#333'}}>Concluído</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TELA 2: ESTOQUE */}
        {abaAtiva === 'estoque' && (
          <div>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><IconEstoque /> {estoqueEmEdicao ? 'Editando Material' : 'Adicionar ao Estoque'}</h2>
            <form onSubmit={salvarItemEstoque} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', padding: estoqueEmEdicao ? '20px' : '0', backgroundColor: estoqueEmEdicao ? '#f1f5f9' : 'transparent', borderRadius: '8px' }}>
              <input type="text" placeholder="Nome do Item (ex: Dobradiça Reta)" value={nomeItem} onChange={(e) => setNomeItem(e.target.value)} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="number" placeholder="Quantidade Atual" value={qtdAtual} onChange={(e) => setQtdAtual(e.target.value)} required style={{ flex: 1 }} />
                <input type="number" placeholder="Quantidade Mínima (Aviso)" value={qtdMinima} onChange={(e) => setQtdMinima(e.target.value)} required style={{ flex: 1 }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ padding: '12px', backgroundColor: estoqueEmEdicao ? '#0f172a' : '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', flex: 1 }}>{estoqueEmEdicao ? 'Atualizar Material' : 'Salvar Material'}</button>
                {estoqueEmEdicao && (
                  <button type="button" onClick={cancelarEdicaoEstoque} style={{ padding: '12px', backgroundColor: '#94a3b8', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '6px', flex: 1 }}>Cancelar</button>
                )}
              </div>
            </form>

            <h3>Controle de Materiais</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead><tr><th>Item</th><th>Qtd Atual</th><th>Qtd Mínima</th><th>Aviso</th><th>Ações</th></tr></thead>
              <tbody>
                {estoque.map(item => {
                  const precisaComprar = item.quantidade_atual <= item.quantidade_minima;
                  return (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 'bold' }}>{item.nome_item}</td><td>{item.quantidade_atual}</td><td>{item.quantidade_minima}</td>
                      <td>{precisaComprar ? <span style={{ padding: '6px 10px', backgroundColor: '#ef4444', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Comprar Mais</span> : <span style={{ padding: '6px 10px', backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Estoque OK</span>}</td>
                      <td><button onClick={() => iniciarEdicaoEstoque(item)} style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Editar</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TELA 3: EQUIPE */}
        {abaAtiva === 'equipe' && (
          <div>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><IconEquipe /> Cadastro de Equipe</h2>
            <form onSubmit={cadastrarFuncionario} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Valor da Diária Padrão (R$)" value={valorDiaria} onChange={(e) => setValorDiaria(e.target.value)} required />
              <button type="submit" style={{ padding: '12px', color: '#fff', border: 'none', cursor: 'pointer' }}>Salvar Funcionário</button>
            </form>

            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead><tr><th>Nome</th><th>Cargo</th><th>Diária Padrão</th></tr></thead>
              <tbody>
                {funcionarios.map(func => (
                  <tr key={func.id}><td style={{ fontWeight: 'bold' }}>{func.nome}</td><td>{func.cargo}</td><td>R$ {func.valor_diaria}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TELA 4: DIÁRIAS */}
        {abaAtiva === 'diarias' && (
          <div>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><IconDiarias /> Lançar Diária</h2>
            <form onSubmit={registrarDiaria} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="date" value={dataTrabalho} onChange={(e) => setDataTrabalho(e.target.value)} required style={{ flex: 1 }} />
                <select value={funcionarioDiariaId} onChange={handleSelecionarFuncionarioDiaria} required style={{ flex: 2 }}>
                  <option value="">Selecione o Funcionário...</option>
                  {funcionarios.map(func => (<option key={func.id} value={func.id}>{func.nome}</option>))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <label style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 'bold' }}>Horas Trabalhadas:</label>
                  <input type="number" step="0.5" value={horasTrabalhadas} onChange={(e) => setHorasTrabalhadas(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <label style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 'bold' }}>Valor a Pagar (R$):</label>
                  <input type="number" step="0.01" value={valorDiariaAplicado} onChange={(e) => setValorDiariaAplicado(e.target.value)} required />
                </div>
              </div>
              <button type="submit" style={{ padding: '12px', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Registrar Diária</button>
            </form>

            <h3>Histórico de Diárias</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead><tr><th>Data</th><th>Funcionário</th><th>Horas</th><th>Valor</th><th>Situação</th></tr></thead>
              <tbody>
                {diarias.map(diaria => (
                  <tr key={diaria.id}>
                    <td>{diaria.data_trabalho.split('-').reverse().join('/')}</td>
                    <td style={{ fontWeight: 'bold' }}>{diaria.funcionarios?.nome || 'N/A'}</td>
                    <td>{diaria.horas_trabalhadas ? `${diaria.horas_trabalhadas}h` : 'N/A'}</td>
                    <td>R$ {diaria.valor_diaria_aplicado}</td>
                    <td>
                      <button onClick={() => alternarPagamentoDiaria(diaria.id, diaria.pago)} style={{ padding: '6px 12px', backgroundColor: diaria.pago ? '#10b981' : '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {diaria.pago ? '✓ PAGO' : 'PENDENTE'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TELA 5: COMPRAS E NOTAS */}
        {abaAtiva === 'compras' && (
          <div>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><IconCompras /> Compras Avulsas</h2>
            <form onSubmit={cadastrarCompra} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              <input type="date" value={dataCompra} onChange={(e) => setDataCompra(e.target.value)} required />
              <input type="text" placeholder="Descrição (ex: Parafusos e cola)" value={descricaoCompra} onChange={(e) => setDescricaoCompra(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Valor (R$)" value={valorCompra} onChange={(e) => setValorCompra(e.target.value)} required />
              <input type="text" placeholder="Número da Nota Fiscal" value={numeroNota} onChange={(e) => setNumeroNota(e.target.value)} />
              <select value={compradorId} onChange={(e) => setCompradorId(e.target.value)} required>
                <option value="">Selecione quem comprou...</option>
                {funcionarios.map(func => (<option key={func.id} value={func.id}>{func.nome}</option>))}
              </select>
              <button type="submit" style={{ padding: '12px', color: '#fff', border: 'none', cursor: 'pointer' }}>Registrar Compra</button>
            </form>

            <h3>Histórico de Compras</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Comprador</th></tr></thead>
              <tbody>
                {compras.map(comp => (
                  <tr key={comp.id}>
                    <td>{comp.data_compra.split('-').reverse().join('/')}</td>
                    <td>{comp.descricao_compra} {comp.numero_nota && <span style={{fontSize: '11px', color: '#64748b', display: 'block'}}>NF: {comp.numero_nota}</span>}</td>
                    <td style={{ fontWeight: 'bold' }}>R$ {comp.valor}</td>
                    <td>{comp.funcionarios?.nome || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default App