(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e1e3099"],{"0079":function(e,t,i){"use strict";var n=i("4c37"),a=i.n(n);a.a},"05ae":function(e,t,i){"use strict";var n=i("0882"),a=i.n(n);a.a},"0882":function(e,t,i){},2381:function(e,t,i){},"3c32":function(e,t,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("2381")},"417e":function(e,t,i){"use strict";var n=i("d282"),a=i("ad06"),s=i("78eb"),c=i("9884"),o=i("ea8e"),r=function(e){var t=e.parent,i=e.bem,n=e.role;return{mixins:[Object(c["a"])(t),s["a"]],props:{name:null,value:null,disabled:Boolean,iconSize:[Number,String],checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"},bindGroup:{type:Boolean,default:!0}},computed:{disableBindRelation:function(){return!this.bindGroup},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},direction:function(){return this.parent&&this.parent.direction||null},iconStyle:function(){var e=this.checkedColor||this.parent&&this.parent.checkedColor;if(e&&this.checked&&!this.isDisabled)return{borderColor:e,backgroundColor:e}},tabindex:function(){return this.isDisabled||"radio"===n&&!this.checked?-1:0}},methods:{onClick:function(e){var t=this,i=e.target,n=this.$refs.icon,a=n===i||n.contains(i);this.isDisabled||!a&&this.labelDisabled?this.$emit("click",e):(this.toggle(),setTimeout((function(){t.$emit("click",e)})))},genIcon:function(){var e=this.$createElement,t=this.checked,n=this.iconSize||this.parent&&this.parent.iconSize;return e("div",{ref:"icon",class:i("icon",[this.shape,{disabled:this.isDisabled,checked:t}]),style:{fontSize:Object(o["a"])(n)}},[this.slots("icon",{checked:t})||e(a["a"],{attrs:{name:"success"},style:this.iconStyle})])},genLabel:function(){var e=this.$createElement,t=this.slots();if(t)return e("span",{class:i("label",[this.labelPosition,{disabled:this.isDisabled}])},[t])}},render:function(){var e=arguments[0],t=[this.genIcon()];return"left"===this.labelPosition?t.unshift(this.genLabel()):t.push(this.genLabel()),e("div",{attrs:{role:n,tabindex:this.tabindex,"aria-checked":String(this.checked)},class:i([{disabled:this.isDisabled,"label-disabled":this.labelDisabled},this.direction]),on:{click:this.onClick}},[t])}}},l=Object(n["a"])("checkbox"),u=l[0],d=l[1];t["a"]=u({mixins:[r({bem:d,role:"checkbox",parent:"vanCheckbox"})],computed:{checked:{get:function(){return this.parent?-1!==this.parent.value.indexOf(this.name):this.value},set:function(e){this.parent?this.setParentValue(e):this.$emit("input",e)}}},watch:{value:function(e){this.$emit("change",e)}},methods:{toggle:function(e){var t=this;void 0===e&&(e=!this.checked),clearTimeout(this.toggleTask),this.toggleTask=setTimeout((function(){t.checked=e}))},setParentValue:function(e){var t=this.parent,i=t.value.slice();if(e){if(t.max&&i.length>=t.max)return;-1===i.indexOf(this.name)&&(i.push(this.name),t.$emit("input",i))}else{var n=i.indexOf(this.name);-1!==n&&(i.splice(n,1),t.$emit("input",i))}}}})},"4c37":function(e,t,i){},"5c9c":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"sign-up"}},[i("div",{staticClass:"firStep"},[i("van-nav-bar",{attrs:{border:!1,placeholder:"","left-arrow":""},on:{"click-left":function(t){return e.$router.history.go(-1)}}}),i("div",{staticClass:"content"},[i("h1",[e._v("注册")]),i("div",{staticClass:"content-inner"},[i("div",{staticClass:"label-input"},[i("label",{staticClass:"label"},[e._v("账号")]),i("field",{attrs:{placeholder:"请输入手机号码",type:"tel",clearable:""},model:{value:e.phoneNumber,callback:function(t){e.phoneNumber=t},expression:"phoneNumber"}})],1),i("div",{staticClass:"label-input"},[i("label",{staticClass:"label"},[e._v("密码")]),i("Field",{attrs:{type:e.inputTypeCon,placeholder:"输入8-16位英文与字母构成的密码"},model:{value:e.valuePwd,callback:function(t){e.valuePwd=t},expression:"valuePwd"}})],1),i("div",{staticClass:"label-input"},[i("label",{staticClass:"label"},[e._v("重复密码")]),i("Field",{attrs:{type:e.inputTypeCon,placeholder:"输入8-16位英文与字母构成的密码"},model:{value:e.valuePwdTow,callback:function(t){e.valuePwdTow=t},expression:"valuePwdTow"}})],1)]),i("Button",{staticClass:"button",attrs:{color:"#1989fa",disabled:!(e.phoneTest&&e.valuePwd),loading:e.loginLoading,"loading-text":"登陆中",block:"",type:"primary"},on:{click:e.submitButton}},[e._v("注册")]),i("van-row",{staticClass:"tipsBox",attrs:{type:"flex",align:"center",justify:"center"}},[i("checkbox",{staticClass:"checkbox",attrs:{"checked-color":"#1989fa","icon-size":"0.38rem"},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),i("p",[e._v("我已阅读并同意"),i("router-link",{staticClass:"privacy",attrs:{to:"/privacy"}},[e._v("《隐私政策》")]),e._v("与"),i("router-link",{staticClass:"privacy",attrs:{to:"/agreement"}},[e._v("《用户协议》")])],1)],1),i("p",{staticClass:"switchPage"},[i("router-link",{attrs:{to:"/sign-up"}},[e._v("已有账号")])],1)],1)],1)])},a=[],s=(i("96cf"),i("1da1")),c=(i("3c32"),i("417e")),o=(i("be7f"),i("565f")),r=(i("66b9"),i("b650")),l=i("c72e"),u=i.n(l),d={name:"Login",components:{Button:r["a"],Field:o["a"],Checkbox:c["a"]},data:function(){return{phoneNumber:"",eyeCon:!0,loginLoading:!1,valuePwd:"",valuePwdTow:"",checked:!1}},computed:{phoneTest:function(){var e=/^(((13[0-9])|(14[5-7])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/,t=this.phoneNumber;return!!e.test(t)},inputTypeCon:function(){return this.eyeCon?"password":"text"}},mounted:function(){},methods:{submitButton:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,e.checked){t.next=4;break}return e.$toast("请阅读并同意《隐私政策》与《用户协议》"),t.abrupt("return",!1);case 4:if(!i.test(e.valuePwd)){t.next=15;break}return e.loginLoading=!0,n=new u.a.User,n.setUsername(e.phoneNumber),n.setPassword(e.valuePwd),n.setMobilePhoneNumber(e.phoneNumber),t.next=12,n.signUp().then((function(){e.$toast("注册成功，稍后自动跳转"),setTimeout((function(){e.$router.push("/my")}),2e3)}),(function(t){e.$toast("网络异常请稍后重试")}));case 12:e.loginLoading=!1,t.next=16;break;case 15:e.$toast("请输入8-16位密码，需包含字母及数字");case 16:case"end":return t.stop()}}),t)})))()}}},h=d,b=(i("0079"),i("05ae"),i("2877")),p=Object(b["a"])(h,n,a,!1,null,"db8385ce",null);t["default"]=p.exports},"78eb":function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var n={inject:{vanField:{default:null}},watch:{value:function(){var e=this.vanField;e&&(e.resetValidation(),e.validateWithTrigger("onChange"))}},created:function(){var e=this.vanField;e&&!e.children&&(e.children=this)}}}}]);