define([
    'jquery',
    'mage/utils/wrapper'
], function ($, wrapper) {
    'use strict';

    return function(targetModule){
        var updatePrice = targetModule.prototype._UpdatePrice;
        targetModule.prototype.configurableSku = $('div.product-info-main .sku .value').html();
        var updatePriceWrapper = wrapper.wrap(updatePrice, function(original){
            var allSelected = true;
            for(var i = 0; i<this.options.jsonConfig.attributes.length;i++){
                if (!$('div.product-info-main .product-options-wrapper .swatch-attribute.' + this.options.jsonConfig.attributes[i].code).attr('data-option-selected')){
                    allSelected = false;
                }
            }
            var simpleSku = this.configurableSku;
            if (allSelected){
                var products = this._CalcProducts();
                localStorage.setItem("currentproducttireprice", products);
            }
            $('div.product-info-main .sku .value').html(simpleSku);
            return original();
        });

        targetModule.prototype._UpdatePrice = updatePriceWrapper;
        return targetModule;
    };
});
