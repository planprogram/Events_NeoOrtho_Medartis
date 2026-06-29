/* =============================================
    Gantt Seed Data - Steps2Walk v3
    Extracted from 'Gantt - Steps2Walk v3.html'
    These are the default tasks and deliverables
    for the Cadaver Lab IBRA / Medartis project.
    ============================================= */

const GANTT_SEED_TASKS = [
    {id:4,name:"Quantidade confirmada",responsavel:"Educação/Produto",start:"2026-05-05",end:"2026-05-05",startReal:"2026-05-05",endReal:"2026-05-05"},
    {id:5,name:"Importação concluída",responsavel:"Supply Chain",start:"2026-07-17",end:"2026-07-17",startReal:"",endReal:""},
    {id:6,name:"Transporte confirmado",responsavel:"Logística",start:"2026-07-31",end:"2026-07-31",startReal:"",endReal:""},
    {id:7,name:"Recebimento confirmado",responsavel:"Logística",start:"2026-08-17",end:"2026-08-17",startReal:"",endReal:""},
    {id:1,name:"Contrato Universidade Positivo",responsavel:"Jurídico",start:"2026-07-10",end:"2026-07-10",startReal:"2026-07-08",endReal:"2026-07-08"},
    {id:2,name:"Contrato fornecedores",responsavel:"Jurídico",start:"2026-06-30",end:"2026-06-30",startReal:"2026-06-30",endReal:"2026-06-30"},
    {id:27,name:"Motores cirúrgicos",responsavel:"Educação/Produto",start:"2026-07-30",end:"2026-07-30",startReal:"",endReal:""},
    {id:28,name:"Arco em C",responsavel:"Educação/Produto",start:"2026-07-30",end:"2026-07-30",startReal:"2026-05-29",endReal:"2026-05-29"},
    {id:29,name:"Instrumentais Medartis",responsavel:"Educação/Produto",start:"2026-08-21",end:"2026-08-21",startReal:"",endReal:""},
    {id:30,name:"Instrumentais apoio",responsavel:"Educação/Produto",start:"2026-06-05",end:"2026-06-05",startReal:"2026-06-05",endReal:"2026-06-05"},
    {id:50,name:"Materiais de demonstração",responsavel:"Educação/Produto",start:"2026-08-21",end:"2026-08-21",startReal:"",endReal:""},
    {id:51,name:"Cotação espaço evento",responsavel:"Eventos",start:"2026-03-15",end:"2026-03-15",startReal:"2026-03-10",endReal:"2026-03-10"},
    {id:52,name:"Reserva local confirmada",responsavel:"Eventos",start:"2026-04-30",end:"2026-04-30",startReal:"2026-04-28",endReal:"2026-04-28"},
    {id:53,name:"Layout sala cirúrgica",responsavel:"Eventos",start:"2026-06-30",end:"2026-06-30",startReal:"",endReal:""},
    {id:54,name:"Sinalização e identificação",responsavel:"Eventos",start:"2026-08-20",end:"2026-08-20",startReal:"",endReal:""},
    {id:55,name:"Montagem mesas cirúrgicas",responsavel:"Logística",start:"2026-08-21",end:"2026-08-21",startReal:"",endReal:""},
    {id:56,name:"Iluminação sala cirúrgica",responsavel:"Logística",start:"2026-08-20",end:"2026-08-20",startReal:"",endReal:""},
    {id:57,name:"Ventilação e climatização",responsavel:"Logística",start:"2026-08-20",end:"2026-08-20",startReal:"",endReal:""},
    {id:58,name:"Instalação elétrica",responsavel:"Logística",start:"2026-08-20",end:"2026-08-20",startReal:"",endReal:""},
    {id:59,name:"Limpeza e preparo do espaço",responsavel:"IBRA",start:"2026-08-21",end:"2026-08-21",startReal:"",endReal:""},
    {id:60,name:"Formulário inscrição online",responsavel:"Educação/Eventos",start:"2026-04-01",end:"2026-04-01",startReal:"2026-03-28",endReal:"2026-03-28"},
    {id:61,name:"Lista participantes confirmados",responsavel:"Educação/Eventos",start:"2026-08-10",end:"2026-08-10",startReal:"",endReal:""},
    {id:62,name:"Crachás e materiais participantes",responsavel:"Eventos",start:"2026-08-18",end:"2026-08-18",startReal:"",endReal:""},
    {id:63,name:"Emissão certificados",responsavel:"Educação/Eventos",start:"2026-08-30",end:"2026-08-30",startReal:"",endReal:""},
    {id:64,name:"Materiais descartáveis cirúrgicos",responsavel:"Supply Chain",start:"2026-08-10",end:"2026-08-10",startReal:"",endReal:""},
    {id:65,name:"Produtos de limpeza e desinfecção",responsavel:"Supply Chain",start:"2026-08-15",end:"2026-08-15",startReal:"",endReal:""},
    {id:66,name:"EPIs para participantes",responsavel:"Supply Chain",start:"2026-08-15",end:"2026-08-15",startReal:"",endReal:""},
    {id:67,name:"Materiais escritório e sinalização",responsavel:"Logística",start:"2026-08-18",end:"2026-08-18",startReal:"",endReal:""},
    {id:68,name:"Kits participantes",responsavel:"Educação",start:"2026-08-20",end:"2026-08-20",startReal:"",endReal:""},
    {id:69,name:"Confirmação presença professores",responsavel:"Educação",start:"2026-04-30",end:"2026-04-30",startReal:"",endReal:""},
    {id:70,name:"Passagens aéreas professores",responsavel:"Logística",start:"2026-06-30",end:"2026-06-30",startReal:"",endReal:""},
    {id:71,name:"Hospedagem professores",responsavel:"Logística",start:"2026-08-10",end:"2026-08-10",startReal:"",endReal:""},
    {id:72,name:"Transporte local professores",responsavel:"Logística",start:"2026-08-23",end:"2026-08-23",startReal:"",endReal:""},
    {id:73,name:"Definição programa científico",responsavel:"Educação",start:"2026-04-30",end:"2026-04-30",startReal:"2026-04-22",endReal:"2026-04-22"},
    {id:74,name:"Apresentações PowerPoint",responsavel:"Educação",start:"2026-08-15",end:"2026-08-15",startReal:"",endReal:""},
    {id:75,name:"Material didático impresso",responsavel:"Eventos",start:"2026-08-18",end:"2026-08-18",startReal:"",endReal:""},
    {id:76,name:"Cronograma finalizado",responsavel:"Educação/Eventos",start:"2026-08-20",end:"2026-08-20",startReal:"",endReal:""}
];

const GANTT_SEED_DELIVERABLES = [
    {id:1,name:"Cadáveres confirmados (10 peças)",responsavel:"Educação/Produto",done:true},
    {id:2,name:"Importação concluída",responsavel:"Supply Chain",done:false},
    {id:3,name:"Transporte confirmado",responsavel:"Logística",done:false},
    {id:4,name:"Contrato Universidade Positivo",responsavel:"Jurídico",done:false},
    {id:5,name:"Contrato fornecedores",responsavel:"Jurídico",done:true},
    {id:6,name:"Motores cirúrgicos",responsavel:"Educação/Produto",done:false},
    {id:7,name:"Arco em C (empréstimo GE)",responsavel:"Educação/Produto",done:true},
    {id:8,name:"Instrumentais Medartis",responsavel:"Educação/Produto",done:false},
    {id:9,name:"Layout sala cirúrgica (8 estações)",responsavel:"Eventos",done:false},
    {id:10,name:"Mesas cirúrgicas montadas",responsavel:"Logística",done:false},
    {id:11,name:"Iluminação e ventilação OK",responsavel:"Logística",done:false},
    {id:12,name:"Instalação elétrica",responsavel:"Logística",done:false},
    {id:13,name:"Lista participantes confirmados",responsavel:"Educação/Eventos",done:false},
    {id:14,name:"Materiais descartáveis",responsavel:"Supply Chain",done:false},
    {id:15,name:"EPIs para participantes",responsavel:"Supply Chain",done:false},
    {id:16,name:"Kits participantes",responsavel:"Educação",done:false},
    {id:17,name:"Passagens e hospedagem professores",responsavel:"Logística",done:false},
    {id:18,name:"Cronograma finalizado",responsavel:"Educação/Eventos",done:false}
];

const GANTT_PROJECT_META = {
    name: "Gantt - Steps2Walk v3",
    description: "Cadaver Lab IBRA / Medartis Mão e Punho - 24 e 25 de agosto de 2026",
    category: "Neoortho",
    status: "active",
    startDate: "2026-03-01",
    endDate: "2026-08-31",
    timelineStart: "2026-03-01",
    timelineEnd: "2026-08-31",
    dayWidth: 5,
    nextId: 77,
    nextDelivId: 19,
    areaColors: {
        "Educação/Produto": "#00AEEF",
        "Educação": "#00AEEF",
        "Educação/Eventos": "#00AEEF",
        "Supply Chain": "#E2183C",
        "Logística": "#F7941D",
        "Jurídico": "#5C2D91",
        "Eventos": "#003A70",
        "IBRA": "#FDB913"
    }
};
