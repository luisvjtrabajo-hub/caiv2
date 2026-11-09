import catalog from './catalog.json';
export type Mission=typeof catalog.missions[number];
export type Report={id:string;code:string;date:string;status:'Pendiente'|'Validado'|'Rechazado'|'En apelación';note:string;participants:string[];files:string[];points:number;reason?:string;quality?:boolean;consent?:boolean;minors?:boolean;interlocutor?:string};
export const currentRank=4;
export const currentName='Miguel Hernández';
export function dateKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function earliestMissionDate(now=new Date()){const date=new Date(now);date.setDate(date.getDate()-14);return dateKey(date);}
export function isValidMissionDate(value:string,now=new Date()){return /^\d{4}-\d{2}-\d{2}$/.test(value)&&value>=earliestMissionDate(now)&&value<=dateKey(now);}
export function strongestBonus(base:number,bonuses:{consistency?:boolean;first?:boolean;quality?:boolean}){return Math.max(bonuses.consistency?25:0,bonuses.first?25:0,bonuses.quality?base*.2:0);}
export function isFieldMission(code:string){return /^(ESC|DEB|EST)-/.test(code);}
export function isHonorMission(code:string){return ['VIG-01','VIG-02','VIG-03','VIG-05','VIG-06'].includes(code);}
export function canReport(m:Mission,rank:number){return m.minRank<=rank&&!(rank===1&&isFieldMission(m.code));}
export const seedReports:Report[]=[
 {id:'CAI-026',code:'ESC-02',date:'2026-11-07',status:'Pendiente',note:'Conversación en la plaza de la comunidad. Se respondió a la objeción sobre la intercesión de los santos con respeto y fuentes bíblicas.',participants:[currentName,'Andrés Salazar'],files:[],points:35},
 {id:'CAI-025',code:'FOR-02',date:'2026-11-05',status:'Pendiente',note:'Lectura y ficha completadas: tesis, tres argumentos y tres objeciones.',participants:[currentName],files:['ficha-de-lectura.pdf'],points:40},
 {id:'CAI-024',code:'HOS-01',date:'2026-11-02',status:'Validado',note:'Entrega de alimentos y acompañamiento a una familia de nuestra comunidad.',participants:[currentName,'Andrés Salazar'],files:[],points:25},
 {id:'CAI-023',code:'VIG-03',date:'2026-10-30',status:'Validado',note:'Una hora de adoración eucarística registrada en la aplicación.',participants:[currentName],files:[],points:15},
 {id:'CAI-022',code:'PRX-01',date:'2026-10-28',status:'Validado',note:'Conversación con un familiar. Objeción sobre la Tradición; lectura y diálogo respetuoso.',participants:[currentName],files:[],points:30},
];
