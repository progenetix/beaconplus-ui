$(function() {

  $( "#" + cytoinput_field ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "/cgi-bin/bycon/bin/cytomapper.py",
        dataType: "jsonp",
        data: {
          featureClass:  "P",
          maxRows:    2,
          cytoBands:  request.term
        },
        success: function( data ) {
          // $("#referenceName").html( data[0].value.referenceName );
          $("#startMin").text( data.data );
          // $("#startMax").html( data[0].value.end - 1 );
          // $("#endMin").html( value[0].value.start + 1 );
          // $("#endMax").html( data[0].value.end );
        },
      });
    }
  });
})

