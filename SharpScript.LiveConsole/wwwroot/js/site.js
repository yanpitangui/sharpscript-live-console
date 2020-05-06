// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(".linq-preview").each(function () {

    var el = $(this);
    el.find("textarea").on("input", function () {
        var text = el.find(".template textarea").val();
        $.ajax({
            cache: false,
            type: "POST",
            url: "/linq/eval",
            data: { script: text }
        }).done(function (data) {
            el.removeClass('error').find(".output").html(data);
        }).fail(function (jqxhr) { handleError(el, jqxhr) })
    })
        .trigger("input")

})

$("#content h2,#content h3,#content h4").each(function () {
    var el = $(this);

    var text = el.html();
    if (text.indexOf("<") >= 0) return;

    if (!el.attr('id')) {
        var safeName = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]+/g, "")
        el.attr('id', safeName)
    }

    el.on('click', function () {
        var id = el.attr('id')
        location.href = "#" + id
    })
})


function handleError(el, jqxhr) {
    try {
        el.addClass('error')
        var errorResponse = jqxhr.responseText;
        el.find('.output').html('<div class="alert alert-danger"><pre>' + errorResponse +'</pre></div>')
    } catch (e) {
        el.find('.output').html('<div class="alert alert-danger"><pre>' + jqxhr.status + ' ' + jqxhr.statusText + '</pre></div>')
    }
}

function queryStringParams(qs) {
    qs = (qs || document.location.search).split('+').join(' ')
    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g
    while (tokens = re.exec(qs)) {
        params[tokens[1]] = tokens[2];
    }
    return params;
}
