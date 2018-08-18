(function ($) {

    $.fn.anmModal = function (userOptions) {

        var options = $.extend({

            onStart: "",                // set custom call before popin is inited..
            onFinish: "",               // ..and after it was closed
            wrapperBgColor: "#000",     // color of wrapper modal bg
            wrapperOpacity: 0.5,        // opacity of wrapper modal
            speed: 600,                 // animation speed
            entrance: "fade",           // effect entrance


        }, userOptions)

        var enterModal = function (modal, enter, wrapper) {

            var wh = $(window).height();        //windiw height
            var ww = $(window).width();         //window width
            var mh = $(modal).height();         //modal height
            var mw = $(modal).width();          //modal width

            var topPos = ((wh - mh) / 2);
            var leftPos = ((ww - mw) / 2);

            var closeBtn = $("<div>").addClass("closeBtn");

            modal.append(closeBtn);
            switch (enter) {
                case "top":
                    modal.css({ top: -1 * wh, left: leftPos, display: "block" });
                    modal.animate({ top: topPos, left: leftPos });

                    closeBtn.click(function () {
                        modal.animate({ top: -1 * wh, left: leftPos });
                        wrapper.fadeOut(options.speed);
                    })

                case "bottom":
                    modal.css({ top: 2 * wh, left: leftPos });
                    modal.animate({ top: topPos, left: leftPos });

                    closeBtn.click(function () {
                        modal.animate({ top: 2 * wh, left: leftPos, display: "block" });
                        wrapper.fadeOut(options.speed);
                    })

                case "left":
                    modal.css({ top: topPos, left: -1 * ww, display: "block" });
                    modal.animate({ top: topPos, left: leftPos });

                    closeBtn.click(function () {
                        modal.animate({ top: topPos, left: -1 * ww, display: "block" });
                        wrapper.fadeOut(options.speed);
                    })

                case "right":
                    modal.css({ top: topPos, left: 2 * ww, display: "block" });
                    modal.animate({ top: topPos, left: leftPos });

                    closeBtn.click(function () {
                        modal.animate({ top: topPos, left: 2 * ww, display: "block" });
                        wrapper.fadeOut(options.speed);
                    })

                case "fade":
                    modal.css({ top: topPos, left: leftPos });
                    modal.fadeIn(options.speed);

                    closeBtn.click(function () {
                        modal.fadeOut(options.speed);
                        wrapper.fadeOut(options.speed);
                    })

                default:
                    modal.css({ top: topPos, left: leftPos });
                    modal.fadeIn(options.speed);

                    closeBtn.click(function () {
                        modal.fadeOut(options.speed);
                        wrapper.fadeOut(options.speed);
                    })

            }

        }

        $(document).ready(function () {

            var btnModal = $("span[data-modal]");
            var wrapperModal = $("<div>").addClass("wrapperModal").css({
                backgroundColor: options.wrapperBgColor,
                opacity: options.wrapperOpacity
            });

            btnModal.each(function () {

                var mBtn = $(this);
                var mBox = $("#" + mBtn.attr("data-modal"));


                mBtn.click(function (e) {
                    e.preventDefault();


                    $(mBox).before(wrapperModal);

                    if (typeof options.onStart === 'function') {
                        options.onStart();
                    }

                    wrapperModal.fadeIn(options.speed);
                    var enterMode = mBox.is("[data-entrance]") ? mBox.attr("data-entrance") : options.entrance;
                    enterModal(mBox, enterMode, wrapperModal);

                    wrapperModal.click(function () {

                        wrapperModal.fadeOut(options.speed);
                        mBox.fadeOut(options.speed, function () {

                            if (typeof options.onFinish === 'function') {
                                options.onFinish();
                            }

                        });



                    })

                })

            })


        })


    }

})(jQuery)