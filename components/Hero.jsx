'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let W = window.innerWidth, H = window.innerHeight;
    let raf;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x0c0a07, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0a07, 0.1);
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);

    const SCAN = { min: -3.4, max: 3.4 };
    const U = { uTime: { value: 0 }, uScan: { value: SCAN.min } };
    const noise = `
      float hash(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}
      float vn(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);
       float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
       return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
      float fbm(vec2 p){float s=0.0,a=0.5;for(int i=0;i<5;i++){s+=a*vn(p);p*=2.0;a*=0.5;}return s;}`;

    const mat = new THREE.MeshStandardMaterial({ color: 0xc6a283, metalness: 0, roughness: 0.86, emissive: 0x000000 });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = U.uTime;
      sh.uniforms.uScan = U.uScan;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', `#include <common>
          uniform float uTime;varying float vH;varying vec2 vP;${noise}
          float skin(vec2 p){float pores=fbm(p*9.0)*0.05;float fine=fbm(p*3.2)*0.06;
            float crease=0.025*sin(p.x*2.4+fbm(p*1.3)*3.0)+0.02*sin(p.y*1.7+1.0);return pores+fine+crease;}`)
        .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
          vec2 P=position.xy;float e=0.03;float h=skin(P);
          float hx=skin(P+vec2(e,0.0));float hy=skin(P+vec2(0.0,e));
          objectNormal=normalize(vec3((h-hx)/e,(h-hy)/e,1.6));`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          float hh=skin(position.xy);vH=hh;vP=position.xy;transformed+=vec3(0.0,0.0,hh);`);
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', `#include <common>
          uniform float uScan;varying float vH;varying vec2 vP;`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
          float d=abs(vP.y-uScan);float beam=smoothstep(0.10,0.0,d);
          float trail=smoothstep(0.6,0.0,max(uScan-vP.y,0.0))*0.10;
          float grid=smoothstep(0.92,1.0,abs(fract(vH*60.0)*2.0-1.0))*beam;
          vec3 gold=vec3(0.92,0.80,0.58);
          totalEmissiveRadiance+=gold*beam*1.0+gold*trail+gold*grid*0.5;`);
    };

    const skin = new THREE.Mesh(new THREE.PlaneGeometry(9, 7, 300, 240), mat);
    skin.rotation.x = -Math.PI * 0.42;
    skin.position.set(0.7, -0.5, 0);
    scene.add(skin);
    camera.position.set(0.5, 1.0, 4.4);
    camera.lookAt(0.6, -0.4, -0.2);

    scene.add(new THREE.AmbientLight(0x3a2e1c, 0.55));
    const key = new THREE.DirectionalLight(0xffe6bd, 0.85);
    key.position.set(1, 3, 3); scene.add(key);
    const rim = new THREE.PointLight(0xc9b18a, 7, 18);
    rim.position.set(-2.5, 1.2, 2); scene.add(rim);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.5, 0.6, 0.32));

    const tg = { x: 0, y: 0 }, mo = { x: 0, y: 0 };
    const onMove = (e) => { tg.x = (e.clientX / window.innerWidth - 0.5) * 2; tg.y = (e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener('pointermove', onMove);

    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      U.uTime.value = t;
      U.uScan.value += 0.013;
      if (U.uScan.value > SCAN.max) U.uScan.value = SCAN.min;
      mo.x += (tg.x - mo.x) * 0.04; mo.y += (tg.y - mo.y) * 0.04;
      skin.rotation.z = mo.x * 0.04;
      skin.rotation.x = -Math.PI * 0.42 + mo.y * 0.03;
      camera.position.x = 0.5 + mo.x * 0.5;
      camera.position.y = 1.0 - mo.y * 0.25;
      camera.lookAt(0.6, -0.4, -0.2);
      composer.render();
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H); composer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      composer.dispose();
      renderer.dispose();
      mat.dispose();
      skin.geometry.dispose();
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} />
      <div className="veil" />
      <div className="inner">
        <p className="over">AI DERMAL ANALYSIS — DUBAI</p>
        <h1>Mapped by light,<br />renewed by <em>laser.</em></h1>
        <p className="lead">Precision wavelength therapy that reads your skin before it treats it — clinical devices and longevity formulas, calibrated for the modern complexion.</p>
        <div className="cta-row">
          <Link className="btn" href="/shop">Explore the collection</Link>
          <Link className="btn ghost" href="/shop">Take the skin analysis</Link>
        </div>
      </div>
    </section>
  );
}
