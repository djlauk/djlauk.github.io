import{S as O,i as W,s as X,e as h,t as I,k as V,c as _,a as m,h as w,d,m as R,b as f,L as $,g as P,F as o,X as B,G as j,j as q,H as N}from"../chunks/vendor-1ec5dcfe.js";function G(n,e="  "){const l=n.split(/\n/),u=/^\s*(?:If|Else|Private|Protected|Public|Sub|Function|For|While|Do)\b/i,i=/^\s*(?:Else|End|Next|Loop|Wend)\b/i;let t=0,v="";for(let p=0;p<l.length;++p){const r=l[p].trimStart();i.test(r)&&(t=t>0?t-1:0),v+=e.repeat(t)+r+`
`,u.test(r)&&t++}return v}function M(n){let e,l,u,i,t,v,p,r,g,c,E,S,C,b,y,D,A;return{c(){e=h("div"),l=h("h2"),u=I("Input"),i=V(),t=h("div"),v=I(k),p=V(),r=h("textarea"),g=V(),c=h("div"),E=h("h2"),S=I("Output"),C=V(),b=h("pre"),y=I(n[1]),this.h()},l(s){e=_(s,"DIV",{class:!0});var a=m(e);l=_(a,"H2",{class:!0});var F=m(l);u=w(F,"Input"),F.forEach(d),i=R(a),t=_(a,"DIV",{class:!0});var H=m(t);v=w(H,k),H.forEach(d),p=R(a),r=_(a,"TEXTAREA",{class:!0,placeholder:!0}),m(r).forEach(d),a.forEach(d),g=R(s),c=_(s,"DIV",{class:!0});var x=m(c);E=_(x,"H2",{class:!0});var L=m(E);S=w(L,"Output"),L.forEach(d),C=R(x),b=_(x,"PRE",{class:!0});var T=m(b);y=w(T,n[1]),T.forEach(d),x.forEach(d),this.h()},h(){f(l,"class","my-2 text-sky-600 text-4xl"),f(t,"class","my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"),$(t,"hidden",k.length===0),f(r,"class","w-full p-2 h-60 font-mono bg-gray-50 text-gray-800 border-0 border-b-2 border-gray-500 focus:border-sky-600 focus:ring-0 focus:border-0 focus:border-b-2 overflow-scroll"),f(r,"placeholder","Paste your VB code here"),f(e,"class","shadow-lg p-4"),f(E,"class","my-2 text-sky-600 text-4xl"),f(b,"class","w-full h-60 font-mono text-gray-800 bg-gray-50 p-2 overflow-scroll"),f(c,"class","shadow-lg p-4")},m(s,a){P(s,e,a),o(e,l),o(l,u),o(e,i),o(e,t),o(t,v),o(e,p),o(e,r),B(r,n[0]),P(s,g,a),P(s,c,a),o(c,E),o(E,S),o(c,C),o(c,b),o(b,y),D||(A=j(r,"input",n[2]),D=!0)},p(s,[a]){a&1&&B(r,s[0]),a&2&&q(y,s[1])},i:N,o:N,d(s){s&&d(e),s&&d(g),s&&d(c),D=!1,A()}}}const Q=()=>({stuff:{pageTitle:"VB Formatter"}});let z="  ",k="";function J(n,e,l){let u,i="";function t(){i=this.value,l(0,i)}return n.$$.update=()=>{n.$$.dirty&1&&l(1,u=G(i,z))},[i,u,t]}class U extends O{constructor(e){super();W(this,e,J,M,X,{})}}export{U as default,Q as load};
