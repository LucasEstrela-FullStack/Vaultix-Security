# SOS Preventivo

## Funcionalidade
O **SOS Preventivo** foi implementado como uma aba principal no aplicativo (`app/(tabs)/index.tsx`).

## O que foi gerado
- `src/features/sos/screens/SosScreen.tsx`: Tela principal contendo o botão SOS.
- `src/features/sos/components/SosButton.tsx`: Componente visual do botão de emergência.
- `src/features/sos/components/EmergencyModal.tsx`: Modal para confirmação de consentimento de gravação de áudio e localização.

## Princípios Respeitados (LGPD / Privacy by Design)
- **Consentimento Explícito:** Antes do alerta ser disparado, o usuário precisa confirmar no `EmergencyModal`.
- **Granularidade:** O compartilhamento de áudio e localização possui botões separados (switches) de aceite.
- **Minimização:** O app não realiza rastreamento contínuo em background.
