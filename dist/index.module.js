import e,{NotFound as t}from"http-errors";import{Tx as r,Script as n,OpCode as o}from"@ts-bitcoin/core";import{Transaction as i}from"bitcore-lib";import*as s from"dns/promises";import{JungleBusClient as c}from"@gorillapool/js-junglebus";import*as u from"bitcoin-core";import"cross-fetch/polyfill";import{Redis as a}from"ioredis";function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l;if(process.env.REDIS_HOST){var v=process.env.REDIS_HOST,m=process.env.REDIS_PORT?parseInt(process.env.REDIS_PORT,10):6379;console.log("Connecting to redis:",v,m),l=new a(m,v)}var p=/*#__PURE__*/function(){function e(e,t,r,n,o){this.network=void 0,this.client=void 0,this.network=e,this.client=new u({host:t,port:r,username:n,password:o})}var r=e.prototype;return r.getRawTx=function(e){try{var r,n=this;return Promise.resolve(null==(r=l)?void 0:r.getBuffer("rawtx:"+e)).then(function(r){var o=function(){if(!r)return Promise.resolve(n.client.getTransactionByHash(e,{extension:"bin"})).then(function(n){var o;if(!(r=n))throw new t;null==(o=l)||o.set("rawtx:"+e,r)})}();return o&&o.then?o.then(function(e){return r}):r})}catch(e){return Promise.reject(e)}},r.getBlockchainInfo=function(){try{return Promise.resolve(this.client.getBlockchainInfo()).then(function(e){return{height:e.blocks,hash:e.bestblockhash}})}catch(e){return Promise.reject(e)}},r.getBlockByHeight=function(e){try{return Promise.resolve(this.client.getBlockHash(e)).then(function(t){return{height:e,hash:t}})}catch(e){return Promise.reject(e)}},r.getBlockByHash=function(e){try{return Promise.resolve(this.client.getBlockHeader(e)).then(function(t){return{height:t.height,hash:e}})}catch(e){return Promise.reject(e)}},e}(),g=/*#__PURE__*/function(){function t(){this.network="bsv"}var r=t.prototype;return r.getRawTx=function(e){try{var t;return Promise.resolve(null==(t=l)?void 0:t.getBuffer("rawtx:"+e)).then(function(t){var r=function(){if(!t){var r=new c("https://junglebus.gorillapool.io");return Promise.resolve(r.GetTransaction(e)).then(function(r){var n;t=Buffer.from(r.transaction,"base64"),null==(n=l)||n.set("rawtx:"+e,t)})}}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}},r.getBlockchainInfo=function(){try{return Promise.resolve(fetch("https://api.whatsonchain.com/v1/bsv/main/block/headers")).then(function(t){if(!t.ok)throw e(t.status,t.statusText);return Promise.resolve(t.json()).then(function(e){return{height:e[0].height,hash:e[0].hash}})})}catch(e){return Promise.reject(e)}},r.getBlockByHeight=function(e){try{return Promise.resolve(fetch("https://api.whatsonchain.com/v1/bsv/main/block/height/"+e)).then(function(t){return Promise.resolve(t.json()).then(function(t){return{height:e,hash:t.hash}})})}catch(e){return Promise.reject(e)}},r.getBlockByHash=function(e){try{return Promise.resolve(fetch("https://api.whatsonchain.com/v1/bsv/main/block/hash/"+e)).then(function(t){return Promise.resolve(t.json()).then(function(t){return{height:t.height,hash:e}})})}catch(e){return Promise.reject(e)}},t}(),P=/*#__PURE__*/function(){function t(){this.network="btc"}var r=t.prototype;return r.getRawTx=function(t){try{var r;return Promise.resolve(null==(r=l)?void 0:r.getBuffer("rawtx:"+t)).then(function(r){var n=function(){if(!r)return Promise.resolve(fetch("https://ordinals.shruggr.cloud/v1/btc/tx/"+t)).then(function(n){if(!n.ok)throw e(n.status,n.statusText);var o=Buffer,i=o.from;return Promise.resolve(n.arrayBuffer()).then(function(e){var n;r=i.call(o,e),null==(n=l)||n.set("rawtx:"+t,r)})})}();return n&&n.then?n.then(function(e){return r}):r})}catch(e){return Promise.reject(e)}},r.getBlockchainInfo=function(){try{return Promise.resolve(fetch("https://ordinals.shruggr.cloud/v1/btc/block/latest")).then(function(t){if(!t.ok)throw e(t.status,t.statusText);return t.json()})}catch(e){return Promise.reject(e)}},r.getBlockByHeight=function(e){try{return Promise.resolve(fetch("https://ordinals.shruggr.cloud/v1/btc/block/height/"+e)).then(function(t){return Promise.resolve(t.json()).then(function(t){return{height:e,hash:t.hash}})})}catch(e){return Promise.reject(e)}},r.getBlockByHash=function(e){try{return Promise.resolve(fetch("https://ordinals.shruggr.cloud/v1/btc/block/hash/"+e)).then(function(t){return Promise.resolve(t.json()).then(function(t){return{height:t.height,hash:e}})})}catch(e){return Promise.reject(e)}},t}(),d=function(e,o){void 0===o&&(o=!1);try{var s,c=function(e){if(!s)throw new t;return s};console.log("loadInscription",e);var u=function(){if(e.match(/^[0-9a-fA-F]{64}_\d*$/)){var c=e.split("_"),u=c[0],a=c[1];return console.log("BSV:",u,a),Promise.resolve(S.getRawTx(u)).then(function(n){if(!n)throw new Error("No raw tx found");var i=r.fromBuffer(n),c=parseInt(a,10),h=i.txOuts[c].script;if(!h)throw new t;s=I(h);var f=function(){if(s&&o){var t=function(t,r){try{var n=Promise.resolve(fetch("https://ordinals.gorillapool.io/api/inscriptions/outpoint/"+e)).then(function(e){return Promise.resolve(e.json()).then(function(e){return Promise.resolve(S.getBlockByHeight(e.height)).then(function(t){s.meta={height:e.height,MAP:e.MAP,hash:t.hash,txid:u,v:c}})})})}catch(e){return}return n&&n.then?n.then(void 0,function(){}):n}();if(t&&t.then)return t.then(function(){})}}();if(f&&f.then)return f.then(function(){})})}return function(){if(e.match(/^[0-9a-fA-F]{64}i\d+$/)&&x){var r=e.split("i"),o=r[0],c=r[1];return console.log("BTC",o,c),Promise.resolve(x.getRawTx(o)).then(function(e){if(!e)throw new Error("No raw tx found");var r=new i(e),o=n.fromBuffer(r.inputs[parseInt(c,10)].witnesses[1]);if(!o)throw new t;s=I(o)})}throw new Error("Invalid Pointer")}()}();return Promise.resolve(u&&u.then?u.then(c):c())}catch(e){return Promise.reject(e)}},w=function(e){try{var r="_ordfs."+e;return Promise.resolve(s.resolveTxt(r)).then(function(e){var n="";console.log("Lookup Up:",r);e:for(var o,i=f(e);!(o=i()).done;){for(var s,c=f(o.value);!(s=c()).done;){var u=s.value;if(u.startsWith("ordfs=")){console.log("Elem:",u),n=u.slice(6),console.log("Origin:",n);break e}}if(!n)throw new t}return n})}catch(e){return Promise.reject(e)}},y=function(e,r){try{switch(e){case"btc":return Promise.resolve(x.getRawTx(r));case"bsv":return Promise.resolve(S.getRawTx(r));default:throw new t("Network Not Found")}}catch(e){return Promise.reject(e)}},b=function(e,r){try{switch(e){case"btc":return Promise.resolve(x.getBlockByHash(r));case"bsv":return Promise.resolve(S.getBlockByHash(r));default:throw new t("Network Not Found")}}catch(e){return Promise.reject(e)}},k=function(e,r){try{switch(e){case"btc":return Promise.resolve(x.getBlockByHeight(r));case"bsv":return Promise.resolve(S.getBlockByHeight(r));default:throw new t("Network Not Found")}}catch(e){return Promise.reject(e)}},B=function(e){try{switch(e){case"btc":return Promise.resolve(x.getBlockchainInfo());case"bsv":return Promise.resolve(S.getBlockchainInfo());default:throw new t("Network Not Found")}}catch(e){return Promise.reject(e)}},j=Buffer.from("19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"),T=Buffer.from("ord"),x=new P,S=new g;function I(e){for(var t,r=0,n=0,i=0,s="application/octet-stream",c=Buffer.alloc(0),u=f(e.chunks.entries());!(t=u()).done;){var a,h,l=t.value,v=l[0],m=l[1];if(null!=(a=m.buf)&&a.equals(j)&&e.chunks.length>v+2)return{data:c=e.chunks[v+1].buf,type:s=e.chunks[v+2].buf.toString()};if(m.opCodeNum===o.OP_FALSE&&(r=v),m.opCodeNum===o.OP_IF&&(n=v),null!=(h=m.buf)&&h.equals(T)&&r===v-2&&n===v-1){i=v;break}}for(var p=i+1;p<e.chunks.length;p++)switch(e.chunks[p].opCodeNum){case o.OP_FALSE:for(;(null==(g=e.chunks[p+1])?void 0:g.opCodeNum)>=1&&(null==(P=e.chunks[p+1])?void 0:P.opCodeNum)<=o.OP_PUSHDATA4;){var g,P;c=Buffer.concat([c,e.chunks[p+1].buf]),p++}break;case 1:if(1!=e.chunks[p].buf[0])return;case o.OP_TRUE:s=e.chunks[p+1].buf.toString("utf8"),p++;break;case o.OP_ENDIF:return{type:s,data:c};default:return}return{type:s,data:c}}function O(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}function H(e,t,r){void 0===r&&(r=!0),t.header("Content-Type",e.type||""),e.meta&&t.header("ordfs-meta",JSON.stringify(e.meta)),r&&!e.meta&&t.header("Cache-Control","public,immutable,max-age=31536000"),t.status(200).send(e.data)}function N(e){var r=function(e,r,n){try{return Promise.resolve(O(function(){var n=e.params.pointer,o=e.params.filename;return Promise.resolve(d(n)).then(function(i){var s=JSON.parse(i.data.toString("utf8"));if(!s[o])throw new t;return n=s[o].startsWith("ord://")?s[o].slice(6):s[o],Promise.resolve(d(n,e.query.meta)).then(function(e){H(e,r,!0)})})},function(e){n(e)}))}catch(e){return Promise.reject(e)}};e.get("/",function(e,t){try{var r,n,o=function(o){return r?o:O(function(){return Promise.resolve(d(n)).then(function(r){var n;"ord-fs/json"!==r.type||e.query.raw?H(r,t,!1):null==(n=e.res)||n.redirect("index.html")})},function(){t.render("pages/404")})},i=O(function(){return Promise.resolve(w(e.hostname)).then(function(e){n=e})},function(){t.render("pages/index"),r=1});return Promise.resolve(i&&i.then?i.then(o):o(i))}catch(e){return Promise.reject(e)}}),e.get("/v1/:network/block/latest",function(e,t,r){try{var n=O(function(){var r=t.json;return Promise.resolve(B(e.params.network)).then(function(e){r.call(t,e)})},function(e){r(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}),e.get("/v1/:network/block/height/:height",function(e,t,r){try{var n=O(function(){var r=t.json;return Promise.resolve(k(e.params.network,parseInt(e.params.height,10))).then(function(e){r.call(t,e)})},function(e){r(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}),e.get("/v1/:network/block/hash/:hash",function(e,t,r){try{var n=O(function(){var r=t.json;return Promise.resolve(b(e.params.network,e.params.hash)).then(function(e){r.call(t,e)})},function(e){r(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}),e.get("/v1/:network/tx/:txid",function(e,t){try{t.set("Content-type","application/octet-stream");var r=t.send;return Promise.resolve(y(e.params.network,e.params.txid)).then(function(e){r.call(t,e)})}catch(e){return Promise.reject(e)}}),e.get("/:filename",function(e,r,n){try{var o,i=e.params.filename;return Promise.resolve(O(function(){function n(e){if(o)return e;H(c,r,u)}var s,c,u=!0,a=O(function(){return Promise.resolve(d(i,e.query.meta)).then(function(t){var r;"ord-fs/json"!==(c=t).type||e.query.raw||(null==(r=e.res)||r.redirect("/"+i+"/index.html"),o=1)})},function(r){return console.error("Outpoint Error",i,r.message),Promise.resolve(w(e.hostname)).then(function(r){return s=r,Promise.resolve(d(s)).then(function(r){var n=JSON.parse(r.data.toString("utf8"));if(!n[i])throw new t;return s=n[i].slice(6),Promise.resolve(d(s,e.query.meta)).then(function(e){c=e,u=!1})})})});return a&&a.then?a.then(n):n(a)},function(e){n(e)}))}catch(e){return Promise.reject(e)}}),e.get("/content/:pointer",function(e,t,r){try{var n=e.params.pointer;return Promise.resolve(O(function(){return Promise.resolve(d(n,e.query.meta)).then(function(r){var o;"ord-fs/json"!==r.type||e.query.raw?H(r,t,!0):null==(o=e.res)||o.redirect("/"+n+"/index.html")})},function(e){r(e)}))}catch(e){return Promise.reject(e)}}),e.get("/preview/:b64HtmlData",function(e,t,r){try{try{var n=Buffer.from(e.params.b64HtmlData,"base64").toString("utf8");t.render("pages/preview",{htmlData:n})}catch(e){r(e)}return Promise.resolve()}catch(e){return Promise.reject(e)}}),e.get("/:pointer/:filename",r),e.get("/content/:pointer/:filename",r)}process.env.BITCOIN_HOST&&(S=new p("bsv",process.env.BITCOIN_HOST||"",process.env.BITCOIN_PORT||"8332",process.env.BITCOIN_USER||"",process.env.BITCOIN_PASS||"")),process.env.BTC_HOST&&(x=new p("btc",process.env.BTC_HOST||"",process.env.BTC_PORT||"8332",process.env.BTC_USER||"",process.env.BTC_PASS||""));export{N as RegisterRoutes,b as getBlockByHash,k as getBlockByHeight,B as getLatestBlock,y as getRawTx,d as loadInscription,w as loadPointerFromDNS,I as parseScript};
//# sourceMappingURL=index.module.js.map
