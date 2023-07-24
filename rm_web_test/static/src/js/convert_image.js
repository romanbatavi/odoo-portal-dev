odoo.define('rm_web_test.insert_image', function (require) {
    'use strict';
    var core = require('web.core');
    var publicWidget = require('web.public.widget');
    var ajax = require('web.ajax');
    var QWeb = core.qweb;

    publicWidget.registry.UpdatePicture = publicWidget.Widget.extend({
        selector: '.class-create-product',
        events : {'change #wizard-picture': '_onChangeUpdate'},
        
        start: function () {
            var def = this._super.apply(this, arguments);
            return def;
        },
        
        _onChangeUpdate(ev) {   
            var reader = new FileReader();
            var test = this.$('#wizardPicturePreview')
            var base64_pic = this.$('#base64_picture')

            if (ev.target.files && ev.target.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    test.attr('src', e.target.result).fadeIn('slow');
                    var data = reader.result;
                    var img_base64 = data.split(",")[1];
                    console.log("=======================================================", img_base64)
                    document.querySelector("#base64_picture").value = img_base64;
                    base64_pic.val = img_base64
                };
                reader.readAsDataURL(ev.target.files[0]);
            }
        },
    });
});