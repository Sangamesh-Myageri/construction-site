/*!
 * jQuery Validation Plugin v1.19.3
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2021 Jörn Zaefferer
 * Released under the MIT license
 */ !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(c){if(!this.length){c&&c.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.");return}var b=a.data(this[0],"validator");return b||(this.attr("novalidate","novalidate"),b=new a.validator(c,this[0]),a.data(this[0],"validator",b),b.settings.onsubmit&&(this.on("click.validate",":submit",function(c){b.submitButton=c.currentTarget,a(this).hasClass("cancel")&&(b.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(b.cancelSubmit=!0)}),this.on("submit.validate",function(d){function c(){var c,e;return b.submitButton&&(b.settings.submitHandler||b.formSubmitted)&&(c=a("<input type='hidden'/>").attr("name",b.submitButton.name).val(a(b.submitButton).val()).appendTo(b.currentForm)),!b.settings.submitHandler||!!b.settings.debug||(e=b.settings.submitHandler.call(b,b.currentForm,d),c&&c.remove(),void 0!==e&&e)}return(b.settings.debug&&d.preventDefault(),b.cancelSubmit)?(b.cancelSubmit=!1,c()):b.form()?b.pendingRequest?(b.formSubmitted=!0,!1):c():(b.focusInvalid(),!1)}))),b},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){(b=c.element(this)&&b)||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(i,d){var g,h,e,c,f,j,b=this[0],k=void 0!==this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=b&&(!b.form&&k&&(b.form=this.closest("form")[0],b.name=this.attr("name")),null!=b.form)){if(i)switch(h=(g=a.data(b.form,"validator").settings).rules,e=a.validator.staticRules(b),i){case"add":a.extend(e,a.validator.normalizeRule(d)),delete e.messages,h[b.name]=e,d.messages&&(g.messages[b.name]=a.extend(g.messages[b.name],d.messages));break;case"remove":if(!d)return delete h[b.name],e;return j={},a.each(d.split(/\s/),function(b,a){j[a]=e[a],delete e[a]}),j}return(c=a.validator.normalizeRules(a.extend({},a.validator.classRules(b),a.validator.attributeRules(b),a.validator.dataRules(b),a.validator.staticRules(b)),b)).required&&(f=c.required,delete c.required,c=a.extend({required:f},c)),c.remote&&(f=c.remote,delete c.remote,c=a.extend(c,{remote:f})),c}}});var b,d=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};a.extend(a.expr.pseudos||a.expr[":"],{blank:function(b){return!d(""+a(b).val())},filled:function(c){var b=a(c).val();return null!==b&&!!d(""+b)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(c,b){return 1===arguments.length?function(){var b=a.makeArray(arguments);return b.unshift(c),a.validator.format.apply(this,b)}:(void 0===b||(arguments.length>2&&b.constructor!==Array&&(b=a.makeArray(arguments).slice(1)),b.constructor!==Array&&(b=[b]),a.each(b,function(a,b){c=c.replace(new RegExp("\\{"+a+"\\}","g"),function(){return b})})),c)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){!this.checkable(a)&&(a.name in this.submitted||!this.optional(a))&&this.element(a)},onkeyup:function(b,c){(9!==c.which||""!==this.elementValue(b))&& -1===a.inArray(c.keyCode,[16,17,18,20,35,36,37,38,39,40,45,144,225])&&(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var b,d=this.currentForm,e=this.groups={};function c(c){var g=void 0!==a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");if(!this.form&&g&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name")),d===this.form){var e=a.data(this.form,"validator"),f="on"+c.type.replace(/^validate/,""),b=e.settings;b[f]&&!a(this).is(b.ignore)&&b[f].call(e,this,c)}}a.each(this.settings.groups,function(c,b){"string"==typeof b&&(b=b.split(/\s/)),a.each(b,function(b,a){e[a]=c})}),b=this.settings.rules,a.each(b,function(c,d){b[c]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",c).on("click.validate","select, option, [type='radio'], [type='checkbox']",c),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(e){var c,g,f=this.clean(e),b=this.validationTargetFor(f),h=this,d=!0;return void 0===b?delete this.invalid[f.name]:(this.prepareElement(b),this.currentElements=a(b),(g=this.groups[b.name])&&a.each(this.groups,function(a,c){c===g&&a!==b.name&&(f=h.validationTargetFor(h.clean(h.findByName(a))))&&f.name in h.invalid&&(h.currentElements.push(f),d=h.check(f)&&d)}),c=!1!==this.check(b),d=d&&c,c?this.invalid[b.name]=!1:this.invalid[b.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(e).attr("aria-invalid",!c)),d},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(b){var a;if(this.settings.unhighlight)for(a=0;b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,""),this.findByName(b[a].name).removeClass(this.settings.validClass);else b.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&& !1!==a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name"),e=void 0!==a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=a(this).closest("form")[0],this.name=d),this.form===b.currentForm&& !(d in c)&&!!b.objectLength(a(this).rules())&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(c){var b,f,d=a(c),e=c.type,g=void 0!==d.attr("contenteditable")&&"false"!==d.attr("contenteditable");return"radio"===e||"checkbox"===e?this.findByName(c.name).filter(":checked").val():"number"===e&& void 0!==c.validity?c.validity.badInput?"NaN":d.val():(b=g?d.text():d.val(),"file"===e)?"C:\\fakepath\\"===b.substr(0,12)?b.substr(12):(f=b.lastIndexOf("/"))>=0||(f=b.lastIndexOf("\\"))>=0?b.substr(f+1):b:"string"==typeof b?b.replace(/\r/g,""):b},check:function(b){b=this.validationTargetFor(this.clean(b));var e,f,d,g,c=a(b).rules(),k=a.map(c,function(b,a){return a}).length,i=!1,j=this.elementValue(b);for(f in"function"==typeof c.normalizer?g=c.normalizer:"function"==typeof this.settings.normalizer&&(g=this.settings.normalizer),g&&(j=g.call(b,j),delete c.normalizer),c){d={method:f,parameters:c[f]};try{if(e=a.validator.methods[f].call(this,j,b,d.parameters),"dependency-mismatch"===e&&1===k){i=!0;continue}if(i=!1,"pending"===e){this.toHide=this.toHide.not(this.errorsFor(b));return}if(!e)return this.formatAndAdd(b,d),!1}catch(h){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+d.method+"' method.",h),h instanceof TypeError&&(h.message+=".  Exception occurred when checking element "+b.id+", check the '"+d.method+"' method."),h}}if(!i)return this.objectLength(c)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(b,c){var a=this.settings.messages[b];return a&&(a.constructor===String?a:a[c])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(d,b){"string"==typeof b&&(b={method:b});var c=this.findDefined(this.customMessage(d.name,b.method),this.customDataMessage(d,b.method),!this.settings.ignoreTitle&&d.title||void 0,a.validator.messages[b.method],"<strong>Warning: No message defined for "+d.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof c?c=c.call(this,b.parameters,d):e.test(c)&&(c=a.validator.format(c.replace(e,"{$1}"),b.parameters)),c},formatAndAdd:function(a,c){var b=this.defaultMessage(a,c);this.errorList.push({message:b,element:a,method:c.method}),this.errorMap[a.name]=b,this.submitted[a.name]=b},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,c,b;for(a=0;this.errorList[a];a++)b=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass),this.showLabel(b.element,b.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,c=this.validElements();c[a];a++)this.settings.unhighlight.call(this,c[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(c,g){var d,j,f,i,b=this.errorsFor(c),h=this.idOrName(c),e=a(c).attr("aria-describedby");b.length?(b.removeClass(this.settings.validClass).addClass(this.settings.errorClass),b.html(g)):(d=b=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(g||""),this.settings.wrapper&&(d=b.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(c)):d.insertAfter(c),b.is("label")?b.attr("for",h):0===b.parents("label[for='"+this.escapeCssMeta(h)+"']").length&&(f=b.attr("id"),e?e.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(e+=" "+f):e=f,a(c).attr("aria-describedby",e),(j=this.groups[c.name])&&(i=this,a.each(i.groups,function(c,d){d===j&&a("[name='"+i.escapeCssMeta(c)+"']",i.currentForm).attr("aria-describedby",b.attr("id"))})))),!g&&this.settings.success&&(b.text(""),"string"==typeof this.settings.success?b.addClass(this.settings.success):this.settings.success(b,c)),this.toShow=this.toShow.add(b)},errorsFor:function(c){var d=this.escapeCssMeta(this.idOrName(c)),e=a(c).attr("aria-describedby"),b="label[for='"+d+"'], label[for='"+d+"'] *";return e&&(b=b+", #"+this.escapeCssMeta(e).replace(/\s+/g,", #")),this.errors().filter(b)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(c,b){switch(b.nodeName.toLowerCase()){case"select":return a("option:selected",b).length;case"input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return c.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{boolean:function(a){return a},string:function(b,c){return!!a(b,c.form).length},function:function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(c,b){return b="string"==typeof b&&b||"remote",a.data(c,"previousValue")||a.data(c,"previousValue",{old:null,valid:!0,message:this.defaultMessage(c,{method:b})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(c){var d={},b=a(c).attr("class");return b&&a.each(b.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(d,a.validator.classRuleSettings[this])}),d},normalizeAttributeRule:function(d,b,c,a){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&isNaN(a=Number(a))&&(a=void 0),a||0===a?d[c]=a:b===c&&"range"!==b&&(d[c]=!0)},attributeRules:function(e){var c,b,d={},f=a(e),g=e.getAttribute("type");for(c in a.validator.methods)"required"===c?(""===(b=e.getAttribute(c))&&(b=!0),b=!!b):b=f.attr(c),this.normalizeAttributeRule(d,g,c,b);return d.maxlength&&/-1|2147483647|524288/.test(d.maxlength)&&delete d.maxlength,d},dataRules:function(d){var b,c,e={},f=a(d),g=d.getAttribute("type");for(b in a.validator.methods)""===(c=f.data("rule"+b.charAt(0).toUpperCase()+b.substring(1).toLowerCase()))&&(c=!0),this.normalizeAttributeRule(e,g,b,c);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(e,d){if(!1===d){delete b[e];return}if(d.param||d.depends){var f=!0;switch(typeof d.depends){case"string":f=!!a(d.depends,c.form).length;break;case"function":f=d.depends.call(c,c)}f?b[e]=void 0===d.param||d.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[e])}}),a.each(b,function(d,a){b[d]="function"==typeof a&&"normalizer"!==d?a(c):a}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var a;b[this]&&(Array.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(a=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(a[0]),Number(a[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(c,b,e){if(!this.depend(e,b))return"dependency-mismatch";if("select"===b.nodeName.toLowerCase()){var d=a(b).val();return d&&d.length>0}return this.checkable(b)?this.getLength(c,b)>0:null!=c&&c.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:(b=!1,function(a,c){return!b&&(b=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(c)||!/Invalid|NaN/.test(new Date(a).toString())}),dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c},maxlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d<=c},rangelength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c[0]&&d<=c[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,c,b){return this.optional(c)||a>=b[0]&&a<=b[1]},step:function(c,d,e){var f,b=a(d).attr("type"),j=new RegExp("\\b"+b+"\\b"),k=b&&!j.test("text,number,range"),g=function(b){var a=(""+b).match(/(?:\.(\d+))?$/);return a&&a[1]?a[1].length:0},h=function(a){return Math.round(a*Math.pow(10,f))},i=!0;if(k)throw new Error("Step attribute on input type "+b+" is not supported.");return f=g(e),(g(c)>f||h(c)%h(e)!=0)&&(i=!1),this.optional(d)||i},equalTo:function(c,e,d){var b=a(d);return this.settings.onfocusout&&b.not(".validate-equalTo-blur").length&&b.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(e).valid()}),c===b.val()},remote:function(g,b,c,d){if(this.optional(b))return"dependency-mismatch";d="string"==typeof d&&d||"remote";var h,i,f,e=this.previousValue(b,d);return(this.settings.messages[b.name]||(this.settings.messages[b.name]={}),e.originalMessage=e.originalMessage||this.settings.messages[b.name][d],this.settings.messages[b.name][d]=e.message,c="string"==typeof c&&{url:c}||c,f=a.param(a.extend({data:g},c.data)),e.old===f)?e.valid:(e.old=f,h=this,this.startRequest(b),(i={})[b.name]=g,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+b.name,dataType:"json",data:i,context:h.currentForm,success:function(a){var c,i,j,f=!0===a||"true"===a;h.settings.messages[b.name][d]=e.originalMessage,f?(j=h.formSubmitted,h.resetInternals(),h.toHide=h.errorsFor(b),h.formSubmitted=j,h.successList.push(b),h.invalid[b.name]=!1,h.showErrors()):(c={},i=a||h.defaultMessage(b,{method:d,parameters:g}),c[b.name]=e.message=i,h.invalid[b.name]=!0,h.showErrors(c)),e.valid=f,h.stopRequest(b,f)}},c)),"pending")}}});var c,e={};return a.ajaxPrefilter?a.ajaxPrefilter(function(b,d,c){var a=b.port;"abort"===b.mode&&(e[a]&&e[a].abort(),e[a]=c)}):(c=a.ajax,a.ajax=function(b){var f=("mode"in b?b:a.ajaxSettings).mode,d=("port"in b?b:a.ajaxSettings).port;return"abort"===f?(e[d]&&e[d].abort(),e[d]=c.apply(this,arguments),e[d]):c.apply(this,arguments)}),a})