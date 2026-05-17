export const ARTICLES = [
  {
    id: "social-safety",
    title: "Segurança em Redes Sociais",
    excerpt:
      "Dicas para proteger sua privacidade e evitar compartilhamento indevido de conteúdo.",
    content:
      "Em redes sociais, nunca compartilhe fotos íntimas, mantenha perfis privados quando possível, verifique configurações de privacidade e não aceite pedidos de pessoas desconhecidas. Em caso de ameaça, bloqueie e reporte.",
  },
  {
    id: "digital-harassment",
    title: "Assédio Digital e Como Agir",
    excerpt:
      "Entenda sinais de assédio online e passos para denunciar e proteger-se.",
    content:
      "Assédio digital pode incluir mensagens repetitivas, ameaças, exposição de fotos sem consentimento e chantagem. Preserve evidências (prints), limite contato, busque apoio e denuncie às plataformas e autoridades quando necessário.",
  },
];

export const QUIZ_QUESTIONS_BY_ARTICLE: Record<string, any[]> = {
  "social-safety": [
    {
      id: 1,
      title: "Segurança em Redes Sociais",
      question:
        "O que você deve fazer quando alguém pede uma foto íntima pela internet?",
      options: [
        "Enviar para manter a relação",
        "Negar e bloquear, pedir ajuda a um adulto de confiança",
        "Compartilhar com amigos para validar a intenção",
      ],
      correctAnswer: 1,
      feedback:
        "Nunca compartilhe esse tipo de conteúdo. Bloqueie, reporte e peça ajuda. Manter registro pode ser útil para denúncias.",
    },
    {
      id: 2,
      title: "Segurança em Redes Sociais",
      question: "Por que manter seu perfil privado pode ajudar?",
      options: [
        "Porque evita que desconhecidos acessem suas postagens",
        "Porque deixa o perfil mais bonito",
        "Porque aumenta seguidores",
      ],
      correctAnswer: 0,
      feedback:
        "Perfis privados limitam quem pode ver suas postagens e reduzem riscos de exposição indesejada.",
    },
  ],
  "digital-harassment": [
    {
      id: 1,
      title: "Assédio Digital e Como Agir",
      question:
        "Qual é a primeira ação recomendada ao receber mensagens de assédio?",
      options: [
        "Responder para tentar acalmar a pessoa",
        "Preservar evidências e limitar contato",
        "Compartilhar as mensagens com outras pessoas públicas",
      ],
      correctAnswer: 1,
      feedback:
        "Preserve provas, limite contato e procure apoio. Responder pode escalar a situação.",
    },
    {
      id: 2,
      title: "Assédio Digital e Como Agir",
      question: "Quando é apropriado denunciar às autoridades?",
      options: [
        "Quando houver ameaça ou crime (chantagem, perseguição)",
        "Só quando a pessoa for famosa",
        "Nunca, denúncias não adiantam",
      ],
      correctAnswer: 0,
      feedback:
        "A denúncia é indicada em casos de crime, ameaça ou situações que requerem intervenção legal.",
    },
  ],
};
