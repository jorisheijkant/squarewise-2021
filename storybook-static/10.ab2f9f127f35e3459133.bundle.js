(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{548:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(9);var components=__webpack_require__(1196),slices_AlternateGridvue_type_script_lang_js_={props:__webpack_require__(1195).a,components:{PsEyebrow:components.d,PsDescription:components.c,PsTitle:components.g,PsSection:components.e},computed:{noImage:function noImage(_ref){return null===_ref.slice.primary.optional_image},imageLeft:function imageLeft(_ref2){return"left"===_ref2.slice.primary.image_side},firstColSpan:function firstColSpan(_ref3){_ref3.slice,_ref3.noImage;var imageLeft=_ref3.imageLeft,theme=_ref3.theme;return theme&&theme.grid&&theme.grid.spans&&theme.grid.spans.length>0?"span-".concat(theme.grid.spans[0]):imageLeft?"span-1-5":"span-8-12"},secondColSpan:function secondColSpan(_ref4){_ref4.slice;var noImage=_ref4.noImage,imageLeft=_ref4.imageLeft,theme=_ref4.theme;return theme&&theme.grid&&theme.grid.spans&&theme.grid.spans.length>1?"span-".concat(theme.grid.spans[1]):noImage?"span-1-10":imageLeft?"span-7-12":"span-1-6"}}},componentNormalizer=__webpack_require__(42);const __vuedocgen_export_0=Object(componentNormalizer.a)(slices_AlternateGridvue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("ps-section",_vm._b({attrs:{classAttr:"ps-alternate ps-alternate--grid"}},"ps-section",_vm.theme.wrapper,!1),[_c("div",{staticClass:"ps__wrap"},[_c("div",{staticClass:"ps__main grid grid--12 grid--align-center"},[_vm.slice.primary.optional_image?_c("div",{class:_vm.firstColSpan},[_c("div",{staticClass:"ps__img"},[_c("prismic-image",_vm._b({attrs:{field:_vm.slice.primary.optional_image}},"prismic-image",_vm.theme.image,!1))],1)]):_vm._e(),_vm._v(" "),_c("div",{class:_vm.secondColSpan},[_c("div",{staticClass:"ps__head ps__head--left"},[_c("header",{staticClass:"ps__header"},[_c("ps-eyebrow",{attrs:{theme:_vm.theme.eyebrow,align:_vm.theme.align,color:_vm.theme.color}},[_vm._v("\n              "+_vm._s(_vm.$prismic.asText(_vm.slice.primary.eyebrow_headline))+"\n            ")]),_vm._v(" "),_c("ps-title",{attrs:{field:_vm.slice.primary.title,theme:_vm.theme.title,align:_vm.theme.align,color:_vm.theme.color}})],1),_vm._v(" "),_c("ps-description",{attrs:{field:_vm.slice.primary.description,theme:_vm.theme.description,align:_vm.theme.align,color:_vm.theme.color}})],1),_vm._v(" "),_vm.slice.items.length?_c("div",{staticClass:"ps-alternate__modules"},_vm._l(_vm.slice.items,(function(item,i){return _c("div",_vm._b({key:"grid-item-"+(i+1),staticClass:"ps-alternate__module"},"div",_vm.theme.item,!1),[item.optional_icon?_c("prismic-image",_vm._b({staticClass:"ps-alternate__module__img",attrs:{field:item.optional_icon}},"prismic-image",_vm.theme.icon,!1)):_vm._e(),_vm._v(" "),_c("div",{staticClass:"ps-alternate__module__content"},[_c("prismic-rich-text",{attrs:{field:item.title}}),_vm._v(" "),_c("prismic-rich-text",{attrs:{field:item.description}})],1)],1)})),0):_vm._e()])])])])}),[],!1,null,null,null).exports;__webpack_exports__.default=__vuedocgen_export_0;__vuedocgen_export_0.__docgenInfo={exportName:"default",displayName:"AlternateGrid",description:"",tags:{}}}}]);
//# sourceMappingURL=10.ab2f9f127f35e3459133.bundle.js.map