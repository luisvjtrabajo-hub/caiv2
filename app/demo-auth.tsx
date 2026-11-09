"use client";
import { createContext,useContext,useEffect,useState } from 'react';
import { ArrowRight,Eye,EyeOff,LockKeyhole,UserRound,ShieldCheck } from 'lucide-react';
import { authenticateDemo,restoreDemoSession,DEMO_SESSION_KEY,DEMO_USERNAME,DEMO_PASSWORD,type DemoSession } from '@/lib/demo-auth';
import { RegistrationDialog } from './dialogs';

const DemoAuthContext=createContext<{session:DemoSession|null;logout:()=>void}>({session:null,logout:()=>{}});
export const useDemoAuth=()=>useContext(DemoAuthContext);

export function DemoAuthGate({children}:{children:React.ReactNode}){
 const [session,setSession]=useState<DemoSession|null>(null);
 useEffect(()=>{
  try{const restored=restoreDemoSession(sessionStorage.getItem(DEMO_SESSION_KEY));setSession(restored);if(!restored)sessionStorage.removeItem(DEMO_SESSION_KEY);}catch{}
 },[]);
 function logout(){try{sessionStorage.removeItem(DEMO_SESSION_KEY);}catch{}setSession(null);window.location.assign('/');}
 useEffect(()=>{if(!session)return;const timer=setTimeout(logout,Math.max(0,session.expiresAt-Date.now()));return()=>clearTimeout(timer);},[session]);
 function login(username:string,password:string){const result=authenticateDemo(username,password);if(!result)return false;try{sessionStorage.setItem(DEMO_SESSION_KEY,JSON.stringify(result));}catch{}setSession(result);return true;}
 return <DemoAuthContext.Provider value={{session,logout}}>{session?children:<LoginScreen onLogin={login}/>}</DemoAuthContext.Provider>;
}

function LoginScreen({onLogin}:{onLogin:(username:string,password:string)=>boolean}){
 const [visible,setVisible]=useState(false);const [error,setError]=useState('');const [register,setRegister]=useState(false);
 useEffect(()=>{if(new URLSearchParams(window.location.search).get('registro')==='1')setRegister(true);},[]);
 function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();const data=new FormData(event.currentTarget);if(!onLogin(String(data.get('username')||''),String(data.get('password')||'')))setError('Usuario o contraseña incorrectos. Revisa las credenciales de prueba e inténtalo de nuevo.');}
 return <><a className="login-back" href="/">← Volver a la página principal</a><main className="login-page">
  <section className="login-story" aria-label="Cruzada Apologética Itinerante"><img src="/images/cathedral.png" alt="Catedral ilustrativa al atardecer"/><div className="login-story-overlay"/><a className="login-brand" href="/" aria-label="CAI · Cruzada Apologética Itinerante"><CrossMark/><span>CAI<small>CRUZADA APOLOGÉTICA<br/>ITINERANTE</small></span></a><div className="login-story-copy"><div className="hero-eyebrow"><span/>UNA FE QUE NOS MUEVE</div><h1>La fe se vive.<br/>La misión nos une.</h1><p>Un mismo llamado. Una comunidad dispuesta a servir.<br/>Un camino para compartir la verdad con caridad.</p></div><div className="login-scripture"><p>«Estad siempre dispuestos a dar razón<br/>de vuestra esperanza.»</p><span>1 PEDRO 3, 15</span></div>
  </section>
  <section className="login-access" aria-labelledby="login-title"><div className="login-access-top"><span className="login-dot"/>PLATAFORMA MISIONERA CATÓLICA</div><div className="login-form-wrap"><span className="login-shield"><ShieldCheck size={25} strokeWidth={1.4}/></span><div className="eyebrow">TU ESPACIO EN LA CRUZADA</div><h2 id="login-title">Vuelve a tu misión<span className="red-period">.</span></h2><p className="login-description">Ingresa con tu usuario y contraseña de CAI.</p><form onSubmit={submit} className="login-form"><label htmlFor="cai-username">Usuario</label><div className="login-field"><UserRound size={18}/><input id="cai-username" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} required placeholder="Tu usuario" onChange={()=>setError('')}/></div><label htmlFor="cai-password">Contraseña</label><div className="login-field"><LockKeyhole size={18}/><input id="cai-password" name="password" type={visible?'text':'password'} autoComplete="current-password" required placeholder="Tu contraseña" onChange={()=>setError('')}/><button type="button" aria-label={visible?'Ocultar contraseña':'Mostrar contraseña'} aria-pressed={visible} onClick={()=>setVisible(!visible)}>{visible?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>{error&&<p className="form-error" role="alert">{error}</p>}<button className="button primary login-submit" type="submit">Iniciar sesión <ArrowRight size={17}/></button></form><details className="demo-credentials"><summary>Credenciales de prueba</summary><dl><div><dt>Usuario</dt><dd>{DEMO_USERNAME}</dd></div><div><dt>Contraseña</dt><dd>{DEMO_PASSWORD}</dd></div></dl><p>Cuenta administradora de demostración.</p></details><div className="login-demo-note"><ShieldCheck size={15}/><p>Acceso de prueba, sin backend. Usa solo las credenciales de demostración y datos ficticios.</p></div></div><footer className="login-footer">Con mansedumbre. Con respeto. Con caridad.<span>CAI · 2026</span></footer></section>
 </main><div className="login-register"><span>¿Terminaste el curso del Padre Luis Toro?</span><button onClick={()=>setRegister(true)}>Solicitar ingreso <ArrowRight size={14}/></button></div>{register&&<RegistrationDialog close={()=>setRegister(false)}/>}</>;
}

function CrossMark(){return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M23 6h18l-4 20 21-4v20l-21-4 4 20H23l4-20-21 4V22l21 4z" fill="currentColor"/></svg>;}
