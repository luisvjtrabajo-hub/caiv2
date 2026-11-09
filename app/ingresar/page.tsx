"use client";
import { useEffect } from 'react';
import { DemoAuthGate } from '../demo-auth';

export default function SignInPage(){return <DemoAuthGate><EnterMemberMap/></DemoAuthGate>;}
function EnterMemberMap(){useEffect(()=>{window.location.replace('/miembros');},[]);return <main className="login-redirect" role="status">Abriendo el mapa mundial de apologetas…</main>;}
