
/*
=========================================================
RBO CONSULTA
SERVICE WORKER - PWA
=========================================================
*/

const CACHE_NAME = "rbo-consulta-v1.0.0";

const ARQUIVOS_ESTATICOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./css/style.css",
    "./js/api.js",
    "./js/app.js",
    "./icons/app-icon-192.png",
    "./icons/app-icon-512.png"
];


/*
=========================================================
INSTALAÇÃO
=========================================================
*/

self.addEventListener("install", function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ARQUIVOS_ESTATICOS);
        })
    );

    self.skipWaiting();

});


/*
=========================================================
ATIVAÇÃO E LIMPEZA DE CACHE ANTIGO
=========================================================
*/

self.addEventListener("activate", function (event) {

    event.waitUntil(
        caches.keys().then(async function (nomes) {

            await Promise.all(
                nomes
                    .filter(function (nome) {
                        return (
                            nome.startsWith("rbo-consulta-") &&
                            nome !== CACHE_NAME
                        );
                    })
                    .map(function (nome) {
                        return caches.delete(nome);
                    })
            );

            await self.clients.claim();

        })
    );

});


/*
=========================================================
INTERCEPTAÇÃO DE REQUISIÇÕES
=========================================================
*/

self.addEventListener("fetch", function (event) {

    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // Não interceptar requisições externas,
    // incluindo Cloudflare, Google Drive e JSZip.

    if (url.origin !== self.location.origin) {
        return;
    }

    // Não armazenar respostas da API.

    if (
        url.pathname.includes("/api/") ||
        url.pathname.includes("/download")
    ) {
        return;
    }

    // Recursos locais: prioriza a versão atualizada
    // da rede e utiliza o cache quando offline.

    event.respondWith(

        fetch(request)
            .then(function (response) {

                if (
                    response.ok &&
                    response.type === "basic"
                ) {

                    const copia = response.clone();

                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                return cache.put(request, copia);
                            })
                    );

                }

                return response;

            })
            .catch(function () {

                return caches.match(request)
                    .then(function (response) {

                        if (response) {
                            return response;
                        }

                        if (request.mode === "navigate") {
                            return caches.match("./index.html");
                        }

                        return Response.error();

                    });

            })

    );

});
