var isIE8 = false, isIE9 = false, inner = $(".main-wrapper > .inner"), supportTransition = true, closedbar = $(".closedbar"), isMobile = false, isIEMobile = false, $body = $("body"), $windowWidth, $windowHeight, subViews = $(".subviews"), sideLeft = $('#pageslide-left'), sideRight = $('#pageslide-right'), mainNavigation = $('.main-navigation'), sidebarWidth = sideLeft.outerWidth(true), topBar = $(".topbar"), mainContainer = $(".main-container"), mainContent = $(".main-content"), footer = $(".main-wrapper > footer");
var thisSlider, actualItemWidth, newItemWidth, activeAnimation = false, hoverSideBar = false;
;

// Debounce Function
(function($, sr) {"use strict";
		 
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function(func, threshold, execAsap) {
		var timeout;
		return function debounced() {
			var obj = this, args = arguments;

			function delayed() {
				if(!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if(timeout)
				clearTimeout(timeout);
			else if(execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize
	jQuery.fn[sr] = function(fn) {
		return fn ? this.on('resize', debounce(fn)) : this.trigger(sr);
	};
})(jQuery, 'espressoResize');

//Main Function
var Main = function() {"use strict";
	var runInit = function() {
		judgeLogin();
		outLogin();
		var username = $.cookie("username");
		$('.username').html(username);
		var searchConsuc = function(data){
			var _result = data.result;
			if(_result){
				$.cookie("orderStatus",JSONstringify(JSON.stringify(_result)));
			}
		}
		doPost('/sys/widget/orderStatus','',searchConsuc);
		
		/*var currentPage = 1;
        var totalPages = 1;
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion:3, //对应的bootstrap版本
            currentPage: currentPage, //当前页数
            numberOfPages: 10, //每次显示页数
            totalPages:totalPages, //总页数
            shouldShowPage:true,//是否显示该按钮
            useBootstrapTooltip:true,
           //点击事件
            onPageClicked: function (event, originalEvent, type, page) {
               console.log(page)

            }
        });*/
		
		if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
			var ieversion = new Number(RegExp.$1);
			if(ieversion == 8) {
				isIE8 = true;
				$body.addClass('isIE8');
			} else if(ieversion == 9) {
				isIE9 = true;
				$body.addClass('isIE9');
			}
		}
		
		// Detection for CSS Transitions Support
		var thisBody = document.body || document.documentElement, thisStyle = thisBody.style;
		supportTransition = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
		// active perfectScrollbar only in desktop devices
		if($body.hasClass("isMobile") == false && mainNavigation.length) {
			mainNavigation.perfectScrollbar({
				wheelSpeed: 50,
				minScrollbarLength: 20,
				suppressScrollX: true
			});
			$(".right-wrapper").perfectScrollbar({
				wheelSpeed: 50,
				minScrollbarLength: 20,
				suppressScrollX: true
			});

		}
		

		// set blockUI options
		if($.blockUI) {
			$.blockUI.defaults.css.border = 'none';
			$.blockUI.defaults.css.padding = '20px 5px';
			$.blockUI.defaults.css.width = '20%';
			$.blockUI.defaults.css.left = '40%';
			$.blockUI.defaults.overlayCSS.backgroundColor = '#DDDDDD';
		}
		
		// Add Fade Animation to Dropdown
		$('.dropdown').on('show.bs.dropdown', function(e) {
			$(this).find('.dropdown-menu').first().stop(true, true).fadeIn(300);
		});
		$('.dropdown').on('hide.bs.dropdown', function(e) {
			$(this).find('.dropdown-menu').first().stop(true, true).fadeOut(300);
		});

		// change closebar height when footer appear
		if($.fn.appear) {
			if(isMobile == false) {
				footer.appear();
				footer.on("appear", function(event, $all_appeared_elements) {

					closedbar.css({
						bottom: (footer.outerHeight(true) + 1) + "px"
					});
				});
				footer.on("disappear", function(event, $all_disappeared_elements) {

					closedbar.css({
						bottom: 1 + "px"
					});
				});
			}
		}

	};
	var runTooltips = function() {
		if($(".tooltips").length) {
			$('.tooltips').tooltip();
		}
	};
	//function to get viewport/window size (width and height)
	var viewport = function() {
		var e = window, a = 'inner';
		if(!('innerWidth' in window )) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		};
	};

	// function to adjust the template elements based on the window size
	var runElementsPosition = function() {
		$windowWidth = viewport().width;
		$windowHeight = viewport().height;
		runContainerHeight();
	};

	//function to adapt the Main Content height to the Main Navigation height
	var runContainerHeight = function() {
		if(subViews.is(':visible')) {
			$('.main-container').css({
				'max-height': $windowHeight - topBar.outerHeight(true),
				'min-height': $windowHeight - topBar.outerHeight(true)
			});
		}
		if($("#slidingbar-area").is(':visible')) {
			$("#slidingbar-area").css({
				'max-height': $windowHeight
			});
		}
		if($windowWidth > 991) {
			mainNavigation.css({
				height: $windowHeight - topBar.outerHeight(true) - $(".slide-tools").outerHeight(true)
			});
			$(".navbar-content").css({
				height: $windowHeight - topBar.outerHeight(true)
			});
		} else {
			mainNavigation.css({
				height: $windowHeight - $(".slide-tools").outerHeight(true)
			});
			$(".navbar-content").css({
				height: $windowHeight
			});
		}

		$(".right-wrapper").css({
			height: $windowHeight
		});

		if($body.hasClass("isMobile") == false && mainNavigation.length) {
			mainNavigation.perfectScrollbar('update');
			$(".right-wrapper").perfectScrollbar('update');
		}
		if($("#horizontal-menu").length) {
			mainContent.css({
				"min-height": $windowHeight - topBar.outerHeight(true) - $("#horizontal-menu").outerHeight(true) - footer.outerHeight(true)
			});
		} else {
			mainContent.css({
				"min-height": $windowHeight - topBar.outerHeight(true) - footer.outerHeight(true)
			});
		}

		if(subViews.is(":visible")) {
			subViews.css({
				height: $windowHeight - topBar.outerHeight(true) - $(".toolbar").outerHeight(true)
			});
		}

	};
	// function to activate the ToDo list, if present
	var runToDoAction = function() {
		if($(".todo-actions").length) {
			$(".todo-actions > i").click(function() {
				if($(this).hasClass("fa-square-o") || $(this).hasClass("icon-check-empty")) {

					$(this).removeClass("fa-square-o").addClass("fa-check-square-o").parent().find("span").css({
						opacity: .25
					}).end().find(".todo-tools").hide().end().parent().find(".desc").css("text-decoration", "line-through");
				} else {
					$(this).removeClass("fa-check-square-o").addClass("fa-square-o").parent().find("span").css({
						opacity: 1
					}).end().find(".todo-tools").show().end().parent().find(".desc").css("text-decoration", "none");
				}
				return !1;
			});
		}
	};
	
	
	//function to activate the main menu functionality
	var runNavigationMenu = function() {
		if($("body").hasClass("single-page") == false) {
			$('.mainMenu > li.active').addClass('open');
			$('.mainMenu > li a').on('click', function() {

				if($(this).parent().children('ul').hasClass('sub-menu') && ((!$body.hasClass('navigation-small') || $windowWidth < 767) || !$(this).parent().parent().hasClass('mainMenu'))) {
					if(!$(this).parent().hasClass('open')) {
						$(this).parent().addClass('open');
						$(this).parent().parent().children('li.open').not($(this).parent()).not($('.mainMenu > li.active')).removeClass('open').children('ul').slideUp(200);
						$(this).parent().children('ul').slideDown(200, function() {
							if(mainNavigation.height() > $(".mainMenu").outerHeight()) {

								mainNavigation.scrollTo($(this).parent("li"), 300, {
									onAfter: function() {
										if($body.hasClass("isMobile") == false) {
											mainNavigation.perfectScrollbar('update');
										}
									}
								});
							} else {

								mainNavigation.scrollTo($(this).parent("li"), 300, {
									onAfter: function() {
										if($body.hasClass("isMobile") == false) {
											mainNavigation.perfectScrollbar('update');
										}
									}
								});
							}
						});
					} else {
						if(!$(this).parent().hasClass('active')) {
							$(this).parent().parent().children('li.open').not($('.mainMenu > li.active')).removeClass('open').children('ul').slideUp(200, function() {
								if(mainNavigation.height() > $(".mainMenu").outerHeight()) {
									mainNavigation.scrollTo(0, 300, {
										onAfter: function() {
											if($body.hasClass("isMobile") == false) {
												mainNavigation.perfectScrollbar('update');
											}
										}
									});
								} else {
									mainNavigation.scrollTo($(this).parent("li").closest("ul").children("li:eq(0)"), 300, {
										onAfter: function() {
											if($body.hasClass("isMobile") == false) {
												mainNavigation.perfectScrollbar('update');
											}
										}
									});
								}
							});
						} else {
							$(this).parent().parent().children('li.open').removeClass('open').children('ul').slideUp(200, function() {
								if(mainNavigation.height() > $(".mainMenu").outerHeight()) {
									mainNavigation.scrollTo(0, 300, {
										onAfter: function() {
											if($body.hasClass("isMobile") == false) {
												mainNavigation.perfectScrollbar('update');
											}
										}
									});
								} else {
									mainNavigation.scrollTo($(this).parent("li"), 300, {
										onAfter: function() {
											if($body.hasClass("isMobile") == false) {
												mainNavigation.perfectScrollbar('update');
											}
										}
									});
								}
							});
						}
					}
				} else {
					$(this).parent().addClass('active');
				}
			});
		} else {
			var url, ajaxContainer = $("#ajax-content");
			var start = $('.mainMenu li.start');
			if(start.length) {
				start.addClass("active");
				if(start.closest('ul').hasClass('sub-menu')) {
					start.closest('ul').parent('li').addClass('active open');
				}
				url = start.children("a").attr("href");
				ajaxLoader(url, ajaxContainer);
			}
			$('.mainMenu > li.active').addClass('open');
			$('.mainMenu > li a').on('click', function(e) {
				e.preventDefault();
				var $this = $(this);

				if($this.parent().children('ul').hasClass('sub-menu') && (!$('body').hasClass('navigation-small') || !$this.parent().parent().hasClass('mainMenu'))) {
					if(!$this.parent().hasClass('open')) {
						$this.parent().addClass('open');
						$this.parent().parent().children('li.open').not($this.parent()).not($('.mainMenu > li.active')).removeClass('open').children('ul').slideUp(200);
						$this.parent().children('ul').slideDown(200, function() {
							runContainerHeight();
						});
					} else {
						if(!$this.parent().hasClass('active')) {
							$this.parent().parent().children('li.open').not($('.mainMenu > li.active')).removeClass('open').children('ul').slideUp(200, function() {
								runContainerHeight();
							});
						} else {
							$this.parent().parent().children('li.open').removeClass('open').children('ul').slideUp(200, function() {
								runContainerHeight();
							});
						}
					}
				} else {
					$('.mainMenu ul.sub-menu li').removeClass('active');
					$this.parent().addClass('active');
					var closestUl = $this.parent('li').closest('ul');
					if(closestUl.hasClass('mainMenu')) {
						$('.mainMenu > li.active').removeClass('active').removeClass('open').children('ul').slideUp(200);
						$this.parents('li').addClass('active');
					} else if(!closestUl.parent('li').hasClass('active') && !closestUl.parent('li').closest('ul').hasClass('sub-menu')) {
						$('.mainMenu > li.active').removeClass('active').removeClass('open').children('ul').slideUp(200);
						$this.parent('li').closest('ul').parent('li').addClass('active');
					} else {

						if(closestUl.parent('li').closest('ul').hasClass('sub-menu')) {
							if(!closestUl.parents('li.open').hasClass('active')) {
								$('.mainMenu > li.active').removeClass('active').removeClass('open').children('ul').slideUp(200);
								closestUl.parents('li.open').addClass('active');
							}
						}

					}
					url = $(this).attr("href");
					ajaxLoader(url, ajaxContainer);
				};
			});
		}
	};
	// function to load content with ajax
	var ajaxLoader = function(url, element) {
		element.removeClass("fadeIn shake");
		var backdrop = $('.ajax-white-backdrop');

		$(".main-container").append('<div class="ajax-white-backdrop"></div>');
		backdrop.show();

		if($body.hasClass("sidebar-mobile-open")) {
			var configAnimation, extendOptions, globalOptions = {
				duration: 200,
				easing: "ease",
				mobileHA: true,
				progress: function() {
					activeAnimation = true;
				}
			};
			extendOptions = {
				complete: function() {
					inner.attr('style', '').removeClass("inner-transform");
					// remove inner-transform (hardware acceleration) for restore z-index
					$body.removeClass("sidebar-mobile-open");
					loadPage(url, element);
					activeAnimation = false;
				}
			};
			configAnimation = $.extend({}, extendOptions, globalOptions);

			inner.velocity({
				translateZ: 0,
				translateX: [-sidebarWidth, 0]
			}, configAnimation);
		} else {
			loadPage(url, element);
		}
		function loadPage(url, element) {
			$.ajax({
				type: "GET",
				cache: false,
				url: url,
				dataType: "html",
				success: function(data) {
					backdrop.remove();

					element.html(data).addClass("fadeIn");

				},
				error: function(xhr, ajaxOptions, thrownError) {
					backdrop.remove();
					element.html('<h4>Could not load the requested content.</h4>').addClass("shake");

				}
			});
		};
	};
	//function to Right and Left PageSlide
	var runToggleSideBars = function() {
		var configAnimation, extendOptions, globalOptions = {
			duration: 150,
			easing: "ease",
			mobileHA: true,
			progress: function() {
				activeAnimation = true;
			}
		};
		$("#pageslide-left").on("mouseover", function(e) {
			hoverSideBar = true;
		}).on("mouseleave", function(e) {
			hoverSideBar = false;
		});
		$(".sb-toggle-left, .closedbar").on("click", function(e) {
			if(activeAnimation == false) {
				if($windowWidth > 991) {
					$body.removeClass("sidebar-mobile-open");
					if($body.hasClass("sidebar-close")) {
						if($body.hasClass("layout-boxed") || $body.hasClass("isMobile")) {
							$body.removeClass("sidebar-close");
							closedbar.removeClass("open");
							$(window).trigger('resize');
						} else {
							closedbar.removeClass("open").hide();
							closedbar.css({
								//translateZ: 0,
								left: -closedbar.width()
							});

							extendOptions = {
								complete: function() {
									$body.removeClass("sidebar-close");
									$(".main-container, #pageslide-left, #footer .footer-inner, #horizontal-menu .container, .closedbar").attr('style', '');
									$(window).trigger('resize');
									activeAnimation = false;
								}
							};
							configAnimation = $.extend({}, extendOptions, globalOptions);
							$(".main-container, footer .footer-inner, #horizontal-menu .container").velocity({
								//translateZ: 0,
								marginLeft: sidebarWidth
							}, configAnimation);

						}

					} else {
						if($body.hasClass("layout-boxed") || $body.hasClass("isMobile")) {
							$body.addClass("sidebar-close");
							closedbar.addClass("open");
							$(window).trigger('resize');
						} else {
							sideLeft.css({
								zIndex: 0

							});
							extendOptions = {
								complete: function() {
									closedbar.show().velocity({
										//translateZ: 0,
										left: 0
									}, 100, 'ease', function() {
										activeAnimation = false;
										closedbar.addClass("open");
										$body.addClass("sidebar-close");
										$(".main-container, footer .footer-inner, #horizontal-menu .container, .closedbar").attr('style', '');
										$(window).trigger('resize');
									});
								}
							};
							configAnimation = $.extend({}, extendOptions, globalOptions);
							$(".main-container, footer .footer-inner, #horizontal-menu .container").velocity({
								//translateZ: 0,
								marginLeft: 0
							}, configAnimation);
						}
					}

				} else {
					if($body.hasClass("sidebar-mobile-open")) {
						if(supportTransition) {
							extendOptions = {
								complete: function() {
									inner.attr('style', '').removeClass("inner-transform");
									// remove inner-transform (hardware acceleration) for restore z-index
									$body.removeClass("sidebar-mobile-open");
									activeAnimation = false;
								}
							};
							configAnimation = $.extend({}, extendOptions, globalOptions);

							inner.velocity({
								translateZ: 0,
								translateX: [-sidebarWidth, 0]
							}, configAnimation);
						} else {
							$body.removeClass("sidebar-mobile-open");
						}
					} else {
						if(supportTransition) {
							inner.addClass("inner-transform");
							// add inner-transform for hardware acceleration
							extendOptions = {
								complete: function() {
									inner.attr('style', '');
									$body.addClass("sidebar-mobile-open");
									activeAnimation = false;
								}
							};
							configAnimation = $.extend({}, extendOptions, globalOptions);
							inner.velocity({
								translateZ: 0,
								translateX: [sidebarWidth, 0]
							}, configAnimation);
						} else {
							$body.addClass("sidebar-mobile-open");
						}

					}
				}
			}
			e.preventDefault();
		});
	};
	
	// function to refresh owlCarousel
	var runRefreshSliders = function() {
		$(".e-slider").each(function() {
			var slider = $(this).data('owlCarousel');
			slider.reinit();
		});
	};
	//function to return the querystring parameter with a given name.
	var getParameterByName = function(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	// Window Resize Function
	var runWIndowResize = function(func, threshold, execAsap) {
		//wait until the user is done resizing the window, then execute
		$(window).espressoResize(function() {
			runElementsPosition();
			setPortfolioPanel();
			runRefreshSliders();
		});
	};
	// function to activate Responsive Portfolio Panel
	var setPortfolioPanel = function() {
		$(".portfolio-grid .item").each(function() {
			var portfolioImageW = $(this).closest(".portfolio-grid").outerWidth();
			var portfolioMaxHeight = parseInt($(this).closest(".portfolio-grid").css("max-height"));
			if(isNaN(portfolioMaxHeight) == false) {
				var portfolioImage = $(this).find("img");
				var img = new Image();
				img.onload = function() {
					var thisWidth = portfolioImage.width();
					var thisHeight = portfolioImage.height();
					var thisNewWidth = portfolioImageW;
					var thisNewHeight = thisNewWidth * thisHeight / thisWidth;
					if(thisNewHeight < portfolioMaxHeight) {
						thisNewHeight = portfolioMaxHeight;
						thisNewWidth = thisNewHeight * thisWidth / thisHeight;
						if(thisNewWidth >= portfolioImageW) {
							portfolioImage.velocity({
								width: thisNewWidth,
								height: thisNewHeight,
								left: -(thisNewWidth - portfolioImageW) / 2,
								top: 0
							});
						} else {
							thisNewWidth = portfolioImageW;
							thisNewHeight = thisNewWidth * thisHeight / thisWidth;

							portfolioImage.velocity({
								width: thisNewWidth,
								height: thisNewHeight,
								top: -(thisNewHeight - portfolioMaxHeight) / 2,
								left: 0
							});
						};
					} else {

						thisNewWidth = portfolioImageW;
						thisNewHeight = thisNewWidth * thisHeight / thisWidth;

						portfolioImage.velocity({
							width: thisNewWidth,
							height: thisNewHeight,
							top: -(thisNewHeight - portfolioMaxHeight) / 2,
							left: 0
						});
					}

				};
				img.src = portfolioImage.attr("src");
			}
		});
		var owlPortfolio = $(".panel-portfolio .e-slider").data('owlCarousel');
		$(".panel-portfolio .owl-next").off().on("click", function(e) {
			owlPortfolio.next();
			e.preventDefault();
		});
		$(".panel-portfolio .owl-prev").off().on("click", function(e) {
			owlPortfolio.prev();
			e.preventDefault();
		});
	};

	//function to load user settings
	var runCustomSetting = function() {
		
	};
	//function to restore user settings
	var runDefaultSetting = function() {
		$('#style_selector select[name="layout"]').val('default');
		$('#style_selector select[name="header"]').val('fixed');
		$('#style_selector select[name="footer"]').val('default');
		$('#style_selector select[name="sidebar"]').val('fixed');
		$('.boxed-patterns img').removeClass('active');
	};
	var runClosedBarButton = function() {
		var t;
		closedbar.mouseover(function() {
			if($body.hasClass("layout-boxed") == false && $body.hasClass("isMobile") == false && closedbar.hasClass("open")) {
				t = setTimeout(function() {
					closedbar.velocity({
						left: -closedbar.width()
					}, 100, 'ease');
					sideLeft.css({
						left: -sidebarWidth,
						zIndex: 1021
					}).velocity({
						left: 0

					}, 200, 'ease');
				}, 800);
			}

		}).mouseleave(function() {

			if($body.hasClass("layout-boxed") == false && $body.hasClass("isMobile") == false) {
				clearTimeout(t);
			}
		});
		sideLeft.mouseleave(function() {
			if($body.hasClass("sidebar-close") && closedbar.hasClass("open") && $body.hasClass("isMobile") == false) {
				sideLeft.velocity({
					left: -sidebarWidth

				}, 200, 'ease', function() {
					closedbar.velocity({
						left: 0
					}, 200, 'ease');
					sideLeft.css({
						left: 0,
						zIndex: 0
					});
				});
			}
		});
	};
	/*左侧菜单管理*/
	var channelAddClick = function() {
		var suc = function(data){
			var oHtml = '',_res = data.result;
			for(var i=0;i<_res.length;i++){
				oHtml+='<li oId="'+_res[i].id+'"><a href="javascript:void(0);"><i class="fa '+_res[i].cls+'"></i> <span class="title">'+_res[i].name+'</span>'
				if(_res[i].subActions){
					oHtml+='<i class="icon-arrow"></i></a><ul class="sub-menu index_Menu">'
					for(var s=0;s<_res[i].subActions.length;s++){
						oHtml+='<li oId="'+_res[i].subActions[s].id+'"><a href="'+_res[i].subActions[s].action+'"><i class="fa '+_res[i].subActions[s].cls+'"></i> <span class="title">'+_res[i].subActions[s].name+'</span></a></li>'
					}
					oHtml+='</ul></li>'
				}else{
					oHtml+='</a></li>'
				}
			}
			$('.mainMenu').html(oHtml);
			var url_href = window.location.href,AmainMenu='';
			if(url_href.indexOf('error.html')>0){return;}
			if(url_href.indexOf('shopchannel.html')<=0){$.removeCookie('channelcode')}
			for(var i=0;i<$('.mainMenu>li').length;i++){
				for(var j=0;j<$('.mainMenu>li').eq(i).find('li a').length;j++){
					AmainMenu = $('.mainMenu>li').eq(i).find('li a').eq(j).attr('href');
					if(url_href.indexOf(AmainMenu)>0){
						$('.mainMenu>li').eq(i).addClass('active open');
						$('.mainMenu>li').eq(i).find('li').eq(j).addClass('active');
					}
				}
			}
		}
		doPost('/sys/menu/getMenus','',suc);
	};
	return {
		init: function() {
			channelAddClick();
			runWIndowResize();
			runInit();
			runToggleSideBars();
			runElementsPosition();
			runToDoAction();
			runNavigationMenu();
			runCustomSetting();
			setPortfolioPanel();
			runTooltips();
		}
	};
}();
