"use strict";(globalThis["webpackChunkquasar_vue_project"]=globalThis["webpackChunkquasar_vue_project"]||[]).push([[594],{1594:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Z});var c=a(9835),l=a(499),i=a(8339),s=a(6970);const n=(0,c._)("img",{src:"images/section.png",alt:"section"},null,-1),r=[n],o={class:"circle-sub"},u={__name:"CircleImg",props:["id","title","proflieLen"],setup(e){var t;const a=e,n=(0,i.tv)(),u=null===(t=localStorage)||void 0===t?void 0:t.getItem(`isActive${a.id}`),p=e=>{n.push(e)};return(0,c.bv)((()=>{localStorage.getItem(`isActive${a.id}`)||localStorage.setItem(`isActive${a.id}`,!1)})),(t,a)=>((0,c.wg)(),(0,c.iD)("div",{class:"circle-wrapper column no-wrap flex-center",onClick:a[0]||(a[0]=()=>p(`/story/${e.id}`))},[(0,c._)("div",{class:(0,s.C_)(["circle-img-wrapper",{"circle-active":"true"===(0,l.SU)(u)}])},r,2),(0,c._)("p",o,(0,s.zw)(e.title),1)]))}},p=u,d=p,g={class:"main-wrapper"},m={class:"header row"},v=(0,c._)("img",{src:"images/logo.png",alt:"logo"},null,-1),w={class:"circle-content-wrapper row"},_=(0,c._)("div",{class:"circle-card-title"},"Wallet Watch 👀",-1),f={class:"feature-img-wrapper row flex-center"},h=(0,c._)("p",{class:"circle-card-desc"}," Want to get APP PUSH notifications for your wallet activities? Want to follow the whales? Track any wallet’s latest activities including mints, buys and sells. ",-1),b=(0,c._)("img",{src:"https://pub.angelleague.io/2022/06/29/1656485183_testImg.png",alt:""},null,-1),q={__name:"MainLayout",setup(e){const t=(0,i.tv)(),a=(0,l.iH)(null),s=(0,l.iH)(0);async function n(){const e=await fetch("https://vueproject-8c9fd-default-rtdb.firebaseio.com/story.json"),t=await e.json();a.value=t,s.value=Object.keys(t).length,console.log(t)}return(0,c.bv)((()=>{n()})),(e,i)=>{const n=(0,c.up)("q-icon"),r=(0,c.up)("q-img"),o=(0,c.up)("q-btn"),u=(0,c.up)("q-card-section"),p=(0,c.up)("q-card");return(0,c.wg)(),(0,c.iD)("section",g,[(0,c._)("header",m,[v,(0,c.Wm)(n,{class:"notification-icon",name:"notifications_none",size:"27.44px",onClick:i[0]||(i[0]=e=>(0,l.SU)(t).push("/story/1"))})]),(0,c._)("div",w,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(a.value,(e=>((0,c.wg)(),(0,c.j4)(d,(0,c.dG)({key:e.id},e,{profileLen:s.value}),null,16,["profileLen"])))),128))]),(0,c.Wm)(p,{class:"circle-card q-mt-md q-pd-lg"},{default:(0,c.w5)((()=>[(0,c.Wm)(u,{class:"column no-wrap circle-card-section"},{default:(0,c.w5)((()=>[(0,c.Wm)(n,{name:"wallet",size:"42px"}),_,(0,c._)("div",f,[(0,c.Wm)(r,{class:"circle-card-img q-mt-md",src:"https://trippy.place/img/img-push.963babe8.png",alt:"card image","no-spinner":""})]),h,(0,c.Wm)(o,{unelevated:"",rounded:"",label:"Watch Now >",class:"circle-card-btn q-mt-md",ref:"button",onClick:i[1]||(i[1]=()=>e.navigate("/"))},null,512)])),_:1})])),_:1}),b])}}};var y=a(2857),W=a(4458),k=a(3190),C=a(335),j=a(8922),I=a(9984),S=a.n(I);const Q=q,Z=Q;S()(q,"components",{QIcon:y.Z,QCard:W.Z,QCardSection:k.Z,QImg:C.Z,QBtn:j.Z})}}]);