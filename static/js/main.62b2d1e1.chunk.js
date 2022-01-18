(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{69:function(e,t,a){e.exports=a(82)},74:function(e,t,a){},75:function(e,t,a){},82:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(9),r=a.n(c),o=(a(74),a(48)),l=a(12),s=a(28),u=a(19),d=(a(75),a(128)),m=a(119),f=a(62),b=a.n(f),j=function(e){var t=Object(n.useState)(""),a=Object(u.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)(!1),l=Object(u.a)(o,2),s=l[0],f=l[1],j=function(){var t=c.trim();t?e.addItem(t):f(!0),r("")};return i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement(d.a,{variant:"outlined",size:"small",label:"Enter item title",helperText:s&&"Title is required!",className:s?"error":"",value:c,onChange:function(e){r(e.currentTarget.value),f(!1)},onKeyPress:function(e){"Enter"===e.key&&j()}}),i.a.createElement(m.a,{onClick:j},i.a.createElement(b.a,{color:"primary"})))};function O(e){var t=Object(n.useState)(""),a=Object(u.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)(!1),l=Object(u.a)(o,2),s=l[0],m=l[1],f=function(){m(!1),e.changeTitle(c)};return s?i.a.createElement(d.a,{onKeyPress:function(e){"Enter"===e.key&&f()},onChange:function(e){r(e.currentTarget.value)},value:c,autoFocus:!0,onBlur:f}):i.a.createElement("span",{onDoubleClick:function(){m(!0),r(e.title)}},e.title)}var h=a(120),E=a(130),v=a(121),p=a(118),g=a(122),y=a(85),T=a(47),k=a.n(T),D=function(e){var t=e.tasks.map((function(t){return i.a.createElement(h.a,{key:t.id,divider:!0,style:{display:"flex",justifyContent:"space-between"}},i.a.createElement(E.a,{checked:t.isDone,onChange:function(a){return e.changeTaskStatus(t.id,a.currentTarget.checked,e.todoListID)}}),i.a.createElement(O,{title:t.title,changeTitle:function(a){e.changeTasksTitle(t.id,a,e.todoListID)}}),i.a.createElement(m.a,{onClick:function(){return e.removeTask(t.id,e.todoListID)}},i.a.createElement(k.a,{color:"primary"})))}));return i.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}},i.a.createElement(v.a,{variant:"h5",align:"center",style:{fontWeight:"bold"}},i.a.createElement(O,{title:e.title,changeTitle:function(t){e.changeTodoListTitle(t,e.todoListID)}}),i.a.createElement(m.a,{onClick:function(){return e.removeTodoList(e.todoListID)},color:"primary",size:"small"},i.a.createElement(k.a,null))),i.a.createElement(j,{addItem:function(t){e.addTask(t,e.todoListID)}}),i.a.createElement(p.a,{style:{textAlign:"center"}},t),i.a.createElement("div",null,i.a.createElement(g.a,{size:"small",variant:"contained",disableElevation:!0,fullWidth:!0},i.a.createElement(y.a,{color:"all"===e.filter?"secondary":"primary",onClick:function(){return e.changeTodoListFilter("all",e.todoListID)}},"All"),i.a.createElement(y.a,{color:"active"===e.filter?"secondary":"primary",onClick:function(){return e.changeTodoListFilter("active",e.todoListID)}},"Active"),i.a.createElement(y.a,{color:"completed"===e.filter?"secondary":"primary",onClick:function(){return e.changeTodoListFilter("completed",e.todoListID)}},"Completed"))))},L=a(129),C=a(123),I=a(84),w=a(124),x=a(125),S=a(127),W=a(126);var A=function(){var e,t=Object(L.a)(),a=Object(L.a)(),c=Object(n.useState)([{id:t,title:"What to learn",filter:"all"},{id:a,title:"What to buy",filter:"all"}]),r=Object(u.a)(c,2),d=r[0],f=r[1],b=Object(n.useState)((e={},Object(s.a)(e,t,[{id:Object(L.a)(),title:"HTML",isDone:!0},{id:Object(L.a)(),title:"CSS",isDone:!0},{id:Object(L.a)(),title:"JS/TS",isDone:!1}]),Object(s.a)(e,a,[{id:Object(L.a)(),title:"Meat",isDone:!0},{id:Object(L.a)(),title:"Milk",isDone:!0},{id:Object(L.a)(),title:"Beer",isDone:!1}]),e)),O=Object(u.a)(b,2),h=O[0],E=O[1],p=function(e,t){f(d.map((function(a){return a.id===t?Object(l.a)(Object(l.a)({},a),{},{filter:e}):a})))},g=function(e,t){var a=Object(l.a)({},h);a[t]=h[t].filter((function(t){return t.id!==e})),E(a)},T=function(e,t){var a=Object(l.a)({},h);a[t]=[{id:Object(L.a)(),title:e,isDone:!0}].concat(Object(o.a)(h[t])),E(a)},k=function(e,t,a){var n=Object(l.a)({},h);n[a]=h[a].map((function(a){return a.id===e?Object(l.a)(Object(l.a)({},a),{},{isDone:t}):a})),E(n)},A=function(e,t,a){E(Object(l.a)(Object(l.a)({},h),{},Object(s.a)({},a,h[a].map((function(a){return a.id===e?Object(l.a)(Object(l.a)({},a),{},{title:t}):a})))))},F=function(e){f(d.filter((function(t){return t.id!==e})));var t=Object(l.a)({},h);delete t[e],E(t)},B=function(e,t){f(d.map((function(a){return a.id===t?Object(l.a)(Object(l.a)({},a),{},{title:e}):a})))},z=function(e,t){switch(e){case"completed":return t.filter((function(e){return e.isDone}));case"active":return t.filter((function(e){return!e.isDone}));default:return t}},J=d.map((function(e){return i.a.createElement(C.a,{item:!0,key:e.id},i.a.createElement(I.a,{elevation:5,style:{padding:"15px",height:"400px",width:"300px"}},i.a.createElement(D,{todoListID:e.id,filter:e.filter,title:e.title,tasks:z(e.filter,h[e.id]),addTask:T,removeTask:g,changeTodoListFilter:p,changeTaskStatus:k,removeTodoList:F,changeTasksTitle:A,changeTodoListTitle:B})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(w.a,{position:"static"},i.a.createElement(x.a,{style:{justifyContent:"space-between"}},i.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(W.a,null)),i.a.createElement(v.a,{variant:"h6"},"Todolists"),i.a.createElement(y.a,{color:"inherit",variant:"outlined"},"Login"))),i.a.createElement(S.a,{fixed:!0},i.a.createElement(C.a,{container:!0,justifyContent:"center",style:{padding:"15px"}},i.a.createElement(j,{addItem:function(e){var t=Object(L.a)();f([].concat(Object(o.a)(d),[{id:t,title:e,filter:"all"}])),E(Object(l.a)(Object(l.a)({},h),{},Object(s.a)({},t,[])))}})),i.a.createElement(C.a,{container:!0,spacing:4,justifyContent:"center"},J)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[69,1,2]]]);
//# sourceMappingURL=main.62b2d1e1.chunk.js.map