$(document).ready(function(){
	$(".template-flow-container").each(function(templateFlowContainer_index){
		console.log("aaaa");
		var templateFlowContainer = $(this);
		var tagClassName = "flow_index_" + templateFlowContainer_index;
		templateFlowContainer.addClass(tagClassName);
		var isBackDirection = templateFlowContainer.hasClass("back_direction");

		var groupWidth = ($(window).width()+20) * templateFlowContainer.find(".template-flow .template-set").length;
		var containerWidth = templateFlowContainer.width();
		var groupCount = 1 + Math.floor(containerWidth / groupWidth) + (containerWidth % groupWidth > 0 ? 1 : 0);
		console.log(groupWidth + ", " + containerWidth + ", " + groupCount);
		for(var i = 0; i < groupCount - 1; i++){
			templateFlowContainer.find(".template-flow .template-set").not(".cloned").each(function(templateSet_index){
				var left = templateSet_index * ($(window).width()+20);
				console.log("left:"+left)
				$(this).css("left", (isBackDirection ? "-" : "" ) + left + "px");
				$(this).clone().addClass("cloned").css("left",  (isBackDirection ? "-" : "" ) + (left + groupWidth * (i + 1)) + "px").appendTo(templateFlowContainer.find(".template-flow"));
			});
		}

		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = "@keyframes ResMoveX_" + tagClassName + " {"
					       + "	0% {"
						   + "		transform: translate3d(0px, 0, 0);"
						   + "  }"
						   + "  100% {"
						   + "  	transform: translate3d(" + (isBackDirection ? "" : "-") + groupWidth + "px, 0, 0);"
						   + "  }"
						   + "}"
						   + ".template-flow-container." + tagClassName + " .template-flow{"
						   + "  width:100%;"
						   + "  animation: 45s linear 0s infinite normal forwards running ResMoveX_" + tagClassName + ";"
						   + "  -webkit-perspective: 1000;"
						   + "  -webkit-transform-style: preserve-3d;"
						   + "}"
						   + ".template-flow-container." + tagClassName + ", .template-flow-container." + tagClassName + " *{"
						   + "  -webkit-backface-visibility: hidden;"
						   + "}";
		document.getElementsByTagName('head')[0].appendChild(style);
	});
});
