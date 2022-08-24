"use strict";(globalThis["webpackChunkquasar_vue_project"]=globalThis["webpackChunkquasar_vue_project"]||[]).push([[15],{7015:(e,a,l)=>{l.r(a),l.d(a,{default:()=>m});var u=l(9835),i=l(6970),t=l(499),s=l(8339);const r={class:"trippy-stroy-wrapper"},v={class:"indicator-wrapper"},n=(0,u._)("div",{class:"guides-gradient"},null,-1),o={class:"carousel-background"},c={class:"carousel-title"},d=(0,u._)("h2",{class:"carousel-subTitle"},"[주요 기능]",-1),p=(0,u._)("p",{class:"carousel-content"},[(0,u.Uk)(" 1. auto slide 기능"),(0,u._)("br"),(0,u.Uk)(" - 자동 슬라이드 및 상단 인디케이터 바"),(0,u._)("br"),(0,u.Uk)(" - 자동 슬라이드 멈춤 버튼 적용"),(0,u._)("br"),(0,u._)("br"),(0,u.Uk)(" 2. 클릭 및 스와이프 기능"),(0,u._)("br"),(0,u.Uk)(" - 좌우 클릭 시 다음 페이지로 이동"),(0,u._)("br"),(0,u.Uk)(" - 좌우 스와이프 시 다음 스토리로 이동 (모바일에서 확인 가능)"),(0,u._)("br"),(0,u.Uk)(" - 첫 스토리의 첫 페이지에서는 이전 페이지로 돌아가지 않고,"),(0,u._)("br"),(0,u.Uk)(" 마지막 스토리의 마지막 페이지에서는 메인으로 돌아가도록 구현"),(0,u._)("br"),(0,u._)("br"),(0,u.Uk)(" 3. close 기능 - 우측 상단 x 버튼을 누르거나, "),(0,u._)("br"),(0,u.Uk)(" 화면을 아래로 스와이프 시 메인 페이지로 이동"),(0,u._)("br"),(0,u._)("br"),(0,u.Uk)(" 4. 기타 구현 사항"),(0,u._)("br"),(0,u.Uk)(" - 각 스토리, 페이지는 하나의 컴포넌트로 구현하였으며, "),(0,u._)("br"),(0,u.Uk)(" - 서버에 저장된 데이터 수에 따라 자동으로 렌더링 됨 ")],-1),f={__name:"TrippyStory",setup(e){const a=(0,s.yj)(),l=(0,s.tv)(),f=(0,t.iH)(0),_=(0,t.iH)(),h=(0,t.iH)(),g=(0,t.iH)(0),w=(0,t.iH)(5e3),k=(0,t.iH)(0),b=(0,t.iH)(0),y=(0,t.iH)(0),m=(0,t.iH)(0),H=(0,t.iH)(0),U=(0,t.iH)(!1),I=(0,t.iH)(!1),j=(0,t.iH)(0);async function x(e){const a=await fetch("https://vueproject-8c9fd-default-rtdb.firebaseio.com/story.json"),l=await a.json(),u=l.find((a=>a.id===+e)),i=l.indexOf(u);j.value=l.length,_.value=u,h.value=i}function C(e){l.push({path:e}),M()}function D(){const e=Date.now();m.value=setInterval((()=>{let a=Date.now();k.value>0?b.value=y.value+Math.floor((a-e)/w.value*100):b.value=Math.floor((a-e)/w.value*100)}),w.value/100),k.value>0?H.value=setInterval($,k.value):H.value=setInterval($,w.value)}function S({offsetX:e}){if(I.value)return;if(U.value)return;I.value=!0,setTimeout((()=>{I.value=!1}),300);const a=document.querySelector(".trippy-stroy-wrapper").offsetWidth;if(e>=a/2)f.value===_.value.list.length-1?(C(`/story/${_.value.id+1}`),h.value+1===j.value&&C("/")):f.value+=1;else if(f.value>0&&e<a/2)f.value-=1;else if(0===f.value&&e<a/2){if(0===h.value)return void(I.value=!1);C("/story/"+(_.value.id-1))}}function T(e){const{direction:a,distance:l,isFinal:u}=e;if(!U.value)if("left"===a&&l.x>150&&u)C(`/story/${_.value.id+1}`),h.value+1===j.value&&C("/");else if("right"===a&&l.x>150&&u){if(0===h.value)return;C("/story/"+(_.value.id-1))}}function $(){f.value===_.value.list.length-1&&(C(`/story/${_.value.id+1}`),h.value+1===j.value&&C("/"),f.value+=1),f.value<_.value.list.length-1&&(f.value+=1),M()}function q({distance:e,isFinal:a}){e.y>SWIPELIMIT_CLOSEMODAL&&a&&C("/")}function z(){!1===U.value?(y.value=b.value,clearInterval(m.value),clearInterval(H.value),k.value=w.value-y.value*w.value/100):D(),U.value=!U.value}function M(){b.value=0,k.value=0,y.value=0,clearInterval(m.value),clearInterval(H.value)}return(0,u.bv)((()=>{x(a.params.id),D(),localStorage.setItem(`isActive${a.params.id}`,!0)})),(0,u.YP)(f,(e=>{g.value=e,M(),D()})),(e,a)=>{var l;const t=(0,u.up)("q-icon"),s=(0,u.up)("q-carousel-slide"),w=(0,u.up)("q-carousel"),k=(0,u.Q2)("touch-pan");return(0,u.wg)(),(0,u.iD)("section",r,[(0,u._)("div",v,[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)(null===(l=_.value)||void 0===l?void 0:l.list,((e,a)=>((0,u.wg)(),(0,u.iD)("div",{class:"indicator-background",key:a,style:(0,i.j5)({width:100/_.value.list.length+"%"})},[(0,u._)("div",{class:"indicator",style:(0,i.j5)(a===g.value?`width: ${b.value}%`:g.value>a?"width:100%":"width:0%")},null,4)],4)))),128))]),n,(0,u._)("div",{class:"guides-close",onClick:a[0]||(a[0]=e=>C("/"))},[(0,u.Wm)(t,{name:"close",size:"36px"})]),(0,u._)("div",{class:"guides-pause",onClick:z},[U.value?((0,u.wg)(),(0,u.j4)(t,{key:0,name:"play_arrow",size:"36px"})):((0,u.wg)(),(0,u.j4)(t,{key:1,name:"pause",size:"36px"}))]),(0,u.Wm)(w,{modelValue:f.value,"onUpdate:modelValue":a[1]||(a[1]=e=>f.value=e),"transition-prev":"slide-right","transition-next":"slide-left",animated:"",class:"guides-carousel-wrapper",onClick:a[2]||(a[2]=e=>S(e))},{default:(0,u.w5)((()=>{var e;return[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)(null===(e=_.value)||void 0===e?void 0:e.list,((e,a)=>(0,u.wy)(((0,u.wg)(),(0,u.j4)(s,{class:"guides-carousel",key:a,name:a},{default:(0,u.w5)((()=>[(0,u._)("div",o,[(0,u._)("h2",c,(0,i.zw)(`# ${h.value+1} Story ${a+1} Page`),1),d,p])])),_:2},1032,["name"])),[[k,T,void 0,{left:!0,right:!0}],[k,q,void 0,{down:!0}]]))),128))]})),_:1},8,["modelValue"])])}}};var _=l(2857),h=l(960),g=l(1694),w=l(2873),k=l(9984),b=l.n(k);const y=f,m=y;b()(f,"components",{QIcon:_.Z,QCarousel:h.Z,QCarouselSlide:g.Z}),b()(f,"directives",{TouchPan:w.Z})}}]);