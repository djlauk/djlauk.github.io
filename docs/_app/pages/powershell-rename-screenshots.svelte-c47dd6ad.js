import{S as z,i as A,s as J,e as r,t as o,k as K,c as l,a as c,h as a,d,m as Q,b as x,g as Y,F as e,H as b}from"../chunks/vendor-1ec5dcfe.js";function Z(j){let n,h,t,v,$,S,_,f,y,N,m,C,O,D,P,I,T,F,p,g,H,X,R,i,W=`Clear-Host
$PREFIX = "my_screenshots_"
$SCREENSHOTDIR = "$env:USERPROFILE\\Pictures\\screenshots"
$EXTENSION = ".png"

$today = Get-Date -Format "yyyy-MM-dd"
$i = $(Get-ChildItem $SCREENSHOTDIR -Filter "$PREFIX*$EXTENSION").Count
Write-Host "Renaming screenshots in $SCREENSHOTDIR"

$screenshots = Get-ChildItem $SCREENSHOTDIR -Filter "$today*$EXTENSION"
Write-Host "$($screenshots.Count) file(s) found.\`n"

foreach ($f in $screenshots)
{
    $i++
    if ($i -lt 10) {$counter = "0$i"} else {$counter = $i}
    $newname = "$PREFIX$counter$($f.Extension)"
    Write-Host "$($f.Name) -> $newname"
    Rename-Item "$($f.FullName)" -NewName $newname
}
Write-Host "\`nDone."`,w;return{c(){n=r("div"),h=r("div"),t=r("p"),v=o("Copy and Paste into Windows ISE, and adapt "),$=r("code"),S=o("$PREFIX"),_=o(`, and
			`),f=r("code"),y=o("$SCREENSHOTDIR"),N=o(`
			and `),m=r("code"),C=o("$EXTENSION"),O=o(", if you need to."),D=r("br"),P=o(`
			(This is how I have `),I=r("em"),T=o("Greenshot"),F=o(` set up; so I only need to change
			`),p=r("code"),g=o("$PREFIX"),H=o(".)"),X=K(),R=r("div"),i=r("pre"),w=o(W),this.h()},l(u){n=l(u,"DIV",{class:!0});var E=c(n);h=l(E,"DIV",{});var G=c(h);t=l(G,"P",{class:!0});var s=c(t);v=a(s,"Copy and Paste into Windows ISE, and adapt "),$=l(s,"CODE",{});var k=c($);S=a(k,"$PREFIX"),k.forEach(d),_=a(s,`, and
			`),f=l(s,"CODE",{});var M=c(f);y=a(M,"$SCREENSHOTDIR"),M.forEach(d),N=a(s,`
			and `),m=l(s,"CODE",{});var V=c(m);C=a(V,"$EXTENSION"),V.forEach(d),O=a(s,", if you need to."),D=l(s,"BR",{}),P=a(s,`
			(This is how I have `),I=l(s,"EM",{});var q=c(I);T=a(q,"Greenshot"),q.forEach(d),F=a(s,` set up; so I only need to change
			`),p=l(s,"CODE",{});var B=c(p);g=a(B,"$PREFIX"),B.forEach(d),H=a(s,".)"),s.forEach(d),G.forEach(d),X=Q(E),R=l(E,"DIV",{});var L=c(R);i=l(L,"PRE",{class:!0});var U=c(i);w=a(U,W),U.forEach(d),L.forEach(d),E.forEach(d),this.h()},h(){x(t,"class","border-sky-600 border-0 border-l-2 text-small text-gray-800 bg-sky-100 p-2"),x(i,"class","bg-gray-100 font-mono p-2"),x(n,"class","shadow-lg p-2 flex flex-col space-y-2")},m(u,E){Y(u,n,E),e(n,h),e(h,t),e(t,v),e(t,$),e($,S),e(t,_),e(t,f),e(f,y),e(t,N),e(t,m),e(m,C),e(t,O),e(t,D),e(t,P),e(t,I),e(I,T),e(t,F),e(t,p),e(p,g),e(t,H),e(n,X),e(n,R),e(R,i),e(i,w)},p:b,i:b,o:b,d(u){u&&d(n)}}}const te=()=>({stuff:{pageTitle:"PowerShell Rename Screenshots"}});class se extends z{constructor(n){super();A(this,n,null,Z,J,{})}}export{se as default,te as load};
