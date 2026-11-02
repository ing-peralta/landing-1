export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  native: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español' },
  { code: 'en', name: 'Inglés', flag: '🇺🇸', native: 'English' },
  { code: 'fr', name: 'Francés', flag: '🇫🇷', native: 'Français' },
  { code: 'de', name: 'Alemán', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'ja', name: 'Japonés', flag: '🇯🇵', native: '日本語' },
  { code: 'pt', name: 'Portugués', flag: '🇧🇷', native: 'Português' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', native: 'Italiano' },
  { code: 'zh', name: 'Chino Mandarín', flag: '🇨🇳', native: '中文' },
];

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  featured?: boolean;
  audience: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'personal',
    name: 'Plan Personal',
    subtitle: 'Viajeros, Freelancers y Estudiantes',
    priceUSD: 10,
    audience: 'Individual',
    description: 'Para profesionales independientes, viajeros y estudiantes que necesitan traducción bidireccional fluida.',
    features: [
      'Traducción ilimitada de texto en tiempo real (100+ idiomas)',
      '120 minutos mensuales de notas de voz transcritas y sintetizadas (TTS)',
      'Traducción OCR de imágenes y fotos de carteles/recibos',
      'PWA instalable con sincronización en móvil y desktop',
      'Motor Mistral AI optimizado para lenguaje conversacional',
    ],
    ctaLabel: 'Suscribirse al Plan Personal ($10/mes)',
  },
  {
    id: 'empresarial',
    name: 'Plan Empresarial',
    subtitle: 'Equipos Remotos, Ventas y Soporte B2B',
    priceUSD: 30,
    featured: true,
    audience: 'Empresas & Startups',
    description: 'Para empresas con equipos distribuidos, comercio internacional y departamentos de atención multilingüe.',
    features: [
      'Todo lo de Personal con minutos de audio y OCR ilimitados',
      'Canales de equipo ilimitados con salas privadas por país',
      'Traducción de documentos PDF, Word y hojas de cálculo',
      'Ajuste de registro formal/técnico del modelo Mistral AI',
      'Facturación mensual automatizada por Stripe o Mercado Pago',
      'Prioridad de inferencia sub-80ms con WebSockets dedicados',
    ],
    ctaLabel: 'Suscribirse a Empresarial ($30/mes)',
  },
  {
    id: 'educacion',
    name: 'Plan Educación',
    subtitle: 'Escuelas, Universidades e Intercambios',
    priceUSD: 30,
    audience: 'Instituciones Educativas',
    description: 'Diseñado específicamente para instituciones educativas, academias de idiomas y programas de intercambio cultural.',
    features: [
      'Licencia institucional para aulas y grupos de intercambio',
      'Salas guiadas para práctica conversacional estudiante-profesor',
      'Transcripciones bilingües descargables para estudio posterior',
      'Panel de control para profesores y moderadores de sala',
      'Pago institucional vía Stripe Invoice o Mercado Pago',
      'Soporte pedagógico y configuración asistida',
    ],
    ctaLabel: 'Suscribirse a Educación ($30/mes)',
  },
];

export interface FlowStep {
  step: number;
  title: string;
  actor: 'Visitante' | 'Frontend Vuetify' | 'Backend Node.js' | 'Pasarela (Stripe/MP)' | 'Base de Datos';
  description: string;
  technicalDetail: string;
  codeSnippet?: string;
}

export const SUBSCRIPTION_FLOW_STEPS: FlowStep[] = [
  {
    step: 1,
    title: 'Landing Page & Comparación',
    actor: 'Visitante',
    description: 'El visitante evalúa los planes (Personal $10, Empresarial $30, Educación $30) y pulsa "Suscribirse".',
    technicalDetail: 'El frontend captura el plan seleccionado y abre el flujo de registro previo sin abandonar la experiencia.',
  },
  {
    step: 2,
    title: 'Registro / Identificación Previa',
    actor: 'Frontend Vuetify',
    description: 'El usuario ingresa su correo electrónico y contraseña para vincular su futura cuenta.',
    technicalDetail: 'Validación en cliente de formato de email y robustez de contraseña antes de invocar al backend.',
    codeSnippet: 'POST /api/auth/register-intent { email, passwordHash, planId: "empresarial" }',
  },
  {
    step: 3,
    title: 'Creación de Checkout en Node.js',
    actor: 'Backend Node.js',
    description: 'Node.js genera la sesión de pago criptográficamente firmada con Stripe o la pre-aprobación con Mercado Pago.',
    technicalDetail: 'Crea el cliente en la pasarela, define currency (USD o moneda local) y establece return_url & cancel_url.',
    codeSnippet: 'const session = await stripe.checkout.sessions.create({ customer_email, mode: "subscription", line_items: [{ price: "price_30_usd" }] });',
  },
  {
    step: 4,
    title: 'Pasarela de Pago Segura',
    actor: 'Pasarela (Stripe/MP)',
    description: 'Formulario bancario seguro donde el usuario introduce los datos de su tarjeta o cuenta digital.',
    technicalDetail: 'Si el pago es cancelado o declinado, la pasarela redirige a la Landing Page con código de error para reintentar.',
  },
  {
    step: 5,
    title: 'Webhook Asíncrono en Node.js',
    actor: 'Backend Node.js',
    description: 'La pasarela notifica a Node.js en segundo plano mediante webhook seguro (firma HMAC verificada).',
    technicalDetail: 'El servidor activa la suscripción en la base de datos, asigna el rol del plan y genera los créditos de Mistral AI.',
    codeSnippet: 'app.post("/api/webhooks/stripe", verifySignature, async (req, res) => { await activateSubscription(req.body); });',
  },
  {
    step: 6,
    title: 'Redirección & Página de Bienvenida',
    actor: 'Frontend Vuetify',
    description: 'El navegador redirige a la página de éxito confirmando el pago y el ID de suscripción activa.',
    technicalDetail: 'Muestra el resumen de la compra, confirmación de factura y botón de acceso directo a la plataforma.',
  },
  {
    step: 7,
    title: 'Acceso Directo al Dashboard con JWT',
    actor: 'Frontend Vuetify',
    description: 'Node.js expide el JWT de sesión y el usuario entra directamente a su panel de chat en Vuetify.',
    technicalDetail: 'Token JWT inyectado en cabecera Bearer y almacenamiento seguro en memoria/PWA para navegación instantánea.',
    codeSnippet: 'localStorage.setItem("vx_auth_token", jwtToken); router.push("/app/dashboard");',
  },
];

export interface SimulatorSample {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'image' | 'file';
  senderLang: string;
  senderText: string;
  audioDuration?: string;
  imageDetail?: string;
  fileDetail?: string;
  translations: Record<string, string>;
}

export const SIMULATOR_SAMPLES: SimulatorSample[] = [
  {
    id: 'b2b-deal',
    title: 'Negociación Comercial',
    type: 'text',
    senderLang: 'es',
    senderText: 'Hola Elena, revisamos los términos del contrato comercial. Podemos iniciar la integración el lunes si confirmamos el presupuesto hoy.',
    translations: {
      en: 'Hi Elena, we reviewed the commercial contract terms. We can begin integration on Monday if we confirm the budget today.',
      fr: 'Bonjour Elena, nous avons examiné les conditions du contrat commercial. Nous pouvons commencer l\'intégration lundi si nous confirmons le budget aujourd\'hui.',
      de: 'Hallo Elena, wir haben die Bedingungen des Handelsvertrags geprüft. Wir können am Montag mit der Integration beginnen, wenn wir das Budget heute bestätigen.',
      ja: 'エレナさん、こんにちは。商業契約の条件を確認しました。本日予算を確定できれば、月曜日から導入を開始できます。',
      pt: 'Olá Elena, revisamos os termos do contrato comercial. Podemos iniciar a integração na segunda-feira se confirmarmos o orçamento hoje.',
      it: 'Ciao Elena, abbiamo esaminato i termini del contrato commerciale. Possiamo iniziare l\'integrazione lunedì se confermiamo il budget oggi.',
      zh: '您好埃琳娜，我们审查了商业合同条款。如果今天确认预算，我们可以在周一开始集成。',
    },
  },
  {
    id: 'audio-note',
    title: 'Nota de Voz Urgente',
    type: 'audio',
    senderLang: 'en',
    audioDuration: '0:14',
    senderText: 'Hey team, the client approved the final roadmap! Let\'s deploy the staging build and wrap up QA before 5 PM.',
    translations: {
      es: '¡Hola equipo, el cliente aprobó la hoja de ruta final! Despleguemos la versión de prueba y cerremos el control de calidad antes de las 5 PM.',
      fr: 'Salut l\'équipe, le client a validé la roadmap finale ! Déployons la version staging et bouclons la QA avant 17h.',
      de: 'Hallo Team, der Kunde hat die finale Roadmap genehmigt! Lasst uns den Staging-Build bereitstellen und die QA vor 17:00 Uhr abschließen.',
      ja: 'チームの皆さん、クライアントが最終ロードマップを承認しました！ステージング環境をデプロイし、午後5時までにQAを完了させましょう。',
      pt: 'Oi equipe, o cliente aprovou o roadmap final! Vamos implantar o build de testes e finalizar a homologação antes das 17h.',
      it: 'Ciao team, il cliente ha approvato la roadmap finale! Distribuiamo la build di staging e completiamo il QA prima delle 17:00.',
      zh: '团队好，客户已经批准了最终路线图！让我们部署预发布版本，并在下午5点前完成质量保证。',
    },
  },
  {
    id: 'image-ocr',
    title: 'Imagen / Documento OCR',
    type: 'image',
    senderLang: 'ja',
    imageDetail: 'Factura técnica / Especificación de hardware',
    senderText: '製品保証書: 本製品は納品日より24ヶ月間、ハードウェアの欠陥に対して完全な無償修理を提供します。',
    translations: {
      es: 'Garantía del Producto: Este equipo ofrece reparación totalmente gratuita contra defectos de hardware durante 24 meses desde la entrega.',
      en: 'Product Warranty: This unit provides full free repair for hardware defects for 24 months from the date of delivery.',
      fr: 'Garantie Produit : Cet appareil bénéficie d\'une réparation gratuite pour tout défaut matériel pendant 24 mois à compter de la livraison.',
      de: 'Produktgarantie: Dieses Gerät bietet für 24 Monate ab Lieferdatum eine vollständig kostenlose Reparatur von Hardwaredefekten.',
      pt: 'Garantia do Producto: Este equipamento oferece reparo totalmente gratuito para defeitos de hardware por 24 meses a partir da entrega.',
      it: 'Garanzia del Prodotto: Questo dispositivo offre riparazione gratuita per difetti hardware per 24 mesi dalla consegna.',
      zh: '产品保修单：本产品自交付之日起24个月内，针对硬件缺陷提供完全免费维修。',
    },
  },
  {
    id: 'file-doc',
    title: 'Archivo PDF / Minuta',
    type: 'file',
    senderLang: 'de',
    fileDetail: 'Minuta_Reunion_Estrategica_Q4.pdf (1.2 MB)',
    senderText: 'Zusammenfassung: Die Marktexpansion in Lateinamerika startet im ersten Quartal. Budgeterhöhung um 20% bewilligt.',
    translations: {
      es: 'Resumen: La expansión del mercado en Latinoamérica comienza en el primer trimestre. Aumento de presupuesto del 20% aprobado.',
      en: 'Summary: Market expansion into Latin America launches in Q1. A 20% budget increase has been approved.',
      fr: 'Résumé : L\'expansion du marché en Amérique latine commence au premier trimestre. Augmentation de 20% du budget validée.',
      ja: '要約：ラテンアメリカへの市場展開は第1四半期に開始されます。20%の予算増額が承認されました。',
      pt: 'Resumo: A expansão de mercado na América Latina começa no primeiro trimestre. Aumento de 20% no orçamento aprovado.',
      it: 'Riepilogo: L\'espansione sul mercato in America Latina inizierà nel primo trimestre. Approvato un aumento del budget del 20%.',
      zh: '总结：拉丁美洲市场扩张将于第一季度启动。已批准增加20%的预算。',
    },
  },
];

export const PROBLEM_SOLUTIONS = [
  {
    category: 'El Desafío Global',
    title: 'La barrera del idioma en la era remota',
    problem: 'Copiar y pegar texto en traductores rompe la fluidez, distorsiona el tono profesional y hace imposible mantener conversaciones ágiles.',
    solution: 'Converxar traduce bidireccionalmente cada interacción sin abandonar la conversación ni un segundo.',
    icon: 'MessageSquareText',
  },
  {
    category: 'Audio & Notas de Voz',
    title: 'Escucha en tu lengua sin perder emoción',
    problem: 'Las notas de voz son el canal preferido en WhatsApp y Slack, pero resultan ininteligibles cuando el remitente habla otra lengua.',
    solution: 'Mistral transcribe el audio y sintetiza la traducción instantánea, permitiendo reproducir la voz en tu idioma o leer el texto sincronizado.',
    icon: 'Mic',
  },
  {
    category: 'Imágenes & Documentos',
    title: 'OCR y archivos traducidos en el mismo chat',
    problem: 'Recibir capturas de pantalla, etiquetas de productos o PDFs en caracteres desconocidos exige herramientas externas y tiempo valioso.',
    solution: 'Sube fotos o documentos y visualiza el texto traducido sobre la propia imagen o descarga la versión adaptada a tu idioma.',
    icon: 'FileSpreadsheet',
  },
  {
    category: 'Arquitectura PWA',
    title: 'Sin descargas forzadas ni comisiones',
    problem: 'Instalar apps pesadas desde tiendas consume memoria y complica la incorporación de clientes o contratistas externos.',
    solution: 'Accede desde cualquier navegador web o instálala como PWA nativa en iOS, Android, Mac o Windows en un clic.',
    icon: 'Smartphone',
  },
];

export const VUETIFY_HIGHLIGHTS = [
  {
    component: 'VNavigationDrawer & VList',
    description: 'Gestión ergonómica de salas de chat, canales de equipo y contactos con banderas de idioma activas.',
  },
  {
    component: 'VAppBar & VMenu',
    description: 'Selector instantáneo de idioma preferido con un solo toque; el chat entero se reconfigura en milisegundos.',
  },
  {
    component: 'VCard & Waveform Player',
    description: 'Burbujas de audio interactivas con espectro de sonido animado, control de velocidad (1x, 1.5x) y transcripción colapsable.',
  },
  {
    component: 'VTextField & VBtn Actions',
    description: 'Caja de texto reactiva con accesos directos para dictado por voz, carga de fotos y selección de nivel de formalidad.',
  },
];

export const FAQS = [
  {
    question: '¿Qué es exactamente Converxar.com?',
    answer: 'Converxar.com es una aplicación web y PWA (Progressive Web App) de mensajería en tiempo real que elimina por completo las barreras lingüísticas. Permite que varias personas conversen usando texto, notas de voz, imágenes o archivos, y cada participante recibe todo el contenido traducido automáticamente a su propio idioma.',
  },
  {
    question: '¿Cuáles son los planes de suscripción disponibles?',
    answer: 'Ofrecemos tres planes mensuales adaptados a tus necesidades: Plan Personal a $10 USD/mes (para viajeros y freelancers), Plan Empresarial a $30 USD/mes (para equipos remotos y empresas con audio y OCR ilimitado) y Plan Educación a $30 USD/mes (diseñado para instituciones académicas, universidades y programas de intercambio cultural).',
  },
  {
    question: '¿Cómo funciona el flujo completo desde que me suscribo hasta entrar a la app?',
    answer: 'Sigue un flujo seguro de 7 pasos: 1) Seleccionas tu plan en la landing, 2) Te identificas con Email y Contraseña, 3) Node.js genera la sesión de pago segura, 4) Pagas con Stripe o Mercado Pago, 5) Un webhook asíncrono activa tu cuenta en la base de datos, 6) Recibes la página de confirmación, y 7) Se genera tu token JWT para ingresar de inmediato al Dashboard de Converxar.',
  },
  {
    question: '¿Por qué se eligió la API de Mistral AI?',
    answer: 'Mistral AI destaca por sus modelos de lenguaje compactos, rápidos y con una comprensión excepcional de matices idiomáticos, modismos y contexto cultural. Su bajísima latencia permite streaming de traducciones en tiempo real prácticamente imperceptibles.',
  },
  {
    question: '¿Qué pasarelas de pago soporta Converxar para suscripciones?',
    answer: 'Soportamos Stripe (la opción recomendada para cobros en USD/EUR globales) y Mercado Pago (el estándar para cobros en moneda local en Latinoamérica como ARS, MXN, BRL, CLP y COP). Ambas pasarelas procesan suscripciones mensuales automáticas con reintentos inteligentes.',
  },
  {
    question: '¿Por qué Stripe es la opción recomendada para clientes globales?',
    answer: 'Stripe Checkout gestiona automáticamente la lógica compleja de reintentos de cobro, actualización de tarjetas vencidas, facturación mensual y portal de cliente, permitiendo un flujo sin fricción para empresas e instituciones educativas internacionales sin sobrecargar el servidor Node.js.',
  },
  {
    question: '¿Puedo pagar en mi moneda local con Mercado Pago en América Latina?',
    answer: 'Sí. Mercado Pago permite pagar en Pesos Argentinos (ARS), Pesos Mexicanos (MXN), Reales (BRL con soporte Pix), Pesos Chilenos (CLP) y Colombianos (COP) mediante su API de Pre-aprobaciones / Subscriptions, evitando comisiones por cambio de divisa o bloqueos de tarjetas.',
  },
  {
    question: '¿Qué sucede si un pago es cancelado o rechazado por el banco?',
    answer: 'Si la pasarela detecta fondos insuficientes o la operación es cancelada por el usuario, el flujo redirige automáticamente a la Landing Page con un mensaje explicativo y un enlace de reintento directo para que el usuario pueda usar otro método de pago sin perder sus datos de registro.',
  },
  {
    question: '¿Cuándo estará disponible y cómo funciona el Acceso Anticipado?',
    answer: 'Estamos abriendo invitaciones por lotes a través de la lista de espera (Waitlist). Los primeros usuarios inscritos obtendrán 6 meses de plan Pro gratuito con minutos ilimitados de audio y traducción de documentos.',
  },
];
