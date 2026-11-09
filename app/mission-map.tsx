"use client";
import { useEffect,useRef,useState } from 'react';
import { Globe2,Map,Minus,Plus,RotateCcw,LoaderCircle,Pause,Play } from 'lucide-react';
import { places,placeCount } from '@/lib/locations';

type Props={country:string;region?:string;onCountry:(id:string)=>void;large?:boolean;decorative?:boolean};
type Controls={zoomIn:()=>void;zoomOut:()=>void;reset:()=>void;focus:(country:string,region?:string)=>void;spin:()=>void};
export default function MissionMap({country,region='',onCountry,large=false,decorative=false}:Props){
 const host=useRef<HTMLDivElement>(null);const controls=useRef<Controls|null>(null);
 const callback=useRef(onCountry);callback.current=onCountry;
 const current=useRef({country,region});current.current={country,region};
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading');const [retry,setRetry]=useState(0);
 const [mode,setMode]=useState<'globe'|'flat'>('globe');const [paused,setPaused]=useState(false);const pausedRef=useRef(paused);pausedRef.current=paused;
 useEffect(()=>{
  let disposed=false;let cleanup:undefined|(()=>void);
  async function init(){
   try{
    const [am5,map,world,animated]=await Promise.all([import('@amcharts/amcharts5'),import('@amcharts/amcharts5/map'),import('@amcharts/amcharts5-geodata/worldLow'),import('@amcharts/amcharts5/themes/Animated')]);
    if(disposed||!host.current)return;
    const root=am5.Root.new(host.current);root.setThemes([animated.default.new(root)]);root.interfaceColors.set('text',am5.color(0xe1e8f1));
    const globe=mode==='globe';const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chart=root.container.children.push(map.MapChart.new(root,{background:am5.Rectangle.new(root,{fill:am5.color(0xffffff),fillOpacity:0,strokeOpacity:0}),projection:globe?map.geoOrthographic():map.geoNaturalEarth1(),panX:globe?'rotateX':'translateX',panY:globe?'rotateY':'translateY',wheelY:'none',maxZoomLevel:20,rotationX:globe?70:0,rotationY:globe?-12:0,homeGeoPoint:{longitude:globe?-70:0,latitude:globe?12:0},homeZoomLevel:globe?.91:1,paddingTop:25,paddingBottom:25,paddingLeft:15,paddingRight:15}));
    if(globe){const ocean=chart.series.unshift(map.MapPolygonSeries.new(root,{}));ocean.mapPolygons.template.setAll({fill:am5.color(0x10213c),fillOpacity:1,stroke:am5.color(0x58769d),strokeOpacity:.35,strokeWidth:1});ocean.data.push({geometry:map.getGeoRectangle(90,180,-90,-180)});}
    const grid=chart.series.push(map.GraticuleSeries.new(root,{step:15}));grid.mapLines.template.setAll({stroke:am5.color(0x9eb2d0),strokeOpacity:.09,strokeWidth:.6});
    const polygons=chart.series.push(map.MapPolygonSeries.new(root,{geoJSON:world.default,exclude:['AQ']}));
    polygons.mapPolygons.template.setAll({fill:am5.color(0x2a4267),stroke:am5.color(0x10213c),strokeWidth:.7,interactive:!decorative,tooltipText:decorative?undefined:'{name}',cursorOverStyle:decorative?'default':'pointer'});
    polygons.mapPolygons.template.states.create('hover',{fill:am5.color(0xbaa16b)});
    polygons.mapPolygons.template.adapters.add('fill',(fill,target)=>{const id=(target.dataItem?.dataContext as {id?:string}|undefined)?.id;if(!decorative&&id===current.current.country)return am5.color(0xc2a56b);return !decorative&&places.some(p=>p.id===id)?am5.color(0x466b9a):fill;});
    polygons.mapPolygons.template.events.on('click',ev=>{const id=(ev.target.dataItem?.dataContext as {id?:string}|undefined)?.id;if(!decorative&&id&&places.some(p=>p.id===id))callback.current(id);});
    const points=chart.series.push(map.MapPointSeries.new(root,{latitudeField:'lat',longitudeField:'lon',valueField:'value'}));
    points.bullets.push((root,_series,item)=>{const context=item.dataContext as {id:string;name:string;value:number};const sprite=am5.Container.new(root,{cursorOverStyle:'pointer',interactive:true,tooltipText:`${context.name}\n${context.value} apologetas activos`,ariaLabel:`${context.name}: ${context.value} apologetas activos`,focusable:true});sprite.children.push(am5.Circle.new(root,{radius:Math.min(19,8+Math.sqrt(context.value)/1.6),fill:am5.color(0xe0bd71),fillOpacity:.16,stroke:am5.color(0xe0bd71),strokeOpacity:.2,strokeWidth:1}));sprite.children.push(am5.Circle.new(root,{radius:context.value>70?6:4.5,fill:am5.color(0xe0bd71),stroke:am5.color(0xfff6dc),strokeWidth:1.5}));sprite.events.on('click',()=>{if(places.some(p=>p.id===context.id))callback.current(context.id);});return am5.Bullet.new(root,{sprite});});
    let animation:{stop:()=>void}|undefined;let pointerDown=false;let resumeTimer:ReturnType<typeof setTimeout>|undefined;
    function stop(){animation?.stop();animation=undefined;}
    function spin(){stop();if(!globe||reducedMotion||pausedRef.current||(!decorative&&current.current.country)||pointerDown||disposed)return;const from=chart.get('rotationX',70);animation=chart.animate({key:'rotationX',from,to:from-360,duration:120000,loops:Infinity,easing:am5.ease.linear});}
    chart.chartContainer.events.on('pointerdown',()=>{pointerDown=true;stop();if(resumeTimer)clearTimeout(resumeTimer);});
    chart.chartContainer.events.on('globalpointerup',()=>{pointerDown=false;if(resumeTimer)clearTimeout(resumeTimer);resumeTimer=setTimeout(spin,2500);});
    const focus=(id:string,regionName?:string)=>{stop();polygons.mapPolygons.each(p=>p.markDirtyKey('fill'));const place=decorative?undefined:places.find(p=>p.id===id);if(!place){points.data.setAll(decorative?[]:places.map(p=>({id:p.id,name:p.name,lat:p.lat,lon:p.lon,value:placeCount(p)})));chart.goHome(reducedMotion?0:600);if(globe){chart.animate({key:'rotationX',to:70,duration:reducedMotion?0:600});chart.animate({key:'rotationY',to:-12,duration:reducedMotion?0:600});}if(resumeTimer)clearTimeout(resumeTimer);resumeTimer=setTimeout(spin,800);return;}const sub=place.regions.find(r=>r.name===regionName);if(sub){points.data.setAll(sub.cities.map(c=>({...c,id:`city-${c.name}`,value:c.count})));chart.zoomToGeoPoint({longitude:sub.lon,latitude:sub.lat},7,true,reducedMotion?0:650);}else{points.data.setAll(place.regions.map(r=>({id:`region-${r.name}`,name:r.name,lat:r.lat,lon:r.lon,value:r.cities.reduce((n,c)=>n+c.count,0)})));chart.zoomToGeoPoint({longitude:place.lon,latitude:place.lat},globe?2.8:3.5,true,reducedMotion?0:650);}};
    controls.current={zoomIn:()=>{stop();chart.zoomIn();},zoomOut:()=>{stop();chart.zoomOut();},reset:()=>{if(current.current.country)callback.current('');else focus('');},focus,spin};
    polygons.events.once('datavalidated',()=>focus(current.current.country,current.current.region));
    focus(current.current.country,current.current.region);if(!reducedMotion)chart.appear(600);setStatus('ready');
    cleanup=()=>{stop();if(resumeTimer)clearTimeout(resumeTimer);root.dispose();};
   }catch(error){console.error('No se pudo cargar amCharts',error);if(!disposed)setStatus('error');}
  }init();return()=>{disposed=true;controls.current=null;cleanup?.();};
 },[retry,mode,decorative]);
 useEffect(()=>{controls.current?.focus(country,region);},[country,region]);
 useEffect(()=>{controls.current?.spin();},[paused]);
 return <div className={`map-stage world-map ${large?'large':''} ${decorative?'decorative-globe':''}`}>
  <div ref={host} className="amchart" role="img" aria-label={decorative?'Globo terráqueo ilustrativo de la Cruzada. No contiene datos de miembros.':'Globo mundial interactivo de apologetas activos. Arrastra para girar y usa la lista o los filtros para explorar por país, región y ciudad.'}/>
  {status==='loading'&&<div className="map-loading"><LoaderCircle className="spin"/><span>{decorative?'Una fe, un mundo…':'Preparando el mapa mundial…'}</span></div>}
  {status==='error'&&<div className="map-loading"><Globe2/><p>No pudimos cargar el mapa.</p><button className="button secondary" onClick={()=>{setStatus('loading');setRetry(v=>v+1);}}>Volver a intentar</button><small>{decorative?'La comunidad te espera al iniciar sesión.':'Puedes explorar los conteos en la lista.'}</small></div>}
  {!decorative&&<><div className="map-mode-switch" role="group" aria-label="Tipo de mapa"><button className={mode==='globe'?'active':''} aria-pressed={mode==='globe'} onClick={()=>{if(mode!=='globe'){setStatus('loading');setMode('globe');}}}><Globe2 size={14}/>Globo 3D</button><button className={mode==='flat'?'active':''} aria-pressed={mode==='flat'} onClick={()=>{if(mode!=='flat'){setStatus('loading');setMode('flat');}}}><Map size={14}/>Mapamundi</button></div><div className="map-controls"><button aria-label="Acercar el mapa" onClick={()=>controls.current?.zoomIn()}><Plus size={17}/></button><button aria-label="Alejar el mapa" onClick={()=>controls.current?.zoomOut()}><Minus size={17}/></button><button aria-label="Volver a la vista mundial" onClick={()=>controls.current?.reset()}><RotateCcw size={15}/></button></div><div className="map-legend"><span className="legend-dot"/>Apologetas activos por zona<span className="map-demo">Datos de ejemplo</span></div></>}
  {mode==='globe'&&<button className="globe-spin-control" onClick={()=>setPaused(!paused)} aria-label={paused?'Activar giro del globo':'Pausar giro del globo'} aria-pressed={paused}>{paused?<Play size={12}/>:<Pause size={12}/>}<span>{paused?'Activar giro':'Pausar giro'}</span></button>}
 </div>;
}
