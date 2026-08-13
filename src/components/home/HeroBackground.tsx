'use client';

import { useEffect, useRef } from 'react';

/**
 * Liquid clay field behind the hero. Raw WebGL, no library.
 *
 * Gated on hardware, not connection speed: the shader ships in the bundle either
 * way, so it costs no bandwidth, only GPU. I had this on effectiveType at first
 * and it switched the hero off on my own 3G connection.
 *
 * ?fx=off forces the gradient fallback.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      hardwareConcurrency?: number;
      deviceMemory?: number;
    };

    // Stand-in whenever the shader does not run.
    const fallback = () => {
      canvas.style.background =
        'radial-gradient(70% 70% at 65% 45%, color-mix(in srgb, var(--ochre) 26%, transparent), transparent 70%)';
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const forcedOff = new URLSearchParams(window.location.search).get('fx') === 'off';
    const tinyDevice = (nav.deviceMemory ?? 8) <= 2 || (nav.hardwareConcurrency ?? 8) <= 2;

    if (reduce || forcedOff || tinyDevice || nav.connection?.saveData) {
      fallback();
      return;
    }

    // Weaker hardware still gets it, just cheaper.
    const modest = (nav.hardwareConcurrency ?? 8) <= 4;
    const maxDpr = modest ? 1 : 1.5;
    const minFrameMs = modest ? 41 : 33;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) {
      fallback();
      return;
    }

    const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
    const FS = [
      'precision mediump float;',
      'uniform vec2 u_res;uniform float u_t;uniform vec2 u_m;uniform float u_alpha;',
      'uniform vec3 cBase;uniform vec3 cA;uniform vec3 cB;uniform vec3 cC;',
      'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);',
      ' return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}',
      'float fbm(vec2 p){float s=0.0,a=0.5;for(int i=0;i<5;i++){s+=a*n(p);p*=2.03;a*=0.5;}return s;}',
      'void main(){',
      ' vec2 uv=gl_FragCoord.xy/u_res.xy;',
      ' vec2 asp=vec2(u_res.x/u_res.y,1.0);',
      ' vec2 p=uv*asp*2.3;',
      ' float t=u_t*0.06;',
      ' vec2 q=vec2(fbm(p+t), fbm(p+vec2(4.3,1.7)-t));',
      ' vec2 r=vec2(fbm(p+3.0*q+vec2(1.7,9.2)+t*1.3), fbm(p+3.0*q+vec2(8.3,2.8)-t*1.1));',
      ' float pull=smoothstep(0.85,0.0,distance(uv*asp,u_m*asp));',
      ' float f=fbm(p+3.2*r+pull*0.55);',
      ' vec3 col=mix(cBase,cA,smoothstep(0.30,0.72,f));',
      ' col=mix(col,cB,smoothstep(0.55,0.98,length(r)));',
      ' col=mix(col,cC,smoothstep(0.78,1.0,f)*0.55);',
      ' float band=abs(fract(f*7.0+t*2.0)-0.5);',
      ' col=mix(col,cBase,smoothstep(0.055,0.0,band)*0.38);',
      ' float vig=smoothstep(1.3,0.25,length(uv-vec2(0.62,0.5)));',
      ' float calm=smoothstep(0.0,0.60,uv.x);',
      ' gl_FragColor=vec4(col, vig*(0.26+0.60*calm)*u_alpha);',
      '}',
    ].join('\n');

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const U = (name: string) => gl.getUniformLocation(prog, name);
    const hex = (v: string): [number, number, number] => {
      const s = v.trim().replace('#', '');
      if (s.length !== 6) return [0.5, 0.5, 0.5];
      return [parseInt(s.slice(0, 2), 16) / 255, parseInt(s.slice(2, 4), 16) / 255, parseInt(s.slice(4, 6), 16) / 255];
    };

    let mouse: [number, number] = [0.68, 0.5];
    let visible = true;
    const t0 = performance.now();

    const palette = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = (n: string) => cs.getPropertyValue(n);
      gl.useProgram(prog);
      gl.uniform3fv(U('cBase'), hex(g('--paper-2')));
      gl.uniform3fv(U('cA'), hex(g('--clay')));
      gl.uniform3fv(U('cB'), hex(g('--ochre')));
      gl.uniform3fv(U('cC'), hex(g('--forest')));
      gl.uniform1f(U('u_alpha'), document.documentElement.getAttribute('data-theme') === 'dark' ? 0.5 : 1);
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const r = host!.getBoundingClientRect();
      if (!r.width || !r.height) return;
      canvas!.width = Math.round(r.width * dpr);
      canvas!.height = Math.round(r.height * dpr);
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      gl.uniform2f(U('u_res'), canvas!.width, canvas!.height);
    };

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
    };
    const io = new IntersectionObserver((es) => (visible = (es[0]?.isIntersecting ?? visible)));
    const ro = new ResizeObserver(size);

    size();
    palette();
    window.addEventListener('resize', size);
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('themechange', palette);
    io.observe(host);
    ro.observe(host);

    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < minFrameMs || !visible) return;
      last = now;
      gl.useProgram(prog);
      gl.uniform1f(U('u_t'), (now - t0) / 1000);
      gl.uniform2f(U('u_m'), mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('themechange', palette);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 h-full w-full' />;
}
