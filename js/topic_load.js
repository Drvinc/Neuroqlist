<!-- work with D3 to load a csv file into a HTML table -->
function renderTable (csv_path, table_id){
  d3.text(csv_path, function(data) {
      var parsedCSV = d3.csv.parseRows(data);
      var container = d3.select(table_id)
          .selectAll("tr")
            .data(parsedCSV).enter()
            .append("tr")
          .selectAll("td")
            .data(function(d) { return d; }).enter()
            .append("td")
            .text(function(d) { return d; });
  })  
}

<!-- work with exif.js to load a jpg image with decription and reference -->
function renderImage (img_id){
  var img1 = document.getElementById(img_id);
  EXIF.getData(img1, function() {
    var Copyright = EXIF.getTag(this, "Copyright");
    var PMID = Copyright.match(/\d+/g).map(Number);
    var pubmedURL = "https://www.ncbi.nlm.nih.gov/pubmed/" + PMID + "/";
    console.log(pubmedURL);
    var ImgDescript = EXIF.getTag(this, "ImageDescription");
    var ImgCaption = document.createElement("figcaption");
    ImgCaption.innerHTML = ImgDescript + " (" + "<a href='"+pubmedURL+"'>" + Copyright + "</a>" + ")";
    img1.parentNode.appendChild(ImgCaption);
  });
}