/*
=========================================
CONFIGURAÇÃO DAS SUBCATEGORIAS
=========================================
*/

const SUBCATEGORIAS = {

    expansao: {
        nome: "Expansão",

        opcoes: [
            {
                valor: "grupo-a",
                nome: "Grupo A"
            },
            {
                valor: "ligacao-nova",
                nome: "Ligação Nova"
            }
        ]
    },

    manutencao: {
        nome: "Manutenção",

        opcoes: [
            {
                valor: "pendencias-incidente",
                nome: "Tratamento de Pendências de Incidente"
            },
            {
                valor: "melhorias",
                nome: "Melhorias"
            }
        ]
    },

    leiturista: {
        nome: "Leiturista",

        opcoes: [
            {
                valor: "coleta-leitura",
                nome: "Coleta de leitura"
            },
            {
                valor: "triagem",
                nome: "Triagem"
            }
        ]
    }

};


/*
=========================================
ORDEM DAS CLASSIFICAÇÕES
=========================================
*/

const ORDEM_CATEGORIAS = [
    "expansao",
    "manutencao",
    "leiturista"
];


/*
=========================================
ELEMENTOS DA INTERFACE
=========================================
*/

const checkboxesCategoria =
    document.querySelectorAll(
        'input[name="categoria"]'
    );

const filtroSeccional =
    document.getElementById("filtro-seccional");

const grupoSubcategoria =
    document.getElementById(
        "grupo-subcategoria"
    );

const opcoesSubcategoria =
    document.getElementById(
        "opcoes-subcategoria"
    );

const dataInicial =
    document.getElementById(
        "data-inicial"
    );

const dataFinal =
    document.getElementById(
        "data-final"
    );

const botaoPesquisar =
    document.getElementById(
        "botao-pesquisar"
    );

const botaoLimparClassificacao =
    document.getElementById(
        "limpar-classificacao"
    );

const botaoLimparSubclassificacao =
    document.getElementById(
        "limpar-subclassificacao"
    );


/*
=========================================
ELEMENTOS DO CALENDÁRIO
=========================================
*/

const abrirCalendario =
    document.getElementById(
        "abrir-calendario"
    );

const calendarioPersonalizado =
    document.getElementById(
        "calendario-personalizado"
    );

const calendarioMesAno =
    document.getElementById(
        "calendario-mes-ano"
    );

const calendarioDias =
    document.getElementById(
        "calendario-dias"
    );

const botaoMesAnterior =
    document.getElementById(
        "mes-anterior"
    );

const botaoProximoMes =
    document.getElementById(
        "proximo-mes"
    );

const botaoLimparPeriodo =
    document.getElementById(
        "limpar-periodo"
    );

const botaoSelecionarHoje =
    document.getElementById(
        "selecionar-hoje"
    );

const periodoValor =
    document.getElementById(
        "periodo-valor"
    );


/*
=========================================
CAMPOS DE DATA DIGITÁVEIS
=========================================
*/

const dataInicialDigitada =
    document.getElementById(
        "data-inicial-digitada"
    );

const dataFinalDigitada =
    document.getElementById(
        "data-final-digitada"
    );


/*
=========================================
ESTADO DO CALENDÁRIO
=========================================
*/

const hoje = new Date();

let mesExibido =
    hoje.getMonth();

let anoExibido =
    hoje.getFullYear();

/*
=========================================
DATAS SELECIONADAS
=========================================
*/

let dataInicialSelecionada = null;
let dataFinalSelecionada = null;

/*
=========================================
OBTER CATEGORIAS SELECIONADAS
=========================================
*/

function obterCategoriasSelecionadas() {

    const selecionadas = [];

    ORDEM_CATEGORIAS.forEach(
        function (categoria) {

            const checkbox =
                document.querySelector(
                    'input[name="categoria"][value="' +
                    categoria +
                    '"]'
                );

            if (
                checkbox &&
                checkbox.checked
            ) {

                selecionadas.push(
                    categoria
                );

            }

        }
    );

    return selecionadas;

}


/*
=========================================
OBTER SUBCATEGORIAS SELECIONADAS
=========================================
*/

function obterSubcategoriasSelecionadas() {

    return Array.from(
        document.querySelectorAll(
            'input[name="subcategoria"]:checked'
        )
    );

}


/*
=========================================
EXIBIR SUBCATEGORIAS
=========================================
*/

function exibirSubcategorias() {

    const categoriasSelecionadas =
        obterCategoriasSelecionadas();


    /*
    -----------------------------------------
    NENHUMA CLASSIFICAÇÃO SELECIONADA
    -----------------------------------------
    */

    if (
        categoriasSelecionadas.length === 0
    ) {

        opcoesSubcategoria.innerHTML = "";

        grupoSubcategoria.classList.add(
            "oculto"
        );

        atualizarBotaoPesquisar();

        return;

    }


    /*
    -----------------------------------------
    GUARDA SELEÇÕES ATUAIS
    -----------------------------------------
    */

    const subcategoriasMarcadas =
        obterSubcategoriasSelecionadas()
            .map(
                function (item) {
                    return item.value;
                }
            );


    /*
    -----------------------------------------
    LIMPA SUBCATEGORIAS
    -----------------------------------------
    */

    opcoesSubcategoria.innerHTML = "";


    /*
    -----------------------------------------
    CRIA UM BLOCO POR CLASSIFICAÇÃO
    -----------------------------------------
    */

    categoriasSelecionadas.forEach(
        function (categoria) {

            const configuracao =
                SUBCATEGORIAS[categoria];

            if (!configuracao) {
                return;
            }


            /*
            BLOCO DA CLASSIFICAÇÃO
            */

            const bloco =
                document.createElement(
                    "div"
                );

            bloco.className =
                "grupo-subcategoria-categoria";


            /*
            NOME DA CLASSIFICAÇÃO
            */

            const titulo =
                document.createElement(
                    "div"
                );

            titulo.className =
                "titulo-subcategoria-categoria";

            titulo.textContent =
                configuracao.nome;

            bloco.appendChild(
                titulo
            );


            /*
            LINHA DAS SUBCLASSIFICAÇÕES
            */

            const linha =
                document.createElement(
                    "div"
                );

            linha.className =
                "linha-subcategorias";


            configuracao.opcoes.forEach(
                function (subcategoria) {

                    const label =
                        document.createElement(
                            "label"
                        );


                    const checkbox =
                        document.createElement(
                            "input"
                        );

                    checkbox.type =
                        "checkbox";

                    checkbox.name =
                        "subcategoria";

                    checkbox.value =
                        categoria +
                        ":" +
                        subcategoria.valor;

                    checkbox.dataset.categoria =
                        categoria;

                    checkbox.dataset.subcategoria =
                        subcategoria.valor;


                    /*
                    RESTAURA SELEÇÃO
                    */

                    if (
                        subcategoriasMarcadas.includes(
                            checkbox.value
                        )
                    ) {

                        checkbox.checked =
                            true;

                    }


                    const texto =
                        document.createElement(
                            "span"
                        );

                    texto.textContent =
                        subcategoria.nome;


                    label.appendChild(
                        checkbox
                    );

                    label.appendChild(
                        texto
                    );

                    linha.appendChild(
                        label
                    );


                    checkbox.addEventListener(
                        "change",
                        atualizarBotaoPesquisar
                    );

                }
            );


            bloco.appendChild(
                linha
            );

            opcoesSubcategoria.appendChild(
                bloco
            );

        }
    );


    /*
    -----------------------------------------
    EXIBE A SEÇÃO
    -----------------------------------------
    */

    grupoSubcategoria.classList.remove(
        "oculto"
    );

    atualizarBotaoPesquisar();

}


/*
=========================================
ATUALIZAR BOTÕES DE LIMPEZA
=========================================
*/

function atualizarBotoesLimpeza() {

    const categorias =
        obterCategoriasSelecionadas();

    const subcategorias =
        obterSubcategoriasSelecionadas();


    /*
    CLASSIFICAÇÃO
    */

    botaoLimparClassificacao.classList.toggle(
        "oculto",
        categorias.length === 0
    );


    /*
    SUBCLASSIFICAÇÃO
    */

    botaoLimparSubclassificacao.classList.toggle(
        "oculto",
        subcategorias.length === 0
    );

}

/*
=========================================
UTILITÁRIOS DE DATA
=========================================
*/

function normalizarData(data) {

    return new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate()
    );

}


function datasIguais(
    data1,
    data2
) {

    if (!data1 || !data2) {
        return false;
    }

    return (
        data1.getFullYear() ===
            data2.getFullYear() &&

        data1.getMonth() ===
            data2.getMonth() &&

        data1.getDate() ===
            data2.getDate()
    );

}


function formatarDataISO(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const dia =
        String(
            data.getDate()
        ).padStart(
            2,
            "0"
        );

    return `${ano}-${mes}-${dia}`;

}


function formatarDataBR(data) {

    return data.toLocaleDateString(
        "pt-BR"
    );

}

/*
=========================================
MÁSCARA DE DATA - DD/MM/AAAA
=========================================
*/

function aplicarMascaraData(valor) {

    const numeros = valor
        .replace(/\D/g, "")
        .slice(0, 8);

    if (numeros.length <= 2) {
        return numeros;
    }

    if (numeros.length <= 4) {
        return (
            numeros.slice(0, 2)
            + "/"
            + numeros.slice(2)
        );
    }

    return (
        numeros.slice(0, 2)
        + "/"
        + numeros.slice(2, 4)
        + "/"
        + numeros.slice(4)
    );

}


/*
=========================================
CONVERTER DATA DIGITADA
=========================================
*/

function converterDataDigitada(valor) {

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
        return null;
    }

    const [dia, mes, ano] =
        valor.split("/").map(Number);

    if (ano < 1000 || ano > 9999) {
        return null;
    }

    const data = new Date(0);

    data.setFullYear(ano, mes - 1, dia);
    data.setHours(0, 0, 0, 0);

    if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia
    ) {
        return null;
    }

    return data;

}

/*
=========================================
ATUALIZAR PERÍODO SELECIONADO
=========================================
*/

function atualizarPeriodoSelecionado() {

    /*
    -----------------------------------------
    ATUALIZAR CAMPOS INTERNOS
    -----------------------------------------
    */

    dataInicial.value =
        dataInicialSelecionada
            ? formatarDataISO(dataInicialSelecionada)
            : "";

    dataFinal.value =
        dataFinalSelecionada
            ? formatarDataISO(dataFinalSelecionada)
            : "";


    /*
    -----------------------------------------
    ATUALIZAR CAMPOS VISÍVEIS
    -----------------------------------------
    */

    dataInicialDigitada.value =
        dataInicialSelecionada
            ? formatarDataBR(dataInicialSelecionada)
            : "";

    dataFinalDigitada.value =
        dataFinalSelecionada
            ? formatarDataBR(dataFinalSelecionada)
            : "";


    /*
    -----------------------------------------
    ATUALIZAR RESUMO INTERNO
    -----------------------------------------
    */

    if (!dataInicialSelecionada) {

        periodoValor.textContent =
            "Selecione uma data inicial e final";

    }

    else if (!dataFinalSelecionada) {

        periodoValor.textContent =
            formatarDataBR(dataInicialSelecionada)
            + " → selecione a data final";

    }

    else {

        periodoValor.textContent =
            formatarDataBR(dataInicialSelecionada)
            + " → "
            + formatarDataBR(dataFinalSelecionada);

    }


    /*
    -----------------------------------------
    VALIDAÇÃO DA BUSCA
    -----------------------------------------
    */

    atualizarBotaoPesquisar();

}

/*
=========================================
RENDERIZAR CALENDÁRIO
=========================================
*/

function renderizarCalendario() {

    calendarioDias.innerHTML = "";


    /*
    -----------------------------------------
    NOME DO MÊS
    -----------------------------------------
    */

    const dataMes =
        new Date(
            anoExibido,
            mesExibido,
            1
        );


    calendarioMesAno.textContent =
        dataMes.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    /*
    -----------------------------------------
    PRIMEIRO E ÚLTIMO DIA
    -----------------------------------------
    */

    const primeiroDia =
        new Date(
            anoExibido,
            mesExibido,
            1
        );


    const ultimoDia =
        new Date(
            anoExibido,
            mesExibido + 1,
            0
        );


    const primeiroDiaSemana =
        primeiroDia.getDay();


    const quantidadeDias =
        ultimoDia.getDate();


    /*
    -----------------------------------------
    DIAS DO MÊS ANTERIOR
    -----------------------------------------
    */

    const ultimoDiaMesAnterior =
        new Date(
            anoExibido,
            mesExibido,
            0
        ).getDate();


    for (
        let i = primeiroDiaSemana - 1;
        i >= 0;
        i--
    ) {

        const numeroDia =
            ultimoDiaMesAnterior - i;


        const botao =
            criarDiaCalendario(
                numeroDia,
                true,
                -1
            );


        calendarioDias.appendChild(
            botao
        );

    }


    /*
    -----------------------------------------
    DIAS DO MÊS ATUAL
    -----------------------------------------
    */

    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        const botao =
            criarDiaCalendario(
                dia,
                false
            );


        calendarioDias.appendChild(
            botao
        );

    }


    /*
    -----------------------------------------
    COMPLETA A ÚLTIMA SEMANA
    -----------------------------------------
    */

    const quantidadeAtual =
        calendarioDias.children.length;


    const restante =
        (7 - (quantidadeAtual % 7)) % 7;


    for (
        let dia = 1;
        dia <= restante;
        dia++
    ) {

        const botao =
            criarDiaCalendario(
                dia,
                true,
                1
            );


        calendarioDias.appendChild(
            botao
        );

    }

}


/*
=========================================
CRIAR DIA DO CALENDÁRIO
=========================================
*/

function criarDiaCalendario(
    numeroDia,
    foraDoMes,
    deslocamentoMes = 0
) {

    const botao =
        document.createElement(
            "button"
        );


    botao.type = "button";

    botao.className =
        "calendario-dia";

    botao.textContent =
        numeroDia;


    /*
    -----------------------------------------
    DATA REPRESENTADA PELO BOTÃO
    -----------------------------------------
    */

    const data =
        new Date(
            anoExibido,
            mesExibido + deslocamentoMes,
            numeroDia
        );


    if (foraDoMes) {

        botao.classList.add(
            "fora-mes"
        );

    }

    /*
    -----------------------------------------
    DATA INICIAL / FINAL
    -----------------------------------------
    */

    if (
        datasIguais(
            data,
            dataInicialSelecionada
        ) ||
        datasIguais(
            data,
            dataFinalSelecionada
        )
    ) {

        botao.classList.add(
            "selecionado"
        );

    }


    /*
    -----------------------------------------
    INTERVALO
    -----------------------------------------
    */

    if (
        dataInicialSelecionada &&
        dataFinalSelecionada
    ) {

        const atual =
            normalizarData(data);

        const inicial =
            normalizarData(
                dataInicialSelecionada
            );

        const final =
            normalizarData(
                dataFinalSelecionada
            );


        if (
            atual > inicial &&
            atual < final
        ) {

            botao.classList.add(
                "no-intervalo"
            );

        }

    }


    const mesmoDia =
        data.getDate() === hoje.getDate();

    const mesmoMes =
        data.getMonth() === hoje.getMonth();

    const mesmoAno =
        data.getFullYear() === hoje.getFullYear();


    if (
        mesmoDia &&
        mesmoMes &&
        mesmoAno
    ) {

        botao.classList.add(
            "hoje"
        );

    }

    /*
    -----------------------------------------
    SELECIONAR DATA
    -----------------------------------------
    */

    botao.addEventListener(
        "click",
        function () {

            const dataClicada =
                normalizarData(
                    data
                );


            /*
            -----------------------------------------
            DIA DE OUTRO MÊS
            -----------------------------------------
            */

            if (foraDoMes) {

                mesExibido =
                    dataClicada.getMonth();

                anoExibido =
                    dataClicada.getFullYear();

            }


            /*
            PRIMEIRO CLIQUE
            */

            if (
                !dataInicialSelecionada ||
                dataFinalSelecionada
            ) {

                dataInicialSelecionada =
                    dataClicada;

                dataFinalSelecionada =
                    null;

            }


            /*
            SEGUNDO CLIQUE
            */

            else {

                /*
                CLICOU ANTES DA DATA INICIAL
                */

                if (
                    dataClicada <
                    dataInicialSelecionada
                ) {

                    dataFinalSelecionada =
                        dataInicialSelecionada;

                    dataInicialSelecionada =
                        dataClicada;

                }

                else {

                    dataFinalSelecionada =
                        dataClicada;

                }

            }


            atualizarPeriodoSelecionado();

            renderizarCalendario();


            /*
            -----------------------------------------
            FECHA SOMENTE APÓS A SEGUNDA DATA
            -----------------------------------------
            */

            if (dataFinalSelecionada) {

                setTimeout(
                    function () {

                        calendarioPersonalizado
                            .classList
                            .add(
                                "oculto"
                            );

                    },
                    180
                );

            }

        }
    );

    return botao;

}


/*
=========================================
DIGITAÇÃO MANUAL DO PERÍODO
=========================================
*/

function configurarDigitacaoData(campo) {

    campo.addEventListener(
        "input",
        function () {

            campo.value =
                aplicarMascaraData(campo.value);

            campo.setCustomValidity("");

            /*
            Enquanto a digitação não estiver
            concluída, não permitir a busca
            com datas antigas.
            */

            dataInicial.value = "";
            dataFinal.value = "";

            atualizarBotaoPesquisar();

        }
    );


    campo.addEventListener(
        "change",
        validarPeriodoDigitado
    );


    campo.addEventListener(
        "blur",
        validarPeriodoDigitado
    );

}


/*
=========================================
VALIDAR PERÍODO DIGITADO
=========================================
*/

function validarPeriodoDigitado() {

    const textoInicial =
        dataInicialDigitada.value.trim();

    const textoFinal =
        dataFinalDigitada.value.trim();

    const inicial =
        converterDataDigitada(textoInicial);

    const final =
        converterDataDigitada(textoFinal);


    /*
    -----------------------------------------
    VALIDAR CADA CAMPO
    -----------------------------------------
    */

    dataInicialDigitada.setCustomValidity("");
    dataFinalDigitada.setCustomValidity("");

    if (textoInicial && !inicial) {

        dataInicialDigitada.setCustomValidity(
            "Informe uma data inicial válida."
        );

    }

    if (textoFinal && !final) {

        dataFinalDigitada.setCustomValidity(
            "Informe uma data final válida."
        );

    }


    /*
    -----------------------------------------
    VALIDAR ORDEM DAS DATAS
    -----------------------------------------
    */

    if (
        inicial &&
        final &&
        final < inicial
    ) {

        dataFinalDigitada.setCustomValidity(
            "A data final não pode ser anterior à inicial."
        );

    }


    /*
    -----------------------------------------
    SINCRONIZAR SOMENTE DATAS VÁLIDAS
    -----------------------------------------
    */

    dataInicialSelecionada = inicial;

    dataFinalSelecionada =
        inicial && final && final >= inicial
            ? final
            : null;


    /*
    -----------------------------------------
    ATUALIZAR CAMPOS INTERNOS
    -----------------------------------------
    */

    dataInicial.value =
        inicial
            ? formatarDataISO(inicial)
            : "";

    dataFinal.value =
        dataFinalSelecionada
            ? formatarDataISO(dataFinalSelecionada)
            : "";


    /*
    -----------------------------------------
    ATUALIZAR RESUMO
    -----------------------------------------
    */

    if (inicial && dataFinalSelecionada) {

        periodoValor.textContent =
            formatarDataBR(inicial)
            + " → "
            + formatarDataBR(dataFinalSelecionada);

    } else {

        periodoValor.textContent =
            "Selecione uma data inicial e final";

    }


    /*
    -----------------------------------------
    ATUALIZAR CALENDÁRIO
    -----------------------------------------
    */

    const dataReferencia = inicial || final;

    if (dataReferencia) {

        mesExibido =
            dataReferencia.getMonth();

        anoExibido =
            dataReferencia.getFullYear();

    }

    renderizarCalendario();
    atualizarBotaoPesquisar();

}


/*
=========================================
ATIVAR DIGITAÇÃO
=========================================
*/

configurarDigitacaoData(
    dataInicialDigitada
);

configurarDigitacaoData(
    dataFinalDigitada
);


/*
=========================================
ABRIR / FECHAR CALENDÁRIO
=========================================
*/

abrirCalendario.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                ".data-periodo-digitada"
            )
        ) {
            return;
        }

        calendarioPersonalizado
            .classList
            .toggle("oculto");
    }
);

/*
=========================================
FECHAR CALENDÁRIO AO CLICAR FORA
=========================================
*/

document.addEventListener(
    "click",
    function (event) {

        const seletorPeriodo =
            document.getElementById(
                "seletor-periodo"
            );


        if (
            !seletorPeriodo.contains(
                event.target
            )
        ) {

            calendarioPersonalizado
                .classList
                .add(
                    "oculto"
                );

        }

    },
    true
);

/*
=========================================
LIMPAR PERÍODO
=========================================
*/

botaoLimparPeriodo.addEventListener(
    "click",
    function () {

        dataInicialSelecionada = null;
        dataFinalSelecionada = null;


        atualizarPeriodoSelecionado();
        renderizarCalendario();

    }
);

/*
=========================================
SELECIONAR HOJE
=========================================
*/

botaoSelecionarHoje.addEventListener(
    "click",
    function () {

        const dataHoje =
            normalizarData(
                new Date()
            );


        /*
        SE JÁ EXISTE UMA DATA INICIAL
        E AINDA NÃO EXISTE DATA FINAL
        */

        if (
            dataInicialSelecionada &&
            !dataFinalSelecionada
        ) {

            /*
            A data inicial é anterior
            ou igual a hoje
            */

            if (
                dataInicialSelecionada <=
                dataHoje
            ) {

                dataFinalSelecionada =
                    dataHoje;

            }

            /*
            A data inicial é futura.
            Inverte o intervalo.
            */

            else {

                dataFinalSelecionada =
                    dataInicialSelecionada;

                dataInicialSelecionada =
                    dataHoje;

            }

        }


        /*
        SE NÃO HÁ UM INTERVALO
        EM CONSTRUÇÃO
        */

        else {

            dataInicialSelecionada =
                dataHoje;

            dataFinalSelecionada =
                dataHoje;

        }


        mesExibido =
            dataHoje.getMonth();

        anoExibido =
            dataHoje.getFullYear();


        atualizarPeriodoSelecionado();

        renderizarCalendario();


        calendarioPersonalizado
            .classList
            .add(
                "oculto"
            );

    }
);

/*
=========================================
MÊS ANTERIOR
=========================================
*/

botaoMesAnterior.addEventListener(
    "click",
    function () {

        mesExibido--;


        if (mesExibido < 0) {

            mesExibido = 11;

            anoExibido--;

        }


        renderizarCalendario();

    }
);


/*
=========================================
PRÓXIMO MÊS
=========================================
*/

botaoProximoMes.addEventListener(
    "click",
    function () {

        mesExibido++;


        if (mesExibido > 11) {

            mesExibido = 0;

            anoExibido++;

        }


        renderizarCalendario();

    }
);

/*
=========================================
VALIDAÇÃO DOS FILTROS
=========================================
*/

function atualizarBotaoPesquisar() {

    const categorias =
        obterCategoriasSelecionadas();

    const subcategorias =
        obterSubcategoriasSelecionadas();

    const inicio =
        dataInicial.value;

    const fim =
        dataFinal.value;


    const filtrosValidos =
        categorias.length > 0 &&
        subcategorias.length > 0 &&
        inicio &&
        fim &&
        inicio <= fim;


    botaoPesquisar.disabled =
        !filtrosValidos;

    atualizarBotoesLimpeza();

}


/*
=========================================
ALTERAÇÃO DAS CLASSIFICAÇÕES
=========================================
*/

checkboxesCategoria.forEach(
    function (checkbox) {

        checkbox.addEventListener(
            "change",
            exibirSubcategorias
        );

    }
);


/*
=========================================
ALTERAÇÃO DAS DATAS
=========================================
*/

dataInicial.addEventListener(
    "change",
    atualizarBotaoPesquisar
);

dataFinal.addEventListener(
    "change",
    atualizarBotaoPesquisar
);


/*
=========================================
LIMPAR CLASSIFICAÇÃO
=========================================
*/

botaoLimparClassificacao.addEventListener(
    "click",
    function () {

        checkboxesCategoria.forEach(
            function (checkbox) {

                checkbox.checked = false;

            }
        );


        /*
        Remove também todas as subclasses
        */

        opcoesSubcategoria.innerHTML = "";

        grupoSubcategoria.classList.add(
            "oculto"
        );


        atualizarBotaoPesquisar();

    }
);


/*
=========================================
LIMPAR SUBCLASSIFICAÇÃO
=========================================
*/

botaoLimparSubclassificacao.addEventListener(
    "click",
    function () {

        const subcategorias =
            document.querySelectorAll(
                'input[name="subcategoria"]'
            );


        subcategorias.forEach(
            function (checkbox) {

                checkbox.checked = false;

            }
        );


        atualizarBotaoPesquisar();

    }
);


/*
=========================================
INICIALIZAÇÃO
=========================================
*/

function inicializar() {

    exibirSubcategorias();

    atualizarBotaoPesquisar();

}

renderizarCalendario();

inicializar();

let relatoriosUltimaPesquisa = [];

/*
=========================================================
INTEGRAÇÃO DA PESQUISA COM A API
=========================================================
*/

// Converte as subclassificações selecionadas
// para os nomes utilizados no Google Drive.

function obterFiltrosParaAPI() {

    const filtros = [];

    const selecionadas =
        obterSubcategoriasSelecionadas();

    selecionadas.forEach(function (checkbox) {

        const categoria =
            checkbox.dataset.categoria;

        const subcategoria =
            checkbox.dataset.subcategoria;

        const configuracao =
            SUBCATEGORIAS[categoria];

        if (!configuracao) {
            return;
        }

        const opcao = configuracao.opcoes.find(
            function (item) {
                return item.valor === subcategoria;
            }
        );

        if (!opcao) {
            return;
        }

        filtros.push({
            categoria: configuracao.nome,
            subcategoria: opcao.nome
        });

    });

    return filtros;

}


/*
=========================================================
EXECUTAR PESQUISA
=========================================================
*/

botaoPesquisar.addEventListener(
    "click",
    async function () {
        console.log("CLIQUE NO BOTÃO DETECTADO");
        if (botaoPesquisar.disabled) {
            return;
        }

        const inicio = dataInicial.value;
        const fim = dataFinal.value;

        const filtros = obterFiltrosParaAPI();

        const seccional = filtroSeccional
            ? filtroSeccional.value
            : "todas";

        const secaoResultados =
            document.getElementById("secao-resultados");

        const semResultados =
            document.getElementById("sem-resultados");

        const listaResultados =
            document.getElementById("lista-resultados");

        const quantidadeResultados =
            document.getElementById("quantidade-resultados");

        // Limpa os resultados anteriores.

        secaoResultados.classList.add("oculto");
        semResultados.classList.add("oculto");
        listaResultados.innerHTML = "";

        // Indica que a pesquisa está em andamento.

        botaoPesquisar.disabled = true;
        botaoPesquisar.textContent = "⏳ Pesquisando...";

        relatoriosUltimaPesquisa = [];

        try {

            const resultado =
                await consultarRelatoriosAPI(
                    inicio,
                    fim,
                    filtros,
                    seccional
                );

            relatoriosUltimaPesquisa = resultado.relatorios || [];

            console.log(
                "Relatórios encontrados:",
                resultado
            );

            quantidadeResultados.textContent =
                resultado.total;

            if (resultado.total === 0) {

                semResultados.classList.remove("oculto");

                requestAnimationFrame(function () {

                    semResultados.scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    });

                });

                return;
            }

            // Exibição inicial dos resultados.
            // Os cartões e botões de download
            // serão implementados na próxima etapa.

            resultado.relatorios.forEach(
                function (relatorio) {

                    const item =
                        document.createElement("div");

                    item.className = "item-resultado";

                    const nome =
                        document.createElement("strong");

                    nome.textContent = relatorio.nome;

                    item.appendChild(nome);

                    listaResultados.appendChild(item);

                }
            );

            secaoResultados.classList.remove("oculto");

            // Aguarda a seção aparecer e rola até os resultados.
            requestAnimationFrame(function () {

                secaoResultados.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });

            });

        } catch (erro) {

            console.error(erro);

            alert(
                "Erro ao pesquisar relatórios:\n" +
                erro.message
            );

        } finally {

            botaoPesquisar.textContent =
                "🔍 Buscar Relatórios";

            atualizarBotaoPesquisar();

        }

    }
);


/*
=========================================================
DOWNLOAD EM LOTE - ARQUIVO ZIP
=========================================================
*/

const botaoDownloadLote =
    document.getElementById("botao-download-lote");

const LIMITE_ZIP_BYTES = 100 * 1024 * 1024;


/*
=========================================================
DOWNLOAD EM LOTE OTIMIZADO
4 downloads simultâneos
=========================================================
*/

async function baixarRelatoriosEmLote() {

    if (!relatoriosUltimaPesquisa.length) {
        alert("Nenhum relatório disponível para download.");
        return;
    }

    if (typeof JSZip === "undefined") {
        alert("Biblioteca JSZip indisponível.");
        return;
    }

    if (!botaoDownloadLote || botaoDownloadLote.disabled) {
        return;
    }

    const relatorios = [...relatoriosUltimaPesquisa];

    const LIMITE_PARALELO = 4;

    const tamanhoEstimado = relatorios.reduce(
        (total, item) =>
            total + Number(item.tamanho || 0),
        0
    );

    if (tamanhoEstimado > LIMITE_ZIP_BYTES) {
        alert(
            "O tamanho total ultrapassa o limite de 100 MB."
        );
        return;
    }

    const textoOriginal = botaoDownloadLote.innerHTML;

    botaoDownloadLote.disabled = true;

    const zip = new JSZip();

    let indiceAtual = 0;
    let concluidos = 0;
    let bytesRecebidos = 0;
    let erroDownload = null;

    const nomesUtilizados = new Set();

    // Evita nomes duplicados dentro do ZIP.

    const arquivos = relatorios.map((relatorio, indice) => {

        const nomeOriginal = String(
            relatorio.nome || `Relatorio_${indice + 1}.pdf`
        )
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/[\x00-\x1F]/g, "_");

        const nomeBase = nomeOriginal
            .replace(/\.pdf$/i, "");

        let nomeFinal = `${nomeBase}.pdf`;
        let contador = 2;

        while (
            nomesUtilizados.has(nomeFinal.toLowerCase())
        ) {
            nomeFinal = `${nomeBase} (${contador}).pdf`;
            contador++;
        }

        nomesUtilizados.add(nomeFinal.toLowerCase());

        return {
            ...relatorio,
            nomeZIP: nomeFinal
        };
    });

    // Processa vários PDFs simultaneamente.

    async function trabalhador() {

        while (true) {

            if (erroDownload) {
                return;
            }

            const indice = indiceAtual++;

            if (indice >= arquivos.length) {
                return;
            }

            const relatorio = arquivos[indice];

            try {

                const parametros = new URLSearchParams({
                    id: relatorio.id
                });

                const resposta = await fetch(
                    `${API_URL}/download?${parametros.toString()}`,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Falha ao baixar: ${relatorio.nome}`
                    );
                }

                const tipo = resposta.headers.get(
                    "Content-Type"
                ) || "";

                if (
                    !tipo.toLowerCase().includes(
                        "application/pdf"
                    )
                ) {
                    throw new Error(
                        `Resposta inválida: ${relatorio.nome}`
                    );
                }

                const blob = await resposta.blob();

                if (blob.size === 0) {
                    throw new Error(
                        `PDF vazio: ${relatorio.nome}`
                    );
                }

                bytesRecebidos += blob.size;

                if (bytesRecebidos > LIMITE_ZIP_BYTES) {
                    throw new Error(
                        "Limite de 100 MB ultrapassado."
                    );
                }

                zip.file(
                    relatorio.nomeZIP,
                    blob,
                    {
                        binary: true
                    }
                );

                concluidos++;

                botaoDownloadLote.textContent =
                    `Baixados ${concluidos} de ${arquivos.length}`;

            } catch (erro) {

                if (!erroDownload) {
                    erroDownload = erro;
                }

                return;
            }
        }
    }

    try {

        // Executa no máximo 4 downloads paralelos.

        const quantidadeTrabalhadores = Math.min(
            LIMITE_PARALELO,
            arquivos.length
        );

        await Promise.all(
            Array.from(
                { length: quantidadeTrabalhadores },
                () => trabalhador()
            )
        );

        if (erroDownload) {
            throw erroDownload;
        }

        // Compactação.

        botaoDownloadLote.textContent =
            "Preparando ZIP...";

        const arquivoZIP = await zip.generateAsync(
            {
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 1
                },
                streamFiles: true
            },
            function (progresso) {

                botaoDownloadLote.textContent =
                    `Compactando ${Math.round(progresso.percent)}%...`;
            }
        );

        // Nome do ZIP conforme os filtros da pesquisa.

        function formatarDataArquivo(data) {
            const [ano, mes, dia] = data.split("-");
            return `${dia}-${mes}-${ano.slice(-2)}`;
        }

        // 1. Seccional selecionada.

        const seccionalSelecionada =
            filtroSeccional.options[
                filtroSeccional.selectedIndex
            ].text;

        // 2. Classificações selecionadas.

        const abreviacoes = {
            expansao: "Exp",
            manutencao: "Man",
            leiturista: "Leit"
        };

        const classificacoesSelecionadas =
            obterCategoriasSelecionadas()
                .map(categoria => abreviacoes[categoria])
                .filter(Boolean);

        const nomeClassificacao =
            classificacoesSelecionadas.join(" + ");

        // 3. Período da pesquisa.

        const datas = [
            dataInicial.value,
            dataFinal.value
        ].sort();

        const hoje = new Date();

        const hojeISO = [
            hoje.getFullYear(),
            String(hoje.getMonth() + 1).padStart(2, "0"),
            String(hoje.getDate()).padStart(2, "0")
        ].join("-");

        let periodo;

        if (
            datas[0] === datas[1] &&
            datas[0] === hojeISO
        ) {
            periodo = `(${formatarDataArquivo(datas[0])})`;
        } else {
            periodo =
                `(${formatarDataArquivo(datas[0])}, ` +
                `${formatarDataArquivo(datas[1])})`;
        }

        // 4. Nome final do ZIP.

        const nomeZIP =
            `RBO - ${seccionalSelecionada} - ` +
            `${nomeClassificacao} - ${periodo}.zip`;

        // Download do ZIP.

        const urlTemporaria =
            URL.createObjectURL(arquivoZIP);

        const link = document.createElement("a");

        link.href = urlTemporaria;
        link.download = nomeZIP;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(function () {
            URL.revokeObjectURL(urlTemporaria);
        }, 60000);

    } catch (erro) {

        console.error(
            "Erro no download em lote:",
            erro
        );

        alert(
            "Não foi possível gerar o ZIP.\n" +
            erro.message
        );

    } finally {

        botaoDownloadLote.disabled = false;
        botaoDownloadLote.innerHTML = textoOriginal;

    }
}


if (botaoDownloadLote) {

    botaoDownloadLote.addEventListener(
        "click",
        baixarRelatoriosEmLote
    );

}

