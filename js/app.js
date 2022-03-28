const json = JSON.parse($.ajax({ url: 'https://ahmetkaplan.me/para-birimleri.php', async: false }).responseText);

$(document).ready(function() {

    getResponse();

    $(".usd .alis").html(json["USD"].alis);
    $(".usd .satis").html(json["USD"].satis);
    $(".eur .alis").html(json["EUR"].alis);
    $(".eur .satis").html(json["EUR"].satis);
    $(".gbp .alis").html(json["GBP"].alis);
    $(".gbp .satis").html(json["GBP"].satis);

});

$("#price").on("keyup", function() {
    let val = $(this).val();
    $(this).val(parseInt(val.replaceAll('.', '')).formatMoney());
    getResponse();
});

$("#priceType").on("change", function() {
    getResponse();
});

function getResponse() {
    let exchangePrice = $("#price").val();
    let exchangePriceType = $("#priceType").find("option:selected").val();
    let response = parseInt(exchangePrice.replaceAll('.', '')) * parseFloat(json[exchangePriceType].satis);
    $("#exchangeResponse").val(response.formatMoney());
}

Number.prototype.formatMoney = function(fractionDigits, decimal, separator) {
    fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;
    decimal = typeof(decimal) === "undefined" ? "." : decimal;
    separator = typeof(separator) === "undefined" ? "." : separator;
    var number = this;
    var neg = number < 0 ? "-" : "";
    var wholePart = parseInt(number = Math.abs(+number || 0).toFixed(fractionDigits)) + "";
    var separtorIndex = (separtorIndex = wholePart.length) > 3 ? separtorIndex % 3 : 0;
    return neg +
        (separtorIndex ? wholePart.substr(0, separtorIndex) + separator : "") +
        wholePart.substr(separtorIndex).replace(/(\d{3})(?=\d)/g, "$1" + separator);
};