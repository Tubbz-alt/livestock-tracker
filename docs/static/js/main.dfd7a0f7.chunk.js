(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n.p+"static/media/logo.c69084a6.svg"},37:function(e,t,n){e.exports=n(74)},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(11),o=n(32),i=n.n(o),u=n(75),l=(n(46),n(2)),s=n(3),E=n(5),m=n(4),p=n(6),f=n(78),h=n(76),O=n(77),b=n(33),j=n.n(b),v=(n(47),function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("span",null,"Livestock Tracker")}}]),t}(a.Component)),d=function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("header",{className:"app-header"},r.a.createElement("img",{src:j.a,className:"app-logo",alt:"logo"}),r.a.createElement(v,null))}}]),t}(a.Component),y=Object(c.b)(function(e){return{}},function(e){return{}})(d),C=(n(48),function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"welcome"},r.a.createElement("h1",null,"Welcome"),r.a.createElement("p",null,"The Livestock-Tracker is a lightweight animal information tracker"))}}]),t}(a.Component)),k=function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("p",{className:"information"},"Will add some information here soon...")}}]),t}(a.Component),R=n(13),g=n.n(R),w=n(16),T=n(34),_=n.n(T),L=function(){function e(){Object(l.a)(this,e)}return Object(s.a)(e,[{key:"get",value:function(){var e=Object(w.a)(g.a.mark(function e(){var t;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"GET",url:"../release.json"},e.next=3,_()(t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),e}(),F={RELEASE_FETCH:"RELEASE_FETCH",RELEASE_FETCH_COMPLETED:"RELEASE_FETCH_COMPLETED",RELEASE_FETCH_ERROR:"RELEASE_FETCH_ERROR"},A=function(){return{type:F.RELEASE_FETCH}},H=function(e){return{type:F.RELEASE_FETCH_COMPLETED,releases:e}},N=function(e){return{type:F.RELEASE_FETCH_ERROR,error:e}},S=function(){return function(){var e=Object(w.a)(g.a.mark(function e(t){var n,a;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t(A()),e.prev=1,n=new L,e.next=5,n.get();case 5:a=e.sent,t(H(a.data)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t(N(e.t0));case 12:case"end":return e.stop()}},e,this,[[1,9]])}));return function(t){return e.apply(this,arguments)}}()},x=function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.release;return r.a.createElement("li",null,e.version)}}]),t}(a.Component),D=function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.platform,t=void 0===e?"win":e;return r.a.createElement("li",{className:"platform-item"},t)}}]),t}(a.Component),M=(n(70),function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.releases,t=e.map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return r.a.createElement(x,{key:t,release:e})}),n=e.map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return r.a.createElement(D,{key:t,platform:e.platform})});return r.a.createElement("div",{className:"release"},r.a.createElement("ul",{className:"platform-list"},n),r.a.createElement("ul",{className:"release-list"},t))}}]),t}(a.Component)),P=Object(c.b)(function(e){return{releases:e.releases.releases}},function(e){return{fetchReleases:e(S())}})(M),W=function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"home"},r.a.createElement(C,null),r.a.createElement(k,null),r.a.createElement(P,null))}}]),t}(a.Component),B=Object(c.b)(function(e){return{}},function(e){return{}})(W),J=(n(71),function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.children;return r.a.createElement("main",{className:"app-main"},r.a.createElement("div",{className:"main-content"},e))}}]),t}(a.Component)),G=(n(72),function(e){function t(){return Object(l.a)(this,t),Object(E.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement(y,null),r.a.createElement(J,null,r.a.createElement(f.a,null,r.a.createElement(h.a,{exact:!0,from:"/",to:"/home"}),r.a.createElement(O.a,{exact:!0,path:"/home",component:B}))))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var I=n(12),$=n(35),q=n(19),z={releases:[],isFetching:!1,error:null};var K=Object(I.c)({releases:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case F.RELEASE_FETCH:return Object(q.a)({},e,{isFetching:!0,error:null});case F.RELEASE_FETCH_COMPLETED:return Object(q.a)({},e,{isFetching:!1,releases:t.releases});case F.RELEASE_FETCH_ERROR:return Object(q.a)({},e,{error:t.error});default:return e}}}),Q=Object(I.d)(K,{},Object(I.a)($.a));i.a.render(r.a.createElement(c.a,{store:Q},r.a.createElement(u.a,null,r.a.createElement(G,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[37,1,2]]]);
//# sourceMappingURL=main.dfd7a0f7.chunk.js.map