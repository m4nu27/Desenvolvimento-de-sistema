 // Array para armazenar as pessoas cadastradas
 var pessoas = [];

 // Array para armazenar os protocolos registrados
 var protocolos = [];

 // Referências aos elementos HTML
 var formPessoa = document.getElementById('formPessoa');
 var formProtocolo = document.getElementById('formProtocolo');
 var tabelaPessoas = document.getElementById('tabelaPessoas');
 var tabelaProtocolos = document.getElementById('tabelaProtocolos');
 var btnCancelar = document.getElementById('btnCancelar');
 var btnCancelarProtocolo = document.getElementById('btnCancelarProtocolo');

 // Função para gerar um ID automático
 function gerarIdAutomatico(array) {
     if (array.length === 0) {
         return 1;
     } else {
         var ultimoItem = array[array.length - 1];
         return ultimoItem.id + 1;
     }
 }

 // Função para cadastrar uma pessoa
 function cadastrarPessoa(event) {
     event.preventDefault();

     // Obter os valores do formulário
     var pessoaId = document.getElementById('pessoaId').value;
     var nome = document.getElementById('nome').value;
     var dataNascimento = document.getElementById('dataNascimento').value;
     var cpf = document.getElementById('cpf').value;
     var sexo = document.getElementById('sexo').value;
     var cidade = document.getElementById('cidade').value;
     var bairro = document.getElementById('bairro').value;
     var rua = document.getElementById('rua').value;
     var numero = document.getElementById('numero').value;
     var complemento = document.getElementById('complemento').value;

     // Verificar se é uma inclusão ou alteração
     if (pessoaId === '') {
         // Gerar o ID automaticamente
         pessoaId = gerarIdAutomatico(pessoas);

         // Criar um objeto pessoa com os valores do formulário
         var pessoa = {
             id: pessoaId,
             nome: nome,
             dataNascimento: dataNascimento,
             cpf: cpf,
             sexo: sexo,
             cidade: cidade,
             bairro: bairro,
             rua: rua,
             numero: numero,
             complemento: complemento
         };

         // Adicionar a pessoa ao array de pessoas
         pessoas.push(pessoa);

         // Limpar o formulário
         formPessoa.reset();
     } else {
         // Atualizar os dados da pessoa
         var pessoa = pessoas.find(function(p) {
             return p.id === parseInt(pessoaId);
         });

         pessoa.nome = nome;
         pessoa.dataNascimento = dataNascimento;
         pessoa.cpf = cpf;
         pessoa.sexo = sexo;
         pessoa.cidade = cidade;
         pessoa.bairro = bairro;
         pessoa.rua = rua;
         pessoa.numero = numero;
         pessoa.complemento = complemento;

         // Limpar o formulário
         formPessoa.reset();

         // Alterar o texto do botão para "Salvar"
         document.querySelector('#formPessoa input[type="submit"]').value = 'Salvar';
         // Ocultar o botão de cancelar
         btnCancelar.classList.add('hidden');
     }

     // Atualizar a tabela de pessoas cadastradas
     exibirPessoasCadastradas();
     // Atualizar as opções de pessoa demandante no formulário de protocolo
     atualizarOpcoesPessoaDemandante();
 }

 // Função para cadastrar um protocolo
 function cadastrarProtocolo(event) {
     event.preventDefault();

     // Obter os valores do formulário
     var protocoloId = document.getElementById('protocoloId').value;
     var descricao = document.getElementById('descricao').value;
     var prazo = document.getElementById('prazo').value;
     var pessoaDemandanteId = document.getElementById('pessoaDemandante').value;

     // Verificar se a pessoa demandante foi selecionada
     if (pessoaDemandanteId === '') {
         alert('Selecione a pessoa demandante.');
         return;
     }

     // Verificar se é uma inclusão ou alteração
     if (protocoloId === '') {
         // Gerar o número do protocolo automaticamente
         var numeroProtocolo = gerarIdAutomatico(protocolos);

         // Encontrar a pessoa demandante pelo ID
         var pessoaDemandante = pessoas.find(function(p) {
             return p.id === parseInt(pessoaDemandanteId);
         });

         // Criar um objeto protocolo com os valores do formulário
         var protocolo = {
             numero: numeroProtocolo,
             descricao: descricao,
             data: new Date().toLocaleDateString(),
             prazo: prazo,
             pessoaDemandante: pessoaDemandante
         };

         // Adicionar o protocolo ao array de protocolos
         protocolos.push(protocolo);

         // Limpar o formulário
         formProtocolo.reset();
     } else {
         // Atualizar os dados do protocolo
         var protocolo = protocolos.find(function(p) {
             return p.numero === parseInt(protocoloId);
         });

         protocolo.descricao = descricao;
         protocolo.prazo = prazo;

         // Encontrar a pessoa demandante pelo ID
         var pessoaDemandante = pessoas.find(function(p) {
             return p.id === parseInt(pessoaDemandanteId);
         });
         protocolo.pessoaDemandante = pessoaDemandante;

         // Limpar o formulário
         formProtocolo.reset();

         // Alterar o texto do botão para "Salvar"
         document.querySelector('#formProtocolo input[type="submit"]').value = 'Salvar';
         // Ocultar o botão de cancelar
         btnCancelarProtocolo.classList.add('hidden');
     }

     // Atualizar a tabela de protocolos registrados
     exibirProtocolosRegistrados();
 }

 // Função para exibir as pessoas cadastradas na tabela
 function exibirPessoasCadastradas() {
     // Limpar a tabela
     tabelaPessoas.innerHTML = '<tr><th>ID</th><th>Nome</th><th>Data de Nascimento</th><th>CPF</th><th>Sexo</th><th>Ações</th></tr>';

     // Preencher a tabela com os dados das pessoas cadastradas
     for (var i = 0; i < pessoas.length; i++) {
         var pessoa = pessoas[i];

         var row = tabelaPessoas.insertRow();
         row.insertCell().textContent = pessoa.id;
         row.insertCell().textContent = pessoa.nome;
         row.insertCell().textContent = pessoa.dataNascimento;
         row.insertCell().textContent = pessoa.cpf;
         row.insertCell().textContent = pessoa.sexo;

         var actionsCell = row.insertCell();
         actionsCell.innerHTML = '<button onclick="editarPessoa(' + pessoa.id + ')">Editar</button> <button onclick="excluirPessoa(' + pessoa.id + ')">Excluir</button>';
     }
 }

 // Função para exibir os protocolos registrados na tabela
 function exibirProtocolosRegistrados() {
     // Limpar a tabela
     tabelaProtocolos.innerHTML = '<tr><th>Número</th><th>Descrição</th><th>Data</th><th>Prazo</th><th>Pessoa Demandante</th><th>Ações</th></tr>';

     // Preencher a tabela com os dados dos protocolos registrados
     for (var i = 0; i < protocolos.length; i++) {
         var protocolo = protocolos[i];

         var row = tabelaProtocolos.insertRow();
         row.insertCell().textContent = protocolo.numero;
         row.insertCell().textContent = protocolo.descricao;
         row.insertCell().textContent = protocolo.data;
         row.insertCell().textContent = protocolo.prazo;
         row.insertCell().textContent = protocolo.pessoaDemandante.nome;

         var actionsCell = row.insertCell();
         actionsCell.innerHTML = '<button onclick="editarProtocolo(' + protocolo.numero + ')">Editar</button> <button onclick="excluirProtocolo(' + protocolo.numero + ')">Excluir</button>';
     }
 }

 // Função para preencher as opções de pessoa demandante no formulário de protocolo
 function atualizarOpcoesPessoaDemandante() {
     var selectPessoaDemandante = document.getElementById('pessoaDemandante');

     // Limpar as opções
     selectPessoaDemandante.innerHTML = '<option value="">Selecione</option>';

     // Preencher as opções com as pessoas cadastradas
     for (var i = 0; i < pessoas.length; i++) {
         var pessoa = pessoas[i];
         var option = document.createElement('option');
         option.value = pessoa.id;
         option.textContent = pessoa.nome;
         selectPessoaDemandante.appendChild(option);
     }
 }

 // Função para editar uma pessoa
 function editarPessoa(pessoaId) {
     // Encontrar a pessoa pelo ID
     var pessoa = pessoas.find(function(p) {
         return p.id === pessoaId;
     });

     // Preencher o formulário com os dados da pessoa
     document.getElementById('pessoaId').value = pessoa.id;
     document.getElementById('nome').value = pessoa.nome;
     document.getElementById('dataNascimento').value = pessoa.dataNascimento;
     document.getElementById('cpf').value = pessoa.cpf;
     document.getElementById('sexo').value = pessoa.sexo;
     document.getElementById('cidade').value = pessoa.cidade;
     document.getElementById('bairro').value = pessoa.bairro;
     document.getElementById('rua').value = pessoa.rua;
     document.getElementById('numero').value = pessoa.numero;
     document.getElementById('complemento').value = pessoa.complemento;

     // Alterar o texto do botão para "Atualizar"
     document.querySelector('#formPessoa input[type="submit"]').value = 'Atualizar';
     // Exibir o botão de cancelar
     btnCancelar.classList.remove('hidden');
 }

 // Função para excluir uma pessoa
 function excluirPessoa(pessoaId) {
     // Encontrar a pessoa pelo ID
     var index = pessoas.findIndex(function(p) {
         return p.id === pessoaId;
     });

     // Remover a pessoa do array
     pessoas.splice(index, 1);

     // Atualizar a tabela de pessoas cadastradas
     exibirPessoasCadastradas();
     // Atualizar as opções de pessoa demandante no formulário de protocolo
     atualizarOpcoesPessoaDemandante();
 }

 // Função para editar um protocolo
 function editarProtocolo(protocoloNumero) {
     // Encontrar o protocolo pelo número
     var protocolo = protocolos.find(function(p) {
         return p.numero === protocoloNumero;
     });

     // Preencher o formulário com os dados do protocolo
     document.getElementById('protocoloId').value = protocolo.numero;
     document.getElementById('descricao').value = protocolo.descricao;
     document.getElementById('prazo').value = protocolo.prazo;

     // Selecionar a opção da pessoa demandante no formulário
     document.getElementById('pessoaDemandante').value = protocolo.pessoaDemandante.id;

     // Alterar o texto do botão para "Atualizar"
     document.querySelector('#formProtocolo input[type="submit"]').value = 'Atualizar';
     // Exibir o botão de cancelar
     btnCancelarProtocolo.classList.remove('hidden');
 }

 // Função para excluir um protocolo
 function excluirProtocolo(protocoloNumero) {
     // Encontrar o protocolo pelo número
     var index = protocolos.findIndex(function(p) {
         return p.numero === protocoloNumero;
     });

     // Remover o protocolo do array
     protocolos.splice(index, 1);

     // Atualizar a tabela de protocolos registrados
     exibirProtocolosRegistrados();
 }

 // Função para cancelar o cadastro de uma pessoa
 function cancelarCadastroPessoa() {
     // Limpar o formulário
     formPessoa.reset();

     // Alterar o texto do botão para "Salvar"
     document.querySelector('#formPessoa input[type="submit"]').value = 'Salvar';
     // Ocultar o botão de cancelar
     btnCancelar.classList.add('hidden');
 }

 // Função para cancelar o cadastro de um protocolo
 function cancelarCadastroProtocolo() {
     // Limpar o formulário
     formProtocolo.reset();

     // Alterar o texto do botão para "Salvar"
     document.querySelector('#formProtocolo input[type="submit"]').value = 'Salvar';
     // Ocultar o botão de cancelar
     btnCancelarProtocolo.classList.add('hidden');
 }

 // Função para gerar um ID automático
 function gerarIdAutomatico(array) {
     var maxId = 0;
     for (var i = 0; i < array.length; i++) {
         if (array[i].id > maxId) {
             maxId = array[i].id;
         }
     }
     return maxId + 1;
 }

 // Event listeners para os formulários
 formPessoa.addEventListener('submit', cadastrarPessoa);
 formProtocolo.addEventListener('submit', cadastrarProtocolo);
 btnCancelar.addEventListener('click', cancelarCadastroPessoa);
 btnCancelarProtocolo.addEventListener('click', cancelarCadastroProtocolo);

 // Exibir as pessoas cadastradas e os protocolos registrados
 exibirPessoasCadastradas();
 exibirProtocolosRegistrados();