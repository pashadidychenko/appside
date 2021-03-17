(function($) {
    $(document).ready(function() {
        $("input.js-phone").keyup(function() {
            var val = $(this).val();
            regVal = /[^\d\+\(\)\-]/g;
            newval = val.replace(regVal, "");
            $(this).val(newval);
        });

        $(".js-phone").intlTelInput({
            geoIpLookup: function(callback) {
                var geo = '';
                if (geo == '') {
                    $.get("//ipinfo.io", function() {}, "jsonp").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                } else {
                    callback(geo);
                }
            },
            initialCountry: "auto",
            nationalMode: false,
            utilsScript: "./bundles/utils.js",
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return selectedCountryPlaceholder;
            },
        });
    });
})(jQuery);

function checkIp() {
    $.getJSON('https://apileads.3snet.tech/check-ip', function(data) {
        console.log(data);
        if (typeof data.ip != 'undefined') {
            var ip = data.ip;
            $('input[name=ip]').attr('value', ip);
        }
    });
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copies() {
    var el = $(".slots .pin");
    var left = parseInt($(el).html());

    left = left > 5 ? left - rand(1, 3) : left - rand(-2, 2);
    if (left < 2) {
        $(el).html(1);
    } else $(el).html(left);

    setTimeout('copies()', rand(9000, 13000));
}

function visitors() {
	var el = $(".online .pin");
    var left = parseInt($(el).html());
	var start = left - 20;
	var end = left + 20;
	if (start < 100) start = left;
	if (end > 200) end = left;
    $(".online .pin").html(rand(start, end));
    setTimeout('visitors()', rand(3000, 13000));
}

yesyoucan = 1;

function videoReview()
{
	$('.video-review').click(function(){
		$(this).find(".poster").remove();
		$(this).find("video").play();
	});
}

$(function () {
    copies();
	visitors();
	videoReview();
});