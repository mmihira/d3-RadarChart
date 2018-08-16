!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("d3"),require("lodash")):"function"==typeof define&&define.amd?define(["d3","lodash"],e):t.RadarChart=e(t.d3,t._)}(this,function(d,c){"use strict";var O=2*Math.PI,s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t=function(){function a(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,e,i){return e&&a(t.prototype,e),i&&a(t,i),t}}(),C="QUAD_1",A="QUAD_2",n=function(){function a(t,e,i){s(this,a),this.opts=t,this.axisIndex=i,this.axisOptions=e,this.dragActive=!1,this.axisTickTextElements=[],this.calculateAxisParameters()}return t(a,[{key:"calculateAxisParameters",value:function(){var i=this,t=this.opts,e=this.axisIndex,a=this.axisOptions,s=this.opts.dims,n=s.innerW,r=s.innerH,o=s.optsLeftChartOffset,l=s.optsTopChartOffset,c=this.opts.axis.maxAxisNo,h=o+n/2,u=l+r/2,d=o+n/2*(1-Math.sin(e*O/c)),p=l+r/2*(1-Math.cos(e*O/c));d<h&&p<=u?this.quad=C:h<=d&&p<=u?this.quad=A:d<=h&&u<=p?this.quad="QUAD_3":h<=d&&u<=p&&(this.quad="QUAD_4");var f=n/2*(1-t.axis.leftOffsetPLabel*Math.sin(e*O/c))-60*Math.sin(e*O/c)+o,x=r/2*(1-Math.cos(e*O/c))-20*Math.cos(e*O/c)+l,g=Math.abs(d-h)<1e-9?1/0:(p-u)/(d-h),y=g===1/0?0:p-g*d;this.gradient=g;this.maxValue=t.axis.useGlobalMax?t.axis.maxValue:a.axisValueMax,this.axisLength=Math.sqrt(Math.pow(d-h,2)+Math.pow(p-u,2)),this.angleFromNorth=180/Math.PI*(1-e*O/c)-180/Math.PI-90-180/Math.PI*10/this.axisLength/2,this.axis=a.axisId,this.label=a.label?a.label:a.axisId,this.opts.axis.textOverflow&&(this.textLineSpacingPx=this.opts.axis.textLineSpacingPx,this.labelLines=[],this.words=this.label.split(" "),this.lines=[this.words[0]],this.lines=this.words.slice(1).reduce(function(t,e){return t[t.length-1].length+e.length<=i.opts.axis.textOverflowWidthLimit?t[t.length-1]=t[t.length-1]+" "+e:t.push(e),t},this.lines)),this.x1=h,this.y1=u,this.x2=d,this.y2=p,this.labelX=f,this.labelY=x;var v=Math.sin(e*O/c),m=Math.cos(e*O/c);this.projectCordToAxis=function(t,e){return g===1/0?{x:h,y:e}:g<-2||0<=g||g<.145?{x:t,y:g*t+y}:{x:(e-y)/g,y:e}},this.projectValueOnAxis=function(t){return{x:o+n/2*(1-parseFloat(Math.max(t,0))/this.maxValue*v),y:l+r/2*(1-parseFloat(Math.max(t,0))/this.maxValue*m)}},this.cordOnAxisToValue=function(t,e){if(this.gradient===1/0){var i=Math.abs(this.y2-e);return(this.axisLength-i)*this.maxValue/this.axisLength}if(0<=this.gradient&&this.gradient<1e-8){var a=Math.abs(this.x2-t);return(this.axisLength-a)*this.maxValue/this.axisLength}return(2*(t-o)/n-1)*(this.maxValue/v)*-1}}},{key:"onRectMouseOver",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(t){d.select(t).style("opacity",.9)})}},{key:"onRectMouseOut",value:function(){if(this.dragActive)return!1;this.axisTickTextElements.forEach(function(t){d.select(t).transition(200).style("opacity",0)})}}]),a}(),a=function(){function i(t){var e=this;s(this,i),this.axisMap=t.axisMap,this.data=c.cloneDeep(t.series),this.drawingContext=t.drawingContext,this.color=d.scaleOrdinal(d.schemeAccent),this.seriesIdent=t.seriesIdent,this.seriesIndex=t.seriesIndex,this.opts=c.cloneDeep(t.areaOptions),this.opts.onValueChange=t.areaOptions.onValueChange,this.opts.colorScale=t.areaOptions.colorScale,this.circleRadius=5,this.polygonClassName="chart-poly-"+this.seriesIdent,this.circleOverlayClassName="circle-overlay"+this.seriesIdent,this.circleClassName="circle-"+this.seriesIdent,this.points=this.data.map(function(t){return{cords:e.axisMap[t.axis].projectValueOnAxis(t.value),datum:c.cloneDeep(t)}}),this.polygonWrapper={points:this.points,svgStringRep:this.points.reduce(function(t,e){return t+e.cords.x+","+e.cords.y+" "},"")}}return t(i,[{key:"render",value:function(){this.renderArea(),this.renderCircles()}},{key:"updatePositions",value:function(){this.polygonWrapper.svgStringRep=this.points.reduce(function(t,e){return t+e.cords.x+","+e.cords.y+" "},""),this.removeArea(),this.renderArea()}},{key:"createOnMouseOverCircle",value:function(){var i=this;return function(t){var e="."+i.polygonClassName;d.select(this).style("fill-opacity",i.opts.hoverCircleOpacity),i.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",i.opts.hiddenAreaOpacity),i.drawingContext().selectAll(e).transition(200).style("fill-opacity",i.opts.highlightedAreaOpacity),d.select(t.circleRef).transition(100).attr("r",i.circleRadius*i.opts.circleOverlayRadiusMult)}}},{key:"createMouseOutCirlce",value:function(){var e=this;return function(t){d.select(this).style("fill-opacity",e.opts.defaultCircleOpacity),e.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",e.opts.defaultAreaOpacity),d.select(t.circleRef).transition(100).attr("r",e.circleRadius)}}},{key:"createOnDragEndCircle",value:function(){var e=this;return function(t){e.axisMap[t.datum.axis].dragActive=!1,e.axisMap[t.datum.axis].onRectMouseOut()}}},{key:"createOnDraggingCircle",value:function(){var l=this;return function(t){var e=l.axisMap[t.datum.axis];l.axisMap[t.datum.axis].onRectMouseOver(),l.axisMap[t.datum.axis].dragActive=!0;var i=d.event,a=i.x,s=i.y,n=e.projectCordToAxis(a,s).x,r=e.projectCordToAxis(a,s).y;if(e.quad===C||e.quad===A){if(r<e.y2||r>e.y1)return}else if(r<e.y1||r>e.y2)return;var o=e.cordOnAxisToValue(n,r);t.datum.value=o,t.cords=l.axisMap[t.datum.axis].projectValueOnAxis(o),d.select(t.circleRef).attr("cx",n).attr("cy",r),d.select(t.overlayRef).attr("cx",n).attr("cy",r),l.updatePositions(),c.isFunction(l.opts.onValueChange)&&l.opts.onValueChange(t)}}},{key:"createOnMouseOverPolygon",value:function(){var i=this;return function(t){var e="."+i.polygonClassName;i.drawingContext().selectAll("polygon").transition(200).style("fill-opacity",i.opts.hiddenAreaOpacity),i.drawingContext().selectAll(e).transition(200).style("fill-opacity",i.opts.highlightedAreaOpacity)}}},{key:"createOnMouseOutPolygon",value:function(){var e=this;return function(t){d.select(this).transition(200).style("fill-opacity",e.opts.defaultAreaOpacity)}}},{key:"renderArea",value:function(){var t=this;this.area=this.drawingContext().selectAll(this.polygonClassName).data([this.polygonWrapper]).enter().append("polygon").attr("class",this.polygonClassName).style("stroke-width","2px").style("stroke",function(){if(t.opts.useColorScale)return t.opts.lineColorScale(t.seriesIndex)}).attr("points",function(t){return t.svgStringRep}).attr("z-index",-1).style("fill",function(){if(t.opts.useColorScale)return t.opts.areaColorScale(t.seriesIndex)}).style("fill-opacity",this.opts.defaultAreaOpacity).on("mouseover",this.createOnMouseOverPolygon()).on("mouseout",this.createOnMouseOutPolygon())}},{key:"renderCircles",value:function(){var t=this;this.circles=this.drawingContext().selectAll(this.circleClassName).data(this.points).enter().append("svg:circle").attr("r",this.circleRadius).attr("alt",function(t){return Math.max(t.value,0)}).attr("cx",function(t){return t.cords.x}).attr("cy",function(t){return t.cords.y}).attr("class",this.circleClassName).style("fill",function(){if(t.opts.useColorScale)return t.opts.lineColorScale(t.seriesIndex)}).style("fill-opacity",this.opts.defaultCircleOpacity).each(function(t){t.circleRef=this}),this.circleOverylays=this.drawingContext().selectAll(this.circleOverlayClassName).data(this.points).enter().append("svg:circle").call(d.drag().subject(function(t){return this}).on("drag",this.createOnDraggingCircle()).on("end",this.createOnDragEndCircle())).attr("r",this.circleRadius*this.opts.circleOverlayRadiusMult).attr("cx",function(t){return t.cords.x}).attr("cy",function(t){return t.cords.y}).attr("opacity",0).attr("class",this.circleOverlayClassName).on("mouseover",this.createOnMouseOverCircle()).on("mouseout",this.createMouseOutCirlce()).each(function(t){t.overlayRef=this}),this.circles.append("svg:title").text(function(t){return t.datum.value})}},{key:"removeArea",value:function(){this.area.on("mouseover",null).on("mouseout",null),this.area.remove()}},{key:"remove",value:function(){this.circleOverylays.each(function(t){d.select(t.circleRef).on("mouseover",null).on("mouseout",null).on("drag",null).on("end",null).remove()}),this.circles.each(function(t){d.select(t.circleRef).remove()}),this.removeArea()}}]),i}();return function(){function e(t){s(this,e),this.rootElement=d.select(t.rootElement),this.rootElId=this.rootElement.attr("id"),this.setOps(t),this.areas=[]}return t(e,[{key:"setOps",value:function(t){var i=this;this.opts=c.merge({data:[],dims:{width:500,height:500,translateXp:.05,translateYp:.05,legendSpaceP:.1,innerPaddingP:.1},showLegend:!0,legend:{legendWidthP:.9,legendHeightP:.2,legendWOverlap:.5,legendTopOffset:20,textYOffset:9,textOffsetP:.75,colorScale:d.scaleOrdinal(d.schemeAccent),iconHeight:10,iconWidth:10,iconSpacing:20,title:"Test title",titleProperties:{"font-size":"12px",fill:"#404040"},labelTextProperties:{"font-size":"11px",fill:"#737373"}},levels:{levelsNo:2,noTicks:3,levelsColor:null,ticks:{fill:"#737373","font-size":"10px","font-family":"sans-serif"}},point:{radius:5},axis:{config:[],colorScale:null,useGlobalMax:!1,maxValue:.6,leftOffsetPLabel:.85,textOverflow:!0,textOverflowWidthLimit:10,textLineSpacingPx:10},area:{defaultAreaOpacity:.4,highlightedAreaOpacity:.7,hiddenAreaOpacity:.1,defaultCircleOpacity:.3,hoverCircleOpacity:1,circleOverlayRadiusMult:1.2,useColorScale:!0,areaColorScale:d.scaleOrdinal(d.schemeAccent),lineColorScale:d.scaleOrdinal(d.schemeAccent),onValueChange:null},rootElement:null},t),this.opts.axis.maxAxisNo=this.opts.axis.config.length;var e=this.opts.dims;e.paddingW=e.width*e.translateXp/2,e.paddingH=e.paddingW,e.legendW=e.width*e.legendSpaceP,e.chartContainerW=e.width-e.paddingW-e.legendW,e.chartContainerH=e.height-2*e.paddingH,e.innerPadding=e.chartContainerH*e.innerPaddingP,e.innerW=e.chartContainerW-2*e.innerPadding,e.innerH=e.chartContainerH-2*e.innerPadding,e.optsLeftChartOffset=e.innerPadding,e.optsTopChartOffset=e.innerPadding;var a=this.opts.legend;a.width=e.legendW*a.legendWidthP,a.height=e.height*a.legendHeightP,this.data=this.opts.data,this.axisConfig=this.opts.axis.config,this.axisParameters=this.axisConfig.map(function(t,e){return new n(i.opts,t,e)}),this.axisMap=this.axisParameters.reduce(function(t,e){return t[e.axis]=e,t},{})}},{key:"render",value:function(){this.renderAxis(),this.renderArea(),this.opts.showLegend&&this.renderLegend()}},{key:"renderAxis",value:function(){var o=this,t=this.opts,e=this.opts.dims,i=e.width,a=e.height,s=e.paddingH,n=e.paddingW;this.rootSvg=this.rootElement.append("svg").attr("width",i).attr("height",a),this.rootSvg.append("g").attr("class","root"+this.rootElId).attr("transform","translate("+n+","+s+")"),this.drawingContext=function(){var t=this.rootElId.toString();return function(){return d.select(".root"+t)}}.bind(this)();for(var r=function(n){var r=t.levels.levelsNo;o.drawingContext().selectAll(".levels").data(o.axisParameters).enter().append("svg:line").attr("x1",function(t,e){var i=t.maxValue/r*(n+1);return t.projectValueOnAxis(i).x}).attr("y1",function(t,e){var i=t.maxValue/r*(n+1);return t.projectValueOnAxis(i).y}).attr("x2",function(t,e){var i=e+1===o.axisParameters.length?0:e+1,a=o.axisParameters[i],s=a.maxValue/r*(n+1);return a.projectValueOnAxis(s).x}).attr("y2",function(t,e){var i=e+1===o.axisParameters.length?0:e+1,a=o.axisParameters[i],s=a.maxValue/r*(n+1);return a.projectValueOnAxis(s).y}).attr("class","line").style("stroke","grey").style("stroke-opacity","0.75").style("stroke-width","0.3px")},l=0;l<t.levels.levelsNo-1;l++)r(l);var c=d.format(".2%"),h=t.levels.ticks,u=function(i){var a=t.levels.levelsNo;o.drawingContext().selectAll(".levels").data(o.axisParameters).enter().append("svg:text").attr("x",function(t){var e=t.maxValue/a*(i+1);return t.projectValueOnAxis(e).x}).attr("y",function(t){var e=t.maxValue/a*(i+1);return t.projectValueOnAxis(e).y}).attr("class","legend").style("font-family",h["font-family"]).style("font-size",h["font-size"]).style("opacity",0).attr("fill",h.fill).text(function(t){return c(t.maxValue/a*(i+1)/t.maxValue)}).each(function(t){t.axisTickTextElements.push(this)})};for(l=0;l<t.levels.levelsNo;l++)u(l);this.axisG=this.drawingContext().selectAll(".axis").data(this.axisParameters).enter().append("g"),this.axisLines=this.axisG.attr("class","axis").append("line").attr("x1",function(t){return t.x1}).attr("y1",function(t){return t.y1}).attr("x2",function(t){return t.x2}).attr("y2",function(t){return t.y2}).attr("class","line").attr("pointer-events","none").style("stroke","grey").style("stroke-width","1px"),this.rects=this.axisG.append("rect").attr("class","overlay").attr("x",function(t){return t.x1}).attr("y",function(t){return t.y1}).attr("transform",function(t,e){return"rotate("+t.angleFromNorth+","+t.x1+","+t.y1+")"}).attr("width",function(t){return t.axisLength}).attr("height",10).attr("fill-opacity",0).on("mouseover",function(t){return t.onRectMouseOver()}).on("mouseout",function(t){return t.onRectMouseOut()}).each(function(t){t.axisRect=this}),t.axis.textOverflow?this.axisText=this.axisG.append("text").attr("class","axis-label").attr("pointer-events","none").text("").each(function(t){for(var e=t.lines,i=0;i<e.length;i++)d.select(this).append("tspan").attr("x",function(t){return t.labelX}).attr("y",function(t){return t.labelY}).attr("dy",i*t.textLineSpacingPx).text(e[i]).style("font-family","sans-serif").style("font-size","11px").attr("text-anchor","middle").each(function(t){t.labelLines.push(this)})}):this.axisText=this.axisG.append("text").attr("class","axis-label").text(function(t){return t.label}).style("font-family","sans-serif").style("font-size","11px").attr("text-anchor","middle").attr("dy","1.5em").attr("transform",function(){return"translate(0, -10)"}).attr("x",function(t){return t.labelX}).attr("y",function(t){return t.labelY}).attr("pointer-events","none")}},{key:"renderArea",value:function(){var i=this;this.areas=this.data.map(function(t,e){return new a({axisMap:i.axisMap,series:t,drawingContext:i.drawingContext,seriesIdent:""+e+i.rootElId,seriesIndex:e,areaOptions:i.opts.area})}),this.areas.forEach(function(t){return t.render()})}},{key:"renderLegend",value:function(){var t=this.opts.dims,e=t.width,i=t.height,a=t.legendW,s=this.opts.legend,n=["Smartphone","Tablet"],r=this.rootSvg.append("svg").attr("width",e).attr("height",i);r.append("text").attr("class","title").attr("x",e-a*(1+s.legendWOverlap)).attr("y",s.legendTopOffset).text(s.title).attr("font-size",s.titleProperties["font-size"]).attr("fill",s.titleProperties.fill);var o=r.append("g").attr("class","legend").attr("height",s.height).attr("width",s.width).attr("transform","translate(0,"+2*s.legendTopOffset+")");o.selectAll("rect").data(n).enter().append("rect").attr("x",e-a*(1+s.legendWOverlap)).attr("y",function(t,e){return e*s.iconSpacing}).attr("width",s.iconWidth).attr("height",s.iconHeight).style("fill",function(t,e){return s.colorScale(e)}),o.selectAll("text").data(n).enter().append("text").attr("x",e-a*(1+s.legendWOverlap)*s.textOffsetP).attr("y",function(t,e){return e*s.iconSpacing+s.textYOffset}).attr("font-size",s.labelTextProperties["font-size"]).attr("fill",s.labelTextProperties.fill).text(function(t){return t})}},{key:"reRenderWithNewData",value:function(t){this.data=t,this.removeAreas(),this.renderArea()}},{key:"reRenderWithNewOptions",value:function(t){this.delete(),this.setOps(t),this.areas=[],this.render()}},{key:"removeAxis",value:function(){this.axisLines.remove(),this.axisText.remove(),this.rects.each(function(t){d.select(t.axisRect).on("mouseover",null).on("mouseout",null).remove()})}},{key:"removeAreas",value:function(){this.areas.forEach(function(t){return t.remove()})}},{key:"delete",value:function(){this.removeAreas(),this.removeAxis(),this.rootSvg.remove()}}]),e}()});
