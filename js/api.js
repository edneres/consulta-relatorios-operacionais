
/*
=========================================================
API - CONSULTA DE RELATÓRIOS OPERACIONAIS
Comunicação com o Cloudflare Worker
=========================================================
*/

const API_URL =
    "https://consulta-relatorios-api.rboregionalleste.workers.dev";


/*
=========================================================
PESQUISAR RELATÓRIOS
=========================================================
*/

async function consultarRelatoriosAPI(
    dataInicial,
    dataFinal,
    filtros
) {

    const parametros = new URLSearchParams({
        inicio: dataInicial,
        fim: dataFinal,
        filtros: JSON.stringify(filtros)
    });

    const url =
        `${API_URL}/relatorios?${parametros.toString()}`;

    try {

        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            cache: "no-store"
        });

        const dados = await resposta.json();

        if (!resposta.ok || !dados.sucesso) {

            throw new Error(
                dados.erro ||
                "Não foi possível consultar os relatórios."
            );

        }

        return dados;

    } catch (erro) {

        console.error(
            "Erro na consulta de relatórios:",
            erro
        );

        throw erro;

    }

}
