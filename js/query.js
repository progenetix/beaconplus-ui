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

            var ucscgenome = $("#assemblyID").val();
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

            var result = '';
            result += '<td>'+ $("#datasetId").val() +'</td>';
            result += '<td>'+ ucscgenome +'</td>';
            // result += '<td>'+ $("#assemblyID").val() +'</td>';
            result += '<td>'+ $("#referenceName").val() +'</td>';
            result += '<td>'+ $("#variantType").val() +'</td>';
            result += '<td>'+ $("#startMin").val() + '<br/>'+ $("#startMax").val() +'</td>';
            result += '<td>'+ $("#endMin").val() + '<br/>'+ $("#endMax").val() +'</td>';
            result += '<td>'+ $("#start").val() +'</td>';
            result += '<td>'+ $("#referenceBases").val() + '<br/>' + $("#alternateBases").val() +'</td>';
            result += '<td>'+ $("#bioontology").val() +'</td>';
    				// $.each(formParam, function (i, val) {
    				// 	result += '<td>' + val.value +'</td>';
    				// });
            result += '<td>'+ data.dataset_allele_responses[i].variant_count +'<br/>' + data.dataset_allele_responses[i].call_count +'<br/>' + data.dataset_allele_responses[i].callset_count +'<br/>' + data.dataset_allele_responses[i].sample_count +'</td>';
            result += '<td>' + data.dataset_allele_responses[i].frequency + '<br/>' + data.dataset_allele_responses[i].info.bs_match_frequency + '</td>';
            result += '<td><a href="' + ARRAYMAP + '/?' + data.info.query_string +'" title="' + data.info.query_string + '" target="_BLANK">JSON</a><br/><a href="http://www.genome.ucsc.edu/cgi-bin/hgTracks?db=' + ucscgenome + '&position=chr' + $("#referenceName").val() + '%3A' + ucscstart + '%2D' + ucscend + '" target="_blank">UCSC</a></td>';

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
      "assemblyID": "assembly_id",
      "variantType": "variants.variant_type",
      "startMin": "variants.start_min",
      "startMax": "variants.start_max",
      "endMin": "variants.end_min",
      "endMax": "variants.end_max",
      "referenceBases": "variants.reference_bases",
      "alternateBases": "variants.alternate_bases",
      "start": "variants.start",
      "bioontology":"biosamples.bio_characteristics.ontology_terms.term_id"
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

    // TODO: re-implement checks for both types of queries.
    // This needs a different approach, since many requirements are context
    // sensitiv. E.g. separate checks depending on SNV vs. structural; auto
    // replacement of missing values ...

    // ###############################################################
    // Rule #1: Compulsory fields:
    // ###############################################################
    if (referenceName == '' || variantType == '') {
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
