!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("d3"),require("lodash")):"function"==typeof define&&define.amd?define(["d3","lodash"],e):t.RadarChart=e(t.d3,t._)}(this,function(h,u){"use strict";var t,e,i,a,s,p="DRAGGING",r="CIRCLE_LEAVE_WHILE_DRAGGING",o="CIRCLE_HOVER",l="NEUTRAL",c="CIRCLE_ENTER",d="CIRCLE_LEAVE",x="DRAGGING_START",f="DRAGGING",g="DRAGGING_END",m=(t=!!window.opr&&!!window.opr.addons||!!window.opera||0<=navigator.userAgent.indexOf(" OPR/"),e="undefined"!=typeof InstallTrigger,i=!!document.documentMode,a=!i&&!!window.StyleMedia,s=!!window.chrome&&!!window.chrome.webstore,{isOpera:t,isFirefox:e,isIE:i,isEdge:a,isChrome:s,isBlink:(s||t)&&!!window.CSS}),L=2*Math.PI,n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},y=function(){function a(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,e,i){return e&&a(t.prototype,e),i&&a(t,i),t}}(),A="QUAD_1",b="QUAD_2",v=function(){function a(t,e,i){n(this,a),this.opts=t,this.axisIndex=i,this.axisOptions=e,this.dragActive=!1,this.axisTickTextElements=[],this.calculateAxisParameters(),this.setupSizeScales(),this.setupZoomInterpolators()}return y(a,[{key:"onZoom",value:function(t){var i=this;this.currentTickSize=this.tickFontLop(t),this.axisTickTextElements.forEach(function(t){h.select(t).style("font-size",i.currentTickSize+"px")});var e=void 0,a=void 0,s=void 0,n=void 0;2<t?(a=this.projectValueOnAxis(this.minValue+this.range*this.axisLabelFactorLop(t)).x,e=this.projectValueOnAxis(this.minValue+this.range*this.axisLabelFactorLop(t)).y,s=this.axisTitleSizeLopMin(t)+"px",n=this.labelLineSpaceLopMin(t),h.selectAll(this.zoomedLabelLines).attr("x",a).attr("y",e).attr("dy",function(t,e){return n*e}).style("font-size",s).style("fill-opacity",1),h.select(this.labelValue).style("fill-opacity",0),h.selectAll(this.labelLines).style("fill-opacity",0)):(a=this.axisLabelCords().x,e=this.axisLabelCords().y,s=this.axisTitleSizeLop(t)+"px",n=this.labelLineSpacingLop(t),h.selectAll(this.zoomedLabelLines).style("fill-opacity",0),h.select(this.labelValue).style("fill-opacity",1).attr("dy",function(t,e){return n*i.labelLines.length}).style("font-size",s),h.selectAll(this.labelLines).attr("x",a).attr("y",e).attr("dy",function(t,e){return n*e}).style("font-size",s).style("fill-opacity",1)),h.select(this.axisLabelEl).attr("transform",function(){return"rotate("+i.axisLabelRotation()+","+a+","+e+")"})}},{key:"calculateAxisParameters",value:function(){var i=this,t=this.opts,e=this.axisIndex,a=this.axisOptions,s=this.opts.dims,n=s.innerW,r=s.innerH,o=s.optsLeftChartOffset,l=s.optsTopChartOffset,c=this.opts.axis.maxAxisNo,h=o+n/2,u=l+r/2,p=o+n/2*(1-Math.sin(e*L/c)),d=l+r/2*(1-Math.cos(e*L/c));p<h&&d<=u?this.quad=A:h<=p&&d<=u?this.quad=b:p<=h&&u<=d?this.quad="QUAD_3":h<=p&&u<=d&&(this.quad="QUAD_4");var x=p,f=d,g=Math.abs(p-h)<1e-9?1/0:(d-u)/(p-h),m=g===1/0?0:d-g*p;this.gradient=g,this.maxValue=t.axis.useGlobalMax?t.axis.maxValue:a.axisValueMax,this.minValue=t.axis.useGlobalMax||isNaN(a.axisValueMin)?0:a.axisValueMin,this.range=this.maxValue-this.minValue,this.axisLength=Math.sqrt(Math.pow(p-h,2)+Math.pow(d-u,2)),this.angleFromNorth=180/Math.PI*(1-e*L/c)-180/Math.PI-90-180/Math.PI*10/this.axisLength/2,this.axis=a.axisId,this.label=a.label?a.label:a.axisId,this.labelLines=[],this.labelValue=null,this.words=this.label.split(" "),this.lines=[this.words[0]],this.lines=this.words.slice(1).reduce(function(t,e){return t[t.length-1].length+e.length<=i.opts.axis.textOverflowWidthLimit?t[t.length-1]=t[t.length-1]+" "+e:t.push(e),t},this.lines),this.zoomedLabelLines=[],this.zoomLines=[this.words[0]],this.zoomLines=this.words.slice(1).reduce(function(t,e){return t[t.length-1].length+e.length<=i.opts.axis.textOverflowWidthLimitZoomed?t[t.length-1]=t[t.length-1]+" "+e:t.push(e),t},this.zoomLines),this.x1=h,this.y1=u,this.x2=p,this.y2=d,this.labelX=x,this.labelY=f;var y=Math.sin(e*L/c),v=Math.cos(e*L/c);this.projectCordToAxis=function(t,e){return g===1/0?{x:h,y:e}:g<-2||0<=g||g<.145?{x:t,y:g*t+m}:{x:(e-m)/g,y:e}},this.projectValueOnAxis=function(t){return{x:o+n/2*(1-(parseFloat(t)-this.minValue)/this.range*y),y:l+r/2*(1-(parseFloat(t)-this.minValue)/this.range*v)}},this.cordOnAxisToValue=function(t,e){if(this.gradient===1/0){var i=Math.abs(this.y2-e);return this.minValue+(this.axisLength-i)*this.range/this.axisLength}if(0<=this.gradient&&this.gradient<1e-8){var a=Math.abs(this.x2-t);return this.minValue+(this.axisLength-a)*this.range/this.axisLength}return this.minValue+(2*(t-o)/n-1)*(this.range/y)*-1}}},{key:"onRectMouseOver",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(t){h.select(t).style("opacity",.9)})}},{key:"onRectMouseOut",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(t){h.select(t).transition(200).style("opacity",0)})}},{key:"axisLabelRotation",value:function(){return-270<this.angleFromNorth?this.angleFromNorth-180:this.angleFromNorth}},{key:"axisLabelCords",value:function(t){return t?this.projectValueOnAxis(this.axisLabelCordLop(t)):this.projectValueOnAxis(this.axisLabelCordLop(this.opts.zoomProps.scaleExtent.minZoom))}},{key:"setAxisLabelValue",value:function(t){if(null===t)h.select(this.labelValue).text("");else{var e=h.format(".3");h.select(this.labelValue).text(e(t))}}},{key:"setupZoomInterpolators",value:function(){var t=this.opts.zoomProps.scaleExtent,e=t.maxZoom,i=t.minZoom,a=this.opts.dims.width;this.axisTitleSizeLop=h.scaleLog().base(5).domain([i,e]).range([this.scaledTitleSize,.1*this.scaledTitleSize]),this.axisTitleSizeLopMin=h.scaleLog().base(5).domain([i,e]).range([3,2]),this.tickFontLop=h.scaleLog().domain([i,e]).range([this.scaledTickSize,this.opts.axis.ticks.maxZoomFont]),this.axisLabelCordLop=h.scaleLog().base(20).domain([i,e]).range([this.maxValue,this.minValue]),this.axisLabelFactorLop=h.scaleLog().domain([i,e]).range([.2,.1]),this.labelLineSpacingLop=h.scaleLinear().domain([i,e]).range([this.textLineSpacingPx(a),.1*this.textLineSpacingPx(a)]),this.labelLineSpaceLopMin=h.scaleLinear().domain([i,e]).range([.5*this.textLineSpacingPx(a),.3*this.textLineSpacingPx(a)*.5])}},{key:"setupSizeScales",value:function(){var t=this.opts.dims.width,e=this.opts,i=e.axis.axisScaleProps;e.axis.tickScale?this.tickScale=e.axis.tickScale:this.tickScale=h.scaleLinear().domain([100,1200]).range([5,20]),e.axis.axisTitleScale?this.axisTitleScale=e.axis.tickScale:this.axisTitleScale=h.scaleLinear().domain([100,1200]).range([i.minTitleSize,i.maxTitleSize]),this.textLineSpacingPx=h.scaleLinear().domain([100,1200]).range([i.minTextLineSpacing,i.maxTextLineSpacing]),this.scaledTickSize=this.tickScale(t),this.scaledTitleSize=this.axisTitleScale(t),this.currentTickSize=this.tickScale(t)}}]),a}(),S=function(){function a(t){var i=this;n(this,a),this.axisMap=t.axisMap,this.series=u.cloneDeep(t.series),this.drawingContext=t.drawingContext,this.seriesIdent=t.seriesIdent,this.seriesIndex=t.seriesIndex,this.zoomConfig=t.zoomProps,this.opts=u.cloneDeep(t.areaOptions),this.dims=t.dims,this.opts.onValueChange=t.areaOptions.onValueChange,this.opts.colorScale=t.areaOptions.colorScale,this.onAreaUpdate=t.onAreaUpdate,this.dragCoordOffset={x:0,y:0},this.label=this.series.label;var e=this.label.split(" ");this.legendLabelLines=[e[0]],this.legendLabelLines=e.slice(1).reduce(function(t,e){return t[t.length-1].length+e.length<=i.opts.textOverflowWidthLimit?t[t.length-1]=t[t.length-1]+" "+e:t.push(e),t},this.legendLabelLines),this.labelTextLineSpacing=h.scaleLinear().domain([100,1200]).range(this.opts.textLineSpacingRangeLegend),this.polygonClassName="chart-poly-"+this.seriesIdent,this.polygonVertexLables="poly-labels-"+this.seriesIdent,this.circleOverlayClassName="circle-overlay"+this.seriesIdent,this.circleClassName="circle-"+this.seriesIdent,this.currentAreaOpacity=this.opts.areaHighlightProps.defaultAreaOpacity,this.points=this.series.data.map(function(t){return{cords:i.axisMap[t.axis].projectValueOnAxis(t.value),datum:u.cloneDeep(t)}}),this.polygonWrapper={points:this.points,svgStringRep:this.points.reduce(function(t,e){return t+e.cords.x+","+e.cords.y+" "},"")},this.setupZoomInterpolators(),this.legendLabelEls=[],this.onLegendOver=this.onLegendOver.bind(this),this.onLegendOut=this.onLegendOut.bind(this),this.hilightThisAreaRemove=this.hilightThisAreaRemove.bind(this),this.hilightThisArea=this.hilightThisArea.bind(this),this.state=l,this.postRenderQueue=[],this.draggingParams={tFMatrix:null,svgEl:null}}return y(a,[{key:"createEventHandler",value:function(s,n){return function(t){switch(s){case c:n.state!==p&&n.state!==r&&(n.state=o,h.select(t.circleRef).style("fill-opacity",n.opts.hoverCircleOpacity),n.hilightThisArea(),h.select(t.circleRef).transition(100).attr("r",n.opts.circleProps.defaultRadius*n.opts.circleProps.circleOverlayRadiusMult),n.axisMap[t.datum.axis].setAxisLabelValue(n.getCurrentValueForAxis(t.datum.axis)));break;case d:n.state===o?(h.select(t.circleRef).style("fill-opacity",n.opts.defaultCircleOpacity),n.hilightThisAreaRemove(),h.select(t.circleRef).transition(100).attr("r",n.opts.circleProps.defaultRadius),n.axisMap[t.datum.axis].setAxisLabelValue(null),n.state=l):n.state===p&&(n.state=r);break;case x:if(m.isFirefox){var e=this.getCTM(),i=n.drawingContext().nodes()[0].parentNode,a=i.createSVGMatrix();a.e=i.parentNode.getBoundingClientRect().x,a.f=i.parentNode.getBoundingClientRect().y,a=a.multiply(e),n.draggingParams.tFMatrix=a.inverse(),n.draggingParams.svgEl=i}break;case f:n.draggingActions(t,n);break;case g:n.axisMap[t.datum.axis].dragActive=!1,n.axisMap[t.datum.axis].onRectMouseOut(),n.axisMap[t.datum.axis].setAxisLabelValue(null),h.select(t.circleRef).style("fill-opacity",n.opts.defaultCircleOpacity),n.state=l,n.postRenderQueue.push(function(){return n.hilightThisAreaRemove()}),n.updatePolygonPositions(),n.ctm=null}}}},{key:"createOnMouseOverPolygon",value:function(){var i=this;return function(t){var e="."+i.polygonClassName;i.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",i.opts.areaHighlightProps.hiddenAreaOpacity),i.drawingContext().selectAll(e).transition(200).style("fill-opacity",i.opts.areaHighlightProps.highlightedAreaOpacity)}}},{key:"createOnMouseOutPolygon",value:function(){var e=this;return function(t){h.select(this).transition(200).style("fill-opacity",e.opts.areaHighlightProps.defaultAreaOpacity)}}},{key:"draggingActions",value:function(t,e){var i=e.axisMap[t.datum.axis];e.axisMap[t.datum.axis].onRectMouseOver(),e.axisMap[t.datum.axis].dragActive=!0;var a=h.event,s=a.x,n=a.y;if(m.isFirefox){var r=e.draggingParams.svgEl.createSVGPoint();r.x=h.event.sourceEvent.clientX,r.y=h.event.sourceEvent.clientY,s=(r=r.matrixTransform(e.draggingParams.tFMatrix)).x,n=r.y}var o=i.projectCordToAxis(s,n).x,l=i.projectCordToAxis(s,n).y;if(i.quad===A||i.quad===b){if(l<i.y2||l>i.y1)return}else if(l<i.y1||l>i.y2)return;this.state=p;var c=i.cordOnAxisToValue(o,l);t.datum.value=c,t.cords=e.axisMap[t.datum.axis].projectValueOnAxis(c),e.axisMap[t.datum.axis].setAxisLabelValue(c),e.updatePolygonPositions(),u.isFunction(e.opts.onValueChange)&&e.opts.onValueChange(t)}},{key:"hilightThisArea",value:function(){var t="."+this.polygonClassName;this.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",this.opts.areaHighlightProps.hiddenAreaOpacity).style("stroke-opacity",this.opts.areaHighlightProps.hiddenStrokeOpacity),this.showVertexLabels(),this.drawingContext().selectAll(t).transition(200).style("fill-opacity",this.opts.areaHighlightProps.highlightedAreaOpacity).style("stroke-opacity",this.opts.areaHighlightProps.highlightedStrokeOpacity),this.currentAreaOpacity=this.opts.areaHighlightProps.highlightedAreaOpacity}},{key:"hideVertexLabels",value:function(){this.drawingContext().selectAll("."+this.polygonVertexLables).style("opacity",this.opts.areaHighlightProps.hiddenLabelOpacity)}},{key:"showVertexLabels",value:function(){this.drawingContext().selectAll("."+this.polygonVertexLables).style("opacity",this.opts.areaHighlightProps.highlightedLabelOpacity)}},{key:"hilightThisAreaRemove",value:function(){this.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",this.opts.areaHighlightProps.defaultAreaOpacity).style("stroke-opacity",this.opts.areaHighlightProps.defaultStrokeOpacity),this.hideVertexLabels(),this.currentAreaOpacity=this.opts.areaHighlightProps.defaultAreaOpacity}},{key:"isDragActive",value:function(){return this.state===r||this.state===p}},{key:"onLegendOver",value:function(){var e=this;this.dragActive||(h.select(this.legendRect).attr("opacity",1),this.legendLabelEls.map(function(t){return h.select(t)}).forEach(function(t){t.attr("fill",e.opts.areaColorScale(e.seriesIndex)),t.attr("font-weight","bold")}),this.hilightThisArea(this),Object.values(this.axisMap).forEach(function(t){t.setAxisLabelValue(e.getCurrentValueForAxis(t.axis))}))}},{key:"onLegendOut",value:function(){this.dragActive||(h.select(this.legendRect).attr("opacity",.7),this.legendLabelEls.map(function(t){return h.select(t)}).forEach(function(t){t.attr("fill",t.attr("original-fill")),t.attr("font-weight","normal")}),this.hilightThisAreaRemove(this),Object.values(this.axisMap).forEach(function(t){t.setAxisLabelValue(null)}))}},{key:"onZoomUpdateSizes",value:function(t){this.opts.lineProps.strokeWidth=this.zlop.areaLineLop(t),this.opts.circleProps.defaultRadius=this.zlop.circleRadiusLop(t),this.opts.labelProps.fontSize=this.zlop.fontLop(t)}},{key:"renderArea",value:function(){var t=this;this.area=this.drawingContext().selectAll(this.polygonClassName).data([this.polygonWrapper]).enter().append("polygon").attr("class",this.polygonClassName).style("stroke-width",this.opts.lineProps.strokeWidth+"px").style("stroke",function(){if(t.opts.useColorScale)return t.opts.lineColorScale(t.seriesIndex)}).style("stroke-opacity",this.opts.areaHighlightProps.defaultStrokeOpacity).attr("points",function(t){return t.svgStringRep}).style("fill",function(){if(t.opts.useColorScale)return t.opts.areaColorScale(t.seriesIndex)}).style("fill-opacity",this.currentAreaOpacity);var e=h.format(".2");this.areaVertexLabels=this.drawingContext().selectAll(this.polygonVertexLables).data(this.points).enter().append("svg:text").text(function(t){return e(t.datum.value)}).attr("x",function(t){return t.cords.x}).attr("y",function(t){return t.cords.y}).attr("class",this.polygonVertexLables).style("font-family",this.opts.labelProps["font-family"]).style("font-size",this.opts.labelProps.fontSize+"px").style("opacity",function(){return t.isDragActive()?1:t.opts.areaHighlightProps.defaultLabelOpacity}),this.opts.areaHighlight&&this.area.on("mouseover",this.createOnMouseOverPolygon()).on("mouseout",this.createOnMouseOutPolygon())}},{key:"renderCircles",value:function(){var t=this;this.circles=this.drawingContext().selectAll(this.circleClassName).data(this.points).enter().append("svg:circle").attr("r",function(){return t.isDragActive()?t.opts.circleProps.circleOverlayRadiusMult*t.opts.circleProps.defaultRadius:t.opts.circleProps.defaultRadius}).attr("alt",function(t){return Math.max(t.value,0)}).attr("cx",function(t){return t.cords.x}).attr("cy",function(t){return t.cords.y}).attr("class",this.circleClassName).style("fill",function(){if(t.opts.useColorScale)return t.opts.lineColorScale(t.seriesIndex)}).style("fill-opacity",function(){return t.isDragActive()?t.opts.hoverCircleOpacity:t.opts.defaultCircleOpacity}).each(function(t){t.circleRef=this}),this.circleOverylays=this.drawingContext().selectAll(this.circleOverlayClassName).data(this.points).enter().append("svg:circle").attr("r",this.opts.circleProps.defaultRadius*this.opts.circleProps.circleOverlayRadiusMult).attr("cx",function(t){return t.cords.x}).attr("cy",function(t){return t.cords.y}).attr("opacity",0).attr("class",this.circleOverlayClassName).attr("pointer-events","all").each(function(t){t.overlayRef=this}),this.series.circleHighlight&&this.circleOverylays.on("mouseover",this.createEventHandler(c,this)).on("mouseout",this.createEventHandler(d,this)),this.series.dragEnabled&&this.circleOverylays.call(h.drag().subject(function(t){return this}).on("start",this.createEventHandler(x,this)).on("drag",this.createEventHandler(f,this)).on("end",this.createEventHandler(g,this))),this.circles.append("svg:title").text(function(t){return t.datum.value})}},{key:"remove",value:function(){this.series.showCircle&&(h.selectAll("."+this.circleOverlayClassName).on("mouseover",null).on("mouseout",null).on("drag",null).on("end",null).data([]).exit().remove(),h.selectAll("."+this.circleClassName).data([]).exit().remove()),this.circles=[],this.circleOverylays=[],this.removeArea()}},{key:"removeArea",value:function(){h.selectAll("."+this.polygonClassName).on("mouseover",null).on("mouseout",null).data([]).exit().remove(),this.areaVertexLabels.remove()}},{key:"render",value:function(){for(this.renderArea(),this.series.showCircle&&this.renderCircles();0<this.postRenderQueue.length;)this.postRenderQueue.pop()()}},{key:"setupZoomInterpolators",value:function(){var t=this.zoomConfig.scaleExtent.maxZoom;this.zlop={};this.zlop.areaLineLop=h.scaleLog().base(8).domain([1,t]).range([this.opts.lineProps.strokeWidth,this.opts.lineProps.maxZoomStroke]),this.zlop.circleRadiusLop=h.scaleLog().base(8).domain([1,t]).range([this.opts.circleProps.defaultRadius,this.opts.circleProps.maxZoomRadius]),this.zlop.fontLop=h.scaleLog().domain([1,t]).range([this.opts.labelProps.fontSize,this.opts.labelProps.maxFontSize])}},{key:"getCurrentValueForAxis",value:function(e){return this.points.find(function(t){return t.datum.axis===e}).datum.value}},{key:"updatePolygonPositions",value:function(){this.polygonWrapper.svgStringRep=this.points.reduce(function(t,e){return t+e.cords.x+","+e.cords.y+" "},""),this.onAreaUpdate()}}]),a}();return function(){function e(t){n(this,e),this.rootElement=h.select(t.rootElement),this.rootElId=this.rootElement.attr("id"),this.setOps(t),this.areas=[],this.axisRectClassName="axis-rect-overlay"}return y(e,[{key:"render",value:function(){this.setupDrawingArea(),this.renderAxis(),this.renderArea(),this.opts.showLegend&&this.renderLegend()}},{key:"setOps",value:function(t){var i=this;this.opts=u.merge({enableZoom:!0,zoomProps:{scaleExtent:{minZoom:1,maxZoom:12}},data:[],dims:{width:500,height:500,translateXp:.05,translateYp:.05,legendSpaceP:.1,innerPaddingP:.1},legend:{interactive:!0,legendWidthP:.9,legendHeightP:.2,legendWOverlap:1.1,legendTopOffsetP:.03,textYOffset:9,textOffsetP:.75,iconHeightP:.02,iconWidthP:.02,iconSpacingP:.05,title:"Test title",scaleTextWithSize:!0,titleScale:null,labelScale:null,titleProperties:{fontSize:12,fill:"#404040"},labelTextProperties:{fontSize:11,fill:"#737373"}},levels:{levelsFractions:[.25,.5,.75]},showLegend:!0,axis:{config:[],useGlobalMax:!1,maxValue:.6,leftOffsetPLabel:.85,rotateTextWithAxis:!0,textOverflowWidthLimit:10,textOverflowWidthLimitZoomed:50,textLineSpacingPx:10,tickScale:null,axisTitleScale:null,axisScaleProps:{minTitleSize:5,maxTitleSize:20,minTickSize:5,maxTickSize:20,minTextLineSpacing:1,maxTextLineSpacing:20},axisLabelProps:{"font-family":"sans-serif",fontSize:11,fill:"#808080","value-fill":"#548bd8"},ticks:{fill:"#737373",minZoomFont:10,maxZoomFont:1,"font-family":"sans-serif"}},area:{areaHighlight:!1,areaHighlightProps:{defaultAreaOpacity:0,highlightedAreaOpacity:.7,hiddenAreaOpacity:.1,defaultStrokeOpacity:.8,highlightedStrokeOpacity:1,hiddenStrokeOpacity:.2,defaultLabelOpacity:0,highlightedLabelOpacity:1,hiddenLabelOpacity:0},labelProps:{"font-family":"sans-serif",fontSize:8,maxFontSize:2},defaultCircleOpacity:.3,hoverCircleOpacity:.5,circleProps:{defaultRadius:5,maxZoomRadius:1,circleOverlayRadiusMult:1.5},useColorScale:!0,areaColorScale:h.scaleOrdinal(h.schemeAccent),lineColorScale:h.scaleOrdinal(h.schemeAccent),onValueChange:null,textOverflowWidthLimit:10,textLineSpacingRangeLegend:[1,20],lineProps:{strokeWidth:2,maxZoomStroke:.5}},rootElement:null},t),this.opts.axis.maxAxisNo=this.opts.axis.config.length;var e=this.opts.dims;e.paddingW=e.width*e.translateXp/2,e.paddingH=e.paddingW,e.legendW=e.width*e.legendSpaceP,e.chartContainerW=e.width-e.paddingW-e.legendW,e.chartContainerH=e.height-2*e.paddingH,e.innerPadding=e.chartContainerH*e.innerPaddingP,e.innerW=e.chartContainerW-2*e.innerPadding,e.innerH=e.chartContainerH-2*e.innerPadding,e.optsLeftChartOffset=e.innerPadding,e.optsTopChartOffset=e.innerPadding;var a=this.opts.legend;a.width=e.legendW*a.legendWidthP,a.height=e.height*a.legendHeightP,a.iconSpacing=a.iconSpacingP*e.height,a.iconHeight=a.iconHeightP*e.height,a.iconWidth=a.iconWidthP*e.height,this.data=this.opts.data,this.axisConfig=this.opts.axis.config,this.axisParameters=this.axisConfig.map(function(t,e){return new v(i.opts,t,e)}),this.axisMap=this.axisParameters.reduce(function(t,e){return t[e.axis]=e,t},{})}},{key:"setupDrawingArea",value:function(){var s=this,t=this.opts.dims,e=t.width,i=t.height,a=t.paddingH,n=t.paddingW;this.rootSvg=this.rootElement.append("svg").attr("width",e).attr("height",i),this.rootSvg.append("g").attr("class","root"+this.rootElId).attr("transform","translate("+n+","+a+")"),this.opts.enableZoom&&(this.zoom=h.zoom().on("zoom",function(t){if(m.isFirefox){var e=h.event.transform.k,i=e>s.opts.zoomProps.scaleExtent.minZoom?.1*e:s.opts.zoomProps.scaleExtent.minZoom,a=e<s.opts.zoomProps.scaleExtent.maxZoom?1.1*e:s.opts.zoomProps.scaleExtent.maxZoom;s.zoom.scaleExtent([i,a]),s.drawingContext().attr("transform",h.event.transform),s.areas.forEach(function(t){return t.onZoomUpdateSizes(e)}),s.axisParameters.forEach(function(t){return t.onZoom(e)})}else s.drawingContext().attr("transform",h.event.transform),s.areas.forEach(function(t){return t.onZoomUpdateSizes(h.event.transform.k)}),s.axisParameters.forEach(function(t){return t.onZoom(h.event.transform.k)});s.onUpdateArea()}).translateExtent([[0,0],[e,i]]).scaleExtent([this.opts.zoomProps.scaleExtent.minZoom,this.opts.zoomProps.scaleExtent.maxZoom]),this.rootSvg.call(this.zoom)),this.drawingContext=function(){var t=this.rootElId.toString();return function(){return h.select(".root"+t)}}.bind(this)()}},{key:"renderAxis",value:function(){for(var o=this,t=this.opts,r=this.opts.dims.width,e=function(n){var r=o.opts.levels.levelsFractions;o.drawingContext().selectAll(".levels").data(o.axisParameters).enter().append("svg:line").attr("x1",function(t,e){var i=t.range*r[n]+t.minValue;return t.projectValueOnAxis(i).x}).attr("y1",function(t,e){var i=t.range*r[n]+t.minValue;return t.projectValueOnAxis(i).y}).attr("x2",function(t,e){var i=e+1===o.axisParameters.length?0:e+1,a=o.axisParameters[i],s=a.range*r[n]+a.minValue;return a.projectValueOnAxis(s).x}).attr("y2",function(t,e){var i=e+1===o.axisParameters.length?0:e+1,a=o.axisParameters[i],s=a.range*r[n]+a.minValue;return a.projectValueOnAxis(s).y}).attr("class","line").style("stroke","#DCDCDC").style("stroke-opacity","0.75").style("stroke-width","0.3px")},i=0;i<t.levels.levelsFractions.length;i++)e(i);var s=h.format(".2%"),n=t.axis.ticks,a=function(i){var a=o.opts.levels.levelsFractions;o.drawingContext().selectAll(".levels").data(o.axisParameters).enter().append("svg:text").attr("x",function(t){var e=t.range*a[i]+t.minValue;return t.projectValueOnAxis(e).x}).attr("y",function(t){var e=t.range*a[i]+t.minValue;return t.projectValueOnAxis(e).y}).attr("class","legend").style("font-family",n["font-family"]).style("font-size",function(t){return t.scaledTickSize+"px"}).style("opacity",0).attr("fill",n.fill).text(function(t){return s(a[i])}).each(function(t){t.axisTickTextElements.push(this)})};for(i=0;i<t.levels.levelsFractions.length;i++)a(i);this.axisG=this.drawingContext().selectAll(".axis").data(this.axisParameters).enter().append("g"),this.axisLines=this.axisG.append("line").attr("class","axisline").attr("x1",function(t){return t.x1}).attr("y1",function(t){return t.y1}).attr("x2",function(t){return t.x2}).attr("y2",function(t){return t.y2}).attr("pointer-events","none").style("stroke","#E0E0E0").style("stroke-opacity",.75).style("stroke-width","0.3px"),this.rects=this.axisG.append("rect").attr("class",this.axisRectClassName).attr("x",function(t){return t.x1}).attr("y",function(t){return t.y1}).attr("transform",function(t,e){return"rotate("+t.angleFromNorth+","+t.x1+","+t.y1+")"}).attr("width",function(t){return t.axisLength}).attr("height",10).attr("fill-opacity",0).on("mouseover",function(t){return t.onRectMouseOver()}).on("mouseout",function(t){return t.onRectMouseOut()}).each(function(t){t.axisRect=this});var l=this.opts.axis.axisLabelProps;this.axisText=this.axisG.append("text").attr("class","axis-label").attr("pointer-events","none").attr("transform",function(t,e){return o.opts.axis.rotateTextWithAxis?"rotate("+t.axisLabelRotation()+","+t.x2+","+t.y2+")":""}).text("").each(function(t){var i=this;t.axisLabelEl=this;for(var a=t.lines,e=function(e){h.select(i).append("tspan").attr("x",function(t){return t.axisLabelCords().x}).attr("y",function(t){return t.axisLabelCords().y}).attr("dy",function(t){return t.textLineSpacingPx(r)*e}).text(a[e]).style("font-family",l["font-family"]).style("font-size",function(t){return t.axisTitleScale(r)+"px"}).style("fill",l.fill).attr("text-anchor","middle").each(function(t){t.labelLines.push(this)})},s=0;s<a.length;s++)e(s);h.select(this).append("tspan").attr("x",function(t){return t.axisLabelCords().x}).attr("y",function(t){return t.axisLabelCords().y}).attr("dy",function(t){return t.textLineSpacingPx(r)*t.lines.length}).text("").style("font-family",l["font-family"]).style("font-size",function(t){return t.axisTitleScale(r)+"px"}).style("fill",l["value-fill"]).attr("text-anchor","middle").each(function(t){t.labelValue=this});var n=function(e){h.select(i).append("tspan").attr("x",function(t){return t.axisLabelCords().x}).attr("y",function(t){return t.axisLabelCords().y}).attr("dy",function(t){return t.textLineSpacingPx(r)*e}).text(t.zoomLines[e]).style("font-family",l["font-family"]).style("font-size",function(t){return t.axisTitleScale(r)+"px"}).style("fill",l.fill).style("fill-opacity",0).attr("text-anchor","middle").each(function(t){t.zoomedLabelLines.push(this)})};for(s=0;s<t.zoomLines.length;s++)n(s)})}},{key:"renderArea",value:function(){var i=this;this.areas=this.data.map(function(t,e){return new S({axisMap:i.axisMap,dims:i.opts.dims,series:t,drawingContext:i.drawingContext,seriesIdent:""+e+i.rootElId,seriesIndex:e,areaOptions:i.opts.area,onAreaUpdate:i.onUpdateArea.bind(i),zoomProps:i.opts.zoomProps})}),this.areas.forEach(function(t){return t.render()})}},{key:"renderLegend",value:function(){var i=this,t=this.opts.dims,r=t.width,e=t.height,o=t.legendW,l=this.opts.legend,a=this.rootSvg.append("svg").attr("width",r).attr("height",e);l.scaleTextWithSize&&!l.titleScale&&(l.titleScale=h.scaleLinear().domain([100,1200]).range([5,20])),l.scaleTextWithSize&&!l.labelScale&&(l.labelScale=h.scaleLinear().domain([100,1200]).range([5,15])),a.append("text").attr("class","title").attr("x",r-o*(1+l.legendWOverlap)).attr("y",l.legendTopOffsetP*e).text(l.title).style("font-size",function(){return l.scaleTextWithSize?l.titleScale(r)+"px":l.titleProperties.fontSize+"px"}).attr("fill",l.titleProperties.fill);var s=a.append("g").attr("class","legend").attr("height",l.height).attr("width",l.width).attr("transform","translate(0,"+l.legendTopOffsetP*e*2+")");s.selectAll("rect").data(this.areas).enter().append("rect").attr("x",r-o*(1+l.legendWOverlap)).attr("y",function(t,e){return e*l.iconSpacing}).attr("width",l.iconWidth).attr("height",l.iconHeight).attr("opacity",.7).style("fill",function(t,e){return i.opts.area.areaColorScale(e)}).each(function(t){t.legendRect=this}),s.selectAll("text").data(this.areas).enter().append("text").text("").each(function(t,i){for(var a=this,e=t.legendLabelLines,s=function(e){h.select(a).append("tspan").attr("x",r-o*(1+l.legendWOverlap)*l.textOffsetP).attr("y",function(t){return i*l.iconSpacing+l.textYOffset}).attr("dy",function(t){return t.labelTextLineSpacing(r)*e}).text(function(t){return t.legendLabelLines[e]}).style("font-size",function(){return l.scaleTextWithSize?l.labelScale(r)+"px":l.labelTextProperties.fontSize+"px"}).attr("fill",l.labelTextProperties.fill).attr("original-fill",l.labelTextProperties.fill).each(function(t){t.legendLabelEls.push(this)})},n=0;n<e.length;n++)s(n)}),s.selectAll("legend-rect-overlays").data(this.areas).enter().append("rect").attr("x",r-o*(1+l.legendWOverlap)).attr("y",function(t,e){return e*l.iconSpacing}).attr("width",o*(1+l.legendWOverlap)).attr("height",l.iconSpacing).attr("opacity",0).on("mouseover",function(t,e){t.onLegendOver(t)}).on("mouseout",function(t,e){t.onLegendOut(t)}).each(function(t){t.rectOverlay=t})}},{key:"reRenderWithNewData",value:function(t){this.data=t,this.removeAreas(),this.renderArea()}},{key:"reRenderWithNewOptions",value:function(t){this.delete(),this.setOps(t),this.areas=[],this.render()}},{key:"removeAxis",value:function(){this.axisLines.remove(),this.axisText.remove(),h.selectAll("."+this.axisRectClassName).on("mouseover",null).on("mouseout",null).data([]).exit().remove()}},{key:"removeAreas",value:function(){this.areas.forEach(function(t){return t.remove()})}},{key:"delete",value:function(){this.removeAreas(),this.removeAxis(),this.rootSvg.remove()}},{key:"onUpdateArea",value:function(){this.removeAreas(),this.areas.forEach(function(t){return t.render()})}}]),e}()});
