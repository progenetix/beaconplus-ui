/**
 * Created by sduvaud on 12/05/17.
 * Last modification by Michael Baudis 2017-08-24
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
            result += '<td>'+ data.dataset_allele_responses[i].frequency +'</td>';
            result += '<td><a href="' + ARRAYMAP + '/?' + data.info.query_string +'" title="' + data.info.query_string + '" target="_BLANK">show JSON</a></td>';
//             result += '<td><a href="' + params[url] + '" alt="'+ query +'" target="_BLANK>show json</a></td>';

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

// TODO: Query paramters should be submitted depending on variantType...

  var query = '';
  var paramName2Url = {
      "datasetId": "dataset_id",
      "referenceName": "variants.reference_name",
      "variantType": "variants.variant_type",
      "startMin": "variants.start_max",
      "startMax": "variants.start_min",
      "endMin": "variants.end_min",
      "endMax": "variants.end_max",
      "referenceBases": "variants.reference_bases",
      "alternateBases": "variants.alternate_bases",
      "start": "variants.start"
  };

  var paramName, paramValue = null;
  $.each(params, function (i, val) {

      paramName = val.name;
      paramValue = val.value;

      if (paramName == 'referenceName') {
          paramValue = 'chr' + paramValue;
      }
      if (paramValue != '' && paramName != '') {
          query += paramName2Url[paramName] + '=' + paramValue + '&';
      }
  });

  return query;
}

function checkParameters(params) {

    var referenceName, start, startMin, variantType, referenceBases, alternateBases = null;
    var startMax = endMin = endMax = -1;

    $.each(params, function (i, val) {
        if (val.name == 'referenceName') {
            referenceName = val.value;
        }

        if (val.name == 'start') {
            startMin = Math.abs(parseInt(val.value));
        }

        if (val.name == 'startMin') {
            startMin = Math.abs(parseInt(val.value));
        }

        if (val.name == 'startMax' && val.value != '') {
            startMax = Math.abs(parseInt(val.value));
        }

        if (val.name == 'endMin' && val.value != '') {
            endMin = Math.abs(parseInt(val.value));
        }

        if (val.name == 'endMax' && val.value != '') {
            endMax = Math.abs(parseInt(val.value));
        }

        if (val.name == 'variantType') {
          if (val.value == 'DEL' || val.value == 'DUP') {
            variantType = val.value;
          }
        }
    });

    // ###############################################################
    // Rule #1: Compulsory fields:
    // ###############################################################
    if (referenceName == '' || startMin == '' || variantType == '') {
        return "One or more compulsory fields are missing!";
    }

    // ###############################################################
    // Rule #2: All positions are integers:
    // ###############################################################
// TODO: re-implement checks for both types of queries
    // if (isNaN(startMin) ||
    //     isNaN(startMax) ||
    //     isNaN(endMin)   ||
    //     isNaN(endMax)) {
    //         return "All positions must be integers!";
    // }

    // ###############################################################
    // Rule #3: Ordering of the params
    // ###############################################################
    if (startMax > -1 && startMax < startMin) {
        return "startMax must be greater than startMin!";
    }
    if (endMax > -1 && endMin > -1 && endMax < endMin) {
        return "endMax must be greater than endMin!";
    }
    var maxEnd = Math.max(endMin, endMax);
    if (maxEnd > -1 && Math.max(startMin, startMax) > maxEnd) {
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
// TODO: modify this for bases OR structural test
    // if (variantType != 'DEL' && variantType != 'DUP') {
    //     return "variant type must be either DEL or DUP";
    // }

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
