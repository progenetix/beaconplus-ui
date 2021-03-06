/**
 * Created by sduvaud on 12/05/17.
 * Last modification by Michael Baudis 2019-12-05
*/

// Endpoint (URL) for Beacon backend implementing a query API to access data

var host = window.location.hostname;
/* const BEACONRESPONSE = "/cgi-bin/beaconresponse.cgi"; */
const BEACONRESPONSE = "/cgi-bin/bycon/bin/byconplus.py";

$( "#beacon-form" ).submit(function( event ) {

    event.preventDefault();

    $("#spinner").show();

    var formParam = $('#beacon-form').serializeArray();
    var message = checkParameters(formParam);

  var query = buildQuery(formParam);
  var params = {
	type: 'GET',
	url: BEACONRESPONSE + '?' + query
  };

  $.ajax(params)
	.done(function (data) {
	  $("#spinner").hide();
	  $("#noResult").hide();
	  $("#result").show();

	  var result = '';

	  if(typeof data.datasetAlleleResponses == 'undefined'){
		result = '<tr><td colspan=9>exists: '+ data.exists +'</td></tr>';
	  } else {

		var dataset_no = data.datasetAlleleResponses.length;
		for (var i = 0; i < dataset_no; i++) {

		  result += '<tr>';

		  var ucscgenome = $("#assemblyId").val();
		  if (ucscgenome == 'GRCh36' ) {
			ucscgenome = 'hg18';
		  } else if (ucscgenome == 'GRCh37' ) {
			ucscgenome = 'hg19';
		  } else if (ucscgenome == 'GRCh38' ) {
			ucscgenome = 'hg38';
		  }

		  var ucscstart = $("#start").val();
		  var ucscend = $("#end").val();

		  if ($("#start").val() > 0) {
			ucscstart = $("#start").val();
			ucscend = $("#start").val();
		  }

		  // UCSC browser is 1 based

		  // capture the "null is not an object" exception if nothing selected
		  var filters = "";
		  if ( $('#bioontology').val() ){
			filters = $("#bioontology").val().join("<br/>");
		  }
		  if ( $('#materialtype').val() ){
			filters =  filters + "," + $('#materialtype').val();
		  }
		  if ( $('#freeFilters').val() ){
			filters =  filters + "," + $('#freeFilters').val();
		  }
		
		  result += '<td>'+ data.datasetAlleleResponses[i].datasetId +'</td>';
		  result += '<td>'+ $("#assemblyId").val() +'</td>';
		  result += '<td>'+ $("#referenceName").val() +'</td>';
		  result += '<td>'+ [ $("#start").val(), [ $("#start").val(), $("#startMax").val()].join(" - "), [$("#endMin").val(), $("#end").val()].join(" - ") ].join('<br/>') + '</td>';
		  result += '<td>'+ [ $("#referenceBases").val(), $("#alternateBases").val(), $("#variantType").val() ].join("<br/>") +'</td>';
		  result += '<td>'+ filters.split(",").join("<br/>") +'</td>';
		  result += '<td>'+ data.datasetAlleleResponses[i].variantCount +'<br/>' + data.datasetAlleleResponses[i].callCount +'<br/>' + data.datasetAlleleResponses[i].sampleCount +'</td>';
		  result += '<td>' + data.datasetAlleleResponses[i].frequency + '</td>';
		  result += '<td><a href="' + BEACONRESPONSE + '?' + query +'" title="' + BEACONRESPONSE + '?' + query + '" target="_BLANK">JSON</a><br/><a href="http://www.genome.ucsc.edu/cgi-bin/hgTracks?db='+ucscgenome+'&position=chr'+$("#referenceName").val()+'%3A'+ucscstart+'%2D'+ucscend+'" target="_blank">UCSC region</a>';
		  
		  var handover_no = data.datasetAlleleResponses[i].datasetHandover.length;
		  for (var h = 0; h < handover_no; h++) {
			if (data.datasetAlleleResponses[i].datasetHandover[h].url.match(/http/)) {
			  result += '<br/><a href="' + data.datasetAlleleResponses[i].datasetHandover[h].url + '" target="_blank" title="' + data.datasetAlleleResponses[i].datasetHandover[h].description + '">[H-&gt;O] ' + data.datasetAlleleResponses[i].datasetHandover[h].handoverType.label + '</a>';
			}
		  }

		  result += '</td></tr>';

		}
		
				$("#resultTable").append(result);

	  }
	})
	.fail(function (jqXHR, textStatus, error) {
	  $("#spinner").hide();
	  $('#message').remove();
	  $('#error').show();
	  $('#error').append('<span id="message" class="compulsory">Error on '+ query +'</span>');
	});

});


function buildQuery(params) {

  var query = '';
  var paramName2Url = {
      "datasetIds": "datasetIds",
      "includeDatasetResponses": "includeDatasetResponses",
      "requestType": "requestType",
      "referenceName": "referenceName",
      "assemblyId": "assemblyId",
      "start": "start",
      "startMax": "start",
      "endMin": "end",
      "end": "end",
      "referenceBases": "referenceBases",
      "alternateBases": "alternateBases",
      "variantType": "variantType",
//       "materialtype": "biosamples.provenance.material.type.id",
      "materialtype": "filters",
//      "bioontology": "biosamples.biocharacteristics.type.id"
      "bioontology": "filters",
      "freeFilters": "filters"
 };

  var paramName, paramValue = null;
  $.each(params, function (i, val) {

      paramName = val.name;
      paramValue = val.value;

/*podmd
Since the browser interface uses 1-based coordinates, start positions have to be
left-shifted.
*/

      if (paramValue != '' && paramName != '') {
        if (paramName.startsWith("start")) {
          paramValue  = paramValue - 1;
        }
        query += paramName2Url[paramName] + '=' + encodeURIComponent(paramValue) + '&';
      }
  });

  return query;
}

function checkParameters(params) {

    var referenceName, start, startMin, startMax, end, endMin, endMax, referenceBases, alternateBases, variantType, filters = null;

    $.each(params, function (i, val) {
        if (val.name == 'referenceName') {
            referenceName = val.value;
        }

        if (val.name == 'start' && val.value != '') {
            start = Math.abs(parseInt(val.value));
        }

        if (val.name == 'startMin' && val.value != '') {
            startMin = Math.abs(parseInt(val.value));
        }

        if (val.name == 'startMax' && val.value != '') {
            startMax = Math.abs(parseInt(val.value));
        }

        if (val.name == 'end' && val.value != '') {
            end = Math.abs(parseInt(val.value));
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

        if (val.name == 'variantType') {
            variantType = val.value;
        }

    });

    // TODO: re-implement checks for both types of queries.
    // This needs a different approach, since many requirements are context
    // sensitiv. E.g. separate checks depending on SNV vs. structural; auto
    // replacement of missing values ...

    // ###############################################################
    // Rule #1: Compulsory fields:
    // ###############################################################
    if (referenceName == '' || (alternateBases == '' && variantType == '')) {
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
    var chromosome = getChromosome(referenceName);
    if (chromosome == 'ERR') {
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
