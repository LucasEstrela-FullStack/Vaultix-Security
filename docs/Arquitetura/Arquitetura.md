# PROMPT — ARQUITETURA TÉCNICA DO PROJETO

Você é um Arquiteto de Software Sênior especializado em:

- React Native
- Expo SDK 54
- TypeScript
- Arquitetura escalável para MVPs
- Segurança da Informação
- LGPD
- Privacy by Design
- Aplicações educacionais e preventivas
- Mobile Architecture
- Clean Architecture
- Feature Based Architecture

Sua missão é projetar TODA a arquitetura técnica do aplicativo mobile “SafeSync”, desenvolvido para o Hackathon Hacker Hero 2026.
 
IMPORTANTE:
O foco NÃO é gerar telas bonitas.
O foco NÃO é gerar apenas componentes.
O foco principal é:

- viabilidade técnica;
- organização escalável;
- segurança;
- conformidade com LGPD;
- arquitetura limpa;
- separação de responsabilidades;
- modularização;
- manutenção futura;
- performance;
- experiência offline;
- privacidade;
- MVP viável em 48h.

---

# CONTEXTO DO PROJETO

O SafeSync é um aplicativo mobile preventivo e educativo voltado à proteção digital de crianças e adolescentes.

A aplicação NÃO possui caráter:
- investigativo;
- policial;
- pericial;
- invasivo;
- monitoramento contínuo.

O sistema atua exclusivamente com:
- prevenção;
- acolhimento;
- educação digital;
- orientação segura;
- apoio institucional.

---

# FUNCIONALIDADES PRINCIPAIS

## 1. SOS Preventivo

Fluxo emergencial seguro contendo:
- botão SOS;
- confirmação em 2 etapas;
- compartilhamento opcional de localização;
- gravação opcional de áudio;
- alerta para contato de confiança;
- permissões explícitas;
- consentimento granular;
- funcionamento temporário;
- Privacy by Design.

IMPORTANTE:
NÃO pode existir:
- rastreamento contínuo;
- monitoramento em background;
- vigilância parental;
- gravação oculta;
- coleta excessiva de dados.

---

## 2. Quiz Preventivo

Módulo educativo contendo:
- quizzes interativos;
- perguntas preventivas;
- feedback educativo;
- cenários fictícios;
- conteúdos sobre:
  - sextorsão;
  - engenharia social;
  - privacidade;
  - golpes;
  - segurança digital.

IMPORTANTE:
- utilizar apenas conteúdo fictício;
- não utilizar casos reais;
- não utilizar dados pessoais;
- arquitetura preparada para escalabilidade futura de quizzes.

---

## 3. Central de Ajuda e Acolhimento

Fluxo contendo:
- relato opcional anônimo;
- múltipla escolha para pedido de ajuda;
- sugestão inteligente de canais;
- encaminhamento institucional;
- chat anônimo;
- suporte preventivo;
- integração com:
  - CVV;
  - Disque 100;
  - Polícia Civil;
  - PM;
  - Conselho Tutelar;
  - instituições parceiras.

IMPORTANTE:
- anonimato total;
- minimização de dados;
- nenhuma coleta ilegal;
- nenhum monitoramento;
- nenhuma investigação.

---

# STACK OBRIGATÓRIA

Utilizar:
- Expo SDK 54
- React Native
- TypeScript
- Expo Router

---

# O QUE DEVE SER GERADO

Gerar uma arquitetura COMPLETA contendo:

# 1. Estrutura de Pastas

Definir:
- src/
- app/
- features/
- shared/
- services/
- hooks/
- providers/
- infra/
- core/
- config/
- store/
- assets/
- utils/
- validations/
- types/

Explicar:
- responsabilidade de cada pasta;
- relação entre módulos;
- desacoplamento;
- separação de domínio.

---

# 2. Arquitetura por Features

Organizar:
- SOS
- Quiz
- Help Center

Cada feature deve conter:
- screens
- components
- hooks
- services
- types
- validations
- stores
- utils

---

# 3. Arquitetura de Estado

Definir:
- Zustand OU Context API
- separação global/local
- gerenciamento de sessão
- persistência segura
- cache leve
- estado offline

Explicar:
- porque foi escolhido;
- vantagens para MVP;
- escalabilidade futura.

---

# 4. Fluxo de Navegação

Definir:
- Expo Router;
- stacks;
- tabs;
- rotas privadas;
- rotas públicas;
- fluxo onboarding;
- fluxo SOS;
- fluxo Help Center.

---

# 5. Camada de Segurança

Explicar:
- gerenciamento de permissões;
- consentimento explícito;
- proteção de dados;
- armazenamento seguro;
- dados temporários;
- anonimização;
- Privacy by Design;
- LGPD.

Definir:
- o que pode ser armazenado;
- o que NÃO deve ser armazenado.

---

# 6. Arquitetura Offline First

Definir:
- quais dados podem funcionar offline;
- cache local;
- sincronização;
- fallback sem internet;
- persistência temporária.

---

# 7. Integrações Expo

Explicar:
- expo-location
- expo-av
- expo-notifications
- expo-secure-store
- expo-router

---

# 8. Estrutura de Serviços

Separar:
- api services
- emergency services
- permission services
- chat services
- analytics services
- education services

---

# 9. Escalabilidade

Explicar:
- como o sistema pode crescer;
- modularização futura;
- possibilidade de backend;
- multi plataforma;
- push notifications;
- dashboards;
- IA educativa futura.

---

# 10. Viabilidade Técnica do MVP

Explicar:
- o que é essencial para 48h;
- o que deve ser simplificado;
- prioridades;
- riscos técnicos;
- funcionalidades críticas;
- estratégia para entrega rápida.

---

# 11. Arquitetura de Componentes

Separar:
- shared UI
- feature UI
- containers
- business logic
- reusable components

---

# 12. Boas Práticas Obrigatórias

Aplicar:
- SOLID
- Clean Code
- Feature First
- Separation of Concerns
- Reusabilidade
- Escalabilidade
- Performance
- Segurança

---

# IMPORTANTE

A resposta deve focar:
- arquitetura real;
- viabilidade;
- engenharia;
- organização profissional;
- estrutura de produção;
- MVP funcional;
- hackathon;
- segurança jurídica e técnica.

NÃO focar em:
- design visual;
- marketing;
- textos institucionais;
- branding.

A resposta deve parecer documentação de arquitetura técnica profissional.