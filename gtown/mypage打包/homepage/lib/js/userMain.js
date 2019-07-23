(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    'use strict';

    var console = window.console || { log: function () {} };

    function CropAvatar($element) {
        this.$container = $element;
        this.$imgFalg = false;
        this.$avatarView = this.$container.find('.avatar-view');
        this.$avatar = this.$avatarView.find('img');
        this.$avatarModal = this.$container.find('#avatar-modal');
        this.$avatar_logo = $('.avatar_logo');
        this.$backdropModal = this.$container.find('.modal-backdrop');

        this.$avatarForm = this.$avatarModal.find('.avatar-form');
        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarData = this.$avatarForm.find('.avatarData');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');
        this.$avatarSave = this.$avatarForm.find('.avatar-save');
        this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');
        this.$close = this.$avatarModal.find('.close');
        this.init();
    }

    CropAvatar.prototype = {
        constructor: CropAvatar,

        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;
            this.initTooltip();
            this.initModal();
            this.addListener();
        },

        addListener: function () {
            this.$avatar_logo.on('click', $.proxy(this.cropLogo, this));
            this.$avatarView.on('click', $.proxy(this.click, this));
            this.$avatarInput.on('change', $.proxy(this.change, this));
            this.$avatarForm.on('submit', $.proxy(this.submit, this));
            this.$avatarBtns.on('click', $.proxy(this.rotate, this));
            this.$close.on('click', $.proxy(this.close, this));
        },

        initTooltip: function () {
            this.$avatarView.tooltip({
                placement: 'bottom'
            });
        },

        initModal: function () {
            this.$avatarModal.modal({
                show: false
            });
            this.$backdropModal.modal({
                show: false
            });
        },

        initPreview: function () {
            var url = this.$avatar.attr('src');
            this.$avatarPreview.html('<img src="' + url + '">');
        },

        click: function () {
            this.$avatarModal.removeClass('hide').removeClass('show').addClass('show');
            this.$backdropModal.removeClass('hide').removeClass('show').addClass('show');
            this.$backdropModal.removeClass('hide').removeClass('show').addClass('show');
            this.initPreview();
        },
        close: function () {
            this.cropDone();
        },
        change: function () {
            var files;
            var file;

            if (this.support.datauri) {
                files = this.$avatarInput.prop('files');
                if (files.length > 0) {
                    file = files[0];
                    if (this.isImageFile(file)) {
                        if (this.url) {
                            URL.revokeObjectURL(this.url);
                        }
                        this.url = URL.createObjectURL(file);
                        this.startCropper();
                    }
                }
            } else {
                file = this.$avatarInput.val();
                if (this.isImageFile(file)) {
                    this.syncUpload();
                }
            }
        },

        submit: function () {
            if (!this.$avatarInput.val()) {
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },

        rotate: function (e) {
            var data;

            if (this.active) {
                data = $(e.target).data();

                if (data.method) {
                    this.$img.cropper(data.method, data.option);
                }
            }
        },

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        startCropper: function () {
            var _this = this;

            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: 1 / 1,
                    preview: this.$avatarPreview.selector,
                    crop: function (e) {
                        var json = [
                            '{"x":' + e.x,
                            '"y":' + e.y,
                            '"height":' + e.height,
                            '"width":' + e.width,
                            '"rotate":' + e.rotate + '}'
                        ].join();
                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;
            }

            this.$avatarModal.one('hidden.bs.modal', function () {
                _this.$avatarPreview.empty();
                _this.stopCropper();
            });
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            var url = this.$avatarForm.attr('action');
            var data = new FormData(this.$avatarForm[0]);
            var _this = this;
            $.ajax(url, {
                type: 'post',
                data: data,
                enctype:"multipart/form-data",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function (request) {
                    if(url.indexOf('/wx/userInfo') == -1 && url.indexOf('.json') == -1){
                        var _userId = sessionStorage.getItem('userId');
                        if(_userId){
                            request.setRequestHeader("token", _userId.split('|')[0]);
                        }
                        var shaUserId = sessionStorage.getItem('shaUserId');
                        if(shaUserId){
                            request.setRequestHeader("shaUserId", shaUserId);
                        }
                    }
                    commentJs.showLoading('上传中...');
                },
                success: function (data) {
                    commentJs.hideLoading();
                    if (data.httpCode == 200) {
                        this.$imgFalg = true;
                        _this.url = data.result;
                        $('.upLogo').attr('src',_this.url);
                        if (_this.support.datauri) {
                            _this.cropDone();
                        } else {
                            $('.upLogo').attr('src',_this.url);
                            _this.startCropper();
                        }
                        _this.$avatarInput.val('');
                    }else{
                        commentJs.toastToptip(data.msg,'error');
                    }
                },
                error: function () {
                    this.$imgFalg = false;
                    commentJs.hideLoading();
                    commentJs.toastToptip('上传失败，请重新上传','error');
                },
                complete: function () {
                    commentJs.hideLoading();
                }
            });
        },

        syncUpload: function () {
            this.$avatarSave.click();
        },
        cropDone: function () {
            this.$avatarForm.get(0).reset();
            if(this.$imgFalg){
                this.$avatar.attr('src', this.url);
            }
            this.stopCropper();
            this.$backdropModal.removeClass('in');
            this.$avatarModal.removeClass('hide').removeClass('show').addClass('hide');
            this.$backdropModal.removeClass('hide').removeClass('show').addClass('hide');
        },
        cropLogo: function () {
            /*if(!this.url) return;
            var queryData = {id:$('.upLogo').attr('id'),logo:this.url};
            var suc = function (data) {
                commentJs.toastTitle('修改成功','');
            }
            o.userSettingModify(queryData,suc);*/
        },
    };

    $(function () {
        return new CropAvatar($('#crop-avatar'));
    });

});