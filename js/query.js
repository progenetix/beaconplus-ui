/**
 * Created by sduvaud on 12/05/17.
 * Last modification by Michael Baudis 2018-02-01
*/

// Endpoint (URL) for Beacon backend implementing a query API to access data

var host = window.location.hostname;
const ARRAYMAP = "http://" + host + "/beaconresponse";
const HANDOVER = "http://" + host + "/beaconhandover";

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

            var ucscgenome = $("#assemblyId").val();
            if (ucscgenome == 'GRCh36' ) {
              ucscgenome = 'hg18';
            } else if (ucscgenome == 'GRCh37' ) {
              ucscgenome = 'hg19';
            } else if (ucscgenome == 'GRCh38' ) {
              ucscgenome = 'hg38';
            }

            var ucscstart = $("#startMin").val();
            var ucscend = $("#endMax").val();

            if ($("#start").val() > 0) {
              ucscstart = $("#start").val();
              ucscend = $("#start").val();
            }

            // UCSC browser is 1 based
            ucscstart = +ucscstart + +1;
            ucscend = +ucscend + +1;

            var result = '';
            result += '<td>'+ $("#datasetId").val() +'</td>';
            result += '<td>'+ $("#assemblyId").val() +'</td>';
            // result += '<td>'+ $("#assemblyID").val() +'</td>';
            result += '<td>'+ $("#referenceName").val() +'</td>';
            result += '<td>'+ $("#startMin").val() + '<br/>'+ $("#startMax").val() +'</td>';
            result += '<td>'+ $("#endMin").val() + '<br/>'+ $("#endMax").val() +'</td>';
            result += '<td>'+ $("#start").val() +'</td>';
            result += '<td>'+ $("#referenceBases").val() + '<br/>' + $("#alternateBases").val() +'</td>';
            result += '<td>'+ $("#bioontology").val() +'</td>';
    				// $.each(formParam, function (i, val) {
    				// 	result += '<td>' + val.value +'</td>';
    				// });
            result += '<td>'+ data.datasetAlleleResponses[i].variantCount +'<br/>' + data.datasetAlleleResponses[i].callCount +'<br/>' + data.datasetAlleleResponses[i].sampleCount +'</td>';
            result += '<td>' + data.datasetAlleleResponses[i].frequency + '</td>';
            result += '<td><a href="' + ARRAYMAP + '/?' + data.info.queryString +'" title="' + data.info.queryString + '" target="_BLANK">JSON</a><br/><a href="http://www.genome.ucsc.edu/cgi-bin/hgTracks?db=' + ucscgenome + '&position=chr' + $("#referenceName").val() + '%3A' + ucscstart + '%2D' + ucscend + '" target="_blank">UCSC</a><br/><a href="' + HANDOVER + '/?accessid=' + data.dataset_allele_responses[i].info.callset_access_handle + '" title="Data Handover" target="_BLANK">Handover</a></td>';

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
      "datasetId": "datasetId",
      "referenceName": "referenceName",
      "assemblyId": "assemblyId",
      "startMin": "startMin",
      "startMax": "startMax",
      "endMin": "endMin",
      "endMax": "endMax",
      "referenceBases": "referenceBases",
      "alternateBases": "alternateBases",
      "start": "start",
      "end": "end",
      "bioontology":"biosamples.bio_characteristics.ontology_terms.term_id"
  };

  var paramName, paramValue = null;
  $.each(params, function (i, val) {

      paramName = val.name;
      paramValue = val.value;

      if (paramValue != '' && paramName != '') {
          query += paramName2Url[paramName] + '=' + paramValue + '&';
      }
  });

  return query;
}

function checkParameters(params) {

    var referenceName, start, startMin, referenceBases, alternateBases = null;
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

        if (val.name == 'referenceBases') {
            referenceBases = val.value;
        }

        if (val.name == 'alternateBases') {
            alternateBases = val.value;
        }

    });

    // TODO: re-implement checks for both types of queries.
    // This needs a different approach, since many requirements are context
    // sensitiv. E.g. separate checks depending on SNV vs. structural; auto
    // replacement of missing values ...

    // ###############################################################
    // Rule #1: Compulsory fields:
    // ###############################################################
    if (referenceName == '' || alternateBases == '') {
        return "One or more compulsory fields are missing!";
    }

    // ###############################################################
    // Rule #2: All positions are integers:
    // ###############################################################
    // if (isNaN(startMin) ||
    //     isNaN(startMax) ||
    //     isNaN(endMin)   ||
    //     isNaN(endMax)) {
    //         return "All positions must be integers!";
    // }

    // ###############################################################
    // Rule #3: Ordering of the params
    // ###############################################################
    // if (startMax > -1 && startMax < startMin) {
    //     return "startMax must be greater than startMin!";
    // }
    // if (endMax > -1 && endMin > -1 && endMax < endMin) {
    //     return "endMax must be greater than endMin!";
    // }
    // var maxEnd = Math.max(endMin, endMax);
    // if (maxEnd > -1 && Math.max(startMin, startMax) > maxEnd) {
    //     return "end positions must be greater than start positions";
    // }

    // ###############################################################
    // Rule #4: Chromosome name (1-23 or X or Y)
    // ###############################################################
    var chromosme = getChromosome(referenceName);
    if (chromosme == 'ERR') {
        return "reference name incorrect!";
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
