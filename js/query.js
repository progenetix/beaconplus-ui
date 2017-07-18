/**
 * Created by sduvaud on 12/05/17.
 * Last modification by Michael Baudis 2017-07-14
*/

// Endpoint (URL) for Beacon backend implementing a query API to access data

var host = window.location.hostname;
const ARRAYMAP = "http://" + host + "/beaconresponse";

$( "#beacon-form" ).submit(function( event ) {

    event.preventDefault();

    $("#spinner").show();

    var formParam = $('#beacon-form').serializeArray();
    var message = checkParameters(formParam);

    if (message == 'OK') {

        $('#error').hide();

        var query = buildQuery(formParam);
        var params = {
            type: 'GET',
            url: ARRAYMAP + '/?' + query
        };

        $.ajax(params)
            .done(function (data) {
                $("#spinner").hide();
                $("#noResult").hide();
                $("#result").show();

                // this already implements the responses for multiple datasets
                var dataset_no = data.dataset_allele_responses.length;
				for (var i = 0; i < dataset_no; i++) {

					var result = '';
					$.each(formParam, function (i, val) {
						result += '<td>'+ val.value +'</td>';
					});
					result += '<td>'+ data.dataset_allele_responses[i].call_count +'</td>';

					$("#resultTable").append('<tr>' + result + '</tr>');

                }
            })
            .fail(function (jqXHR, textStatus, error) {
                $("#spinner").hide();
                $('#message').remove();
                $('#error').show();
                $('#error').append('<span id="message" class="compulsory">Error on '+ query +'</span>');
            });
    }
    else {

        $("#spinner").hide();

        $('#message').remove();
        $('#error').show();
        $('#error').append('<span id="message" class="compulsory">' + message + '</span>');
    }
});

function buildQuery(params) {

    var query = '';
    var paramName2Url = {
        "datasetId": "dataset_id",
        "referenceName": "variants.reference_name",
        "variantType": "variants.variant_type",
        "start1": "variants.start_max",
        "start2": "variants.start_min",
        "end1": "variants.end_min",
        "end2": "variants.end_max"
    };

    var paramName, paramValue = null;
    $.each(params, function (i, val) {

        paramName = val.name;
        paramValue = val.value;

        if (paramName == 'referenceName') {
            paramValue = 'chr' + paramValue;
        }

        if (paramValue != '') {
            query += paramName2Url[paramName] + '=' + paramValue + '&';
        }
    });

    return query;
}

function checkParameters(params) {

    var referenceName, start1, variantType = null;
    var start2 = end1 = end2 = -1;

    $.each(params, function (i, val) {
        if (val.name == 'referenceName') {
            referenceName = val.value;
        }

        if (val.name == 'start1') {
            start1 = Math.abs(parseInt(val.value));
        }

        if (val.name == 'start2' && val.value != '') {
            start2 = Math.abs(parseInt(val.value));
        }

        if (val.name == 'end1' && val.value != '') {
            end1 = Math.abs(parseInt(val.value));
        }

        if (val.name == 'end2' && val.value != '') {
            end2 = Math.abs(parseInt(val.value));
        }

        if (val.name == 'variantType') {
            variantType = val.value;
        }
    });

    // ###############################################################
    // Rule #1: Compulsory fields:
    // ###############################################################
    if (referenceName == '' || start1 == '' || variantType == '') {
        return "One or more compulsory fields are missing!";
    }

    // ###############################################################
    // Rule #2: All positions are integers:
    // ###############################################################
    if (isNaN(start1) ||
        isNaN(start2) ||
        isNaN(end1)   ||
        isNaN(end2)) {
            return "All positions must be integers!";
    }

    // ###############################################################
    // Rule #3: Ordering of the params
    // ###############################################################
    if (start2 > -1 && start2 < start1) {
        return "start2 must be greater than start1!";
    }
    if (end2 > -1 && end1 > -1 && end2 < end1) {
        return "end2 must be greater than end1!";
    }
    var maxEnd = Math.max(end1, end2);
    if (maxEnd > -1 && Math.max(start1, start2) > maxEnd) {
        return "end positions must be greater than start positions";
    }

    // ###############################################################
    // Rule #4: Chromosome name (1-23 or X or Y)
    // ###############################################################
    var chromosme = getChromosome(referenceName);
    if (chromosme == 'ERR') {
        return "reference name incorrect!";
    }

    // ###############################################################
    // Rule #5: Variant type (DEL or DUP)
    // ###############################################################
    if (variantType != 'DEL' && variantType != 'DUP') {
        return "variant type must be either DEL or DUP";
    }

    return "OK";
}

function getChromosome(name) {
    var nb = parseInt(name);
    if (isNaN(nb)) {
        var nameUc = name.toUpperCase();
        if (nameUc == 'X' || nameUc == 'Y') {
            return name;
        }
    }
    else {
        if (nb > 0 && nb < 24) {
            return name;
        }
    }
    return "ERR";
}
