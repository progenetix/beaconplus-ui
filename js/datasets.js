/**
 * Created by sduvaud on 12/05/17.
 */


// CORS issue with this URL on my localhost!
// In prod, we should use the first INFO variable and comment out the
// other one!

// const INFO = "http://beacon.arraymap.org/beacon/info/";
const INFO = "http://localhost:8888/beacon-arraymap-ui/info.json";

function loadDatasets() {
    console.log("loadDatasets!");
    var params = {
        type: 'GET',
        url: INFO
    };

    $.ajax(params)
        .done(function (data) {
            $.each(data.dataset, function (i, val) {
                if (val.datasetId == 'arraymap'){
                    $.each(val.info.ontology_terms, function (j, dataset) {
                        $('#datasets').append('<option id=' + dataset + '>' + dataset + '</option>');
                    });
                }
            });
        })
        .fail(function (jqXHR, textStatus, error) {
            console.log("FAILED: " + error);
        });
}