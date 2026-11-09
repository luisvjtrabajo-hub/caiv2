export type Place = {id:string; name:string; flag:string; lat:number; lon:number; regions:{name:string;lat:number;lon:number;cities:{name:string;count:number;lat:number;lon:number}[]}[]};
export const places:Place[] = [
 {id:'MX',name:'México',flag:'🇲🇽',lat:23.6,lon:-102.5,regions:[{name:'Ciudad de México',lat:19.43,lon:-99.13,cities:[{name:'Ciudad de México',count:98,lat:19.43,lon:-99.13}]},{name:'Jalisco',lat:20.67,lon:-103.35,cities:[{name:'Guadalajara',count:54,lat:20.67,lon:-103.35}]},{name:'Nuevo León',lat:25.68,lon:-100.31,cities:[{name:'Monterrey',count:30,lat:25.68,lon:-100.31}]}]},
 {id:'CO',name:'Colombia',flag:'🇨🇴',lat:4.6,lon:-74.1,regions:[{name:'Bogotá D. C.',lat:4.71,lon:-74.07,cities:[{name:'Bogotá',count:76,lat:4.71,lon:-74.07}]},{name:'Antioquia',lat:6.25,lon:-75.56,cities:[{name:'Medellín',count:50,lat:6.25,lon:-75.56}]}]},
 {id:'PE',name:'Perú',flag:'🇵🇪',lat:-9.2,lon:-75,regions:[{name:'Lima',lat:-12.05,lon:-77.04,cities:[{name:'Lima',count:48,lat:-12.05,lon:-77.04},{name:'Huacho',count:12,lat:-11.11,lon:-77.61}]},{name:'Arequipa',lat:-16.4,lon:-71.53,cities:[{name:'Arequipa',count:24,lat:-16.4,lon:-71.53}]}]},
 {id:'AR',name:'Argentina',flag:'🇦🇷',lat:-35,lon:-65,regions:[{name:'Buenos Aires',lat:-34.6,lon:-58.38,cities:[{name:'Buenos Aires',count:43,lat:-34.6,lon:-58.38}]},{name:'Córdoba',lat:-31.42,lon:-64.19,cities:[{name:'Córdoba',count:20,lat:-31.42,lon:-64.19}]}]},
 {id:'ES',name:'España',flag:'🇪🇸',lat:40.4,lon:-3.7,regions:[{name:'Comunidad de Madrid',lat:40.42,lon:-3.7,cities:[{name:'Madrid',count:34,lat:40.42,lon:-3.7}]},{name:'Andalucía',lat:37.39,lon:-5.98,cities:[{name:'Sevilla',count:18,lat:37.39,lon:-5.98}]}]},
 {id:'EC',name:'Ecuador',flag:'🇪🇨',lat:-1.8,lon:-78.2,regions:[{name:'Pichincha',lat:-.18,lon:-78.47,cities:[{name:'Quito',count:39,lat:-.18,lon:-78.47}]}]},
 {id:'CL',name:'Chile',flag:'🇨🇱',lat:-30,lon:-71,regions:[{name:'Metropolitana',lat:-33.45,lon:-70.67,cities:[{name:'Santiago',count:31,lat:-33.45,lon:-70.67}]}]},
 {id:'US',name:'Estados Unidos',flag:'🇺🇸',lat:36,lon:-100,regions:[{name:'Florida',lat:25.76,lon:-80.19,cities:[{name:'Miami',count:28,lat:25.76,lon:-80.19}]}]},
 {id:'VE',name:'Venezuela',flag:'🇻🇪',lat:8,lon:-66,regions:[{name:'Distrito Capital',lat:10.48,lon:-66.9,cities:[{name:'Caracas',count:25,lat:10.48,lon:-66.9}]}]},
 {id:'BO',name:'Bolivia',flag:'🇧🇴',lat:-16.5,lon:-64.7,regions:[{name:'La Paz',lat:-16.5,lon:-68.15,cities:[{name:'La Paz',count:18,lat:-16.5,lon:-68.15}]}]},
 {id:'GT',name:'Guatemala',flag:'🇬🇹',lat:15.5,lon:-90.2,regions:[{name:'Guatemala',lat:14.63,lon:-90.51,cities:[{name:'Ciudad de Guatemala',count:16,lat:14.63,lon:-90.51}]}]},
];
export const placeCount=(p:Place)=>p.regions.reduce((s,r)=>s+r.cities.reduce((n,c)=>n+c.count,0),0);
export const activeCount=places.reduce((n,p)=>n+placeCount(p),0);
