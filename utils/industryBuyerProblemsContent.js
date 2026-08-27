export const BUYER_PROBLEM_LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];
export const INDUSTRY_BUYER_PROBLEM_IDS = [
  "water-testing-labs",
  "water-quality-control",
  "municipal-water-testing",
  "food-beverage-water-quality",
  "industrial-process-water",
  "facility-water-risk",
  "agriculture-water",
  "pharma-cosmetics-water",
  "hospitality-tourism-water"
];
export const INDUSTRY_BUYER_PROBLEM_DATE_MODIFIED = '2026-06-23';

export const BUYER_PROBLEM_LABELS = {
  "en": {
    "eyebrow": "Buyer priorities",
    "title": "Problems buyers and technical teams need to solve",
    "cta": "Review my current workflow"
  },
  "es": {
    "eyebrow": "Prioridades del comprador",
    "title": "Problemas que compradores y responsables técnicos necesitan resolver",
    "cta": "Analizar mi flujo actual"
  },
  "fr": {
    "eyebrow": "Priorités des acheteurs",
    "title": "Problèmes que les acheteurs et équipes techniques doivent résoudre",
    "cta": "Analyser mon flux actuel"
  },
  "it": {
    "eyebrow": "Priorità del buyer",
    "title": "Problemi che buyer e team tecnici devono risolvere",
    "cta": "Analizza il mio flusso attuale"
  },
  "ca": {
    "eyebrow": "Prioritats del comprador",
    "title": "Problemes que compradors i equips tècnics necessiten resoldre",
    "cta": "Analitzar el meu flux actual"
  }
};

export const BUYER_PROBLEM_LINK_KIND_LABELS = {
  "en": {
    "resource": "Technical resource",
    "glossary": "Glossary concept",
    "tool": "AquaTools Free"
  },
  "es": {
    "resource": "Recurso técnico",
    "glossary": "Concepto del glosario",
    "tool": "AquaTools Free"
  },
  "fr": {
    "resource": "Ressource technique",
    "glossary": "Concept du glossaire",
    "tool": "AquaTools Free"
  },
  "it": {
    "resource": "Risorsa tecnica",
    "glossary": "Concetto del glossario",
    "tool": "AquaTools Free"
  },
  "ca": {
    "resource": "Recurs tècnic",
    "glossary": "Concepte del glossari",
    "tool": "AquaTools Free"
  }
};

export const INDUSTRY_BUYER_PROBLEMS = {
  "water-testing-labs": {
    "problemIds": [
      "increase-throughput",
      "reduce-turnaround",
      "preserve-custody",
      "improve-client-visibility",
      "add-services-with-quality"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores de laboratorios buscan aumentar capacidad y velocidad sin perder control técnico, trazabilidad ni confianza del cliente. La decisión suele centrarse en cómo ordenar el flujo de muestra a informe y cómo incorporar nuevos ensayos sin multiplicar la carga administrativa.",
        "problems": [
          {
            "id": "increase-throughput",
            "question": "¿Cómo procesar más muestras sin aumentar la carga administrativa?",
            "answer": "El cuello de botella suele aparecer entre el alta, la preparación, la lectura, la revisión y la emisión del informe. El resultado buscado es un flujo común que reduzca transcripción manual y mantenga cada muestra vinculada a usuario, lote, método y estado."
          },
          {
            "id": "reduce-turnaround",
            "question": "¿Cómo reducir el TAT sin debilitar la revisión técnica?",
            "answer": "Reducir el tiempo de respuesta no consiste en eliminar controles, sino en acortar esperas y traspasos. El comprador busca estandarizar pasos, priorizar pendientes y entregar resultados con lectura, comentarios, revisión y aprobación claramente documentados."
          },
          {
            "id": "preserve-custody",
            "question": "¿Cómo mantener cadena de custodia y trazabilidad de lotes?",
            "answer": "Cuando campo, recepción, banco y calidad usan registros separados, reconstruir un resultado consume tiempo. El objetivo es conservar en un mismo historial el punto, las condiciones, el operador, el kit, el lote, el método, los controles y las evidencias."
          },
          {
            "id": "improve-client-visibility",
            "question": "¿Cómo dar más visibilidad a clientes B2B sin depender de correos?",
            "answer": "Los clientes quieren consultar estado, resultados, informes e histórico por cuenta, instalación o punto. El comprador busca un portal y entregables consistentes que reduzcan consultas operativas y permitan recuperar cada CoA con rapidez."
          },
          {
            "id": "add-services-with-quality",
            "question": "¿Cómo incorporar nuevos ensayos sin romper el sistema de calidad?",
            "answer": "Añadir colífagos u otros servicios exige revisar matriz, método, controles, competencia, validación y alcance. El resultado buscado es una implantación gradual con procedimiento documentado, materiales trazables y evidencia preparada para revisión o auditoría."
          }
        ]
      },
      "en": {
        "intro": "Laboratory buyers want more capacity and faster delivery without losing technical control, traceability or customer confidence. Their decision usually centres on organising the sample-to-report workflow and adding new tests without multiplying administrative work.",
        "problems": [
          {
            "id": "increase-throughput",
            "question": "How can we process more samples without increasing administrative workload?",
            "answer": "Bottlenecks usually appear between registration, preparation, reading, review and report release. The desired outcome is one shared workflow that reduces manual transcription while keeping every sample linked to user, batch, method and status."
          },
          {
            "id": "reduce-turnaround",
            "question": "How can we reduce turnaround time without weakening technical review?",
            "answer": "Reducing TAT should shorten waits and handoffs, not remove controls. Buyers want standardised steps, clear priorities and results delivered with reading, comments, review and approval fully documented."
          },
          {
            "id": "preserve-custody",
            "question": "How can we preserve chain of custody and batch traceability?",
            "answer": "When field, reception, bench and quality teams use separate records, reconstructing a result takes time. The goal is one history containing point, conditions, operator, kit, batch, method, controls and supporting evidence."
          },
          {
            "id": "improve-client-visibility",
            "question": "How can we give B2B customers more visibility without relying on email?",
            "answer": "Customers want status, results, reports and history by account, site or sampling point. Buyers need a portal and consistent deliverables that reduce operational queries and make every CoA easy to retrieve."
          },
          {
            "id": "add-services-with-quality",
            "question": "How can we add new tests without disrupting the quality system?",
            "answer": "Adding coliphage or other services requires review of matrix, method, controls, competence, validation and scope. Buyers seek a staged implementation with documented procedures, traceable materials and evidence ready for review or audit."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs de laboratoires veulent augmenter la capacité et accélérer la livraison sans perdre le contrôle technique, la traçabilité ni la confiance du client. La décision porte généralement sur l’organisation du flux échantillon-rapport et l’ajout de nouveaux essais sans multiplier l’administration.",
        "problems": [
          {
            "id": "increase-throughput",
            "question": "Comment traiter davantage d’échantillons sans augmenter la charge administrative ?",
            "answer": "Les goulots d’étranglement apparaissent souvent entre l’enregistrement, la préparation, la lecture, la revue et l’émission du rapport. Le résultat recherché est un flux commun réduisant la transcription manuelle tout en reliant chaque échantillon à l’utilisateur, au lot, à la méthode et au statut."
          },
          {
            "id": "reduce-turnaround",
            "question": "Comment réduire le délai de rendu sans affaiblir la revue technique ?",
            "answer": "Réduire le TAT signifie raccourcir les attentes et les transferts, non supprimer les contrôles. L’acheteur cherche des étapes standardisées, des priorités claires et des résultats accompagnés de lecture, commentaires, revue et approbation documentées."
          },
          {
            "id": "preserve-custody",
            "question": "Comment préserver la chaîne de traçabilité et les lots ?",
            "answer": "Lorsque terrain, réception, paillasse et qualité utilisent des registres séparés, reconstituer un résultat prend du temps. L’objectif est un historique unique regroupant point, conditions, opérateur, kit, lot, méthode, contrôles et preuves."
          },
          {
            "id": "improve-client-visibility",
            "question": "Comment offrir plus de visibilité aux clients B2B sans dépendre des e-mails ?",
            "answer": "Les clients veulent consulter statut, résultats, rapports et historique par compte, site ou point. L’acheteur recherche un portail et des livrables cohérents qui réduisent les demandes opérationnelles et facilitent l’accès à chaque CoA."
          },
          {
            "id": "add-services-with-quality",
            "question": "Comment ajouter de nouveaux essais sans perturber le système qualité ?",
            "answer": "Ajouter des coliphages ou d’autres services exige de revoir matrice, méthode, contrôles, compétence, validation et périmètre. Le résultat recherché est un déploiement progressif avec procédures documentées, matériaux traçables et preuves prêtes pour revue ou audit."
          }
        ]
      },
      "it": {
        "intro": "I buyer di laboratorio vogliono aumentare capacità e velocità senza perdere controllo tecnico, tracciabilità o fiducia del cliente. La decisione riguarda normalmente come organizzare il flusso campione-report e introdurre nuovi test senza moltiplicare il lavoro amministrativo.",
        "problems": [
          {
            "id": "increase-throughput",
            "question": "Come processare più campioni senza aumentare il carico amministrativo?",
            "answer": "I colli di bottiglia compaiono spesso tra registrazione, preparazione, lettura, revisione ed emissione del report. Il risultato atteso è un flusso comune che riduca la trascrizione manuale e mantenga ogni campione collegato a utente, lotto, metodo e stato."
          },
          {
            "id": "reduce-turnaround",
            "question": "Come ridurre il turnaround time senza indebolire la revisione tecnica?",
            "answer": "Ridurre il TAT significa accorciare attese e passaggi, non eliminare controlli. Il buyer cerca fasi standardizzate, priorità chiare e risultati consegnati con lettura, commenti, revisione e approvazione documentate."
          },
          {
            "id": "preserve-custody",
            "question": "Come mantenere catena di custodia e tracciabilità dei lotti?",
            "answer": "Quando campo, accettazione, banco e qualità usano registri separati, ricostruire un risultato richiede tempo. L’obiettivo è uno storico unico con punto, condizioni, operatore, kit, lotto, metodo, controlli ed evidenze."
          },
          {
            "id": "improve-client-visibility",
            "question": "Come offrire più visibilità ai clienti B2B senza dipendere dalle e-mail?",
            "answer": "I clienti vogliono consultare stato, risultati, report e storico per account, sito o punto. Il buyer cerca un portale e deliverable coerenti che riducano le richieste operative e rendano ogni CoA facilmente recuperabile."
          },
          {
            "id": "add-services-with-quality",
            "question": "Come introdurre nuovi test senza compromettere il sistema qualità?",
            "answer": "Aggiungere colifagi o altri servizi richiede revisione di matrice, metodo, controlli, competenza, validazione e ambito. Il risultato cercato è un’implementazione graduale con procedure documentate, materiali tracciabili ed evidenze pronte per revisione o audit."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors de laboratoris volen augmentar capacitat i velocitat sense perdre control tècnic, traçabilitat ni confiança del client. La decisió sol centrar-se en com ordenar el flux de mostra a informe i incorporar nous assajos sense multiplicar la càrrega administrativa.",
        "problems": [
          {
            "id": "increase-throughput",
            "question": "Com processar més mostres sense augmentar la càrrega administrativa?",
            "answer": "Els colls d’ampolla solen aparèixer entre l’alta, la preparació, la lectura, la revisió i l’emissió de l’informe. El resultat buscat és un flux comú que redueixi la transcripció manual i mantingui cada mostra vinculada a usuari, lot, mètode i estat."
          },
          {
            "id": "reduce-turnaround",
            "question": "Com reduir el TAT sense afeblir la revisió tècnica?",
            "answer": "Reduir el temps de resposta significa escurçar esperes i traspassos, no eliminar controls. El comprador busca passos estandarditzats, prioritats clares i resultats amb lectura, comentaris, revisió i aprovació documentades."
          },
          {
            "id": "preserve-custody",
            "question": "Com mantenir la cadena de custòdia i la traçabilitat dels lots?",
            "answer": "Quan camp, recepció, bancada i qualitat utilitzen registres separats, reconstruir un resultat consumeix temps. L’objectiu és un únic històric amb punt, condicions, operador, kit, lot, mètode, controls i evidències."
          },
          {
            "id": "improve-client-visibility",
            "question": "Com donar més visibilitat als clients B2B sense dependre dels correus?",
            "answer": "Els clients volen consultar estat, resultats, informes i històric per compte, instal·lació o punt. El comprador busca un portal i lliurables coherents que redueixin consultes operatives i facilitin recuperar cada CoA."
          },
          {
            "id": "add-services-with-quality",
            "question": "Com incorporar nous assajos sense alterar el sistema de qualitat?",
            "answer": "Afegir colífags o altres serveis exigeix revisar matriu, mètode, controls, competència, validació i abast. El resultat buscat és una implantació gradual amb procediments documentats, materials traçables i evidència preparada per a revisió o auditoria."
          }
        ]
      }
    }
  },
  "water-quality-control": {
    "problemIds": [
      "define-risk-programme",
      "consolidate-water-data",
      "respond-to-deviations",
      "prove-decisions",
      "move-to-prevention"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores quieren pasar de controles aislados a un programa de calidad del agua basado en riesgo. Necesitan decidir qué controlar, cómo comparar resultados, cuándo actuar y qué evidencia conservar para operaciones, auditorías y mejora continua.",
        "problems": [
          {
            "id": "define-risk-programme",
            "question": "¿Cómo definir los puntos, frecuencias e indicadores realmente críticos?",
            "answer": "Un programa demasiado amplio consume recursos y uno incompleto deja riesgos sin vigilar. El comprador busca priorizar puntos y parámetros según uso del agua, matriz, exposición, proceso, histórico y consecuencias de una desviación."
          },
          {
            "id": "consolidate-water-data",
            "question": "¿Cómo consolidar resultados de varias sedes, laboratorios y matrices?",
            "answer": "Los datos pierden valor cuando quedan repartidos entre hojas de cálculo, correos y portales. El objetivo es comparar puntos, métodos, fechas, proveedores y tendencias sin reconstruir manualmente el historial."
          },
          {
            "id": "respond-to-deviations",
            "question": "¿Cómo responder con rapidez cuando aparece una desviación?",
            "answer": "Una incidencia exige contexto, responsables y próximos pasos, no solo un valor fuera de criterio. El comprador necesita activar investigación, remuestreo, acción correctora, comunicación y cierre documentado desde el mismo registro."
          },
          {
            "id": "prove-decisions",
            "question": "¿Cómo demostrar por qué se tomó una decisión operativa?",
            "answer": "Auditorías y revisiones requieren relacionar punto, muestra, método, resultado, criterio y acción. El resultado buscado es una evidencia defendible que muestre quién decidió, con qué información y qué seguimiento se realizó."
          },
          {
            "id": "move-to-prevention",
            "question": "¿Cómo pasar de un control reactivo a una gestión preventiva?",
            "answer": "Los compradores quieren detectar recurrencias antes de que se conviertan en incidentes. Buscan tendencias, alertas, comparación histórica y priorización de puntos para ajustar frecuencia, mantenimiento, tratamiento y recursos."
          }
        ]
      },
      "en": {
        "intro": "Buyers want to move from isolated checks to a risk-based water-quality programme. They need to decide what to monitor, how to compare results, when to act and which evidence to retain for operations, audits and continuous improvement.",
        "problems": [
          {
            "id": "define-risk-programme",
            "question": "How do we define the truly critical points, frequencies and indicators?",
            "answer": "An overly broad programme wastes resources, while an incomplete one leaves risk unmonitored. Buyers want to prioritise points and parameters according to water use, matrix, exposure, process, history and the consequences of deviation."
          },
          {
            "id": "consolidate-water-data",
            "question": "How can we consolidate results from multiple sites, laboratories and matrices?",
            "answer": "Data loses value when it is scattered across spreadsheets, emails and portals. The objective is to compare points, methods, dates, providers and trends without manually rebuilding the history."
          },
          {
            "id": "respond-to-deviations",
            "question": "How can we respond quickly when a deviation appears?",
            "answer": "An incident needs context, owners and next steps, not only an out-of-criterion value. Buyers need to launch investigation, resampling, corrective action, communication and documented closure from the same record."
          },
          {
            "id": "prove-decisions",
            "question": "How can we prove why an operational decision was made?",
            "answer": "Audits and reviews require a link between point, sample, method, result, criterion and action. The desired outcome is defensible evidence showing who decided, which information was used and what follow-up occurred."
          },
          {
            "id": "move-to-prevention",
            "question": "How can we move from reactive control to preventive management?",
            "answer": "Buyers want to identify recurring patterns before they become incidents. They need trends, alerts, historical comparisons and point prioritisation to adjust frequency, maintenance, treatment and resources."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs veulent passer de contrôles isolés à un programme de qualité de l’eau fondé sur le risque. Ils doivent décider quoi surveiller, comment comparer les résultats, quand agir et quelles preuves conserver pour les opérations, les audits et l’amélioration continue.",
        "problems": [
          {
            "id": "define-risk-programme",
            "question": "Comment définir les points, fréquences et indicateurs réellement critiques ?",
            "answer": "Un programme trop large consomme des ressources, tandis qu’un programme incomplet laisse des risques sans surveillance. L’acheteur cherche à prioriser points et paramètres selon l’usage de l’eau, la matrice, l’exposition, le procédé, l’historique et les conséquences d’un écart."
          },
          {
            "id": "consolidate-water-data",
            "question": "Comment consolider les résultats de plusieurs sites, laboratoires et matrices ?",
            "answer": "Les données perdent de la valeur lorsqu’elles sont dispersées entre tableurs, e-mails et portails. L’objectif est de comparer points, méthodes, dates, prestataires et tendances sans reconstruire manuellement l’historique."
          },
          {
            "id": "respond-to-deviations",
            "question": "Comment réagir rapidement lorsqu’une déviation apparaît ?",
            "answer": "Un incident exige du contexte, des responsables et des étapes suivantes, pas seulement une valeur hors critère. L’acheteur doit pouvoir lancer investigation, nouveau prélèvement, action corrective, communication et clôture documentée depuis le même dossier."
          },
          {
            "id": "prove-decisions",
            "question": "Comment démontrer pourquoi une décision opérationnelle a été prise ?",
            "answer": "Audits et revues exigent de relier point, échantillon, méthode, résultat, critère et action. Le résultat recherché est une preuve défendable montrant qui a décidé, avec quelles informations et quel suivi a été réalisé."
          },
          {
            "id": "move-to-prevention",
            "question": "Comment passer d’un contrôle réactif à une gestion préventive ?",
            "answer": "Les acheteurs veulent détecter les récurrences avant qu’elles ne deviennent des incidents. Ils recherchent tendances, alertes, comparaisons historiques et priorisation des points pour ajuster fréquence, maintenance, traitement et ressources."
          }
        ]
      },
      "it": {
        "intro": "I buyer vogliono passare da controlli isolati a un programma di qualità dell’acqua basato sul rischio. Devono decidere cosa monitorare, come confrontare i risultati, quando agire e quali evidenze conservare per operazioni, audit e miglioramento continuo.",
        "problems": [
          {
            "id": "define-risk-programme",
            "question": "Come definire punti, frequenze e indicatori realmente critici?",
            "answer": "Un programma troppo ampio consuma risorse, mentre uno incompleto lascia rischi non monitorati. Il buyer cerca di prioritizzare punti e parametri in base a uso dell’acqua, matrice, esposizione, processo, storico e conseguenze di una deviazione."
          },
          {
            "id": "consolidate-water-data",
            "question": "Come consolidare risultati di più siti, laboratori e matrici?",
            "answer": "I dati perdono valore quando sono distribuiti tra fogli di calcolo, e-mail e portali. L’obiettivo è confrontare punti, metodi, date, fornitori e trend senza ricostruire manualmente lo storico."
          },
          {
            "id": "respond-to-deviations",
            "question": "Come reagire rapidamente quando compare una deviazione?",
            "answer": "Un incidente richiede contesto, responsabili e passi successivi, non solo un valore fuori criterio. Il buyer deve poter avviare indagine, ricampionamento, azione correttiva, comunicazione e chiusura documentata nello stesso record."
          },
          {
            "id": "prove-decisions",
            "question": "Come dimostrare perché è stata presa una decisione operativa?",
            "answer": "Audit e revisioni richiedono di collegare punto, campione, metodo, risultato, criterio e azione. Il risultato atteso è un’evidenza difendibile che mostri chi ha deciso, con quali informazioni e quale follow-up è stato eseguito."
          },
          {
            "id": "move-to-prevention",
            "question": "Come passare da un controllo reattivo a una gestione preventiva?",
            "answer": "I buyer vogliono rilevare ricorrenze prima che diventino incidenti. Cercano trend, alert, confronto storico e priorità dei punti per adeguare frequenze, manutenzione, trattamento e risorse."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors volen passar de controls aïllats a un programa de qualitat de l’aigua basat en risc. Necessiten decidir què controlar, com comparar resultats, quan actuar i quina evidència conservar per a operacions, auditories i millora contínua.",
        "problems": [
          {
            "id": "define-risk-programme",
            "question": "Com definir els punts, les freqüències i els indicadors realment crítics?",
            "answer": "Un programa massa ampli consumeix recursos i un d’incomplet deixa riscos sense vigilància. El comprador busca prioritzar punts i paràmetres segons ús de l’aigua, matriu, exposició, procés, històric i conseqüències d’una desviació."
          },
          {
            "id": "consolidate-water-data",
            "question": "Com consolidar resultats de diverses seus, laboratoris i matrius?",
            "answer": "Les dades perden valor quan queden repartides entre fulls de càlcul, correus i portals. L’objectiu és comparar punts, mètodes, dates, proveïdors i tendències sense reconstruir manualment l’històric."
          },
          {
            "id": "respond-to-deviations",
            "question": "Com respondre ràpidament quan apareix una desviació?",
            "answer": "Una incidència exigeix context, responsables i passos següents, no només un valor fora de criteri. El comprador necessita activar investigació, remostreig, acció correctora, comunicació i tancament documentat des del mateix registre."
          },
          {
            "id": "prove-decisions",
            "question": "Com demostrar per què es va prendre una decisió operativa?",
            "answer": "Auditories i revisions requereixen relacionar punt, mostra, mètode, resultat, criteri i acció. El resultat buscat és una evidència defensable que mostri qui va decidir, amb quina informació i quin seguiment es va fer."
          },
          {
            "id": "move-to-prevention",
            "question": "Com passar d’un control reactiu a una gestió preventiva?",
            "answer": "Els compradors volen detectar recurrències abans que es converteixin en incidències. Busquen tendències, alertes, comparació històrica i priorització de punts per ajustar freqüència, manteniment, tractament i recursos."
          }
        ]
      }
    }
  },
  "municipal-water-testing": {
    "problemIds": [
      "coordinate-field-lab-operator",
      "understand-system-performance",
      "manage-incidents",
      "document-risk-and-compliance",
      "operate-with-limited-resources"
    ],
    "translations": {
      "es": {
        "intro": "Municipios, operadores y utilities buscan mantener continuidad del servicio y capacidad de respuesta con recursos limitados. Necesitan conectar captación, tratamiento, red, campo, laboratorio y comunicación institucional en un programa que pueda explicarse y revisarse.",
        "problems": [
          {
            "id": "coordinate-field-lab-operator",
            "question": "¿Cómo coordinar campo, laboratorio, operador y responsable municipal?",
            "answer": "Una misma muestra puede pasar por varios equipos y proveedores. El comprador busca una cadena de trabajo común que conserve punto, hora, condiciones, custodia, método, resultado, revisión y destinatarios sin perder contexto entre organizaciones."
          },
          {
            "id": "understand-system-performance",
            "question": "¿Cómo saber qué ocurre entre captación, tratamiento, depósito y red?",
            "answer": "Un resultado aislado no muestra dónde cambia el riesgo ni cómo responde una barrera. El objetivo es comparar puntos y periodos para interpretar carga de entrada, eficacia del tratamiento, evolución de depósitos y señales locales en la red."
          },
          {
            "id": "manage-incidents",
            "question": "¿Cómo gestionar una incidencia sin reconstruir el historial desde cero?",
            "answer": "Durante una desviación existe presión para remuestrear, investigar, ajustar operación y comunicar. El comprador necesita recuperar antecedentes, asignar tareas, relacionar nuevas muestras y documentar decisiones hasta el cierre."
          },
          {
            "id": "document-risk-and-compliance",
            "question": "¿Cómo documentar planes de seguridad del agua y requisitos aplicables?",
            "answer": "La necesidad no es solo guardar informes, sino demostrar programa, responsables, frecuencia, método, revisión y acciones. El resultado buscado es evidencia organizada para el operador, el laboratorio, comités y autoridad competente."
          },
          {
            "id": "operate-with-limited-resources",
            "question": "¿Cómo implantar un programa útil en municipios pequeños o con laboratorio externo?",
            "answer": "Los compradores con recursos limitados necesitan empezar de forma sencilla. Buscan priorizar puntos críticos, trabajar con laboratorio propio o externo y escalar usuarios, mapas, alertas e informes cuando el programa lo requiera."
          }
        ]
      },
      "en": {
        "intro": "Municipalities, operators and utilities need service continuity and incident response with limited resources. They must connect source, treatment, network, field teams, laboratories and institutional communication in a programme that can be explained and reviewed.",
        "problems": [
          {
            "id": "coordinate-field-lab-operator",
            "question": "How can field teams, laboratories, operators and municipal owners work together?",
            "answer": "One sample may pass through several teams and providers. Buyers need one shared chain that preserves point, time, conditions, custody, method, result, review and recipients without losing context between organisations."
          },
          {
            "id": "understand-system-performance",
            "question": "How can we understand what happens between source, treatment, storage and network?",
            "answer": "An isolated result does not show where risk changes or how a barrier performs. The goal is to compare points and periods to interpret incoming load, treatment effectiveness, storage evolution and local network signals."
          },
          {
            "id": "manage-incidents",
            "question": "How can we manage an incident without rebuilding the history from scratch?",
            "answer": "During a deviation there is pressure to resample, investigate, adjust operations and communicate. Buyers need to retrieve background data, assign tasks, link new samples and document decisions through closure."
          },
          {
            "id": "document-risk-and-compliance",
            "question": "How can we document water safety plans and applicable requirements?",
            "answer": "The need is not only to store reports, but to demonstrate programme, responsibilities, frequency, method, review and actions. Buyers seek organised evidence for operators, laboratories, committees and competent authorities."
          },
          {
            "id": "operate-with-limited-resources",
            "question": "How can a useful programme work for small municipalities or outsourced laboratories?",
            "answer": "Buyers with limited resources need a simple starting point. They want to prioritise critical points, work with internal or external laboratories and scale users, maps, alerts and reports as the programme grows."
          }
        ]
      },
      "fr": {
        "intro": "Les collectivités, opérateurs et services d’eau cherchent à maintenir la continuité du service et la capacité de réponse avec des ressources limitées. Ils doivent relier captage, traitement, réseau, terrain, laboratoire et communication institutionnelle dans un programme explicable et révisable.",
        "problems": [
          {
            "id": "coordinate-field-lab-operator",
            "question": "Comment coordonner terrain, laboratoire, opérateur et responsable municipal ?",
            "answer": "Un même échantillon peut passer par plusieurs équipes et prestataires. L’acheteur cherche une chaîne commune conservant point, heure, conditions, traçabilité, méthode, résultat, revue et destinataires sans perdre le contexte entre organisations."
          },
          {
            "id": "understand-system-performance",
            "question": "Comment comprendre ce qui se passe entre captage, traitement, réservoir et réseau ?",
            "answer": "Un résultat isolé ne montre pas où le risque évolue ni comment une barrière fonctionne. L’objectif est de comparer points et périodes pour interpréter charge d’entrée, efficacité du traitement, évolution des réservoirs et signaux locaux du réseau."
          },
          {
            "id": "manage-incidents",
            "question": "Comment gérer un incident sans reconstruire tout l’historique ?",
            "answer": "Lors d’une déviation, il faut rééchantillonner, investiguer, ajuster l’exploitation et communiquer. L’acheteur doit retrouver les antécédents, assigner les tâches, relier les nouveaux échantillons et documenter les décisions jusqu’à la clôture."
          },
          {
            "id": "document-risk-and-compliance",
            "question": "Comment documenter les plans de sécurité de l’eau et les exigences applicables ?",
            "answer": "Il ne suffit pas de stocker des rapports : il faut démontrer programme, responsabilités, fréquence, méthode, revue et actions. Le résultat recherché est une preuve organisée pour opérateur, laboratoire, comités et autorité compétente."
          },
          {
            "id": "operate-with-limited-resources",
            "question": "Comment déployer un programme utile dans une petite collectivité ou avec un laboratoire externe ?",
            "answer": "Les acheteurs disposant de ressources limitées ont besoin d’un démarrage simple. Ils veulent prioriser les points critiques, travailler avec un laboratoire interne ou externe et faire évoluer utilisateurs, cartes, alertes et rapports selon les besoins."
          }
        ]
      },
      "it": {
        "intro": "Comuni, operatori e utility devono mantenere continuità del servizio e capacità di risposta con risorse limitate. Devono collegare captazione, trattamento, rete, campo, laboratorio e comunicazione istituzionale in un programma spiegabile e revisionabile.",
        "problems": [
          {
            "id": "coordinate-field-lab-operator",
            "question": "Come coordinare campo, laboratorio, operatore e responsabile municipale?",
            "answer": "Lo stesso campione può passare attraverso diversi team e fornitori. Il buyer cerca una catena comune che conservi punto, ora, condizioni, custodia, metodo, risultato, revisione e destinatari senza perdere contesto tra organizzazioni."
          },
          {
            "id": "understand-system-performance",
            "question": "Come capire cosa succede tra captazione, trattamento, serbatoio e rete?",
            "answer": "Un risultato isolato non mostra dove cambia il rischio né come risponde una barriera. L’obiettivo è confrontare punti e periodi per interpretare carico in ingresso, efficacia del trattamento, evoluzione dei serbatoi e segnali locali della rete."
          },
          {
            "id": "manage-incidents",
            "question": "Come gestire un incidente senza ricostruire lo storico da zero?",
            "answer": "Durante una deviazione c’è pressione per ricampionare, indagare, adeguare l’operazione e comunicare. Il buyer deve recuperare precedenti, assegnare attività, collegare nuovi campioni e documentare decisioni fino alla chiusura."
          },
          {
            "id": "document-risk-and-compliance",
            "question": "Come documentare piani di sicurezza dell’acqua e requisiti applicabili?",
            "answer": "Non basta archiviare report: occorre dimostrare programma, responsabilità, frequenza, metodo, revisione e azioni. Il risultato cercato è un’evidenza ordinata per operatore, laboratorio, comitati e autorità competente."
          },
          {
            "id": "operate-with-limited-resources",
            "question": "Come implementare un programma utile nei piccoli comuni o con laboratorio esterno?",
            "answer": "I buyer con risorse limitate hanno bisogno di un inizio semplice. Vogliono prioritizzare punti critici, lavorare con laboratorio interno o esterno e scalare utenti, mappe, alert e report quando necessario."
          }
        ]
      },
      "ca": {
        "intro": "Municipis, operadors i utilities volen mantenir la continuïtat del servei i la capacitat de resposta amb recursos limitats. Necessiten connectar captació, tractament, xarxa, camp, laboratori i comunicació institucional en un programa explicable i revisable.",
        "problems": [
          {
            "id": "coordinate-field-lab-operator",
            "question": "Com coordinar camp, laboratori, operador i responsable municipal?",
            "answer": "Una mateixa mostra pot passar per diversos equips i proveïdors. El comprador busca una cadena comuna que conservi punt, hora, condicions, custòdia, mètode, resultat, revisió i destinataris sense perdre context entre organitzacions."
          },
          {
            "id": "understand-system-performance",
            "question": "Com saber què passa entre captació, tractament, dipòsit i xarxa?",
            "answer": "Un resultat aïllat no mostra on canvia el risc ni com respon una barrera. L’objectiu és comparar punts i períodes per interpretar càrrega d’entrada, eficàcia del tractament, evolució dels dipòsits i senyals locals de la xarxa."
          },
          {
            "id": "manage-incidents",
            "question": "Com gestionar una incidència sense reconstruir l’històric des de zero?",
            "answer": "Durant una desviació hi ha pressió per remostrejar, investigar, ajustar l’operació i comunicar. El comprador necessita recuperar antecedents, assignar tasques, relacionar noves mostres i documentar decisions fins al tancament."
          },
          {
            "id": "document-risk-and-compliance",
            "question": "Com documentar plans de seguretat de l’aigua i requisits aplicables?",
            "answer": "No n’hi ha prou amb guardar informes: cal demostrar programa, responsabilitats, freqüència, mètode, revisió i accions. El resultat buscat és evidència organitzada per a operador, laboratori, comitès i autoritat competent."
          },
          {
            "id": "operate-with-limited-resources",
            "question": "Com implantar un programa útil en municipis petits o amb laboratori extern?",
            "answer": "Els compradors amb recursos limitats necessiten començar de manera senzilla. Busquen prioritzar punts crítics, treballar amb laboratori propi o extern i escalar usuaris, mapes, alertes i informes quan el programa ho requereixi."
          }
        ]
      }
    }
  },
  "food-beverage-water-quality": {
    "problemIds": [
      "identify-critical-water-uses",
      "avoid-batch-delays",
      "prove-cip-rinse",
      "manage-deviations-and-suppliers",
      "standardise-multisite-audits"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores de alimentación y bebidas necesitan saber cómo afecta cada uso del agua a producto, proceso, limpieza y liberación de lote. Buscan decisiones rápidas, evidencia conectada con APPCC y una forma consistente de coordinar planta, calidad y laboratorio.",
        "problems": [
          {
            "id": "identify-critical-water-uses",
            "question": "¿Qué usos del agua son realmente críticos para producto y proceso?",
            "answer": "No todos los puntos tienen el mismo riesgo: ingrediente, lavado, contacto, vapor, hielo, CIP y enjuague final cumplen funciones distintas. El comprador busca mapear uso, línea, producto, frecuencia, criterio y responsable."
          },
          {
            "id": "avoid-batch-delays",
            "question": "¿Cómo evitar que un resultado tardío bloquee un lote o una línea?",
            "answer": "Calidad y producción necesitan saber qué muestra afecta a qué lote y cuándo habrá una decisión utilizable. El objetivo es reducir esperas, priorizar puntos críticos y entregar resultados con contexto suficiente para liberar, retener o investigar."
          },
          {
            "id": "prove-cip-rinse",
            "question": "¿Cómo demostrar que CIP, saneamiento y enjuague final fueron adecuados?",
            "answer": "Un registro de limpieza aislado no siempre conecta circuito, equipo, lote, muestra y resultado. El comprador busca una evidencia trazable que relacione etapa, operador, criterio, remuestreo y decisión de uso."
          },
          {
            "id": "manage-deviations-and-suppliers",
            "question": "¿Cómo gestionar desviaciones y laboratorios externos sin perder contexto?",
            "answer": "Ante una incidencia se mezclan datos de planta, proveedor, laboratorio y acción correctora. El resultado buscado es un expediente único con causa probable, línea o lote afectado, responsable, nueva muestra y cierre."
          },
          {
            "id": "standardise-multisite-audits",
            "question": "¿Cómo mantener criterios consistentes entre plantas, proveedores y auditorías de cliente?",
            "answer": "Los grupos multisede necesitan comparar programas sin imponer un flujo idéntico a realidades distintas. Buscan plantillas comunes, puntos equivalentes, informes comparables y trazabilidad suficiente para auditorías internas, clientes y certificaciones."
          }
        ]
      },
      "en": {
        "intro": "Food and beverage buyers need to understand how each water use affects product, process, cleaning and batch release. They want faster decisions, evidence connected to HACCP and a consistent way to coordinate plant, quality and laboratory teams.",
        "problems": [
          {
            "id": "identify-critical-water-uses",
            "question": "Which water uses are truly critical for product and process?",
            "answer": "Ingredient water, washing, contact, steam, ice, CIP and final rinse do not carry the same risk. Buyers need to map use, line, product, frequency, criterion and owner for each critical point."
          },
          {
            "id": "avoid-batch-delays",
            "question": "How can we prevent a late result from holding a batch or line?",
            "answer": "Quality and production need to know which sample affects which batch and when a usable decision will be available. The objective is to shorten waits, prioritise critical points and deliver enough context to release, hold or investigate."
          },
          {
            "id": "prove-cip-rinse",
            "question": "How can we prove that CIP, sanitation and final rinse were adequate?",
            "answer": "An isolated cleaning record may not connect circuit, equipment, batch, sample and result. Buyers need traceable evidence linking stage, operator, criterion, resampling and the decision to return equipment or line to use."
          },
          {
            "id": "manage-deviations-and-suppliers",
            "question": "How can we manage deviations and external laboratories without losing context?",
            "answer": "Incidents combine plant, provider, laboratory and corrective-action data. The desired outcome is one case file containing probable cause, affected line or batch, owner, new sample and documented closure."
          },
          {
            "id": "standardise-multisite-audits",
            "question": "How can we maintain consistent criteria across plants, suppliers and customer audits?",
            "answer": "Multi-site groups need comparability without forcing identical workflows onto different operations. Buyers want common templates, equivalent points, comparable reports and enough traceability for internal audits, customers and certification schemes."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs de l’agroalimentaire et des boissons doivent comprendre comment chaque usage de l’eau affecte produit, procédé, nettoyage et libération de lot. Ils recherchent des décisions rapides, des preuves reliées au HACCP et une coordination cohérente entre site, qualité et laboratoire.",
        "problems": [
          {
            "id": "identify-critical-water-uses",
            "question": "Quels usages de l’eau sont réellement critiques pour le produit et le procédé ?",
            "answer": "Eau ingrédient, lavage, contact, vapeur, glace, CIP et rinçage final n’ont pas le même risque. L’acheteur veut cartographier usage, ligne, produit, fréquence, critère et responsable pour chaque point critique."
          },
          {
            "id": "avoid-batch-delays",
            "question": "Comment éviter qu’un résultat tardif bloque un lot ou une ligne ?",
            "answer": "Qualité et production doivent savoir quel échantillon affecte quel lot et quand une décision exploitable sera disponible. L’objectif est de réduire les attentes, prioriser les points critiques et fournir assez de contexte pour libérer, retenir ou investiguer."
          },
          {
            "id": "prove-cip-rinse",
            "question": "Comment démontrer que le CIP, l’assainissement et le rinçage final étaient adaptés ?",
            "answer": "Un enregistrement de nettoyage isolé ne relie pas toujours circuit, équipement, lot, échantillon et résultat. L’acheteur recherche une preuve traçable liant étape, opérateur, critère, nouveau prélèvement et décision de remise en service."
          },
          {
            "id": "manage-deviations-and-suppliers",
            "question": "Comment gérer déviations et laboratoires externes sans perdre le contexte ?",
            "answer": "Une incidence mélange données du site, du prestataire, du laboratoire et de l’action corrective. Le résultat recherché est un dossier unique avec cause probable, ligne ou lot concerné, responsable, nouvel échantillon et clôture."
          },
          {
            "id": "standardise-multisite-audits",
            "question": "Comment maintenir des critères cohérents entre sites, fournisseurs et audits clients ?",
            "answer": "Les groupes multisites doivent comparer leurs programmes sans imposer un flux identique à des réalités différentes. Ils recherchent modèles communs, points équivalents, rapports comparables et traçabilité adaptée aux audits internes, clients et certifications."
          }
        ]
      },
      "it": {
        "intro": "I buyer food & beverage devono capire come ogni uso dell’acqua influisce su prodotto, processo, pulizia e rilascio del lotto. Cercano decisioni rapide, evidenze collegate all’HACCP e un coordinamento coerente tra stabilimento, qualità e laboratorio.",
        "problems": [
          {
            "id": "identify-critical-water-uses",
            "question": "Quali usi dell’acqua sono realmente critici per prodotto e processo?",
            "answer": "Acqua ingrediente, lavaggio, contatto, vapore, ghiaccio, CIP e risciacquo finale hanno rischi diversi. Il buyer vuole mappare uso, linea, prodotto, frequenza, criterio e responsabile per ogni punto critico."
          },
          {
            "id": "avoid-batch-delays",
            "question": "Come evitare che un risultato tardivo blocchi un lotto o una linea?",
            "answer": "Qualità e produzione devono sapere quale campione interessa quale lotto e quando sarà disponibile una decisione utilizzabile. L’obiettivo è ridurre attese, prioritizzare punti critici e fornire il contesto necessario per rilasciare, trattenere o investigare."
          },
          {
            "id": "prove-cip-rinse",
            "question": "Come dimostrare che CIP, sanificazione e risciacquo finale sono stati adeguati?",
            "answer": "Un record di pulizia isolato non sempre collega circuito, attrezzatura, lotto, campione e risultato. Il buyer cerca un’evidenza tracciabile che colleghi fase, operatore, criterio, ricampionamento e decisione di riutilizzo."
          },
          {
            "id": "manage-deviations-and-suppliers",
            "question": "Come gestire deviazioni e laboratori esterni senza perdere il contesto?",
            "answer": "Un incidente unisce dati di stabilimento, fornitore, laboratorio e azione correttiva. Il risultato atteso è un unico fascicolo con causa probabile, linea o lotto interessato, responsabile, nuovo campione e chiusura documentata."
          },
          {
            "id": "standardise-multisite-audits",
            "question": "Come mantenere criteri coerenti tra stabilimenti, fornitori e audit cliente?",
            "answer": "I gruppi multisito devono confrontare programmi senza imporre flussi identici a realtà diverse. Cercano modelli comuni, punti equivalenti, report confrontabili e tracciabilità sufficiente per audit interni, clienti e certificazioni."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors d’alimentació i begudes necessiten entendre com cada ús de l’aigua afecta producte, procés, neteja i alliberament de lot. Busquen decisions ràpides, evidència connectada amb APPCC i una coordinació coherent entre planta, qualitat i laboratori.",
        "problems": [
          {
            "id": "identify-critical-water-uses",
            "question": "Quins usos de l’aigua són realment crítics per al producte i el procés?",
            "answer": "Aigua ingredient, rentat, contacte, vapor, gel, CIP i esbandida final tenen riscos diferents. El comprador vol mapar ús, línia, producte, freqüència, criteri i responsable per a cada punt crític."
          },
          {
            "id": "avoid-batch-delays",
            "question": "Com evitar que un resultat tardà bloquegi un lot o una línia?",
            "answer": "Qualitat i producció han de saber quina mostra afecta quin lot i quan hi haurà una decisió utilitzable. L’objectiu és reduir esperes, prioritzar punts crítics i aportar context suficient per alliberar, retenir o investigar."
          },
          {
            "id": "prove-cip-rinse",
            "question": "Com demostrar que el CIP, el sanejament i l’esbandida final han estat adequats?",
            "answer": "Un registre de neteja aïllat no sempre connecta circuit, equip, lot, mostra i resultat. El comprador busca una evidència traçable que relacioni etapa, operador, criteri, remostreig i decisió de retorn a ús."
          },
          {
            "id": "manage-deviations-and-suppliers",
            "question": "Com gestionar desviacions i laboratoris externs sense perdre context?",
            "answer": "Una incidència combina dades de planta, proveïdor, laboratori i acció correctora. El resultat buscat és un únic expedient amb causa probable, línia o lot afectat, responsable, nova mostra i tancament documentat."
          },
          {
            "id": "standardise-multisite-audits",
            "question": "Com mantenir criteris coherents entre plantes, proveïdors i auditories de client?",
            "answer": "Els grups multiseu necessiten comparar programes sense imposar el mateix flux a realitats diferents. Busquen plantilles comunes, punts equivalents, informes comparables i traçabilitat suficient per a auditories internes, clients i certificacions."
          }
        ]
      }
    }
  },
  "industrial-process-water": {
    "problemIds": [
      "map-water-circuits",
      "connect-results-to-assets",
      "coordinate-labs-and-suppliers",
      "control-reuse-and-effluent",
      "compare-multisite-performance"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores industriales necesitan relacionar la calidad del agua con continuidad, activos, mantenimiento, producto y descarga. Buscan dejar de gestionar resultados aislados y construir una visión común de circuitos, muestras, proveedores, desviaciones y decisiones.",
        "problems": [
          {
            "id": "map-water-circuits",
            "question": "¿Cómo mapear circuitos y puntos críticos sin dejar zonas ciegas?",
            "answer": "Captación, tratamiento, proceso, refrigeración, limpieza, recirculación y efluente tienen riesgos y responsables distintos. El comprador busca un inventario operativo con punto, uso, frecuencia, criterio, equipo y laboratorio asociado."
          },
          {
            "id": "connect-results-to-assets",
            "question": "¿Cómo relacionar un resultado con el activo o proceso que puede quedar afectado?",
            "answer": "Un valor sin contexto no indica qué línea, intercambiador, depósito o etapa debe revisarse. El objetivo es vincular muestra, activo, condición operativa, histórico y decisión para evitar respuestas genéricas o retrasadas."
          },
          {
            "id": "coordinate-labs-and-suppliers",
            "question": "¿Cómo coordinar varios laboratorios, proveedores y formatos de informe?",
            "answer": "Los grupos industriales suelen trabajar con servicios internos y externos. El comprador necesita normalizar solicitudes, cadena de custodia, métodos, resultados, CoA y seguimiento sin perder las particularidades de cada proveedor."
          },
          {
            "id": "control-reuse-and-effluent",
            "question": "¿Cómo documentar reutilización, recirculación, efluentes y cambios de tratamiento?",
            "answer": "Estas corrientes exigen contexto de matriz, uso, criterios y posibles acciones. El resultado buscado es un historial que conecte origen, tratamiento, punto, tendencia, desviación, remuestreo y revisión técnica."
          },
          {
            "id": "compare-multisite-performance",
            "question": "¿Cómo comparar plantas y cerrar acciones correctoras de forma consistente?",
            "answer": "Una desviación repetida puede quedar oculta si cada sede informa de forma distinta. Los compradores buscan indicadores comparables, responsables, fechas objetivo, verificación y cierre para priorizar mantenimiento y mejora continua."
          }
        ]
      },
      "en": {
        "intro": "Industrial buyers need to connect water quality with continuity, assets, maintenance, product and discharge. They want to stop managing isolated results and build a shared view of circuits, samples, suppliers, deviations and decisions.",
        "problems": [
          {
            "id": "map-water-circuits",
            "question": "How can we map water circuits and critical points without blind spots?",
            "answer": "Intake, treatment, process, cooling, cleaning, recirculation and effluent have different risks and owners. Buyers need an operational inventory containing point, use, frequency, criterion, equipment and associated laboratory."
          },
          {
            "id": "connect-results-to-assets",
            "question": "How can we link a result to the asset or process that may be affected?",
            "answer": "A value without context does not identify which line, exchanger, tank or stage needs review. The goal is to connect sample, asset, operating condition, history and decision to avoid generic or delayed responses."
          },
          {
            "id": "coordinate-labs-and-suppliers",
            "question": "How can we coordinate multiple laboratories, suppliers and report formats?",
            "answer": "Industrial groups often use internal and external services. Buyers need to standardise requests, custody, methods, results, CoA and follow-up while preserving the specific requirements of each provider."
          },
          {
            "id": "control-reuse-and-effluent",
            "question": "How can we document reuse, recirculation, effluent and treatment changes?",
            "answer": "These streams require matrix, use, criterion and action context. The desired outcome is a history linking source, treatment, point, trend, deviation, resampling and technical review."
          },
          {
            "id": "compare-multisite-performance",
            "question": "How can we compare plants and close corrective actions consistently?",
            "answer": "Repeated deviations may remain hidden when each site reports differently. Buyers want comparable indicators, owners, target dates, verification and closure to prioritise maintenance and continuous improvement."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs industriels doivent relier qualité de l’eau, continuité, actifs, maintenance, produit et rejet. Ils veulent cesser de gérer des résultats isolés et construire une vision commune des circuits, échantillons, fournisseurs, déviations et décisions.",
        "problems": [
          {
            "id": "map-water-circuits",
            "question": "Comment cartographier les circuits et points critiques sans zones aveugles ?",
            "answer": "Captage, traitement, process, refroidissement, nettoyage, recirculation et effluent ont des risques et responsables différents. L’acheteur recherche un inventaire opérationnel avec point, usage, fréquence, critère, équipement et laboratoire associé."
          },
          {
            "id": "connect-results-to-assets",
            "question": "Comment relier un résultat à l’actif ou au procédé potentiellement affecté ?",
            "answer": "Une valeur sans contexte n’indique pas quelle ligne, échangeur, cuve ou étape doit être revue. L’objectif est de relier échantillon, actif, condition d’exploitation, historique et décision pour éviter des réponses génériques ou tardives."
          },
          {
            "id": "coordinate-labs-and-suppliers",
            "question": "Comment coordonner plusieurs laboratoires, fournisseurs et formats de rapport ?",
            "answer": "Les groupes industriels utilisent souvent des services internes et externes. L’acheteur doit standardiser demandes, traçabilité, méthodes, résultats, CoA et suivi tout en conservant les spécificités de chaque prestataire."
          },
          {
            "id": "control-reuse-and-effluent",
            "question": "Comment documenter réutilisation, recirculation, effluents et changements de traitement ?",
            "answer": "Ces flux exigent le contexte de matrice, usage, critère et action. Le résultat recherché est un historique reliant origine, traitement, point, tendance, déviation, nouveau prélèvement et revue technique."
          },
          {
            "id": "compare-multisite-performance",
            "question": "Comment comparer les sites et clôturer les actions correctives de manière cohérente ?",
            "answer": "Une déviation répétée peut rester invisible si chaque site rapporte différemment. Les acheteurs recherchent indicateurs comparables, responsables, échéances, vérification et clôture pour prioriser maintenance et amélioration continue."
          }
        ]
      },
      "it": {
        "intro": "I buyer industriali devono collegare qualità dell’acqua, continuità, asset, manutenzione, prodotto e scarico. Vogliono superare i risultati isolati e costruire una visione comune di circuiti, campioni, fornitori, deviazioni e decisioni.",
        "problems": [
          {
            "id": "map-water-circuits",
            "question": "Come mappare circuiti e punti critici senza lasciare zone cieche?",
            "answer": "Captazione, trattamento, processo, raffreddamento, pulizia, ricircolo ed effluente hanno rischi e responsabili diversi. Il buyer cerca un inventario operativo con punto, uso, frequenza, criterio, attrezzatura e laboratorio associato."
          },
          {
            "id": "connect-results-to-assets",
            "question": "Come collegare un risultato all’asset o processo che può essere interessato?",
            "answer": "Un valore senza contesto non indica quale linea, scambiatore, serbatoio o fase debba essere revisionata. L’obiettivo è collegare campione, asset, condizione operativa, storico e decisione per evitare risposte generiche o tardive."
          },
          {
            "id": "coordinate-labs-and-suppliers",
            "question": "Come coordinare più laboratori, fornitori e formati di report?",
            "answer": "I gruppi industriali lavorano spesso con servizi interni ed esterni. Il buyer deve standardizzare richieste, custodia, metodi, risultati, CoA e follow-up mantenendo le specificità di ogni fornitore."
          },
          {
            "id": "control-reuse-and-effluent",
            "question": "Come documentare riutilizzo, ricircolo, effluenti e modifiche di trattamento?",
            "answer": "Questi flussi richiedono contesto di matrice, uso, criterio e azione. Il risultato cercato è uno storico che colleghi origine, trattamento, punto, trend, deviazione, ricampionamento e revisione tecnica."
          },
          {
            "id": "compare-multisite-performance",
            "question": "Come confrontare stabilimenti e chiudere azioni correttive in modo coerente?",
            "answer": "Una deviazione ripetuta può restare nascosta se ogni sito riporta in modo diverso. I buyer cercano indicatori confrontabili, responsabili, scadenze, verifica e chiusura per prioritizzare manutenzione e miglioramento continuo."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors industrials necessiten relacionar qualitat de l’aigua, continuïtat, actius, manteniment, producte i abocament. Volen deixar de gestionar resultats aïllats i construir una visió comuna de circuits, mostres, proveïdors, desviacions i decisions.",
        "problems": [
          {
            "id": "map-water-circuits",
            "question": "Com mapar circuits i punts crítics sense deixar zones cegues?",
            "answer": "Captació, tractament, procés, refrigeració, neteja, recirculació i efluent tenen riscos i responsables diferents. El comprador busca un inventari operatiu amb punt, ús, freqüència, criteri, equip i laboratori associat."
          },
          {
            "id": "connect-results-to-assets",
            "question": "Com relacionar un resultat amb l’actiu o procés que pot quedar afectat?",
            "answer": "Un valor sense context no indica quina línia, intercanviador, dipòsit o etapa s’ha de revisar. L’objectiu és vincular mostra, actiu, condició operativa, històric i decisió per evitar respostes genèriques o tardanes."
          },
          {
            "id": "coordinate-labs-and-suppliers",
            "question": "Com coordinar diversos laboratoris, proveïdors i formats d’informe?",
            "answer": "Els grups industrials sovint treballen amb serveis interns i externs. El comprador necessita estandarditzar sol·licituds, custòdia, mètodes, resultats, CoA i seguiment sense perdre les particularitats de cada proveïdor."
          },
          {
            "id": "control-reuse-and-effluent",
            "question": "Com documentar reutilització, recirculació, efluents i canvis de tractament?",
            "answer": "Aquests corrents exigeixen context de matriu, ús, criteri i acció. El resultat buscat és un històric que connecti origen, tractament, punt, tendència, desviació, remostreig i revisió tècnica."
          },
          {
            "id": "compare-multisite-performance",
            "question": "Com comparar plantes i tancar accions correctores de manera coherent?",
            "answer": "Una desviació repetida pot quedar oculta si cada seu informa de manera diferent. Els compradors busquen indicadors comparables, responsables, dates objectiu, verificació i tancament per prioritzar manteniment i millora contínua."
          }
        ]
      }
    }
  },
  "facility-water-risk": {
    "problemIds": [
      "inventory-assets-and-points",
      "schedule-recurring-controls",
      "manage-aerosol-risk",
      "coordinate-providers",
      "govern-multisite-portfolios"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores de instalaciones necesitan controlar muchos activos, tareas recurrentes y proveedores sin perder visibilidad del riesgo. Buscan pasar de carpetas por edificio a un programa vivo por punto, responsable, muestra, resultado y acción.",
        "problems": [
          {
            "id": "inventory-assets-and-points",
            "question": "¿Cómo mantener un inventario fiable de activos y puntos de agua?",
            "answer": "Depósitos, ACS, AFCH, duchas, torres, spas, fuentes y circuitos técnicos cambian con obras, cierres y mantenimiento. El comprador necesita saber qué existe, dónde está, qué riesgo tiene y quién responde por cada punto."
          },
          {
            "id": "schedule-recurring-controls",
            "question": "¿Cómo evitar que se olviden controles recurrentes, extraordinarios o de reapertura?",
            "answer": "Las tareas dependen de calendario, temporada, ocupación, incidencia y criticidad. El resultado buscado es una planificación que muestre pendientes, vencimientos, rutas, responsables, evidencias y remuestreos."
          },
          {
            "id": "manage-aerosol-risk",
            "question": "¿Cómo gestionar riesgos asociados a Legionella y aerosolización con evidencia completa?",
            "answer": "No basta con disponer de un informe de laboratorio. El comprador necesita relacionar activo, plan, punto, condiciones, mantenimiento, muestra, método, resultado, acción y verificación según el programa aplicable."
          },
          {
            "id": "coordinate-providers",
            "question": "¿Cómo coordinar propiedad, mantenimiento, laboratorio y proveedores externos?",
            "answer": "Cada participante conserva una parte de la información y puede utilizar formatos diferentes. El objetivo es trabajar sobre un expediente común que reduzca correos, pérdidas de contexto y cierres sin verificar."
          },
          {
            "id": "govern-multisite-portfolios",
            "question": "¿Cómo comparar una cartera multisede y priorizar recursos?",
            "answer": "Los responsables corporativos necesitan distinguir retraso, recurrencia, criticidad y desempeño de proveedores. Buscan indicadores comparables por sede, activo y estado para intervenir primero donde el riesgo o la falta de evidencia sea mayor."
          }
        ]
      },
      "en": {
        "intro": "Facility buyers need to control many assets, recurring tasks and providers without losing risk visibility. They want to move from building folders to a live programme organised by point, owner, sample, result and action.",
        "problems": [
          {
            "id": "inventory-assets-and-points",
            "question": "How can we maintain a reliable inventory of water assets and points?",
            "answer": "Tanks, hot and cold water systems, showers, towers, spas, fountains and technical loops change with refurbishment, closure and maintenance. Buyers need to know what exists, where it is, its risk and who owns each point."
          },
          {
            "id": "schedule-recurring-controls",
            "question": "How can we prevent recurring, exceptional or reopening controls from being missed?",
            "answer": "Tasks depend on calendar, season, occupancy, incident and criticality. The desired outcome is planning that shows pending work, due dates, routes, owners, evidence and resampling."
          },
          {
            "id": "manage-aerosol-risk",
            "question": "How can we manage Legionella and aerosol-related risks with complete evidence?",
            "answer": "A laboratory report alone is not enough. Buyers need to connect asset, plan, point, conditions, maintenance, sample, method, result, action and verification according to the applicable programme."
          },
          {
            "id": "coordinate-providers",
            "question": "How can owners, maintenance teams, laboratories and external providers coordinate?",
            "answer": "Each participant holds part of the information and may use different formats. The objective is one shared case file that reduces emails, lost context and unverified closures."
          },
          {
            "id": "govern-multisite-portfolios",
            "question": "How can we compare a multi-site portfolio and prioritise resources?",
            "answer": "Corporate owners need to distinguish delay, recurrence, criticality and provider performance. They want comparable indicators by site, asset and status to act first where risk or missing evidence is greatest."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs en gestion d’installations doivent contrôler de nombreux actifs, tâches récurrentes et prestataires sans perdre la visibilité du risque. Ils veulent passer de dossiers par bâtiment à un programme vivant par point, responsable, échantillon, résultat et action.",
        "problems": [
          {
            "id": "inventory-assets-and-points",
            "question": "Comment maintenir un inventaire fiable des actifs et points d’eau ?",
            "answer": "Réservoirs, ECS, eau froide, douches, tours, spas, fontaines et boucles techniques évoluent avec travaux, fermetures et maintenance. L’acheteur doit savoir ce qui existe, où, avec quel risque et quel responsable."
          },
          {
            "id": "schedule-recurring-controls",
            "question": "Comment éviter d’oublier les contrôles récurrents, exceptionnels ou de réouverture ?",
            "answer": "Les tâches dépendent du calendrier, de la saison, de l’occupation, des incidents et de la criticité. Le résultat recherché est une planification montrant tâches, échéances, parcours, responsables, preuves et nouveaux prélèvements."
          },
          {
            "id": "manage-aerosol-risk",
            "question": "Comment gérer les risques Legionella et aérosols avec une preuve complète ?",
            "answer": "Un rapport de laboratoire seul ne suffit pas. L’acheteur doit relier actif, plan, point, conditions, maintenance, échantillon, méthode, résultat, action et vérification selon le programme applicable."
          },
          {
            "id": "coordinate-providers",
            "question": "Comment coordonner propriétaire, maintenance, laboratoire et prestataires externes ?",
            "answer": "Chaque acteur détient une partie de l’information et peut utiliser un format différent. L’objectif est un dossier commun réduisant e-mails, pertes de contexte et clôtures non vérifiées."
          },
          {
            "id": "govern-multisite-portfolios",
            "question": "Comment comparer un portefeuille multisites et prioriser les ressources ?",
            "answer": "Les responsables corporate doivent distinguer retard, récurrence, criticité et performance des prestataires. Ils recherchent des indicateurs comparables par site, actif et statut pour intervenir d’abord là où le risque ou le manque de preuve est le plus élevé."
          }
        ]
      },
      "it": {
        "intro": "I buyer delle strutture devono controllare molti asset, attività ricorrenti e fornitori senza perdere visibilità del rischio. Vogliono passare da cartelle per edificio a un programma vivo per punto, responsabile, campione, risultato e azione.",
        "problems": [
          {
            "id": "inventory-assets-and-points",
            "question": "Come mantenere un inventario affidabile di asset e punti acqua?",
            "answer": "Serbatoi, ACS, acqua fredda, docce, torri, spa, fontane e circuiti tecnici cambiano con lavori, chiusure e manutenzione. Il buyer deve sapere cosa esiste, dove si trova, quale rischio presenta e chi ne è responsabile."
          },
          {
            "id": "schedule-recurring-controls",
            "question": "Come evitare che vengano dimenticati controlli ricorrenti, straordinari o di riapertura?",
            "answer": "Le attività dipendono da calendario, stagione, occupazione, incidente e criticità. Il risultato cercato è una pianificazione con attività pendenti, scadenze, percorsi, responsabili, evidenze e ricampionamenti."
          },
          {
            "id": "manage-aerosol-risk",
            "question": "Come gestire rischi Legionella e aerosol con evidenza completa?",
            "answer": "Un report di laboratorio da solo non basta. Il buyer deve collegare asset, piano, punto, condizioni, manutenzione, campione, metodo, risultato, azione e verifica secondo il programma applicabile."
          },
          {
            "id": "coordinate-providers",
            "question": "Come coordinare proprietà, manutenzione, laboratorio e fornitori esterni?",
            "answer": "Ogni partecipante conserva una parte dell’informazione e può utilizzare formati diversi. L’obiettivo è un fascicolo comune che riduca e-mail, perdita di contesto e chiusure non verificate."
          },
          {
            "id": "govern-multisite-portfolios",
            "question": "Come confrontare un portafoglio multisito e prioritizzare le risorse?",
            "answer": "I responsabili corporate devono distinguere ritardi, ricorrenza, criticità e performance dei fornitori. Cercano indicatori confrontabili per sito, asset e stato per intervenire prima dove rischio o mancanza di evidenza sono maggiori."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors d’instal·lacions necessiten controlar molts actius, tasques recurrents i proveïdors sense perdre visibilitat del risc. Volen passar de carpetes per edifici a un programa viu per punt, responsable, mostra, resultat i acció.",
        "problems": [
          {
            "id": "inventory-assets-and-points",
            "question": "Com mantenir un inventari fiable d’actius i punts d’aigua?",
            "answer": "Dipòsits, ACS, AFCH, dutxes, torres, spas, fonts i circuits tècnics canvien amb obres, tancaments i manteniment. El comprador necessita saber què existeix, on és, quin risc té i qui respon per cada punt."
          },
          {
            "id": "schedule-recurring-controls",
            "question": "Com evitar que s’oblidin controls recurrents, extraordinaris o de reobertura?",
            "answer": "Les tasques depenen de calendari, temporada, ocupació, incidència i criticitat. El resultat buscat és una planificació que mostri pendents, venciments, rutes, responsables, evidències i remostreigs."
          },
          {
            "id": "manage-aerosol-risk",
            "question": "Com gestionar riscos de Legionella i aerosolització amb evidència completa?",
            "answer": "Un informe de laboratori per si sol no és suficient. El comprador necessita relacionar actiu, pla, punt, condicions, manteniment, mostra, mètode, resultat, acció i verificació segons el programa aplicable."
          },
          {
            "id": "coordinate-providers",
            "question": "Com coordinar propietat, manteniment, laboratori i proveïdors externs?",
            "answer": "Cada participant conserva una part de la informació i pot utilitzar formats diferents. L’objectiu és un expedient comú que redueixi correus, pèrdua de context i tancaments sense verificar."
          },
          {
            "id": "govern-multisite-portfolios",
            "question": "Com comparar una cartera multiseu i prioritzar recursos?",
            "answer": "Els responsables corporatius necessiten distingir retard, recurrència, criticitat i rendiment dels proveïdors. Busquen indicadors comparables per seu, actiu i estat per intervenir primer on el risc o la manca d’evidència sigui més gran."
          }
        ]
      }
    }
  },
  "agriculture-water": {
    "problemIds": [
      "manage-variable-sources",
      "link-water-to-crop",
      "control-reclaimed-water",
      "control-recirculating-systems",
      "prepare-buyer-and-export-evidence"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores agrícolas necesitan convertir fuentes variables y muestreos dispersos en decisiones por parcela, cultivo y campaña. Buscan proteger producción, exportación y continuidad sin perder la relación entre origen del agua, resultado y acción.",
        "problems": [
          {
            "id": "manage-variable-sources",
            "question": "¿Cómo gestionar fuentes de agua que cambian por estación, lluvia o explotación?",
            "answer": "Pozos, balsas, canales, agua superficial, desalinizada o regenerada pueden variar entre campañas. El comprador busca comparar fuente, zona, fecha, condiciones y tendencia para ajustar muestreo, tratamiento o uso."
          },
          {
            "id": "link-water-to-crop",
            "question": "¿Cómo relacionar cada resultado con parcela, cultivo, lote y campaña?",
            "answer": "Un informe sin contexto agrícola resulta difícil de utilizar. El objetivo es vincular punto, sistema de riego, cultivo, etapa, turno, productor, muestra y decisión para saber qué producción puede quedar afectada."
          },
          {
            "id": "control-reclaimed-water",
            "question": "¿Cómo documentar el uso de agua regenerada y el plan de riesgo?",
            "answer": "La reutilización implica varios responsables, lotes de agua, permisos, criterios y acciones. El comprador necesita una cadena de evidencia entre productor, operador, usuario final, laboratorio, resultado, desviación y seguimiento."
          },
          {
            "id": "control-recirculating-systems",
            "question": "¿Cómo controlar hidroponía, fertirrigación y circuitos recirculados?",
            "answer": "En sistemas cerrados, una desviación puede propagarse con rapidez y quedar oculta si solo se muestrea un punto. El resultado buscado es comparar circuitos, depósitos, tratamientos, tendencias y acciones por ubicación."
          },
          {
            "id": "prepare-buyer-and-export-evidence",
            "question": "¿Cómo responder a compradores, certificaciones y auditorías de exportación?",
            "answer": "Clientes y entidades auditoras piden más que un análisis puntual. Los grupos productores buscan criterios comunes, histórico por explotación, acciones correctoras, laboratorios identificados e informes consistentes entre fincas y campañas."
          }
        ]
      },
      "en": {
        "intro": "Agricultural buyers need to turn variable sources and scattered sampling into decisions by plot, crop and season. They want to protect production, export readiness and continuity without losing the link between water source, result and action.",
        "problems": [
          {
            "id": "manage-variable-sources",
            "question": "How can we manage water sources that change with season, rainfall or operation?",
            "answer": "Wells, reservoirs, canals, surface, desalinated or reclaimed water may vary between seasons. Buyers need to compare source, area, date, conditions and trend to adjust sampling, treatment or use."
          },
          {
            "id": "link-water-to-crop",
            "question": "How can every result be linked to plot, crop, lot and season?",
            "answer": "A report without agricultural context is difficult to use. The goal is to connect point, irrigation system, crop, stage, shift, grower, sample and decision to identify which production may be affected."
          },
          {
            "id": "control-reclaimed-water",
            "question": "How can reclaimed-water use and the risk plan be documented?",
            "answer": "Reuse involves several owners, water lots, permits, criteria and actions. Buyers need a chain of evidence linking producer, operator, end user, laboratory, result, deviation and follow-up."
          },
          {
            "id": "control-recirculating-systems",
            "question": "How can hydroponics, fertigation and recirculating systems be controlled?",
            "answer": "In closed systems, a deviation can spread quickly and remain hidden if only one point is sampled. The desired outcome is comparison of circuits, tanks, treatments, trends and actions by location."
          },
          {
            "id": "prepare-buyer-and-export-evidence",
            "question": "How can we respond to buyers, certification schemes and export audits?",
            "answer": "Customers and auditors expect more than a single analysis. Producer groups want common criteria, history by farm, corrective actions, identified laboratories and consistent reports across farms and seasons."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs agricoles doivent transformer des sources variables et des prélèvements dispersés en décisions par parcelle, culture et campagne. Ils veulent protéger production, exportation et continuité sans perdre le lien entre origine de l’eau, résultat et action.",
        "problems": [
          {
            "id": "manage-variable-sources",
            "question": "Comment gérer des sources d’eau qui changent selon saison, pluie ou exploitation ?",
            "answer": "Puits, bassins, canaux, eau de surface, dessalée ou réutilisée peuvent varier entre campagnes. L’acheteur veut comparer source, zone, date, conditions et tendance pour ajuster prélèvement, traitement ou usage."
          },
          {
            "id": "link-water-to-crop",
            "question": "Comment relier chaque résultat à la parcelle, la culture, le lot et la campagne ?",
            "answer": "Un rapport sans contexte agricole est difficile à utiliser. L’objectif est de relier point, système d’irrigation, culture, stade, équipe, producteur, échantillon et décision afin d’identifier la production potentiellement concernée."
          },
          {
            "id": "control-reclaimed-water",
            "question": "Comment documenter l’utilisation d’eau réutilisée et le plan de risque ?",
            "answer": "La réutilisation implique plusieurs responsables, lots d’eau, autorisations, critères et actions. L’acheteur a besoin d’une chaîne de preuve entre producteur, opérateur, utilisateur final, laboratoire, résultat, déviation et suivi."
          },
          {
            "id": "control-recirculating-systems",
            "question": "Comment contrôler hydroponie, fertigation et circuits recirculés ?",
            "answer": "Dans un système fermé, une déviation peut se propager rapidement et rester invisible si un seul point est échantillonné. Le résultat recherché est la comparaison des circuits, cuves, traitements, tendances et actions par emplacement."
          },
          {
            "id": "prepare-buyer-and-export-evidence",
            "question": "Comment répondre aux acheteurs, certifications et audits export ?",
            "answer": "Clients et auditeurs demandent plus qu’une analyse ponctuelle. Les groupements de producteurs recherchent critères communs, historique par exploitation, actions correctives, laboratoires identifiés et rapports cohérents entre fermes et campagnes."
          }
        ]
      },
      "it": {
        "intro": "I buyer agricoli devono trasformare fonti variabili e campionamenti dispersi in decisioni per parcella, coltura e campagna. Vogliono proteggere produzione, export e continuità senza perdere il collegamento tra origine dell’acqua, risultato e azione.",
        "problems": [
          {
            "id": "manage-variable-sources",
            "question": "Come gestire fonti d’acqua che cambiano con stagione, pioggia o attività?",
            "answer": "Pozzi, bacini, canali, acqua superficiale, desalinizzata o riutilizzata possono variare tra campagne. Il buyer vuole confrontare fonte, zona, data, condizioni e trend per adeguare campionamento, trattamento o uso."
          },
          {
            "id": "link-water-to-crop",
            "question": "Come collegare ogni risultato a parcella, coltura, lotto e campagna?",
            "answer": "Un report senza contesto agricolo è difficile da usare. L’obiettivo è collegare punto, sistema di irrigazione, coltura, fase, turno, produttore, campione e decisione per capire quale produzione può essere interessata."
          },
          {
            "id": "control-reclaimed-water",
            "question": "Come documentare l’uso di acqua riutilizzata e il piano di rischio?",
            "answer": "Il riutilizzo coinvolge più responsabili, lotti d’acqua, autorizzazioni, criteri e azioni. Il buyer necessita di una catena di evidenza tra produttore, operatore, utilizzatore finale, laboratorio, risultato, deviazione e follow-up."
          },
          {
            "id": "control-recirculating-systems",
            "question": "Come controllare idroponica, fertirrigazione e circuiti ricircolati?",
            "answer": "Nei sistemi chiusi una deviazione può propagarsi rapidamente e restare nascosta se si campiona un solo punto. Il risultato cercato è confrontare circuiti, serbatoi, trattamenti, trend e azioni per posizione."
          },
          {
            "id": "prepare-buyer-and-export-evidence",
            "question": "Come rispondere a buyer, certificazioni e audit export?",
            "answer": "Clienti e auditor richiedono più di un’analisi puntuale. I gruppi produttori cercano criteri comuni, storico per azienda, azioni correttive, laboratori identificati e report coerenti tra aziende e campagne."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors agrícoles necessiten convertir fonts variables i mostreigs dispersos en decisions per parcel·la, cultiu i campanya. Busquen protegir producció, exportació i continuïtat sense perdre la relació entre origen de l’aigua, resultat i acció.",
        "problems": [
          {
            "id": "manage-variable-sources",
            "question": "Com gestionar fonts d’aigua que canvien per estació, pluja o explotació?",
            "answer": "Pous, basses, canals, aigua superficial, dessalinitzada o regenerada poden variar entre campanyes. El comprador busca comparar font, zona, data, condicions i tendència per ajustar mostreig, tractament o ús."
          },
          {
            "id": "link-water-to-crop",
            "question": "Com relacionar cada resultat amb parcel·la, cultiu, lot i campanya?",
            "answer": "Un informe sense context agrícola és difícil d’utilitzar. L’objectiu és vincular punt, sistema de reg, cultiu, etapa, torn, productor, mostra i decisió per saber quina producció pot quedar afectada."
          },
          {
            "id": "control-reclaimed-water",
            "question": "Com documentar l’ús d’aigua regenerada i el pla de risc?",
            "answer": "La reutilització implica diversos responsables, lots d’aigua, permisos, criteris i accions. El comprador necessita una cadena d’evidència entre productor, operador, usuari final, laboratori, resultat, desviació i seguiment."
          },
          {
            "id": "control-recirculating-systems",
            "question": "Com controlar hidroponia, fertirrigació i circuits recirculats?",
            "answer": "En sistemes tancats, una desviació pot propagar-se ràpidament i quedar oculta si només es mostreja un punt. El resultat buscat és comparar circuits, dipòsits, tractaments, tendències i accions per ubicació."
          },
          {
            "id": "prepare-buyer-and-export-evidence",
            "question": "Com respondre a compradors, certificacions i auditories d’exportació?",
            "answer": "Clients i entitats auditores demanen més que una anàlisi puntual. Els grups productors busquen criteris comuns, històric per explotació, accions correctores, laboratoris identificats i informes coherents entre finques i campanyes."
          }
        ]
      }
    }
  },
  "pharma-cosmetics-water": {
    "problemIds": [
      "link-water-to-batch",
      "detect-trends-before-oos",
      "release-cleaning-and-rinse",
      "coordinate-quality-and-partners",
      "protect-data-integrity"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores de pharma y cosmética necesitan relacionar sistemas de agua, puntos de uso, equipos y lotes dentro del sistema de calidad. Buscan detectar tendencias antes de que afecten a liberación, documentar desviaciones y mantener evidencia consistente para QA/QC, ingeniería y auditoría.",
        "problems": [
          {
            "id": "link-water-to-batch",
            "question": "¿Cómo vincular cada tipo de agua y punto de uso con equipos y lotes?",
            "answer": "Agua de entrada, purificada, WFI cuando aplique, ingrediente, limpieza y enjuague tienen usos y criterios distintos. El comprador necesita saber qué lote, formulación, línea o equipo dependía de cada muestra y resultado."
          },
          {
            "id": "detect-trends-before-oos",
            "question": "¿Cómo detectar tendencias antes de que aparezca un OOS o una desviación crítica?",
            "answer": "Revisar solo resultados individuales puede ocultar cambios graduales por punto, loop o periodo. El objetivo es visualizar histórico, alertas, recurrencia y contexto de mantenimiento para investigar antes de que el impacto aumente."
          },
          {
            "id": "release-cleaning-and-rinse",
            "question": "¿Cómo documentar último enjuague, CIP/SIP y liberación de equipos?",
            "answer": "La decisión requiere relacionar ciclo, equipo, lote anterior, lote siguiente, muestra, método, criterio y revisión. El comprador busca una evidencia clara para liberar, retener, repetir, sanitizar o abrir una investigación."
          },
          {
            "id": "coordinate-quality-and-partners",
            "question": "¿Cómo coordinar QA, QC, ingeniería, producción, CDMO y laboratorios externos?",
            "answer": "Cada equipo gestiona una parte del registro y los tiempos de decisión pueden depender de terceros. El resultado buscado es un flujo común con responsabilidades, estados, CoA, comentarios, desviaciones y aprobaciones trazables."
          },
          {
            "id": "protect-data-integrity",
            "question": "¿Cómo proteger integridad de datos y evidencia para CAPA y auditoría?",
            "answer": "Hojas sueltas y archivos no conectados dificultan reconstruir quién hizo qué y cuándo. Los compradores necesitan historial de cambios, permisos, revisión, firma cuando proceda, documentos vinculados y cierre defendible de acciones."
          }
        ]
      },
      "en": {
        "intro": "Pharmaceutical and cosmetics buyers need to connect water systems, points of use, equipment and batches within the quality system. They want to identify trends before release is affected, document deviations and maintain consistent evidence for QA/QC, engineering and audit.",
        "problems": [
          {
            "id": "link-water-to-batch",
            "question": "How can each water grade and point of use be linked to equipment and batches?",
            "answer": "Incoming, purified, WFI where applicable, ingredient, cleaning and rinse water have different uses and criteria. Buyers need to know which batch, formulation, line or equipment depended on each sample and result."
          },
          {
            "id": "detect-trends-before-oos",
            "question": "How can trends be detected before an OOS or critical deviation occurs?",
            "answer": "Reviewing individual results alone may hide gradual changes by point, loop or period. The goal is to visualise history, alerts, recurrence and maintenance context so investigation can begin before impact grows."
          },
          {
            "id": "release-cleaning-and-rinse",
            "question": "How can final rinse, CIP/SIP and equipment release be documented?",
            "answer": "The decision requires a link between cycle, equipment, previous batch, next batch, sample, method, criterion and review. Buyers need clear evidence to release, hold, repeat, sanitise or open an investigation."
          },
          {
            "id": "coordinate-quality-and-partners",
            "question": "How can QA, QC, engineering, production, CDMOs and external laboratories coordinate?",
            "answer": "Each team owns part of the record and decision time may depend on third parties. The desired outcome is one shared workflow with owners, statuses, CoA, comments, deviations and traceable approvals."
          },
          {
            "id": "protect-data-integrity",
            "question": "How can data integrity and evidence for CAPA and audit be protected?",
            "answer": "Disconnected files and paper records make it difficult to reconstruct who did what and when. Buyers need change history, permissions, review, signatures where appropriate, linked documents and defensible action closure."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs pharma et cosmétique doivent relier systèmes d’eau, points d’utilisation, équipements et lots dans le système qualité. Ils veulent détecter les tendances avant impact sur la libération, documenter les déviations et conserver des preuves cohérentes pour QA/QC, ingénierie et audit.",
        "problems": [
          {
            "id": "link-water-to-batch",
            "question": "Comment relier chaque qualité d’eau et point d’utilisation aux équipements et lots ?",
            "answer": "Eau d’entrée, purifiée, WFI si applicable, ingrédient, nettoyage et rinçage ont des usages et critères différents. L’acheteur doit savoir quel lot, formulation, ligne ou équipement dépendait de chaque échantillon et résultat."
          },
          {
            "id": "detect-trends-before-oos",
            "question": "Comment détecter les tendances avant un OOS ou une déviation critique ?",
            "answer": "La revue de résultats isolés peut masquer une évolution progressive par point, boucle ou période. L’objectif est de visualiser historique, alertes, récurrence et contexte maintenance afin d’investiguer avant aggravation."
          },
          {
            "id": "release-cleaning-and-rinse",
            "question": "Comment documenter dernier rinçage, CIP/SIP et libération des équipements ?",
            "answer": "La décision exige de relier cycle, équipement, lot précédent, lot suivant, échantillon, méthode, critère et revue. L’acheteur recherche une preuve claire pour libérer, retenir, répéter, assainir ou ouvrir une investigation."
          },
          {
            "id": "coordinate-quality-and-partners",
            "question": "Comment coordonner QA, QC, ingénierie, production, CDMO et laboratoires externes ?",
            "answer": "Chaque équipe détient une partie du dossier et les délais de décision peuvent dépendre de tiers. Le résultat recherché est un flux commun avec responsables, statuts, CoA, commentaires, déviations et approbations traçables."
          },
          {
            "id": "protect-data-integrity",
            "question": "Comment protéger l’intégrité des données et les preuves pour CAPA et audit ?",
            "answer": "Les fichiers non reliés et documents papier rendent difficile la reconstitution des actions. Les acheteurs ont besoin d’un historique des changements, de permissions, de revue, de signatures si nécessaire, de documents liés et d’une clôture défendable."
          }
        ]
      },
      "it": {
        "intro": "I buyer pharma e cosmetica devono collegare sistemi acqua, punti d’uso, attrezzature e lotti all’interno del sistema qualità. Vogliono rilevare trend prima che incidano sul rilascio, documentare deviazioni e mantenere evidenze coerenti per QA/QC, ingegneria e audit.",
        "problems": [
          {
            "id": "link-water-to-batch",
            "question": "Come collegare ogni grado d’acqua e punto d’uso ad attrezzature e lotti?",
            "answer": "Acqua in ingresso, purificata, WFI se applicabile, ingrediente, pulizia e risciacquo hanno usi e criteri diversi. Il buyer deve sapere quale lotto, formulazione, linea o attrezzatura dipendeva da ogni campione e risultato."
          },
          {
            "id": "detect-trends-before-oos",
            "question": "Come rilevare trend prima di un OOS o di una deviazione critica?",
            "answer": "Rivedere solo risultati individuali può nascondere cambiamenti graduali per punto, loop o periodo. L’obiettivo è visualizzare storico, alert, ricorrenza e contesto manutentivo per avviare l’indagine prima che l’impatto aumenti."
          },
          {
            "id": "release-cleaning-and-rinse",
            "question": "Come documentare ultimo risciacquo, CIP/SIP e rilascio delle attrezzature?",
            "answer": "La decisione richiede di collegare ciclo, attrezzatura, lotto precedente, lotto successivo, campione, metodo, criterio e revisione. Il buyer cerca evidenze chiare per rilasciare, trattenere, ripetere, sanitizzare o aprire un’indagine."
          },
          {
            "id": "coordinate-quality-and-partners",
            "question": "Come coordinare QA, QC, ingegneria, produzione, CDMO e laboratori esterni?",
            "answer": "Ogni team gestisce una parte del record e i tempi decisionali possono dipendere da terzi. Il risultato cercato è un flusso comune con responsabili, stati, CoA, commenti, deviazioni e approvazioni tracciabili."
          },
          {
            "id": "protect-data-integrity",
            "question": "Come proteggere integrità dei dati ed evidenze per CAPA e audit?",
            "answer": "File scollegati e documenti cartacei rendono difficile ricostruire chi ha fatto cosa e quando. I buyer necessitano di storico modifiche, permessi, revisione, firme quando applicabili, documenti collegati e chiusura difendibile delle azioni."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors de pharma i cosmètica necessiten relacionar sistemes d’aigua, punts d’ús, equips i lots dins del sistema de qualitat. Busquen detectar tendències abans que afectin l’alliberament, documentar desviacions i mantenir evidència coherent per a QA/QC, enginyeria i auditoria.",
        "problems": [
          {
            "id": "link-water-to-batch",
            "question": "Com vincular cada tipus d’aigua i punt d’ús amb equips i lots?",
            "answer": "Aigua d’entrada, purificada, WFI quan apliqui, ingredient, neteja i esbandida tenen usos i criteris diferents. El comprador necessita saber quin lot, formulació, línia o equip depenia de cada mostra i resultat."
          },
          {
            "id": "detect-trends-before-oos",
            "question": "Com detectar tendències abans que aparegui un OOS o una desviació crítica?",
            "answer": "Revisar només resultats individuals pot ocultar canvis graduals per punt, loop o període. L’objectiu és visualitzar històric, alertes, recurrència i context de manteniment per investigar abans que l’impacte augmenti."
          },
          {
            "id": "release-cleaning-and-rinse",
            "question": "Com documentar última esbandida, CIP/SIP i alliberament d’equips?",
            "answer": "La decisió requereix relacionar cicle, equip, lot anterior, lot següent, mostra, mètode, criteri i revisió. El comprador busca evidència clara per alliberar, retenir, repetir, sanejar o obrir una investigació."
          },
          {
            "id": "coordinate-quality-and-partners",
            "question": "Com coordinar QA, QC, enginyeria, producció, CDMO i laboratoris externs?",
            "answer": "Cada equip gestiona una part del registre i els temps de decisió poden dependre de tercers. El resultat buscat és un flux comú amb responsables, estats, CoA, comentaris, desviacions i aprovacions traçables."
          },
          {
            "id": "protect-data-integrity",
            "question": "Com protegir la integritat de dades i l’evidència per a CAPA i auditoria?",
            "answer": "Fitxers desconnectats i documents en paper dificulten reconstruir qui va fer què i quan. Els compradors necessiten històric de canvis, permisos, revisió, signatures quan pertoqui, documents vinculats i tancament defensable d’accions."
          }
        ]
      }
    }
  },
  "hospitality-tourism-water": {
    "problemIds": [
      "map-guest-water-assets",
      "manage-seasonality",
      "respond-without-service-disruption",
      "coordinate-properties-and-providers",
      "prepare-inspection-evidence"
    ],
    "translations": {
      "es": {
        "intro": "Los compradores de hostelería y ocio necesitan proteger al huésped y mantener continuidad de servicio en activos muy distintos. Buscan coordinar temporada, ocupación, mantenimiento, laboratorio y respuesta ante incidencias sin reconstruir información por hotel o instalación.",
        "problems": [
          {
            "id": "map-guest-water-assets",
            "question": "¿Cómo mapear todos los activos que pueden afectar al huésped?",
            "answer": "Habitaciones, duchas, ACS, AFCH, piscinas, spas, cocinas, hielo, fuentes y lavandería requieren controles distintos. El comprador necesita un inventario por sede, activo, punto, uso, riesgo, responsable y proveedor."
          },
          {
            "id": "manage-seasonality",
            "question": "¿Cómo gestionar cierres, reaperturas, temporada alta y cambios de ocupación?",
            "answer": "El riesgo puede cambiar con estancamiento, baja rotación, obras o puesta en marcha acelerada. El objetivo es activar tareas extraordinarias, muestreos, purgas, verificaciones y autorizaciones antes de recuperar el servicio normal."
          },
          {
            "id": "respond-without-service-disruption",
            "question": "¿Cómo responder a una incidencia sin perder control operativo ni comunicación?",
            "answer": "Una desviación puede afectar habitaciones, spa, piscina, cocina o reputación. El comprador necesita asignar medidas, bloquear puntos si procede, coordinar laboratorio, remuestrear, comunicar y documentar la reapertura."
          },
          {
            "id": "coordinate-properties-and-providers",
            "question": "¿Cómo coordinar varias propiedades, mantenedores, laboratorios y proveedores?",
            "answer": "Las cadenas hoteleras y operadores de ocio trabajan con equipos y contratos diferentes. Buscan un flujo común que permita comparar estado, retrasos, incidencias, informes y desempeño sin eliminar la responsabilidad local."
          },
          {
            "id": "prepare-inspection-evidence",
            "question": "¿Cómo preparar evidencia para inspecciones, auditorías y revisión corporativa?",
            "answer": "No basta con encontrar un PDF cuando llega una inspección. El resultado buscado es un histórico por activo con plan, tarea, muestra, resultado, medida correctora, responsable, verificación y fecha de cierre."
          }
        ]
      },
      "en": {
        "intro": "Hospitality and leisure buyers need to protect guests and maintain service continuity across very different assets. They want to coordinate seasonality, occupancy, maintenance, laboratories and incident response without rebuilding information for every property.",
        "problems": [
          {
            "id": "map-guest-water-assets",
            "question": "How can every water asset that may affect the guest be mapped?",
            "answer": "Rooms, showers, hot and cold water, pools, spas, kitchens, ice, fountains and laundry require different controls. Buyers need an inventory by property, asset, point, use, risk, owner and provider."
          },
          {
            "id": "manage-seasonality",
            "question": "How can closure, reopening, peak season and occupancy changes be managed?",
            "answer": "Risk may change with stagnation, low turnover, refurbishment or rapid commissioning. The goal is to trigger exceptional tasks, sampling, flushing, verification and authorisation before normal service resumes."
          },
          {
            "id": "respond-without-service-disruption",
            "question": "How can an incident be managed without losing operational control or communication?",
            "answer": "A deviation may affect rooms, spa, pool, kitchen or reputation. Buyers need to assign measures, restrict points where appropriate, coordinate the laboratory, resample, communicate and document reopening."
          },
          {
            "id": "coordinate-properties-and-providers",
            "question": "How can multiple properties, maintenance teams, laboratories and suppliers coordinate?",
            "answer": "Hotel groups and leisure operators work with different teams and contracts. They need a shared workflow to compare status, delays, incidents, reports and performance without removing local accountability."
          },
          {
            "id": "prepare-inspection-evidence",
            "question": "How can evidence be prepared for inspections, audits and corporate review?",
            "answer": "Finding a PDF when an inspector arrives is not enough. The desired outcome is an asset-level history containing plan, task, sample, result, corrective measure, owner, verification and closure date."
          }
        ]
      },
      "fr": {
        "intro": "Les acheteurs de l’hôtellerie et des loisirs doivent protéger les clients et maintenir la continuité de service sur des actifs très différents. Ils veulent coordonner saison, occupation, maintenance, laboratoires et réponse aux incidents sans reconstruire l’information pour chaque établissement.",
        "problems": [
          {
            "id": "map-guest-water-assets",
            "question": "Comment cartographier tous les actifs pouvant affecter le client ?",
            "answer": "Chambres, douches, ECS, eau froide, piscines, spas, cuisines, glace, fontaines et blanchisserie nécessitent des contrôles différents. L’acheteur veut un inventaire par site, actif, point, usage, risque, responsable et prestataire."
          },
          {
            "id": "manage-seasonality",
            "question": "Comment gérer fermetures, réouvertures, haute saison et variations d’occupation ?",
            "answer": "Le risque évolue avec stagnation, faible rotation, travaux ou remise en service rapide. L’objectif est d’activer tâches exceptionnelles, prélèvements, purges, vérifications et autorisations avant le retour au service normal."
          },
          {
            "id": "respond-without-service-disruption",
            "question": "Comment répondre à un incident sans perdre le contrôle opérationnel ni la communication ?",
            "answer": "Une déviation peut affecter chambres, spa, piscine, cuisine ou réputation. L’acheteur doit assigner les mesures, restreindre certains points si nécessaire, coordonner le laboratoire, rééchantillonner, communiquer et documenter la réouverture."
          },
          {
            "id": "coordinate-properties-and-providers",
            "question": "Comment coordonner plusieurs établissements, mainteneurs, laboratoires et fournisseurs ?",
            "answer": "Les groupes hôteliers et opérateurs de loisirs travaillent avec des équipes et contrats différents. Ils recherchent un flux commun pour comparer statut, retards, incidents, rapports et performance tout en conservant la responsabilité locale."
          },
          {
            "id": "prepare-inspection-evidence",
            "question": "Comment préparer les preuves pour inspections, audits et revue corporate ?",
            "answer": "Retrouver un PDF au moment d’une inspection ne suffit pas. Le résultat recherché est un historique par actif avec plan, tâche, échantillon, résultat, mesure corrective, responsable, vérification et date de clôture."
          }
        ]
      },
      "it": {
        "intro": "I buyer di ospitalità e tempo libero devono proteggere gli ospiti e mantenere continuità del servizio su asset molto diversi. Vogliono coordinare stagionalità, occupazione, manutenzione, laboratori e risposta agli incidenti senza ricostruire le informazioni per ogni struttura.",
        "problems": [
          {
            "id": "map-guest-water-assets",
            "question": "Come mappare tutti gli asset idrici che possono influire sull’ospite?",
            "answer": "Camere, docce, ACS, acqua fredda, piscine, spa, cucine, ghiaccio, fontane e lavanderia richiedono controlli diversi. Il buyer necessita di un inventario per struttura, asset, punto, uso, rischio, responsabile e fornitore."
          },
          {
            "id": "manage-seasonality",
            "question": "Come gestire chiusure, riaperture, alta stagione e variazioni di occupazione?",
            "answer": "Il rischio può cambiare con stagnazione, bassa rotazione, lavori o avvio rapido. L’obiettivo è attivare attività straordinarie, campionamenti, spurghi, verifiche e autorizzazioni prima del ritorno al servizio normale."
          },
          {
            "id": "respond-without-service-disruption",
            "question": "Come rispondere a un incidente senza perdere controllo operativo o comunicazione?",
            "answer": "Una deviazione può interessare camere, spa, piscina, cucina o reputazione. Il buyer deve assegnare misure, limitare punti quando necessario, coordinare il laboratorio, ricampionare, comunicare e documentare la riapertura."
          },
          {
            "id": "coordinate-properties-and-providers",
            "question": "Come coordinare più strutture, manutentori, laboratori e fornitori?",
            "answer": "Gruppi alberghieri e operatori leisure lavorano con team e contratti diversi. Cercano un flusso comune per confrontare stato, ritardi, incidenti, report e performance mantenendo la responsabilità locale."
          },
          {
            "id": "prepare-inspection-evidence",
            "question": "Come preparare evidenze per ispezioni, audit e revisione corporate?",
            "answer": "Trovare un PDF quando arriva un ispettore non è sufficiente. Il risultato cercato è uno storico per asset con piano, attività, campione, risultato, misura correttiva, responsabile, verifica e data di chiusura."
          }
        ]
      },
      "ca": {
        "intro": "Els compradors d’hostaleria i oci necessiten protegir l’hoste i mantenir continuïtat de servei en actius molt diferents. Busquen coordinar temporada, ocupació, manteniment, laboratori i resposta a incidències sense reconstruir informació per cada establiment.",
        "problems": [
          {
            "id": "map-guest-water-assets",
            "question": "Com mapar tots els actius d’aigua que poden afectar l’hoste?",
            "answer": "Habitacions, dutxes, ACS, AFCH, piscines, spas, cuines, gel, fonts i bugaderia requereixen controls diferents. El comprador necessita un inventari per seu, actiu, punt, ús, risc, responsable i proveïdor."
          },
          {
            "id": "manage-seasonality",
            "question": "Com gestionar tancaments, reobertures, temporada alta i canvis d’ocupació?",
            "answer": "El risc pot canviar amb estancament, baixa rotació, obres o posada en marxa accelerada. L’objectiu és activar tasques extraordinàries, mostreigs, purgues, verificacions i autoritzacions abans de recuperar el servei normal."
          },
          {
            "id": "respond-without-service-disruption",
            "question": "Com respondre a una incidència sense perdre control operatiu ni comunicació?",
            "answer": "Una desviació pot afectar habitacions, spa, piscina, cuina o reputació. El comprador necessita assignar mesures, bloquejar punts si escau, coordinar el laboratori, remostrejar, comunicar i documentar la reobertura."
          },
          {
            "id": "coordinate-properties-and-providers",
            "question": "Com coordinar diverses propietats, mantenidors, laboratoris i proveïdors?",
            "answer": "Les cadenes hoteleres i operadors d’oci treballen amb equips i contractes diferents. Busquen un flux comú que permeti comparar estat, retards, incidències, informes i rendiment mantenint la responsabilitat local."
          },
          {
            "id": "prepare-inspection-evidence",
            "question": "Com preparar evidència per a inspeccions, auditories i revisió corporativa?",
            "answer": "Trobar un PDF quan arriba una inspecció no és suficient. El resultat buscat és un històric per actiu amb pla, tasca, mostra, resultat, mesura correctora, responsable, verificació i data de tancament."
          }
        ]
      }
    }
  }
};

export const INDUSTRY_BUYER_PROBLEM_LINKS = {
  "water-testing-labs": {
    "resourceIds": [
      "iso-17025-water-laboratories-guide"
    ],
    "glossaryTermIds": [
      "digital-chain-of-custody"
    ],
    "toolIds": [
      "aquatool-cfu"
    ]
  },
  "water-quality-control": {
    "resourceIds": [
      "water-compliance-software-guide"
    ],
    "glossaryTermIds": [
      "deviation"
    ],
    "toolIds": [
      "aquatool-recovery-rpd"
    ]
  },
  "municipal-water-testing": {
    "resourceIds": [
      "rd-3-2023-somatic-coliphages-guide",
      "iso-19458-water-microbiological-sampling"
    ],
    "glossaryTermIds": [
      "water-safety-plan"
    ],
    "toolIds": []
  },
  "food-beverage-water-quality": {
    "resourceIds": [
      "food-beverage-water-microbiology-guide"
    ],
    "glossaryTermIds": [
      "haccp"
    ],
    "toolIds": []
  },
  "industrial-process-water": {
    "resourceIds": [
      "water-compliance-software-guide"
    ],
    "glossaryTermIds": [
      "process-water"
    ],
    "toolIds": [
      "aquatool-hardness-alkalinity"
    ]
  },
  "facility-water-risk": {
    "resourceIds": [
      "legionella-facility-water-risk-guide",
      "iso-19458-water-microbiological-sampling"
    ],
    "glossaryTermIds": [
      "legionella"
    ],
    "toolIds": []
  },
  "agriculture-water": {
    "resourceIds": [
      "viral-pollution-wastewater-mediterranean-ecosystems"
    ],
    "glossaryTermIds": [
      "reclaimed-water"
    ],
    "toolIds": [
      "aquatool-chemical-species"
    ]
  },
  "pharma-cosmetics-water": {
    "resourceIds": [
      "water-compliance-software-guide"
    ],
    "glossaryTermIds": [
      "alcoa-plus"
    ],
    "toolIds": [
      "aquatool-unit-converter"
    ]
  },
  "hospitality-tourism-water": {
    "resourceIds": [
      "legionella-facility-water-risk-guide",
      "iso-19458-water-microbiological-sampling"
    ],
    "glossaryTermIds": [
      "domestic-hot-water"
    ],
    "toolIds": []
  }
};

export function isCompleteBuyerProblems(candidate, expectedProblemIds = null) {
  const expectedIds = Array.isArray(expectedProblemIds) ? expectedProblemIds : null;
  const problems = Array.isArray(candidate?.problems) ? candidate.problems : [];

  if (!candidate?.eyebrow || !candidate?.title || !candidate?.intro || !candidate?.cta) return false;
  if (problems.length !== 5) return false;

  const ids = problems.map((problem) => problem?.id);
  if (expectedIds && expectedIds.length === 5) {
    if (ids.some((id, index) => id !== expectedIds[index])) return false;
  }

  return problems.every((problem) => (
    typeof problem?.id === 'string'
    && typeof problem?.question === 'string'
    && problem.question.trim().length > 0
    && typeof problem?.answer === 'string'
    && problem.answer.trim().length > 0
  ));
}

export function getIndustryBuyerProblemIds(industryId) {
  return INDUSTRY_BUYER_PROBLEMS[industryId]?.problemIds || [];
}

export function getIndustryBuyerProblems(industryId, lang) {
  const source = INDUSTRY_BUYER_PROBLEMS[industryId];
  const labels = BUYER_PROBLEM_LABELS[lang];
  const translation = source?.translations?.[lang];
  if (!source || !labels || !translation) return null;

  const relations = INDUSTRY_BUYER_PROBLEM_LINKS[industryId] || {};
  return {
    industryId,
    eyebrow: labels.eyebrow,
    title: labels.title,
    intro: translation.intro,
    cta: labels.cta,
    problems: translation.problems.map((problem) => ({ ...problem })),
    relatedResourceIds: relations.resourceIds || [],
    relatedGlossaryTermIds: relations.glossaryTermIds || [],
    relatedToolIds: relations.toolIds || [],
    dateModified: INDUSTRY_BUYER_PROBLEM_DATE_MODIFIED
  };
}

export function withIndustryBuyerProblems(pageRecord) {
  if (!pageRecord || !INDUSTRY_BUYER_PROBLEMS[pageRecord.id]) return pageRecord;

  return {
    ...pageRecord,
    translations: Object.fromEntries(BUYER_PROBLEM_LANGUAGES.map((lang) => {
      const content = pageRecord.translations?.[lang];
      return [
        lang,
        content
          ? { ...content, buyerProblems: getIndustryBuyerProblems(pageRecord.id, lang) }
          : content
      ];
    }))
  };
}
