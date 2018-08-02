var axisConfig = [
  {axisId:"Email", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Social Networks", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Internet Banking", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"News Sportsites", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Search Engine", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"View Shopping sites", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Paying Online", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Buy Online", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Stream Music", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Online Gaming", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Navigation", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"App connected to TV program", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Offline Gaming", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Photo Video", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Reading", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Listen Music", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Watch TV", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"TV Movies Streaming", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Listen Radio", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Sending Money", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Other", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null},
  {axisId:"Use less Once week", axisColor: null, axisValueMax: null, axisValueMin: null, axisLabelColor: null, axisLabelParser: null, axisTickParser: null, axisTickColor:null}
];

var d = [
  [
	  {axis:"Email",value:0.59},
    {axis:"Social Networks",value:0.56},
    {axis:"Internet Banking",value:0.42},
    {axis:"News Sportsites",value:0.34},
    {axis:"Search Engine",value:0.48},
    {axis:"View Shopping sites",value:0.14},
    {axis:"Paying Online",value:0.11},
    {axis:"Buy Online",value:0.05},
    {axis:"Stream Music",value:0.07},
    {axis:"Online Gaming",value:0.12},
    {axis:"Navigation",value:0.27},
    {axis:"App connected to TV program",value:0.03},
    {axis:"Offline Gaming",value:0.12},
    {axis:"Photo Video",value:0.4},
    {axis:"Reading",value:0.03},
    {axis:"Listen Music",value:0.22},
    {axis:"Watch TV",value:0.03},
    {axis:"TV Movies Streaming",value:0.03},
    {axis:"Listen Radio",value:0.07},
    {axis:"Sending Money",value:0.18},
    {axis:"Other",value:0.07},
    {axis:"Use less Once week",value:0.08}
    ],[
    {axis:"Email",value:0.48},
    {axis:"Social Networks",value:0.41},
    {axis:"Internet Banking",value:0.27},
    {axis:"News Sportsites",value:0.28},
    {axis:"Search Engine",value:0.46},
    {axis:"View Shopping sites",value:0.29},
    {axis:"Paying Online",value:0.11},
    {axis:"Buy Online",value:0.14},
    {axis:"Stream Music",value:0.05},
    {axis:"Online Gaming",value:0.19},
    {axis:"Navigation",value:0.14},
    {axis:"App connected to TV program",value:0.06},
    {axis:"Offline Gaming",value:0.24},
    {axis:"Photo Video",value:0.17},
    {axis:"Reading",value:0.15},
    {axis:"Listen Music",value:0.12},
    {axis:"Watch TV",value:0.1},
    {axis:"TV Movies Streaming",value:0.14},
    {axis:"Listen Radio",value:0.06},
    {axis:"Sending Money",value:0.16},
    {axis:"Other",value:0.07},
    {axis:"Use less Once week",value:0.17}
	]
];

var options = {
  data: d,
  dims: {
    width: 500,
    height: 500,
    extraWidthX: 300,
    extraWidthY: 100,
    translateX: 80,
    translateY: 30,
    outerHeight:600,
    xbuffer: 80, // to adjust space for
    ybuffer: 30
  },
  legend: {
    height: 100,
    width: 200,
    marginTop: 10
  },
  levels: {
    levelsNo: 3,
    levelsColor: null
  },
  point: {
    radius: 5,
  },
  ToRight: 5, // WTF is this ?
  factor: 1, // modify
  factorLegend: 0.85,
  color: d3.scaleOrdinal(d3.schemeAccent), // modify
  area: {
    defaultAreaOpacity: 0.4,
    highlightedAreaOpacity: 0.7,
    hiddenAreaOpacity: 0.1,
    defaultCircleOpacity: 0.3,
    hoverCircleOpacity: 1.0
  },
  rootElement: document.getElementById('chart'),
  axis: {
    config: axisConfig,
    colorScale: null,       // If specified then color the axis using different colors,
    useGlobalMax: true,     // U
    maxValue: 0.6,          // modify,
  }
}

const radarChart = new RadarChart(options);
radarChart.render();

// setTimeout(() => radarChart.remove(), 3000);
