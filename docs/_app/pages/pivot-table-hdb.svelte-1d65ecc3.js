import{S as _e,i as ve,s as pe,e as E,J as te,c as j,a as O,K as se,d as f,b as c,g as U,F as r,G as q,H as Ee,t as V,k as L,h as J,m as T,X as F,M as je,N as ne,O as le,Z as me,_ as Oe,l as ie,w as we,x as ke,y as De,$ as re,q as ge,o as Ce,B as ye,L as ae,j as oe,a0 as Ae,p as Ie,a1 as de,a2 as ue,n as Ne,a3 as Be}from"../chunks/vendor-1ec5dcfe.js";function He(o,e,n){if(o.hdbAttributes.indexOf(e)<0)throw new Error("attribute not in HDB spec");return{hdbSpec:o,attribute:e,columnNumber:n,columnName:"v"+n,reference:o.hdbClass+"."+e}}function Le(o,e){let n=1;const t=[],u={},i={};function p(s){if(s.hdbSpec.joinOn===void 0)return"[tblObject].[id] = ["+s.columnName+"].[object_id]";const l=s.hdbSpec.joinOn.split("=").map(v=>{const a=u[v.trim().toLowerCase()];if(a===void 0)throw new Error(`Unknown column reference in class "${s.hdbSpec.hdbClass}": ${v}`);return a});if(l[0].reference.toLowerCase()===s.reference.toLowerCase()||l[1].reference.toLowerCase()===s.reference.toLowerCase())return i[s.hdbSpec.hdbClass]=s,"["+l[1].columnName+"].[value] = ["+l[0].columnName+"].[value]";const b=i[s.hdbSpec.hdbClass];if(b===void 0)throw new Error(`Unknown column reference in class "${s.hdbSpec.hdbClass}": ${s.reference} (joining attribute for class "${s.hdbSpec.hdbClass}" must be first attribute in list)`);return"["+b.columnName+"].[object_id] = ["+s.columnName+"].[object_id]"}for(const s of o)for(const l of s.hdbAttributes){const b=He(s,l,n++);t.push(b),u[b.reference.toLowerCase()]=b}let d=`SELECT
  [tblObject].[id],
  [tblObject].[CName],
  `;return d+=t.map(s=>`[${s.columnName}].[value] AS [${s.hdbSpec.hdbClass}_${s.attribute}]`).join(`,
  `),d+=`
FROM [tblObject]
  `,d+=`-- PLEASE CHECK the HDB attributes!!!
  -- tblObjectData could also be: tblObjectReference, tblObjectMulti or tblObjectText
  `,d+=t.map(s=>{const l=p(s);return`LEFT JOIN [tblObjectData] [${s.columnName}] ON ${l} AND [${s.columnName}].[attribute_id] = dbo.fn_GetHDBAttributeId('${s.hdbSpec.hdbClass}', '${s.attribute}')`}).join(`
  `),d+=`
WHERE
  [tblObject].[class_id] = dbo.fn_GetClassId('${o[0].hdbClass}')`,e&&(d=`SELECT * FROM (
  `+d.split(`
`).join(`
  `)+`
) s1`),d}function he(o){let e,n,t,u,i,p;return{c(){e=E("div"),n=E("span"),t=te("svg"),u=te("path"),this.h()},l(d){e=j(d,"DIV",{class:!0});var s=O(e);n=j(s,"SPAN",{});var l=O(n);t=se(l,"svg",{class:!0,fill:!0,stroke:!0,viewBox:!0,xmlns:!0});var b=O(t);u=se(b,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),O(u).forEach(f),b.forEach(f),l.forEach(f),s.forEach(f),this.h()},h(){c(u,"stroke-linecap","round"),c(u,"stroke-linejoin","round"),c(u,"stroke-width","2"),c(u,"d","M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"),c(t,"class","w-6 h-6"),c(t,"fill","none"),c(t,"stroke","currentColor"),c(t,"viewBox","0 0 24 24"),c(t,"xmlns","http://www.w3.org/2000/svg"),c(e,"class","self-end text-slate-400 hover:text-slate-600 hover:cursor-pointer")},m(d,s){U(d,e,s),r(e,n),r(n,t),r(t,u),i||(p=q(n,"click",o[6]),i=!0)},p:Ee,d(d){d&&f(e),i=!1,p()}}}function ce(o){let e,n,t,u,i,p,d,s,l;return{c(){e=E("div"),n=E("div"),t=E("label"),u=V("Join on"),i=L(),p=E("div"),d=E("input"),this.h()},l(b){e=j(b,"DIV",{});var v=O(e);n=j(v,"DIV",{});var a=O(n);t=j(a,"LABEL",{for:!0});var m=O(t);u=J(m,"Join on"),m.forEach(f),a.forEach(f),i=T(v),p=j(v,"DIV",{});var g=O(p);d=j(g,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),g.forEach(f),v.forEach(f),this.h()},h(){c(t,"for","joinOn"),c(d,"id","joinOn"),c(d,"type","text"),c(d,"class","w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"),c(d,"placeholder","Account.EmployeeId = CidPerson.PersId")},m(b,v){U(b,e,v),r(e,n),r(n,t),r(t,u),r(e,i),r(e,p),r(p,d),F(d,o[2]),s||(l=q(d,"input",o[9]),s=!0)},p(b,v){v&4&&d.value!==b[2]&&F(d,b[2])},d(b){b&&f(e),s=!1,l()}}}function Te(o){let e,n,t,u,i,p,d,s,l,b,v,a,m,g,k,C,y,B,N,P,M,G,D=!o[4]&&he(o),A=!o[3]&&ce(o);return{c(){e=E("div"),D&&D.c(),n=L(),t=E("div"),u=E("div"),i=E("label"),p=V("HDB Class"),d=L(),s=E("div"),l=E("input"),b=L(),v=E("div"),a=E("div"),m=E("label"),g=V("HDB Attributes"),k=L(),C=E("div"),y=E("input"),B=L(),A&&A.c(),this.h()},l(w){e=j(w,"DIV",{class:!0});var I=O(e);D&&D.l(I),n=T(I),t=j(I,"DIV",{});var R=O(t);u=j(R,"DIV",{});var S=O(u);i=j(S,"LABEL",{for:!0});var K=O(i);p=J(K,"HDB Class"),K.forEach(f),S.forEach(f),d=T(R),s=j(R,"DIV",{});var _=O(s);l=j(_,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),_.forEach(f),R.forEach(f),b=T(I),v=j(I,"DIV",{});var h=O(v);a=j(h,"DIV",{});var H=O(a);m=j(H,"LABEL",{for:!0});var Q=O(m);g=J(Q,"HDB Attributes"),Q.forEach(f),H.forEach(f),k=T(h),C=j(h,"DIV",{});var z=O(C);y=j(z,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),z.forEach(f),h.forEach(f),B=T(I),A&&A.l(I),I.forEach(f),this.h()},h(){c(i,"for","hdbClass"),c(l,"id","hdbClass"),c(l,"type","text"),c(l,"class","w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"),c(l,"placeholder","CidPerson"),c(m,"for","hdbAttributes"),c(y,"id","hdbAttributes"),c(y,"type","text"),c(y,"class","w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"),c(y,"placeholder","PERSID, KST, firstName, lastName, ..."),c(e,"class","flex flex-col space-y-2 rounded-md shadow-lg p-2")},m(w,I){U(w,e,I),D&&D.m(e,null),r(e,n),r(e,t),r(t,u),r(u,i),r(i,p),r(t,d),r(t,s),r(s,l),F(l,o[0]),r(e,b),r(e,v),r(v,a),r(a,m),r(m,g),r(v,k),r(v,C),r(C,y),F(y,o[1]),r(e,B),A&&A.m(e,null),P=!0,M||(G=[q(l,"input",o[7]),q(y,"input",o[8]),q(y,"change",o[5])],M=!0)},p(w,[I]){w[4]?D&&(D.d(1),D=null):D?D.p(w,I):(D=he(w),D.c(),D.m(e,n)),I&1&&l.value!==w[0]&&F(l,w[0]),I&2&&y.value!==w[1]&&F(y,w[1]),w[3]?A&&(A.d(1),A=null):A?A.p(w,I):(A=ce(w),A.c(),A.m(e,null))},i(w){P||(je(()=>{N||(N=ne(e,le,{},!0)),N.run(1)}),P=!0)},o(w){N||(N=ne(e,le,{},!1)),N.run(0),P=!1},d(w){w&&f(e),D&&D.d(),A&&A.d(),w&&N&&N.end(),M=!1,me(G)}}}function Pe(o,e,n){let{hdbClass:t="asdf"}=e,{hdbAttributes:u}=e,{joinOn:i=void 0}=e,{hideJoin:p=!1}=e,{hideDelete:d=!1}=e;const s=Oe();function l(){s("hdbattributeschanged",u)}function b(){s("deleteclass")}function v(){t=this.value,n(0,t)}function a(){u=this.value,n(1,u)}function m(){i=this.value,n(2,i)}return o.$$set=g=>{"hdbClass"in g&&n(0,t=g.hdbClass),"hdbAttributes"in g&&n(1,u=g.hdbAttributes),"joinOn"in g&&n(2,i=g.joinOn),"hideJoin"in g&&n(3,p=g.hideJoin),"hideDelete"in g&&n(4,d=g.hideDelete)},[t,u,i,p,d,l,b,v,a,m]}class Ve extends _e{constructor(e){super();ve(this,e,Pe,Te,pe,{hdbClass:0,hdbAttributes:1,joinOn:2,hideJoin:3,hideDelete:4})}}function fe(o,e,n){const t=o.slice();return t[12]=e[n],t[13]=e,t[14]=n,t}function be(o,e){let n,t,u,i,p;function d(a){e[7](a,e[12])}function s(a){e[8](a,e[12])}function l(...a){return e[9](e[12],...a)}function b(){return e[10](e[12])}let v={hdbAttributes:e[12].hdbAttributes.join(", "),hideJoin:e[14]===0,hideDelete:e[14]===0};return e[12].hdbClass!==void 0&&(v.hdbClass=e[12].hdbClass),e[12].joinOn!==void 0&&(v.joinOn=e[12].joinOn),t=new Ve({props:v}),de.push(()=>ue(t,"hdbClass",d)),de.push(()=>ue(t,"joinOn",s)),t.$on("hdbattributeschanged",l),t.$on("deleteclass",b),{key:o,first:null,c(){n=ie(),we(t.$$.fragment),this.h()},l(a){n=ie(),ke(t.$$.fragment,a),this.h()},h(){this.first=n},m(a,m){U(a,n,m),De(t,a,m),p=!0},p(a,m){e=a;const g={};m&2&&(g.hdbAttributes=e[12].hdbAttributes.join(", ")),m&2&&(g.hideJoin=e[14]===0),m&2&&(g.hideDelete=e[14]===0),!u&&m&2&&(u=!0,g.hdbClass=e[12].hdbClass,re(()=>u=!1)),!i&&m&2&&(i=!0,g.joinOn=e[12].joinOn,re(()=>i=!1)),t.$set(g)},i(a){p||(ge(t.$$.fragment,a),p=!0)},o(a){Ce(t.$$.fragment,a),p=!1},d(a){a&&f(n),ye(t,a)}}}function Je(o){let e,n,t,u,i,p,d,s,l=[],b=new Map,v,a,m,g,k,C,y,B,N,P,M,G,D,A,w,I,R,S=o[1];const K=_=>_[12].id;for(let _=0;_<S.length;_+=1){let h=fe(o,S,_),H=K(h);b.set(H,l[_]=be(H,h))}return{c(){e=E("div"),n=E("h2"),t=V("HDB Classes"),u=L(),i=E("div"),p=V(o[2]),d=L(),s=E("div");for(let _=0;_<l.length;_+=1)l[_].c();v=L(),a=E("div"),m=E("button"),g=V("add class"),k=L(),C=E("button"),y=V("generate"),B=L(),N=E("div"),P=E("h2"),M=V("Generated SQL"),G=L(),D=E("pre"),A=V(o[0]),this.h()},l(_){e=j(_,"DIV",{class:!0});var h=O(e);n=j(h,"H2",{class:!0});var H=O(n);t=J(H,"HDB Classes"),H.forEach(f),u=T(h),i=j(h,"DIV",{class:!0});var Q=O(i);p=J(Q,o[2]),Q.forEach(f),d=T(h),s=j(h,"DIV",{class:!0});var z=O(s);for(let Z=0;Z<l.length;Z+=1)l[Z].l(z);z.forEach(f),v=T(h),a=j(h,"DIV",{class:!0});var W=O(a);m=j(W,"BUTTON",{class:!0});var Y=O(m);g=J(Y,"add class"),Y.forEach(f),k=T(W),C=j(W,"BUTTON",{class:!0});var x=O(C);y=J(x,"generate"),x.forEach(f),W.forEach(f),h.forEach(f),B=T(_),N=j(_,"DIV",{class:!0});var X=O(N);P=j(X,"H2",{class:!0});var $=O(P);M=J($,"Generated SQL"),$.forEach(f),G=T(X),D=j(X,"PRE",{class:!0});var ee=O(D);A=J(ee,o[0]),ee.forEach(f),X.forEach(f),this.h()},h(){c(n,"class","my-2 text-sky-600 text-4xl"),c(i,"class","my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"),ae(i,"hidden",o[2].length===0),c(s,"class","flex flex-col space-y-2"),c(m,"class","py-2 px-4 uppercase rounded-lg bg-sky-600 text-white"),c(C,"class","py-2 px-4 uppercase rounded-lg bg-sky-600 text-white"),c(a,"class","flex flex-row justify-between mt-4"),c(e,"class","shadow-lg p-4"),c(P,"class","my-2 text-sky-600 text-4xl"),c(D,"class","w-full h-60 font-mono text-gray-800 bg-gray-50 p-2 overflow-scroll"),c(N,"class","shadow-lg p-4")},m(_,h){U(_,e,h),r(e,n),r(n,t),r(e,u),r(e,i),r(i,p),r(e,d),r(e,s);for(let H=0;H<l.length;H+=1)l[H].m(s,null);r(e,v),r(e,a),r(a,m),r(m,g),r(a,k),r(a,C),r(C,y),U(_,B,h),U(_,N,h),r(N,P),r(P,M),r(N,G),r(N,D),r(D,A),w=!0,I||(R=[q(m,"click",o[5]),q(C,"click",o[4])],I=!0)},p(_,[h]){(!w||h&4)&&oe(p,_[2]),h&4&&ae(i,"hidden",_[2].length===0),h&74&&(S=_[1],Ne(),l=Ae(l,h,K,1,_,S,b,s,Be,be,null,fe),Ie()),(!w||h&1)&&oe(A,_[0])},i(_){if(!w){for(let h=0;h<S.length;h+=1)ge(l[h]);w=!0}},o(_){for(let h=0;h<l.length;h+=1)Ce(l[h]);w=!1},d(_){_&&f(e);for(let h=0;h<l.length;h+=1)l[h].d();_&&f(B),_&&f(N),I=!1,me(R)}}}const Ue=()=>({stuff:{pageTitle:"Pivot Table for HDB"}});let Se=!1;function Me(o,e,n){let t="",u=1,i=[{id:u++,hdbClass:"Account",hdbAttributes:["sAMAccountName","Mail","givenName","sn"]}];function p(k,C){const y=i.find(B=>B.id===k);y!==void 0&&(y.hdbAttributes=C.split(",").map(B=>B.trim()))}function d(){n(2,b="");try{n(0,t=Le(i,Se))}catch(k){n(2,b=k.message)}}function s(){n(1,i=[...i,{id:u++,hdbClass:"",hdbAttributes:[],joinOn:""}])}function l(k){const C=i.findIndex(y=>y.id===k);C<0||n(1,i=[...i.slice(0,C),...i.slice(C+1)])}let b="";function v(k,C){o.$$.not_equal(C.hdbClass,k)&&(C.hdbClass=k,n(1,i))}function a(k,C){o.$$.not_equal(C.joinOn,k)&&(C.joinOn=k,n(1,i))}return[t,i,b,p,d,s,l,v,a,(k,C)=>p(k.id,C.detail),k=>l(k.id)]}class qe extends _e{constructor(e){super();ve(this,e,Me,Je,pe,{})}}export{qe as default,Ue as load};
