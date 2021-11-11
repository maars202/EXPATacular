axios.get("https://covid-api.com/api/reports/total?iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}})
.then(response =>  {
        // console.log(response.data.data)
        today = new Date().toDateString()
        document.getElementById("date").innerText = "Covid 19 numbers as of " + today 

        totalcases = response.data.data.confirmed
        dailycases = response.data.data.confirmed_diff
        document.getElementById("cases1").innerText = totalcases 
        node1=document.createTextNode(dailycases)
        document.getElementById("cases2").appendChild(node1)

        totaldeaths = response.data.data.deaths
        dailydeaths = response.data.data.deaths_diff
        document.getElementById("deaths1").innerText = totaldeaths 
        node2=document.createTextNode(dailydeaths)
        document.getElementById("deaths2").appendChild(node2)

        fatality = response.data.data.fatality_rate
        fatality = fatality*100
        document.getElementById("fatal").innerText = fatality.toFixed(2) + "%"

    })
            .catch(error => {
        console.log(error.message)   
             });  

var date= new Date();
today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datetodayurl  = today.toLocaleString()
if (datetodayurl.charAt(datetodayurl.length-2) =="-"){
   datetodayurl = datetodayurl.slice(0,-1)+"0" +  datetodayurl.slice(-1)
}
one = date.setDate(date.getDate() - 1);
dateone = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
dateoneurl  = dateone.toLocaleString()
if (dateoneurl.charAt(dateoneurl.length-2) =="-"){
    dateoneurl = dateoneurl.slice(0,-1)+"0" +  dateoneurl.slice(-1)
}
two = date.setDate(date.getDate() - 1);
datetwo = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datetwourl  = datetwo.toLocaleString()
if (datetwourl.charAt(datetwourl.length-2) =="-"){
    datetwourl = datetwourl.slice(0,-1)+"0" +  datetwourl.slice(-1)
}
three = date.setDate(date.getDate() - 1);
datethree = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datethreeurl  = datethree.toLocaleString()
if (datethreeurl.charAt(datethreeurl.length-2) =="-"){
    datethreeurl = datethreeurl.slice(0,-1)+"0" +  datethreeurl.slice(-1)
}
four = date.setDate(date.getDate() - 1);
datefour = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datefoururl  = datefour.toLocaleString()
if (datefoururl.charAt(datefoururl.length-2) =="-"){
    datefoururl = datefoururl.slice(0,-1)+"0" +  datefoururl.slice(-1)
}
five = date.setDate(date.getDate() -1);
datefive = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datefiveurl  = datefive.toLocaleString()
if (datefiveurl.charAt(datefiveurl.length-2) =="-"){
    datefiveurl = datefiveurl.slice(0,-1)+"0" +  datefiveurl.slice(-1)
}
six = date.setDate(date.getDate() -1);
datesix = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datesixurl  = datesix.toLocaleString()
if (datesixurl.charAt(datesixurl.length-2) =="-"){
    datesixurl = datesixurl.slice(0,-1)+"0" +  datesixurl.slice(-1)
}
seven = date.setDate(date.getDate() -1);
dateseven = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
datesevenurl  = dateseven.toLocaleString()
if (datesevenurl.charAt(datesevenurl.length-2) =="-"){
    datesevenurl = datesevenurl.slice(0,-1)+"0" +  datesevenurl.slice(-1)
}
let data =[]
data2 = []
const requestOne = axios.get("https://covid-api.com/api/reports/total?date="+dateoneurl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});
const requestTwo = axios.get("https://covid-api.com/api/reports/total?date="+datetwourl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});
const requestThree = axios.get("https://covid-api.com/api/reports/total?date="+datethreeurl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});
const requestFour = axios.get("https://covid-api.com/api/reports/total?date="+datefoururl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});
const requestFive = axios.get("https://covid-api.com/api/reports/total?date="+datefiveurl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});
const requestSix = axios.get("https://covid-api.com/api/reports/total?date="+datesixurl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});
const requestSeven = axios.get("https://covid-api.com/api/reports/total?date="+datesevenurl +"&iso=SGP",{
headers: {"Access-Control-Allow-Origin": "*"}});

axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven])
.then(axios.spread((...response) => {
  data.push({"date":response[6].data.data.date,"cases": parseInt(response[6].data.data.confirmed_diff) })
  data.push({"date":response[5].data.data.date,"cases": parseInt(response[5].data.data.confirmed_diff) })
  data.push({"date":response[4].data.data.date,"cases": parseInt(response[4].data.data.confirmed_diff) })
  data.push({"date":response[3].data.data.date,"cases": parseInt(response[3].data.data.confirmed_diff) })
  data.push({"date":response[2].data.data.date,"cases": parseInt(response[2].data.data.confirmed_diff) })
  data.push({"date":response[1].data.data.date,"cases": parseInt(response[1].data.data.confirmed_diff) })
  data.push({"date":response[0].data.data.date,"cases": parseInt(response[0].data.data.confirmed_diff) })
  console.log(data)
  data2.push({"date":response[6].data.data.date,"deaths": parseInt(response[6].data.data.deaths_diff) })
  data2.push({"date":response[5].data.data.date,"deaths": parseInt(response[5].data.data.deaths_diff) })
  data2.push({"date":response[4].data.data.date,"deaths": parseInt(response[4].data.data.deaths_diff) })
  data2.push({"date":response[3].data.data.date,"deaths": parseInt(response[3].data.data.deaths_diff) })
  data2.push({"date":response[2].data.data.date,"deaths": parseInt(response[2].data.data.deaths_diff) })
  data2.push({"date":response[1].data.data.date,"deaths": parseInt(response[1].data.data.deaths_diff) })
  data2.push({"date":response[0].data.data.date,"deaths": parseInt(response[0].data.data.deaths_diff) })
  console.log(data2)
  
// chart for daily cases
var width = 500; 
    var height =  700;
    var margin = {top:20, bottom:20, left:35, right:20}
    var svg = d3.select("#chart").append("svg")
    .attr("height", height - margin.top - margin.bottom)
    .attr("width", width - margin.left - margin.right)
    .attr("viewBox" ,[0,0,width,height]);
    
    var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left,width - margin.right])
    .padding(0.2);

    var y = d3.scaleLinear()
    .domain([0,5000])
    .range([height-margin.bottom, margin.top])

    svg
    .append('g')
    .attr("fill", "#346624")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", x.bandwidth())
    .on("mouseover",onMouseOver)
    .on("mouseout",onMouseOut)
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .delay(function(d,i){return i * 50})
    .attr("x", (d,i)=>x(i))
    .attr("y", (d)=>y(d.cases))
    .attr("height", d=>y(0)-y(d.cases))
    .attr('class','rectangle')


    function xAxis(g){
        g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i =>data[i].date))
        .attr('font-size','10px')
    }

    function yAxis(g){
      g.attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null,data.format))
      .attr('font-size','10px')
        
    }
    function onMouseOver(d,i) {
        var xPos =parseFloat(d3.select(this).attr("x")) + x.bandwidth() /2 + 100
        var yPos =parseFloat(d3.select(this).attr("y"))/2 + height +100
        d3.select("#tooltip")
        .style('left', xPos + 'px')
        .style('top', yPos +'px')  
        .select('#value').text(d.cases)

        d3.select("#tooltip").classed("hidden", false)
    }
    function onMouseOut(d,i){
        d3.select("#tooltip").classed("hidden", true)
    }
    svg.append('g').call(yAxis)     
    svg.append('g').call(xAxis)
    svg.node()


// chart for daily death
    var width = 500; 
    var height =  700;
    var margin = {top:20, bottom:25, left:20, right:20}
    var svg2 = d3.select("#chart2").append("svg")
    .attr("height", height - margin.top - margin.bottom)
    .attr("width", width - margin.left - margin.right)
    .attr("viewBox" ,[0,0,width,height]);
    
    var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left,width - margin.right])
    .padding(0.2);

    var y = d3.scaleLinear()
    .domain([0,20])
    .range([height-margin.bottom, margin.top])

    svg2
    .append('g')
    .attr("fill", "#940303")
    .selectAll("rect")
    .data(data2)
    .join("rect")
    .attr("width", x.bandwidth())
    .on("mouseover",onMouseOvera)
    .on("mouseout",onMouseOuta)
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .delay(function(d,i){return i * 50})
    .attr("x", (d,i)=>x(i))
    .attr("y", (d)=>y(d.deaths))
    .attr("height", d=>y(0)-y(d.deaths))
    .attr('class','rectangle')

    function onMouseOvera(d,i) {
        var xPos2 =parseFloat(d3.select(this).attr("x")) + x.bandwidth() +600
        var yPos2 =parseFloat(d3.select(this).attr("y"))/2 + height +100
        d3.select("#tooltip2")
        .style('left', xPos2 + 'px')
        .style('top', yPos2 +'px')  
        .select('#value2').text(d.deaths)

        d3.select("#tooltip2").classed("hidden", false)
    }
    function onMouseOuta(d,i){
        d3.select("#tooltip2").classed("hidden", true)
    }

    svg2.append('g').call(yAxis)
    svg2.append('g').call(xAxis)
    svg2.node()
})).catch(errors => {
  // react on errors.
  console.log(errors.message) 
})  
