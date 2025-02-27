<h1 align="center"><img src="" width="36" align="center" align-items="center"/> 🔎 Watchdog API </h1>

<p align="center">
  WatchdogAPI é um projeto pessoal criado para praticar e compartilhar conceitos de observabilidade e monitoramento em Node.js. Esta API simples gera logs, métricas e traces, permitindo uma visão completa do seu funcionamento em tempo real. 
</p>

## Conceitos Abordados

Antes de seguirmos para os componentes do monitoramento, é importante entender o que é SRE.

### SRE (Site Reliability Engineering)

SRE é um framework que busca garantir que sistemas, sites e softwares sejam **confiáveis** e **altamente disponíveis**. Para alcançar esses objetivos, ele adota **práticas**, **princípios** e **ferramentas** que ajudam a manter a estabilidade dos serviços.

Alguns princípios essenciais do SRE que orientam a construção de um monitoramento eficaz incluem:

- **SLO (Service Level Objective - Objetivo de Nível de Serviço):** Define a meta de disponibilidade da aplicação. Por exemplo, um SLO de 99% significa que a aplicação deve estar disponível 99% do tempo.
- **Error Budget (Orçamento de Erros):** Determina quanto tempo de indisponibilidade é aceitável. Se o SLO for 99%, o error budget será 1%, indicando que a aplicação pode ficar fora do ar por até 1% do tempo.
- **SLI (Service Level Indicator - Indicador de Nível de Serviço):** Conjunto de métricas que permitem avaliar se o SLO está sendo cumprido. Exemplos incluem taxa de erros, latência e número de requisições bem-sucedidas, que ajudam a mensurar a disponibilidade da aplicação.

Esses princípios já são suficientes para avançarmos neste projeto. Caso queira se aprofundar mais em SRE, recomendo a leitura do [workbook](https://sre.google/workbook/how-sre-relates/) da Google e do documento sobre [SLOs](https://sre.google/workbook/slo-document/) da Google.

### Observabilidade

Aplicações modernas são compostas por diversos componentes, APIs, microserviços e sistemas distribuídos, o que pode dificultar a análise quando ocorre algum problema. A observabilidade busca fornecer dados e informações que permitam entender o estado e o comportamento da aplicação, bem como todos os componentes que fazem parte da infraestrutura do serviço.

Com isso, é possível identificar gargalos de desempenho, explorar o uso de hardware e diagnosticar erros desconhecidos.

A observabilidade é composta por três pilares principais:

- **Logs:** Registros de eventos, erros e operações do sistema. É importante estruturá-los e padronizá-los para garantir informações essenciais e facilitar a análise da jornada de execução das aplicações.
- **Métricas:** Dados numéricos coletados ao longo do tempo, permitindo acompanhar o comportamento da aplicação em períodos definidos. Exemplos comuns incluem métricas de CPU, latência, número de requisições e erros.
- **Traces:** Rastreamento de transações end-to-end dentro da aplicação, permitindo identificar gargalos de desempenho e dependências entre serviços.

Este projeto implementa os três pilares da observabilidade para garantir uma análise detalhada do sistema.

### Monitoramento

Após tornar a aplicação observável, é possível implementar o monitoramento contínuo para acompanhar a saúde do sistema. Isso inclui a análise de **SLIs** e regras de negócio por meio de dashboards, além da configuração de alertas para notificar as pessoas responsáveis quando ocorrerem problemas, como:

- Serviços fora do ar
- Estouro de memória
- Queda no volume de dados em períodos de pico de acesso

O monitoramento tem os seguintes objetivos principais:

- **Reagir a problemas** conhecidos por meio de alertas
- **Permitir o acompanhamento de dados** através de gráficos e dashboards
- **Reduzir o tempo de detecção de problemas**, medir impacto e otimizar a análise da causa raiz

Agora que entendemos o que é **observabilidade** e **monitoramento**, podemos explorar as ferramentas utilizadas neste projeto.

## Ferramentas

### Prometheus

### Node Exporter

### Alertmanager

### Loki

### Grafana

### Jaeger
