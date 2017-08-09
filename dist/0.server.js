exports.ids = [0];
exports.modules = {

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyView", function() { return LazyView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyModule", function() { return LazyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var LazyView = (function () {
    function LazyView() {
    }
    LazyView = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'lazy-view',
            template: "<h3 style=\"color: #f00\">i'm lazy</h3>"
        })
    ], LazyView);
    return LazyView;
}());

var LazyModule = (function () {
    function LazyModule() {
    }
    LazyModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [LazyView],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild([
                    { path: '', component: LazyView, pathMatch: 'full' }
                ])
            ]
        })
    ], LazyModule);
    return LazyModule;
}());

//# sourceMappingURL=lazy.module.js.map

/***/ })

};;
//# sourceMappingURL=0.server.js.map