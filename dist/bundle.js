!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("d3"),require("lodash")):"function"==typeof define&&define.amd?define(["d3","lodash"],t):e.RadarChart=t(e.d3,e._)}(this,function(c,u){"use strict";var e,t,i,a,s,p="DRAGGING",r="CIRCLE_LEAVE_WHILE_DRAGGING",o="CIRCLE_HOVER",l="NEUTRAL",h="CIRCLE_WHEEL_SCROLL",d="CIRCLE_ENTER",x="CIRCLE_LEAVE",f="DRAGGING_START",g="DRAGGING",y="DRAGGING_END",m=(e=!!window.opr&&!!window.opr.addons||!!window.opera||0<=navigator.userAgent.indexOf(" OPR/"),t="undefined"!=typeof InstallTrigger,i=!!document.documentMode,a=!i&&!!window.StyleMedia,s=!!window.chrome&&!!window.chrome.webstore,{isOpera:e,isFirefox:t,isIE:i,isEdge:a,isChrome:s,isBlink:(s||e)&&!!window.CSS}),L=2*Math.PI,n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},v=function(){function a(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}}(),b="QUAD_1",A="QUAD_2",O=function(){function s(e,t,i,a){n(this,s),this.opts=e,this.axisIndex=i,this.axisOptions=t,this.dragActive=!1,this.axisTickTextElements=[],this.calculateAxisParameters(),this.setupSizeScales(),this.setupZoomInterpolators(),this.axisLineEl=null,this.onAxisLabelWheel=a}return v(s,[{key:"onZoom",value:function(e){var i=this;this.currentTickSize=this.tickFontLop(e),this.axisTickTextElements.forEach(function(e){c.select(e).style("font-size",i.currentTickSize+"px")});var t=void 0,a=void 0,s=void 0,n=void 0;2<e?(a=this.projectValueOnAxis(this.minValue+this.range*this.axisLabelFactorLop(e)).x,t=this.projectValueOnAxis(this.minValue+this.range*this.axisLabelFactorLop(e)).y,s=this.axisTitleSizeLopMin(e)+"px",n=this.labelLineSpaceLopMin(e),c.selectAll(this.zoomedLabelLines).attr("x",a).attr("y",t).attr("dy",function(e,t){return n*t}).style("font-size",s).style("fill-opacity",1),c.select(this.labelValue).style("fill-opacity",0),c.selectAll(this.labelLines).style("fill-opacity",0)):(a=this.axisLabelCords().x,t=this.axisLabelCords().y,s=this.axisTitleSizeLop(e)+"px",n=this.labelLineSpacingLop(e),c.selectAll(this.zoomedLabelLines).style("fill-opacity",0),c.select(this.labelValue).style("fill-opacity",1).attr("dy",function(e,t){return n*i.labelLines.length}).style("font-size",s),c.selectAll(this.labelLines).attr("x",a).attr("y",t).attr("dy",function(e,t){return n*t}).style("font-size",s).style("fill-opacity",1)),c.select(this.axisLabelEl).attr("transform",function(){return"rotate("+i.axisLabelRotation()+","+a+","+t+")"})}},{key:"calculateAxisParameters",value:function(){var i=this,e=this.opts,t=this.axisIndex,a=this.axisOptions,s=this.opts.dims,n=s.innerW,r=s.innerH,o=s.optsLeftChartOffset,l=s.optsTopChartOffset,h=this.opts.axis.maxAxisNo,c=o+n/2,u=l+r/2,p=o+n/2*(1-Math.sin(t*L/h)),d=l+r/2*(1-Math.cos(t*L/h));p<c&&d<=u?this.quad=b:c<=p&&d<=u?this.quad=A:p<=c&&u<=d?this.quad="QUAD_3":c<=p&&u<=d&&(this.quad="QUAD_4");var x=p,f=d,g=Math.abs(p-c)<1e-9?1/0:(d-u)/(p-c),y=g===1/0?0:d-g*p;this.gradient=g,this.maxValue=e.axis.useGlobalMax?e.axis.maxValue:a.axisValueMax,this.minValue=e.axis.useGlobalMax||isNaN(a.axisValueMin)?0:a.axisValueMin,this.range=this.maxValue-this.minValue,this.axisLength=Math.sqrt(Math.pow(p-c,2)+Math.pow(d-u,2)),this.angleFromNorth=180/Math.PI*(1-t*L/h)-180/Math.PI-90-180/Math.PI*10/this.axisLength/2,this.axis=a.axisId,this.label=a.label?a.label:a.axisId,this.labelLines=[],this.labelValue=null,this.words=this.label.split(" "),this.lines=[this.words[0]],this.lines=this.words.slice(1).reduce(function(e,t){return e[e.length-1].length+t.length<=i.opts.axis.textOverflowWidthLimit?e[e.length-1]=e[e.length-1]+" "+t:e.push(t),e},this.lines),this.zoomedLabelLines=[],this.zoomLines=[this.words[0]],this.zoomLines=this.words.slice(1).reduce(function(e,t){return e[e.length-1].length+t.length<=i.opts.axis.textOverflowWidthLimitZoomed?e[e.length-1]=e[e.length-1]+" "+t:e.push(t),e},this.zoomLines),this.x1=c,this.y1=u,this.x2=p,this.y2=d,this.labelX=x,this.labelY=f;var m=Math.sin(t*L/h),v=Math.cos(t*L/h);this.projectCordToAxis=function(e,t){return g===1/0?{x:c,y:t}:g<-2||0<=g||g<.145?{x:e,y:g*e+y}:{x:(t-y)/g,y:t}},this.projectValueOnAxis=function(e){return{x:o+n/2*(1-(parseFloat(e)-this.minValue)/this.range*m),y:l+r/2*(1-(parseFloat(e)-this.minValue)/this.range*v)}},this.cordOnAxisToValue=function(e,t){if(this.gradient===1/0){var i=Math.abs(this.y2-t);return this.minValue+(this.axisLength-i)*this.range/this.axisLength}if(0<=this.gradient&&this.gradient<1e-8){var a=Math.abs(this.x2-e);return this.minValue+(this.axisLength-a)*this.range/this.axisLength}return this.minValue+(2*(e-o)/n-1)*(this.range/m)*-1}}},{key:"onAxisLineRectOver",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(e){c.select(e).style("opacity",.9)})}},{key:"onAxisLineRectMouseOut",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(e){c.select(e).transition(200).style("opacity",0)})}},{key:"onLabelRectOver",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(e){c.select(e).style("opacity",1)}),c.select(this.axisLineEl).transition(200).style("stroke-width","0.8px").style("stroke",this.opts.axis.lineProps["hover-fill"]),c.selectAll(this.labelLines).style("fill",this.opts.axis.axisLabelProps["hover-fill"]),this.opts.axis.onAxisLabelOver&&this.opts.axis.onAxisLabelOver(this.axisOptions.axisId)}},{key:"onLabelWheel",value:function(){this.onAxisLabelWheel(this)}},{key:"onLabelRectOut",value:function(){c.select(this.axisLineEl).transition(200).style("stroke",this.opts.axis.lineProps.fill),this.axisTickTextElements.forEach(function(e){c.select(e).transition(200).style("stroke-width","0.5px").style("opacity",0)}),c.selectAll(this.labelLines).style("fill",this.opts.axis.axisLabelProps.fill),this.setAxisLabelValue(null),this.opts.axis.onAxisLabelOut&&this.opts.axis.onAxisLabelOut(this.axisOptions.axisId)}},{key:"axisLabelRotation",value:function(){return-270<this.angleFromNorth?this.angleFromNorth-180:this.angleFromNorth}},{key:"axisLabelCords",value:function(e){return e?this.projectValueOnAxis(this.axisLabelCordLop(e)):this.projectValueOnAxis(this.axisLabelCordLop(this.opts.zoomProps.scaleExtent.minZoom))}},{key:"setAxisLabelValue",value:function(e){if(null===e)c.select(this.labelValue).text("");else{var t=c.format(".3");c.select(this.labelValue).text(t(e))}}},{key:"setupZoomInterpolators",value:function(){var e=this.opts.zoomProps.scaleExtent,t=e.maxZoom,i=e.minZoom,a=this.opts.dims.width;this.axisTitleSizeLop=c.scaleLog().base(5).domain([i,t]).range([this.scaledTitleSize,.1*this.scaledTitleSize]),this.axisTitleSizeLopMin=c.scaleLog().base(5).domain([i,t]).range([3,2]),this.tickFontLop=c.scaleLog().domain([i,t]).range([this.scaledTickSize,this.opts.axis.ticks.maxZoomFont]),this.axisLabelCordLop=c.scaleLog().base(20).domain([i,t]).range([this.maxValue,this.minValue]),this.axisLabelFactorLop=c.scaleLog().domain([i,t]).range([.2,.1]),this.labelLineSpacingLop=c.scaleLinear().domain([i,t]).range([this.textLineSpacingPx(a),.1*this.textLineSpacingPx(a)]),this.labelLineSpaceLopMin=c.scaleLinear().domain([i,t]).range([.5*this.textLineSpacingPx(a),.3*this.textLineSpacingPx(a)*.5])}},{key:"setupSizeScales",value:function(){var e=this,t=this.opts.dims.width,i=this.opts,a=i.axis.axisScaleProps;i.axis.tickScale?this.tickScale=i.axis.tickScale:this.tickScale=c.scaleLinear().domain([100,1200]).range([5,20]),i.axis.axisTitleScale?this.axisTitleScale=i.axis.tickScale:this.axisTitleScale=c.scaleLinear().domain([100,1200]).range([a.minTitleSize,a.maxTitleSize]),this.textLineSpacingPx=c.scaleLinear().domain([100,1200]).range([a.minTextLineSpacing,a.maxTextLineSpacing]),this.scaledTickSize=this.tickScale(t),this.scaledTitleSize=this.axisTitleScale(t),this.currentTickSize=this.tickScale(t),this.overLayWidth=this.axisTitleScale(t)*this.opts.axis.textOverflowWidthLimit,this.overLayx=function(){return e.axisLabelCords().x-e.overLayWidth/2},this.overLayHeight=function(){return(1+e.lines.length)*e.axisTitleScale(t)*2},this.overLayy=function(){return e.axisLabelCords().y-e.overLayHeight()/2.5}}}]),s}(),P=function(){function a(e){var i=this;n(this,a),this.axisMap=e.axisMap,this.series=u.cloneDeep(e.series),this.drawingContext=e.drawingContext,this.seriesIdent=e.seriesIdent,this.seriesIndex=e.seriesIndex,this.zoomConfig=e.zoomProps,this.opts=u.cloneDeep(e.areaOptions),this.dims=e.dims,this.opts.onValueChange=e.areaOptions.onValueChange,this.opts.onValueFinishChange=e.areaOptions.onValueFinishChange,this.opts.colorScale=e.areaOptions.colorScale,this.onAreaUpdate=e.onAreaUpdate,this.dragCoordOffset={x:0,y:0},this.label=this.series.label;var t=this.label.split(" ");this.legendLabelLines=[t[0]],this.legendLabelLines=t.slice(1).reduce(function(e,t){return e[e.length-1].length+t.length<=i.opts.textOverflowWidthLimit?e[e.length-1]=e[e.length-1]+" "+t:e.push(t),e},this.legendLabelLines),this.labelTextLineSpacing=c.scaleLinear().domain([100,1200]).range(this.opts.textLineSpacingRangeLegend),this.polygonClassName="chart-poly-"+this.seriesIdent,this.polygonVertexLables="poly-labels-"+this.seriesIdent,this.circleOverlayClassName="circle-overlay"+this.seriesIdent,this.circleClassName="circle-"+this.seriesIdent,this.currentAreaOpacity=this.opts.areaHighlightProps.defaultAreaOpacity,this.points=this.series.data.map(function(e){return{cords:i.axisMap[e.axis].projectValueOnAxis(e.value),datum:u.cloneDeep(e)}}),this.polygonWrapper={points:this.points,svgStringRep:this.points.reduce(function(e,t){return e+t.cords.x+","+t.cords.y+" "},"")},this.setupZoomInterpolators(),this.legendLabelEls=[],this.onLegendOver=this.onLegendOver.bind(this),this.onLegendOut=this.onLegendOut.bind(this),this.hilightThisAreaRemove=this.hilightThisAreaRemove.bind(this),this.hilightThisArea=this.hilightThisArea.bind(this),this.state=l,this.postRenderQueue=[],this.draggingParams={tFMatrix:null,svgEl:null}}return v(a,[{key:"createEventHandler",value:function(s,n){return function(e){switch(s){case h:c.event.stopPropagation();break;case d:n.state!==p&&n.state!==r&&(n.state=o,c.select(e.circleRef).style("fill-opacity",n.opts.hoverCircleOpacity),n.hilightThisArea(),c.select(e.circleRef).transition(100).attr("r",n.opts.circleProps.defaultRadius*n.opts.circleProps.circleOverlayRadiusMult),n.axisMap[e.datum.axis].setAxisLabelValue(n.getCurrentValueForAxis(e.datum.axis)));break;case x:n.state===o?(c.select(e.circleRef).style("fill-opacity",n.opts.defaultCircleOpacity),n.hilightThisAreaRemove(),c.select(e.circleRef).transition(100).attr("r",n.opts.circleProps.defaultRadius),n.axisMap[e.datum.axis].setAxisLabelValue(null),n.state=l):n.state===p&&(n.state=r);break;case f:if(m.isFirefox){var t=this.getCTM(),i=n.drawingContext().nodes()[0].parentNode,a=i.createSVGMatrix();a.e=i.parentNode.getBoundingClientRect().x,a.f=i.parentNode.getBoundingClientRect().y,a=a.multiply(t),n.draggingParams.tFMatrix=a.inverse(),n.draggingParams.svgEl=i}break;case g:n.draggingActions(e,n);break;case y:n.axisMap[e.datum.axis].dragActive=!1,n.axisMap[e.datum.axis].onAxisLineRectMouseOut(),n.axisMap[e.datum.axis].setAxisLabelValue(null),c.select(e.circleRef).style("fill-opacity",n.opts.defaultCircleOpacity),n.state=l,n.postRenderQueue.push(function(){return n.hilightThisAreaRemove()}),n.updatePolygonPositions(),n.ctm=null,u.isFunction(n.opts.onValueFinishChange)&&n.opts.onValueFinishChange(n.label)}}}},{key:"createOnMouseOverPolygon",value:function(){var i=this;return function(e){var t="."+i.polygonClassName;i.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",i.opts.areaHighlightProps.hiddenAreaOpacity),i.drawingContext().selectAll(t).transition(200).style("fill-opacity",i.opts.areaHighlightProps.highlightedAreaOpacity)}}},{key:"createOnMouseOutPolygon",value:function(){var t=this;return function(e){c.select(this).transition(200).style("fill-opacity",t.opts.areaHighlightProps.defaultAreaOpacity)}}},{key:"draggingActions",value:function(e,t){var i=t.axisMap[e.datum.axis];t.axisMap[e.datum.axis].onAxisLineRectOver(),t.axisMap[e.datum.axis].dragActive=!0;var a=c.event,s=a.x,n=a.y;if(m.isFirefox){var r=t.draggingParams.svgEl.createSVGPoint();r.x=c.event.sourceEvent.clientX,r.y=c.event.sourceEvent.clientY,s=(r=r.matrixTransform(t.draggingParams.tFMatrix)).x,n=r.y}var o=i.projectCordToAxis(s,n).x,l=i.projectCordToAxis(s,n).y;if(i.quad===b||i.quad===A){if(l<i.y2||l>i.y1)return}else if(l<i.y1||l>i.y2)return;this.state=p;var h=i.cordOnAxisToValue(o,l);e.datum.value=h,e.cords=t.axisMap[e.datum.axis].projectValueOnAxis(h),t.axisMap[e.datum.axis].setAxisLabelValue(h),t.updatePolygonPositions(),u.isFunction(t.opts.onValueChange)&&t.opts.onValueChange(e)}},{key:"hilightThisArea",value:function(){var e="."+this.polygonClassName;this.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",this.opts.areaHighlightProps.hiddenAreaOpacity).style("stroke-opacity",this.opts.areaHighlightProps.hiddenStrokeOpacity),this.showVertexLabels(),this.drawingContext().selectAll(e).transition(200).style("fill-opacity",this.opts.areaHighlightProps.highlightedAreaOpacity).style("stroke-opacity",this.opts.areaHighlightProps.highlightedStrokeOpacity),this.currentAreaOpacity=this.opts.areaHighlightProps.highlightedAreaOpacity}},{key:"hideVertexLabels",value:function(){this.drawingContext().selectAll("."+this.polygonVertexLables).style("opacity",this.opts.areaHighlightProps.hiddenLabelOpacity)}},{key:"showVertexLabels",value:function(){this.drawingContext().selectAll("."+this.polygonVertexLables).style("opacity",this.opts.areaHighlightProps.highlightedLabelOpacity)}},{key:"hilightThisAreaRemove",value:function(){this.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",this.opts.areaHighlightProps.defaultAreaOpacity).style("stroke-opacity",this.opts.areaHighlightProps.defaultStrokeOpacity),this.hideVertexLabels(),this.currentAreaOpacity=this.opts.areaHighlightProps.defaultAreaOpacity}},{key:"isDragActive",value:function(){return this.state===r||this.state===p}},{key:"onLegendOver",value:function(){var t=this;this.dragActive||(c.select(this.legendRect).attr("opacity",1),this.legendLabelEls.map(function(e){return c.select(e)}).forEach(function(e){e.attr("fill",t.opts.areaColorScale(t.seriesIndex)),e.attr("font-weight","bold")}),this.hilightThisArea(this),Object.values(this.axisMap).forEach(function(e){e.setAxisLabelValue(t.getCurrentValueForAxis(e.axis))}))}},{key:"onLegendOut",value:function(){this.dragActive||(c.select(this.legendRect).attr("opacity",.7),this.legendLabelEls.map(function(e){return c.select(e)}).forEach(function(e){e.attr("fill",e.attr("original-fill")),e.attr("font-weight","normal")}),this.hilightThisAreaRemove(this),Object.values(this.axisMap).forEach(function(e){e.setAxisLabelValue(null)}))}},{key:"onZoomUpdateSizes",value:function(e){this.opts.lineProps.strokeWidth=this.zlop.areaLineLop(e),this.opts.circleProps.defaultRadius=this.zlop.circleRadiusLop(e),this.opts.labelProps.fontSize=this.zlop.fontLop(e)}},{key:"renderArea",value:function(){var e=this;this.area=this.drawingContext().selectAll(this.polygonClassName).data([this.polygonWrapper]).enter().append("polygon").attr("class",this.polygonClassName).style("stroke-width",this.opts.lineProps.strokeWidth+"px").style("stroke",function(){if(e.opts.useColorScale)return e.opts.lineColorScale(e.seriesIndex)}).style("stroke-opacity",this.opts.areaHighlightProps.defaultStrokeOpacity).attr("points",function(e){return e.svgStringRep}).style("fill",function(){if(e.opts.useColorScale)return e.opts.areaColorScale(e.seriesIndex)}).style("fill-opacity",this.currentAreaOpacity);var t=c.format(".2");this.areaVertexLabels=this.drawingContext().selectAll(this.polygonVertexLables).data(this.points).enter().append("svg:text").text(function(e){return t(e.datum.value)}).attr("x",function(e){return e.cords.x}).attr("y",function(e){return e.cords.y}).attr("class",this.polygonVertexLables).style("font-family",this.opts.labelProps["font-family"]).style("font-size",this.opts.labelProps.fontSize+"px").style("opacity",function(){return e.isDragActive()?1:e.opts.areaHighlightProps.defaultLabelOpacity}),this.opts.areaHighlight&&this.area.on("mouseover",this.createOnMouseOverPolygon()).on("mouseout",this.createOnMouseOutPolygon())}},{key:"renderCircles",value:function(){var e=this;this.circles=this.drawingContext().selectAll(this.circleClassName).data(this.points).enter().append("svg:circle").attr("r",function(){return e.isDragActive()?e.opts.circleProps.circleOverlayRadiusMult*e.opts.circleProps.defaultRadius:e.opts.circleProps.defaultRadius}).attr("alt",function(e){return Math.max(e.value,0)}).attr("cx",function(e){return e.cords.x}).attr("cy",function(e){return e.cords.y}).attr("class",this.circleClassName).style("fill",function(){if(e.opts.useColorScale)return e.opts.lineColorScale(e.seriesIndex)}).style("fill-opacity",function(){return e.isDragActive()?e.opts.hoverCircleOpacity:e.opts.defaultCircleOpacity}).each(function(e){e.circleRef=this}),this.circleOverylays=this.drawingContext().selectAll(this.circleOverlayClassName).data(this.points).enter().append("svg:circle").attr("r",this.opts.circleProps.defaultRadius*this.opts.circleProps.circleOverlayRadiusMult).attr("cx",function(e){return e.cords.x}).attr("cy",function(e){return e.cords.y}).attr("opacity",0).attr("class",this.circleOverlayClassName).attr("pointer-events","all").each(function(e){e.overlayRef=this}),this.series.circleHighlight&&this.circleOverylays.on("mouseover",this.createEventHandler(d,this)).on("mouseout",this.createEventHandler(x,this)),this.series.dragEnabled&&this.circleOverylays.call(c.drag().subject(function(e){return this}).on("start",this.createEventHandler(f,this)).on("drag",this.createEventHandler(g,this)).on("end",this.createEventHandler(y,this))),this.circles.append("svg:title").text(function(e){return e.datum.value})}},{key:"remove",value:function(){this.series.showCircle&&(c.selectAll("."+this.circleOverlayClassName).on("mouseover",null).on("mouseout",null).on("drag",null).on("end",null).data([]).exit().remove(),c.selectAll("."+this.circleClassName).data([]).exit().remove()),this.circles=[],this.circleOverylays=[],this.removeArea()}},{key:"removeLegendRefs",value:function(){this.legendRect=null,this.rectOverlay=null,this.legendLabelEls=[]}},{key:"removeArea",value:function(){c.selectAll("."+this.polygonClassName).on("mouseover",null).on("mouseout",null).data([]).exit().remove(),this.areaVertexLabels.remove()}},{key:"render",value:function(){for(this.renderArea(),this.series.showCircle&&this.renderCircles();0<this.postRenderQueue.length;)this.postRenderQueue.pop()()}},{key:"setupZoomInterpolators",value:function(){var e=this.zoomConfig.scaleExtent.maxZoom;this.zlop={};this.zlop.areaLineLop=c.scaleLog().base(8).domain([1,e]).range([this.opts.lineProps.strokeWidth,this.opts.lineProps.maxZoomStroke]),this.zlop.circleRadiusLop=c.scaleLog().base(8).domain([1,e]).range([this.opts.circleProps.defaultRadius,this.opts.circleProps.maxZoomRadius]),this.zlop.fontLop=c.scaleLog().domain([1,e]).range([this.opts.labelProps.fontSize,this.opts.labelProps.maxFontSize])}},{key:"getCurrentValueForAxis",value:function(t){return this.points.find(function(e){return e.datum.axis===t}).datum.value}},{key:"updatePolygonPositions",value:function(){this.polygonWrapper.svgStringRep=this.points.reduce(function(e,t){return e+t.cords.x+","+t.cords.y+" "},""),this.onAreaUpdate()}},{key:"onAxisLabelRectOver",value:function(e){var t=this.getCurrentValueForAxis(e);this.axisMap[e].setAxisLabelValue(t)}},{key:"onWheelEvent",value:function(e){c.event.stopPropagation();var t=e.axisOptions.axisId,i=this.getCurrentValueForAxis(t),a=void 0;(a=c.event.deltaY<=0?i+.01*e.range:i-.01*e.range)>=e.maxValue&&(a=e.maxValue),a<=e.minValue&&(a=e.minValue);var s=this.points.find(function(e){return e.datum.axis===t});s.datum.value=a,s.cords=this.axisMap[t].projectValueOnAxis(a),this.axisMap[t].setAxisLabelValue(a),this.updatePolygonPositions(),u.isFunction(this.opts.onValueChange)&&this.opts.onValueChange(s)}}]),a}();return function(){function t(e){n(this,t),this.rootElement=c.select(e.rootElement),this.rootElId=this.rootElement.attr("id"),this.setOps(e),this.areas=[],this.axisRectClassName="axis-rect-overlay"}return v(t,[{key:"render",value:function(){this.setupDrawingArea(),this.renderAxis(),this.renderArea(),this.opts.showLegend&&this.renderLegend()}},{key:"setOps",value:function(e){var i=this;this.opts=u.merge({enableZoom:!0,backgroundColor:"white",zoomProps:{scaleExtent:{minZoom:1,maxZoom:12}},data:[],dims:{width:500,height:500,translateXp:.05,translateYp:.05,legendSpaceP:.1,innerPaddingP:.1},legend:{interactive:!0,legendWidthP:.9,legendHeightP:.2,legendWOverlap:1.1,legendTopOffsetP:.03,textYOffset:9,textOffsetP:.75,iconHeightP:.02,iconWidthP:.02,iconSpacingP:.05,title:"Test title",scaleTextWithSize:!0,titleScale:null,labelScale:null,titleProperties:{fontSize:12,fontScaleMin:5,fontScaleMax:20,"font-family":"sans-serif",fill:"#404040"},labelTextProperties:{fontSize:11,fontScaleMin:5,fontScaleMax:20,"font-family":"sans-serif",fill:"#737373"}},levels:{levelsFractions:[.25,.5,.75]},showLegend:!0,axis:{config:[],useGlobalMax:!1,maxValue:.6,leftOffsetPLabel:.85,rotateTextWithAxis:!0,textOverflowWidthLimit:10,textOverflowWidthLimitZoomed:50,textLineSpacingPx:10,tickScale:null,axisTitleScale:null,axisScaleProps:{minTitleSize:5,maxTitleSize:20,minTickSize:5,maxTickSize:20,minTextLineSpacing:1,maxTextLineSpacing:20},axisLabelProps:{"font-family":"sans-serif",fontSize:11,fill:"#808080","value-fill":"#548bd8","hover-fill":"#E44822"},lineProps:{fill:"#E0E0E0","hover-fill":"#E44822"},ticks:{fill:"#737373",minZoomFont:10,maxZoomFont:1,"font-family":"sans-serif"},wheelLabelAreaId:null,onAxisLabelOver:null,onAxisLabelOut:null,onWheelAxis:null},area:{areaHighlight:!1,areaHighlightProps:{defaultAreaOpacity:0,highlightedAreaOpacity:.7,hiddenAreaOpacity:.1,defaultStrokeOpacity:.8,highlightedStrokeOpacity:1,hiddenStrokeOpacity:.2,defaultLabelOpacity:0,highlightedLabelOpacity:1,hiddenLabelOpacity:0},labelProps:{"font-family":"sans-serif",fontSize:8,maxFontSize:2},defaultCircleOpacity:.3,hoverCircleOpacity:.5,circleProps:{defaultRadius:5,maxZoomRadius:1,circleOverlayRadiusMult:1.5},useColorScale:!0,areaColorScale:c.scaleOrdinal(c.schemeAccent),lineColorScale:c.scaleOrdinal(c.schemeAccent),onValueChange:null,onValueFinishChange:null,textOverflowWidthLimit:10,textLineSpacingRangeLegend:[1,20],lineProps:{strokeWidth:2,maxZoomStroke:.5}},rootElement:null},e),this.opts.axis.maxAxisNo=this.opts.axis.config.length;var t=this.opts.dims;t.paddingW=t.width*t.translateXp/2,t.paddingH=t.paddingW,t.legendW=t.width*t.legendSpaceP,t.chartContainerW=t.width-t.paddingW-t.legendW,t.chartContainerH=t.height-2*t.paddingH,t.innerPadding=t.chartContainerH*t.innerPaddingP,t.innerW=t.chartContainerW-2*t.innerPadding,t.innerH=t.chartContainerH-2*t.innerPadding,t.optsLeftChartOffset=t.innerPadding,t.optsTopChartOffset=t.innerPadding;var a=this.opts.legend;a.width=t.legendW*a.legendWidthP,a.height=t.height*a.legendHeightP,a.iconSpacing=a.iconSpacingP*t.height,a.iconHeight=a.iconHeightP*t.height,a.iconWidth=a.iconWidthP*t.height,this.data=this.opts.data,this.axisConfig=this.opts.axis.config,this.axisParameters=this.axisConfig.map(function(e,t){return new O(i.opts,e,t,i.onAxisLabelWheel.bind(i))}),this.axisMap=this.axisParameters.reduce(function(e,t){return e[t.axis]=t,e},{})}},{key:"onAxisLabelWheel",value:function(e){var t=this;this.opts.axis.wheelLabelAreaId&&this.areas.find(function(e){return e.label===t.opts.axis.wheelLabelAreaId}).onWheelEvent(e)}},{key:"setupDrawingArea",value:function(){var s=this,e=this.opts.dims,t=e.width,i=e.height,n=e.paddingH,r=e.paddingW;this.rootSvg=this.rootElement.append("svg").style("background",this.opts.backgroundColor).attr("width",t).attr("height",i),this.rootG=this.rootSvg.append("g").attr("class","root"+this.rootElId).attr("transform","translate("+r+","+n+")"),this.opts.enableZoom&&(this.zoom=c.zoom().on("zoom",function(e){if(m.isFirefox){var t=c.event.transform.k,i=t>s.opts.zoomProps.scaleExtent.minZoom?.1*t:s.opts.zoomProps.scaleExtent.minZoom,a=t<s.opts.zoomProps.scaleExtent.maxZoom?1.1*t:s.opts.zoomProps.scaleExtent.maxZoom;s.zoom.scaleExtent([i,a]),s.drawingContext().attr("transform",c.event.transform),s.areas.forEach(function(e){return e.onZoomUpdateSizes(t)}),s.axisParameters.forEach(function(e){return e.onZoom(t)})}else s.drawingContext().attr("transform",c.event.transform),s.areas.forEach(function(e){return e.onZoomUpdateSizes(c.event.transform.k)}),s.axisParameters.forEach(function(e){return e.onZoom(c.event.transform.k)});s.onUpdateArea(),1===c.event.transform.k&&s.rootG.attr("transform","translate("+r+","+n+")")}).translateExtent([[0,0],[t,i]]).scaleExtent([this.opts.zoomProps.scaleExtent.minZoom,this.opts.zoomProps.scaleExtent.maxZoom]),this.rootSvg.call(this.zoom)),this.drawingContext=function(){var e=this.rootElId.toString();return function(){return c.select(".root"+e)}}.bind(this)()}},{key:"renderAxis",value:function(){for(var o=this,e=this.opts,r=this.opts.dims.width,t=function(n){var r=o.opts.levels.levelsFractions;o.drawingContext().selectAll(".levels").data(o.axisParameters).enter().append("svg:line").attr("x1",function(e,t){var i=e.range*r[n]+e.minValue;return e.projectValueOnAxis(i).x}).attr("y1",function(e,t){var i=e.range*r[n]+e.minValue;return e.projectValueOnAxis(i).y}).attr("x2",function(e,t){var i=t+1===o.axisParameters.length?0:t+1,a=o.axisParameters[i],s=a.range*r[n]+a.minValue;return a.projectValueOnAxis(s).x}).attr("y2",function(e,t){var i=t+1===o.axisParameters.length?0:t+1,a=o.axisParameters[i],s=a.range*r[n]+a.minValue;return a.projectValueOnAxis(s).y}).attr("class","line").style("stroke","#DCDCDC").style("stroke-opacity","0.75").style("stroke-width","0.3px")},i=0;i<e.levels.levelsFractions.length;i++)t(i);var s=c.format(".2%"),n=e.axis.ticks,a=function(i){var a=o.opts.levels.levelsFractions;o.drawingContext().selectAll(".levels").data(o.axisParameters).enter().append("svg:text").attr("x",function(e){var t=e.range*a[i]+e.minValue;return e.projectValueOnAxis(t).x}).attr("y",function(e){var t=e.range*a[i]+e.minValue;return e.projectValueOnAxis(t).y}).attr("class","legend").style("font-family",n["font-family"]).style("font-size",function(e){return e.scaledTickSize+"px"}).style("opacity",0).attr("fill",n.fill).text(function(e){return s(a[i])}).each(function(e){e.axisTickTextElements.push(this)})};for(i=0;i<e.levels.levelsFractions.length;i++)a(i);this.axisG=this.drawingContext().selectAll(".axis").data(this.axisParameters).enter().append("g"),this.axisLines=this.axisG.append("line").attr("class","axisline").attr("x1",function(e){return e.x1}).attr("y1",function(e){return e.y1}).attr("x2",function(e){return e.x2}).attr("y2",function(e){return e.y2}).attr("pointer-events","none").style("stroke",e.axis.lineProps.fill).style("stroke-opacity",.75).style("stroke-width","0.3px").each(function(e){e.axisLineEl=this}),this.rects=this.axisG.append("rect").attr("class",this.axisRectClassName).attr("x",function(e){return e.x1}).attr("y",function(e){return e.y1}).attr("transform",function(e,t){return"rotate("+e.angleFromNorth+","+e.x1+","+e.y1+")"}).attr("width",function(e){return e.axisLength}).attr("height",10).attr("fill-opacity",0).on("mouseover",function(e){return e.onAxisLineRectOver()}).on("mouseout",function(e){return e.onAxisLineRectMouseOut()}).each(function(e){e.axisRect=this});var l=this.opts.axis.axisLabelProps;this.axisText=this.axisG.append("text").attr("class","axis-label").attr("pointer-events","none").attr("transform",function(e,t){return o.opts.axis.rotateTextWithAxis?"rotate("+e.axisLabelRotation()+","+e.x2+","+e.y2+")":""}).text("").each(function(e){var i=this;e.axisLabelEl=this;for(var a=e.lines,t=function(t){c.select(i).append("tspan").attr("x",function(e){return e.axisLabelCords().x}).attr("y",function(e){return e.axisLabelCords().y}).attr("dy",function(e){return e.textLineSpacingPx(r)*t}).text(a[t]).style("font-family",l["font-family"]).style("font-size",function(e){return e.axisTitleScale(r)+"px"}).style("fill",l.fill).attr("text-anchor","middle").each(function(e){e.labelLines.push(this)})},s=0;s<a.length;s++)t(s);c.select(this).append("tspan").attr("x",function(e){return e.axisLabelCords().x}).attr("y",function(e){return e.axisLabelCords().y}).attr("dy",function(e){return e.textLineSpacingPx(r)*e.lines.length}).text("").style("font-family",l["font-family"]).style("font-size",function(e){return e.axisTitleScale(r)+"px"}).style("fill",l["value-fill"]).attr("text-anchor","middle").each(function(e){e.labelValue=this});var n=function(t){c.select(i).append("tspan").attr("x",function(e){return e.axisLabelCords().x}).attr("y",function(e){return e.axisLabelCords().y}).attr("dy",function(e){return e.textLineSpacingPx(r)*t}).text(e.zoomLines[t]).style("font-family",l["font-family"]).style("font-size",function(e){return e.axisTitleScale(r)+"px"}).style("fill",l.fill).style("fill-opacity",0).attr("text-anchor","middle").each(function(e){e.zoomedLabelLines.push(this)})};for(s=0;s<e.zoomLines.length;s++)n(s)}),this.axisTextOverlay=this.axisG.append("rect").attr("class","axis-text-overlay").attr("x",function(e){return e.overLayx()}).attr("y",function(e){return e.overLayy()}).attr("width",function(e){return e.overLayWidth}).attr("height",function(e){return e.overLayHeight()}).attr("fill-opacity",0).attr("transform",function(e,t){return o.opts.axis.rotateTextWithAxis?"rotate("+e.axisLabelRotation()+","+e.x2+","+e.y2+")":""}).on("wheel",function(e){return e.onLabelWheel()}).on("mouseover",function(e){o.opts.axis.wheelLabelAreaId&&o.areas.find(function(e){return e.label===o.opts.axis.wheelLabelAreaId}).onAxisLabelRectOver(e.axisOptions.axisId);e.onLabelRectOver(),o.opts.axis.onWheelAxis&&o.opts.axis.onWheelAxis()}).on("mouseout",function(e){return e.onLabelRectOut()})}},{key:"renderArea",value:function(){var i=this;this.areas=this.data.map(function(e,t){return new P({axisMap:i.axisMap,dims:i.opts.dims,series:e,drawingContext:i.drawingContext,seriesIdent:""+t+i.rootElId,seriesIndex:t,areaOptions:i.opts.area,onAreaUpdate:i.onUpdateArea.bind(i),zoomProps:i.opts.zoomProps})}),this.areas.forEach(function(e){return e.render()})}},{key:"renderLegend",value:function(){var e=this.opts.dims,t=e.width,i=e.height,a=e.legendW,s=this.opts.legend,n=this.rootSvg.append("svg").attr("width",t).attr("height",i);this.legendSvg=n;var r=s.titleProperties,o=s.labelTextProperties;s.scaleTextWithSize&&!s.titleScale&&(s.titleScale=c.scaleLinear().domain([100,1200]).range([r.fontScaleMin,r.fontScaleMax])),s.scaleTextWithSize&&!s.labelScale&&(s.labelScale=c.scaleLinear().domain([100,1200]).range([o.fontScaleMin,o.fontScaleMax])),n.append("text").attr("class","title").attr("x",t-a*(1+s.legendWOverlap)).attr("y",s.legendTopOffsetP*i).text(s.title).style("font-size",function(){return s.scaleTextWithSize?s.titleScale(t)+"px":s.titleProperties.fontSize+"px"}).style("font-family",s.titleProperties["font-family"]).attr("fill",s.titleProperties.fill);var l=n.append("g").attr("class","legend").attr("height",s.height).attr("width",s.width).attr("transform","translate(0,"+s.legendTopOffsetP*i*2+")");this.legendG=l,this.createLegendOverlays()}},{key:"createLegendOverlays",value:function(){var i=this,e=this.opts.dims,r=e.width,o=e.legendW,l=this.opts.legend,t=this.legendG;this.legendRects=t.selectAll("legend-rect").data(this.areas).attr("class","legend-rect").enter().append("rect").attr("x",r-o*(1+l.legendWOverlap)).attr("y",function(e,t){return t*l.iconSpacing}).attr("width",l.iconWidth).attr("height",l.iconHeight).attr("opacity",.7).style("fill",function(e,t){return i.opts.area.areaColorScale(t)}).each(function(e){e.legendRect=this}),this.legendText=t.selectAll("text").data(this.areas).enter().append("text").text("").each(function(e,i){for(var a=this,t=e.legendLabelLines,s=function(t){c.select(a).append("tspan").attr("x",r-o*(1+l.legendWOverlap)*l.textOffsetP).attr("y",function(e){return i*l.iconSpacing+l.textYOffset}).attr("dy",function(e){return e.labelTextLineSpacing(r)*t}).text(function(e){return e.legendLabelLines[t]}).style("font-size",function(){return l.scaleTextWithSize?l.labelScale(r)+"px":l.labelTextProperties.fontSize+"px"}).style("font-family",l.labelTextProperties["font-family"]).attr("fill",l.labelTextProperties.fill).attr("original-fill",l.labelTextProperties.fill).each(function(e){e.legendLabelEls.push(this)})},n=0;n<t.length;n++)s(n)}),this.legendG.selectAll("legend-rect-overlays").attr("class","legend-rect-overylays").data(this.areas).enter().append("rect").attr("x",r-o*(1+l.legendWOverlap)).attr("y",function(e,t){return t*l.iconSpacing}).attr("width",o*(1+l.legendWOverlap)).attr("height",l.iconSpacing).attr("opacity",0).on("mouseover",function(e,t){e.onLegendOver()}).on("mouseout",function(e,t){e.onLegendOut()}).each(function(e){e.rectOverlay=this})}},{key:"reRenderWithNewData",value:function(e){this.data=e,this.areas.forEach(function(e){return e.removeLegendRefs()}),this.removeAreas(),this.renderArea(),this.updateLegendOverlays()}},{key:"reRenderWithNewOptions",value:function(e){this.delete(),this.setOps(e),this.areas=[],this.render()}},{key:"removeAxis",value:function(){this.axisLines.remove(),this.axisText.remove(),c.selectAll("."+this.axisRectClassName).on("mouseover",null).on("mouseout",null).data([]).exit().remove()}},{key:"removeAreas",value:function(){this.areas.forEach(function(e){return e.remove()})}},{key:"updateLegendOverlays",value:function(){c.select(".legend-rect-overlays").data([]).exit().remove(),this.legendText.data([]).exit().remove(),this.legendRects.data([]).exit().remove(),this.createLegendOverlays()}},{key:"showAxisLabelValues",value:function(t){var i=this.areas.find(function(e){return e.label===t});Object.values(this.axisMap).forEach(function(e){e.setAxisLabelValue(i.getCurrentValueForAxis(e.axis))})}},{key:"hideAxisLabelValues",value:function(){Object.values(this.axisMap).forEach(function(e){e.setAxisLabelValue(null)})}},{key:"delete",value:function(){this.removeAreas(),this.removeAxis(),this.rootSvg.remove()}},{key:"onUpdateArea",value:function(){this.removeAreas(),this.areas.forEach(function(e){return e.render()})}}]),t}()});
