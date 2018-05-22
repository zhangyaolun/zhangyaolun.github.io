/*菜单管理*/
var indexMenus = function() {
	/*菜单管理*/
	var menusIstation = function() {
		var suc = function(data){
			var oHtml = '',_res = data.result;
			for(var i=0;i<_res.length;i++){
				oHtml+='<li><a href="javascript:void(0);" oId="'+JSON.stringify(_res[i]).replace(/"([^"]*)"/g, "'$1'")+'"><i class="fa '+_res[i].iconCls+'"></i> <span class="title">'+_res[i].menuName+'</span>'
				if(_res[i].leafMenu){
					oHtml+='<i class="icon-arrow"></i></a><ul class="sub-menu">'
					for(var s=0;s<_res[i].leafMenu.length;s++){
						oHtml+='<li><a oIndex="'+s+'" href="javascript:void(0);" oId="'+JSON.stringify(_res[i].leafMenu[s]).replace(/"([^"]*)"/g, "'$1'")+'" ><i class="fa '+_res[i].leafMenu[s].iconCls+'"></i> <span class="title">'+_res[i].leafMenu[s].menuName+'</span></a></li>'
					}
					oHtml+='</ul></li>'
				}else{
					oHtml+='</a></li>'
				}
			}
			$('.contMenus').html(oHtml);
			contMenusClick();
			alltMenu();
		}
		doPost('/sys/menu/allMenus','',suc);
	};
	/*菜单管理点击*/
	var contMenusClick = function() {
		/*新增*/
		$('.btnMenus_ListAdd').on('click',function(){
			remAttr();
			$('.parentIdMenus select').val('');
			dataHtmlFalse();
			$('.butMenus_btn').css('display','none');
			$('.butMenus_title').css('display','block');
			btnTrueFalse();
			$('.parentIdMenus').css('display','block');
		})
		$('.contMenus > li a').on('click', function() {
			dataHtmlFalse();
			var data = $(this).attr('oId'),oData = JSON.parse(data.replace(/'/g, '"'));
			dataHtml(oData,data);
			$('.butMenus_title').css('display','none');
			$('.butMenus_btn').css('display','block');
			delListMenus();
			if($(this).parent().children('ul').hasClass('sub-menu') && ((!$body.hasClass('navigation-small') || $windowWidth < 767) || !$(this).parent().parent().hasClass('contMenus'))) {
					$(this).parent().parent().find('li').removeClass('active')
					if(!$(this).parent().hasClass('open')) {
						$(this).parent().addClass('open');
						$(this).parent().parent().children('li.open').not($(this).parent()).not($('.contMenus > li.active')).removeClass('open').children('ul').slideUp(200);
						$(this).parent().children('ul').slideDown(200, function() {
							if(mainNavigation.height() > $(".contMenus").outerHeight()) {

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
							$(this).parent().parent().children('li.open').not($('.contMenus > li.active')).removeClass('open').children('ul').slideUp(200, function() {
								if(mainNavigation.height() > $(".contMenus").outerHeight()) {
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
								if(mainNavigation.height() > $(".contMenus").outerHeight()) {
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
					if($(this).attr('oIndex')){
						$(this).parent().parent().find('li').removeClass('active').eq($(this).attr('oIndex')).addClass('active');				
					}else{
						$(this).parent().parent().find('li').removeClass('active');
						$(this).parent().parent().children('li.open').not($('.contMenus > li.active')).removeClass('open').children('ul').slideUp(200, function() {
							if(mainNavigation.height() > $(".contMenus").outerHeight()) {
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
					$(this).parent().parent().find('li').removeClass('open')
						$(this).parent().addClass('active');
					}
			}
		});
		/*确定*/
		$('.butMenus_true').on('click',function(){
			xcsoftTitle();
			var _oid = $(this).parent().attr('oId'),aId = '',parentId='',title='';
			if(!_oid){
				parentId=$('.parentIdMenus select').val();
				title = '新增成功';
			}else{
				var _oidId = JSON.parse(_oid.replace(/'/g, '"'));
				aId = _oidId.id;
				parentId=_oidId.parentId;
				title = '修改成功';
			}
			if(!checkNotEmpty($('.menusName').val())){xcsoft.error('菜单名称不能为空',1500);return;};
			if(!checkNotEmpty($('.menusUrl').val())){xcsoft.error('菜单url不能为空',1500);return;};
			if(!checkNotEmpty($('.menusNum').val())){xcsoft.error('排序字段不能为空',1500);return;};
			if(!checkNotEmpty($('.menusCss').val())){xcsoft.error('菜单图标样式不能为空',1500);return;};
			var aData = {
				'id':aId,
				'menuName':$('.menusName').val(),
				'requestUrl':$('.menusUrl').val(),
				'iconCls':$('.menusCss').val(),
				'sortNo':$('.menusNum').val(),
				'parentId':parentId
			}
			console.log(aData)
			var btn_exmineClick = function(){
				var addsuc = function(data){
					xcsoft.success(title,1500);
					setTimeout(function(){
						dataHtmlFalse();
						window.location.reload();
					},1200)
				}
				doPost('/sys/menu/createOrUpdate',aData,addsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
	};
	
	function delListMenus(){
		/*修改*/
		$('.butAdd_sure').on('click',function(){
			remAttr();
			$('.butMenus_btn').css('display','none');
			$('.butMenus_title').css('display','block');
			btnTrueFalse();
		})
		/*删除*/
		$('.butAdd_del').on('click',function(){
			var _oid = $(this).parent().attr('oId');
			if(!_oid)return;
			var _oidId = JSON.parse(_oid.replace(/'/g, '"'))
			var del_url = '/sys/menu/delete/'+_oidId.id;
			var btn_exmineClick = function(){
				var delsuc = function(data){
					xcsoftTitle();
					xcsoft.success('删除成功',1500);
					setTimeout(function(){
						dataHtmlFalse();
						window.location.reload();
					},1200)
				}
				doPost(del_url,'',delsuc);
			}
			examIndexUp('删除',btn_exmineClick);
			showData('examineIndex');
		})
	}
	
	function btnTrueFalse(){
		/*取消*/
		$('.butMenus_false').on('click',function(){
			var _oid = $(this).parent().attr('oId');
			if(!_oid){
				dataHtmlFalse();
			}else{
				var _oidId = JSON.parse(_oid.replace(/'/g, '"'));
				dataHtml(_oidId,_oid);
			}
			addAttr();
			$('.butMenus_title').css('display','none');
			$('.butMenus_btn').css('display','block');
		})
	}
	function dataHtmlFalse(){
		$('.menusName').val('');
		$('.menusUrl').val('');
		$('.menusNum').val('');
		$('.menusCss').val('');
		$('.butMenus_btn').attr('oId','');
		$('.butMenus_title').attr('oId','');
	}
	
	function dataHtml(oData,data){
		$('.menusName').val(oData.menuName || '');
		$('.menusUrl').val(oData.requestUrl || '');
		$('.menusNum').val(oData.sortNo || '');
		$('.menusCss').val(oData.iconCls || '');
		if(oData.parentId){
			$('.parentIdMenus').css('display','block');
			$('.parentIdMenus select').val(oData.parentId);
		}else{
			$('.parentIdMenus').css('display','none');
		}
		$('.butMenus_btn').attr('oId',data);
		$('.butMenus_title').attr('oId',data);
	}
	function addAttr(){
		$(".panel_menus input").attr("disabled",'false');
		$(".panel_menus select").attr("disabled",'false');
	}
	function remAttr(){
		$(".panel_menus input").removeAttr("disabled",'false');
		$(".panel_menus select").removeAttr("disabled",'false');
	}
	function alltMenu(){
		var success = function(data){
			var oMenusHtml = '',_res = data.result;
			for(var i=0;i<_res.length;i++){
				oMenusHtml+='<option value="'+_res[i].id+'"><font style="vertical-align: inherit;">'+_res[i].menuName+'</font></option>'
			}
			$('.parentIdMenus select').append(oMenusHtml);
		}
		doPost('/sys/menu/allParentMenu','',success);
	}
	return {
		init: function() {
			menusIstation();
		}
	};
}();

/*角色管理*/
var roleIndex = function() {
	/*角色管理*/
	function roleIndexMain(){
		var sucRole = function(data){
			var oRoleHtml = '',roleAll_res = data.result,roleAttr = ['普通用户','管理员用户','系统管理员']
			for(var i=0;i<roleAll_res.length;i++){
				oRoleHtml+='<tr><td class="center">'+roleAll_res[i].roleName+'</td><td class="center">'+roleAttr[roleAll_res[i].roleType]+'</td><td class="center" roleId="'+roleAll_res[i].id+'"><a href="#" class="btn btn-xs btn-blue tooltips buttonRole_title" data-placement="top" data-original-title="编辑" ><i class="fa fa-edit"></i></a>  <a href="#" class="btn btn-xs btn-red tooltips buttonRole_delete" data-placement="top" data-original-title="删除"><i class="fa fa-times fa fa-white"></i></a></td></tr>'
			}
			$('.roleIndex_table tbody').html(oRoleHtml);
			runTooltips();
		}
		doPost('/sys/role/all','',sucRole);
		roleInTitle();
		roleInDelete();
		roleInAdd();
	}
	//角色管理点击编辑
	function roleInTitle(){
		$('.buttonRole_title').bind('click',function(){
			$(this).blur();
			$('.roleIndex').show().addClass("animated bounceIn").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated bounceIn");
			});
			$('.roleIndex').scrollUnique();
			var role_oid = $(this).parent().attr('roleId');
			var roledel_search = '/sys/role/menu/search/'+role_oid;
			var searchsuc = function(data){
				console.log(data)
				$('.roleMenus').html('');
				var oHtml = '',_res = data.result;
				for(var i=0;i<_res.length;i++){
					oHtml+='<li><a href="javascript:void(0);" oId="'+JSON.stringify(_res[i]).replace(/"([^"]*)"/g, "'$1'")+'"><i class="fa '+_res[i].iconCls+'"></i> <span class="title">'+_res[i].menuName+'</span>'
					if(_res[i].leafMenu){
						if(_res[i].selected){
							oHtml+='<i class="icon-arrow"></i></a><label><input type="checkbox" value="" checked class="grey parentInput" roleId="'+role_oid+'" menuId="'+_res[i].id+'"></label><ul class="sub-menu">'
						}else{
							oHtml+='<i class="icon-arrow"></i></a><label><input type="checkbox" value="" class="grey parentInput" roleId="'+role_oid+'" menuId="'+_res[i].id+'"></label><ul class="sub-menu">'
						}
						for(var s=0;s<_res[i].leafMenu.length;s++){
							oHtml+='<li><a oIndex="'+s+'" href="javascript:void(0);" oId="'+JSON.stringify(_res[i].leafMenu[s]).replace(/"([^"]*)"/g, "'$1'")+'" ><i class="fa '+_res[i].leafMenu[s].iconCls+'"></i> <span class="title">'+_res[i].leafMenu[s].menuName+'</span>'
							if(_res[i].leafMenu[s].selected){
								oHtml+='</a><label><input type="checkbox" value="" roleChildren="'+i+'" roleParentId="'+_res[i].id+'" roleParentSelect="'+_res[i].selected+'" checked class="grey" roleId="'+role_oid+'" menuId="'+_res[i].leafMenu[s].id+'"></label></li>'
							}else{
								oHtml+='</a><label><input type="checkbox" roleChildren="'+i+'" roleParentId="'+_res[i].id+'" roleParentSelect="'+_res[i].selected+'" value="" class="grey" roleId="'+role_oid+'" menuId="'+_res[i].leafMenu[s].id+'"></label></li>'
							}
						}
						oHtml+='</ul></li>'
					}else{
						if(_res[i].selected){
							oHtml+='</a><label><input type="checkbox" value="" checked class="grey" roleId="'+role_oid+'" menuId="'+_res[i].id+'"></label></li>'
						}else{
							oHtml+='</a><label><input type="checkbox" value="" class="grey" roleId="'+role_oid+'" menuId="'+_res[i].id+'"></label></li>'
						}
					}
				}
				$('.roleMenus').html(oHtml);
				shuClick('roleMenus');
				roleInMenuAdd();
			}
			doPost(roledel_search,'',searchsuc);
		})
		
		$('.roleDiv_close').bind('click',function(){
			$('.roleIndex').hide();
		})
	}
	//角色管理点击删除
	function roleInDelete(){
		$('.buttonRole_delete').bind('click',function(){
			var role_oid = $(this).parent().attr('roleId');
			if(!role_oid)return;
			var roledel_url = '/sys/role/del/'+role_oid;
			var btn_exmineClick = function(){
				var delsuc = function(data){
					xcsoftTitle();
					xcsoft.success('删除成功',1000);
					setTimeout(function(){
						window.location.reload();
					},1000)
				}
				doPost(roledel_url,'',delsuc);
			}
			examIndexUp('删除',btn_exmineClick);
			showData('examineIndex');
		})
	}
	//角色管理新建
	function roleInAdd(){
		$('.buttonRole_newAdd').bind('click',function(){
			xcsoftTitle();
			var roleName = $('.roleName').val();
			if(!checkNotEmpty(roleName)){xcsoft.error('角色名称不能为空',1500);return;};
			var roleInAdd_data = {
				'roleName':roleName,
				'roleType':$('.roleIndex_select').val()
			}
			var btn_exmineClick = function(){
				var sucRole = function(data){
					if(data.result){
						xcsoft.success('添加成功',1500);
						setTimeout(function(){
							window.location.reload();
						},1200)
					}
				} 
				doPost('/sys/role/create',roleInAdd_data,sucRole);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
	}
	//角色菜单添加与删除
	function roleInMenuAdd(){
		$('.roleMenus input').bind('click',function(){
			var _this = $(this),
			roleId = _this.attr('roleId'),
			menuId = _this.attr('menuId'),
			roleChildren = _this.attr('roleChildren'),
			roleadd_url='';
			if(_this.is(':checked')){
				if(roleChildren){
					var roleParentSelect = _this.attr('roleParentSelect'),
						roleParentId = _this.attr('roleParentId');
					if(roleParentSelect == 'false'){
						var roleadd_Children = '/sys/role/menu/add/'+roleId+'/'+roleParentId;
						var Childrensuc = function(data){
							$('.roleMenus>li').eq(roleChildren).find('.parentInput').prop('checked',true);
							_this.attr('roleParentSelect','true');
						}
						doPost(roleadd_Children,'',Childrensuc);
						roleAjax('add',roleId,menuId);
					}else{
						roleAjax('add',roleId,menuId);
					}
				}else{
					roleAjax('add',roleId,menuId);
				}
			}else{
				if(roleChildren){
					var roleParentSelect = _this.attr('roleParentSelect'),
						roleParentId = _this.attr('roleParentId'),
						oRoleItemFalg = 1,
						oListItem = _this.parent().parent().parent().find('input');
					for(var z=0;z<oListItem.length;z++){
						if(oListItem.eq(z).is(':checked')){
							oRoleItemFalg = 2;
						}
					}
					if(oRoleItemFalg == 1){
						roleadd_url = '/sys/role/menu/del/'+roleId+'/'+roleParentId;
						var delsuc = function(data){
							$('.roleMenus>li').eq(roleChildren).find('.parentInput').prop('checked',false);
							_this.attr('roleParentSelect','false');
						}
						doPost(roleadd_url,'',delsuc);
						roleAjax('del',roleId,menuId);
					}else{
						roleAjax('del',roleId,menuId);
					}
				}else{
					var pListItem = _this.parent().parent().find('.sub-menu').find('input');
					for(var x=0;x<pListItem.length;x++){
						roleAjax('del',roleId,pListItem.eq(x).attr('menuid'));
						pListItem.eq(x).prop('checked',false);
						pListItem.eq(x).prop('roleparentselect','false');
					}
					roleAjax('del',roleId,menuId);
				}
			}
			function roleAjax(del,roleId,menuId){
				roleadd_url = '/sys/role/menu/'+del+'/'+roleId+'/'+menuId;
				var delsuc = function(data){
					xcsoftTitle();
					if(data.result){
						xcsoft.success('修改成功',1000);
					}else{
						xcsoft.error('修改失败',1000);
					}
				}
				doPost(roleadd_url,'',delsuc);
			}
		})
	}
	//树状点击
	function shuClick(roleMenus){
		$("."+roleMenus +"> li a").on('click', function() {
			if($(this).parent().children('ul').hasClass('sub-menu') && ((!$body.hasClass('navigation-small') || $windowWidth < 767) || !$(this).parent().parent().hasClass(roleMenus))) {
					$(this).parent().parent().find('li').removeClass('active')
					if(!$(this).parent().hasClass('open')) {
						$(this).parent().addClass('open');
						$(this).parent().parent().children('li.open').not($(this).parent()).not($('.contMenus > li.active')).removeClass('open').children('ul').slideUp(200);
						$(this).parent().children('ul').slideDown(200, function() {
							if(mainNavigation.height() > $("."+roleMenus).outerHeight()) {
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
							$(this).parent().parent().children('li.open').not($("."+roleMenus +"> li.active")).removeClass('open').children('ul').slideUp(200, function() {
								if(mainNavigation.height() > $("."+roleMenus).outerHeight()) {
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
								if(mainNavigation.height() > $("."+roleMenus).outerHeight()) {
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
					if($(this).attr('oIndex')){
						$(this).parent().parent().find('li').removeClass('active').eq($(this).attr('oIndex')).addClass('active');				
					}else{
						$(this).parent().parent().find('li').removeClass('active');
						$(this).parent().parent().children('li.open').not($('.contMenus > li.active')).removeClass('open').children('ul').slideUp(200, function() {
							if(mainNavigation.height() > $(".contMenus").outerHeight()) {
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
					$(this).parent().parent().find('li').removeClass('open')
						$(this).parent().addClass('active');
					}
			}
		});
	}
	return {
		init: function() {
			roleIndexMain();
		}
	};
}();



/*账号管理*/
var userIstation = function() {
	/*账号管理*/
	function userIstation(){
		userIsData(1,'');
		userIsSearch();
	}
	function userIsNewAdd(){
		/*新建账号显示*/
		$('.buttonUser_newAdd').bind('click',function(){
			$('.userIstation_num').editable({
	            validate: function (value) {
	                if (!$.trim(value)) {return '不能为空';}
	            }
	        });
			$('.userIstation_email').editable({
	            validate: function (value) {
	                if (!$.trim(value)) {return '不能为空';}
				    if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)){
				       return "邮箱格式有误";
				    };
	            }
	        });
			$('.userIstation_name').editable({
	            validate: function (value) {
	                if (!$.trim(value)) {return '不能为空';}
	            }
	        });
			$('.userIndex').show().addClass("animated bounceIn").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated bounceIn");
			});
			$('.userIndex').scrollUnique();
		})
		/*新建确定*/
		$('.buttonUser_true').bind('click',function(){
			var true_this = $(this),
				account = $('.userIstation_num').html(),
				email = $('.userIstation_email').html(),
				userName = $('.userIstation_name').html(),
				enable = $(".userIndex input[type='radio']:checked").val(),
				roleIds = '',
				true_falg = 1;
			if(!checkNotEmpty(account)){xcsoft.error('账号不能为空',1500);return;};
			if(!checkNotEmpty(email)){xcsoft.error('邮箱不能为空',1500);return;};
			if(!checkEmail(email)){xcsoft.error('邮箱格式不正确',1500);return;};
			if(!checkNotEmpty(userName)){xcsoft.error('姓名不能为空',1500);return;};
			for(var t=0;t<$('.userIndex .userIsInput_checkbox label').length;t++){
				if($('.userIndex .userIsInput_checkbox label').eq(t).find('input').is(':checked')){
					roleIds +=$('.userIndex .userIsInput_checkbox label').eq(t).attr('userischeckid')+','
				}
			}
			if(roleIds == ''){xcsoft.error('请选择角色',1500);return;};
			roleIds = roleIds.substring(0,roleIds.length-1);
			var accsuc = function(data){
				xcsoftTitle();
				if(data.result){
					xcsoft.error('账号已存在，不能创建',1000);
					true_falg = 2;
				}
			}
			doPost('/sys/user/validate/account/'+account,'',accsuc);
			if(true_falg == 2){return;}
			var trueData = {
				'account':account,
				'email':email,
				'userName':userName,
				'enable':enable,
				'roleIds':roleIds
			}
			var truesuc = function(data){
				titleXcsoft(data.result);
				if(data.result){
					window.location.reload();
				}
			}
			doPost('/sys/user/create',trueData,truesuc);
		})
		/*新建取消*/
		$('.buttonUser_false').bind('click',function(){
			$('.userIndex').hide();
		})
		$('.roleDiv_close').bind('click',function(){
			$('.userIndex').hide();
		})
	}
	function userIsRole(){
		/*账号角色点击显示*/
		$('.buttonUser_Role').bind('click',function(){
			$('.userIndexRole .buttonUserRole_true').attr('userId',$(this).parent().parent().attr('idReset'));
			var UserRole_name = $(this).attr('roleNames');
			$('.userIndexRole .buttonUserRole_true').attr('oUserIndex',$(this).attr('oUserIndex'));
			userIsRoleAll('userIndexRole .checkbox_input',UserRole_name);
			$('.userIndexRole').show().addClass("animated bounceIn").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated bounceIn");
			});
			$('.userIndexRole').scrollUnique();
		})
		/*账号角色确定*/
		$('.buttonUserRole_true').bind('click',function(){
			var true_this = $(this),
				true_userId = true_this.attr('userId'),
				roleIds='',
				roleIdName='',
				oUserIndex=true_this.attr('oUserIndex');
			for(var t=0;t<$('.userIndexRole .checkbox_input label').length;t++){
				if($('.userIndexRole .checkbox_input label').eq(t).find('input').is(':checked')){
					roleIds +=$('.userIndexRole .checkbox_input label').eq(t).attr('userischeckid')+','
					roleIdName+=$('.userIndexRole .checkbox_input label').eq(t).find('font').html()+','
				}
			}
			if(roleIds == '')return;
			roleIds = roleIds.substring(0,roleIds.length-1);
			roleIdName = roleIdName.substring(0,roleIdName.length-1);
			var trueData = {
				'userId':true_userId,
				'roleIds':roleIds
			}
			var truesuc = function(data){
				titleXcsoft(data.result);
				if(data.result){
					$('.userIndex_table tbody tr').eq(oUserIndex).find('td').eq(4).html(roleIdName);
					$('.buttonUser_Role').attr('roleNames',roleIdName);
					$('.userIndexRole').hide();
					$('.userIndexRole .buttonUserRole_true').attr('userId','');
				}
			}
			doPost('/sys/user/role/update',trueData,truesuc);
		})
		/*账号角色取消*/
		$('.roleDiv_close').bind('click',function(){
			$('.userIndexRole').hide();
			$('.userIndexClass').hide();
			$('.userIndexChannel').hide();
			$('.userIndexRole .buttonUserRole_true').attr('userId','');
		})
		
		/*账号分类点击显示*/
		$('.buttonUser_class').bind('click',function(){
			var class_userId = $(this).parent().parent().attr('idReset');
			$('.userIndexClass .buttonUserClass_true').attr('userId',class_userId);
			showData('userIndexClass');
			$('.userIndexClass').scrollUnique();
			var modSkuBrand = {
				'userId':class_userId
			}
			var modSkuProConsuc = function(data){
				var _result = data.result,_ohtml='';
				$('.userIndexClass_input').html('');
				for(var i=0;i<_result.length;i++){
					$('.userIndexClass_input').append('<label class="checkbox-inline" userischeckid="33c77e730f994e3c8fe4b0d2f4f29a8e" style="margin:0 20px 10px 0 !important;width:100px;line-height: 25px;"><input type="checkbox" class="green" value="" id="'+_result[i].id+'">'+_result[i].categoryName+'</label>');
					if(_result[i].selected){
						$('.userIndexClass_input label').eq(i).find('input').attr('checked','true');
					}
				}
			}
			doPost('/sys/userCategory/all',modSkuBrand,modSkuProConsuc);
			//修改选中状态
			$('.userIndexClass_input label input').on("change propertychange", function(){
				var _this = $(this),user_url='';
				var userIsAblesuc = function(data){
					if(data.result){
						xcsoft.success('修改成功',800);
					}else{
						xcsoft.error('修改失败',800);
					}
				}
				if(_this.is(':checked')){
					user_url = '/sys/userCategory/add/'+class_userId+'/'+_this.attr('id')
				}else{
					user_url = '/sys/userCategory/delete/'+class_userId+'/'+_this.attr('id')
				}
				doPost(user_url,'',userIsAblesuc);
			})
		})
		
		
		/*账号渠道点击显示*/
		$('.buttonUser_channel').bind('click',function(){
			var class_userId = $(this).parent().parent().attr('idReset');
			showData('userIndexChannel');
			$('.buttonUser_channel').scrollUnique();
			var modSkuBrand = {
				'userId':class_userId
			}
			var modSkuProConsuc = function(data){
				console.log(data)
				var _result = data.result,_ohtml='';
				$('.userIndexChannel_input').html('');
				for(var i=0;i<_result.length;i++){
					$('.userIndexChannel_input').append('<label class="checkbox-inline" userischeckid="33c77e730f994e3c8fe4b0d2f4f29a8e" style="margin:0 40px 10px 0 !important;width:175px;line-height: 25px;"><input type="checkbox" class="green" value="" id="'+_result[i].id+'">'+_result[i].channelName+'</label>');
					if(_result[i].selected){
						$('.userIndexChannel_input label').eq(i).find('input').attr('checked','true');
					}
				}
			}
			doPost('/sys/userChannel/all',modSkuBrand,modSkuProConsuc);
			//修改选中状态
			$('.userIndexChannel_input label input').on("change propertychange", function(){
				var _this = $(this),user_url='';
				var userIsAblesuc = function(data){
					if(data.result){
						xcsoft.success('修改成功',800);
					}else{
						xcsoft.error('修改失败',800);
					}
				}
				if(_this.is(':checked')){
					user_url = '/sys/userChannel/add/'+class_userId+'/'+_this.attr('id')
				}else{
					user_url = '/sys/userChannel/delete/'+class_userId+'/'+_this.attr('id')
				}
				doPost(user_url,'',userIsAblesuc);
			})
		})
	}
	function userIsDisable(){
		/*账号启用禁用*/
		$('.buttonUser_Enable').bind('click',function(){
			var Enable_this = $(this),
				userIsAble_url='',
				Enable_Id = Enable_this.parent().parent().attr('idReset');
			if(Enable_this.find('i').html() != '禁用'){
				userIsAble_url = '/sys/user/update/enable/'+Enable_Id;
			}else{
				userIsAble_url = '/sys/user/update/disable/'+Enable_Id;
			}
			var userIsAblesuc = function(data){
				titleXcsoft(data.result);
				if(Enable_this.find('i').html() != '禁用'){
					Enable_this.find('i').html('禁用');
					Enable_this.parent().parent().find('td').eq(2).html('启用');
				}else{
					Enable_this.find('i').html('启用');
					Enable_this.parent().parent().find('td').eq(2).html('禁用');
				}
			}
			doPost(userIsAble_url,'',userIsAblesuc);
		})
	}
	function userIsRoleAll(userIsInput,name){
		/*账号角色数据显示*/
		var userIsRoleAllsuc = function(data){
			var oRoleAll_html = '',
				RoleAll_html = '';
			if(userIsInput == 'userIndexRole .checkbox_input'){
				oRoleAll_html = '';
			}
			for(var a=0;a<data.result.length;a++){
				RoleAll_html+='<label class="checkbox-inline" userIscheckId="'+data.result[a].id+'" style="margin: 0 30px 0 0 !important;line-height: 25px;"><input type="checkbox" class="green" value=""><font style="vertical-align: inherit;">'+data.result[a].roleName+'</font></label>'
			}
			RoleAll_html = oRoleAll_html+RoleAll_html;
			$("."+userIsInput).html(RoleAll_html);
			if(userIsInput == 'userIndexRole .checkbox_input'){
				var name_attr = name.split(',');
				for(var n=0;n<name_attr.length;n++){
					for(var m=0;m<$("."+userIsInput+' label').length;m++){
						if(name_attr[n] == $("."+userIsInput+' label').eq(m).find('font').html()){
							$("."+userIsInput+' label').eq(m).find('input').attr('checked','true');
						}
					}
				}
			}
		}
		doPost('/sys/role/all','',userIsRoleAllsuc);
	}
	function userIsData(num,account){
		/*账号角色数据初始化*/
		var userAllData = {
			'account':account,
			'currPage':num,
			'pageSize':10
		}
		var userAllsuc = function(data){
			console.log(data)
			var user_res = data.result,user_Html = '';
			$('.userIndex_table tbody').html('');
			if(user_res.result == ''){
				$('.userPage').hide();
				$('.userIndex_table .userIndex_table_false').show();
			}else{
				$('.userIndex_table .userIndex_table_false').hide();
				for(var u=0;u<user_res.result.length;u++){
					user_Html += '<tr idReset="'+user_res.result[u].id+'"><td class="center">'+user_res.result[u].account+'</td><td class="center">'+user_res.result[u].email+'</td><td class="center">'+user_res.result[u].enable+'</td><td class="center">'+user_res.result[u].userName+'</td><td class="center">'+user_res.result[u].roleNames+'</td><td class="center"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_Enable" duata-placement="top"><i class="fa">'+odaDis(user_res.result[u].enable)+'</i></a><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_Role" data-placement="top" data-original-title="角色" roleNames="'+user_res.result[u].roleNames+'" oUserIndex="'+u+'"><i class="fa">角色</i></a><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_class" data-placement="top" data-original-title="分类"><i class="fa">分类</i></a><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_channel" data-placement="top" data-original-title="渠道"><i class="fa">渠道</i></a></td></tr>'
				}
				function odaDis(da){
					var oDa = da;
					da=='启用'?oDa='禁用':oDa='启用';
					return oDa;
				}
				$('.userIndex_table tbody').html(user_Html);
				OpageDisplay(user_res.pageNo,user_res.totalPages,'userPage');
				userIsNewAdd();
				userIsRole();
				userIsRoleAll('userIsInput_checkbox','');
				userIsDisable();
			}
		}
		doPost('/sys/user/search',userAllData,userAllsuc);
	}
	/*账号管理查询*/
	function userIsSearch(){
		$('.buttonUser_search').on('click',function(){
			userIsData(1,$('.userSeaName').val());
		})
	}
	/*账号管理显示分页*/
	function OpageDisplay(pageNo,totalPages,userPage){
		$('.userPage').show();
		var currentPage = pageNo;
        var totalPages = totalPages;
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion:3, //对应的bootstrap版本
            currentPage: currentPage, //当前页数
            numberOfPages: 10, //每次显示页数
            totalPages:totalPages, //总页数
            shouldShowPage:true,//是否显示该按钮
            useBootstrapTooltip:true,
           //点击事件
            onPageClicked: function (event, originalEvent, type, page) {
				var username = $('.userSeaName').val() || '';
				userIsData(page,username);
            }
        });
	}
	return {
		init: function() {
			userIstation();
		}
	};
}();
/*参数配置*/
var indexConfig = function() {
	function configIstation(){
		var configAllsuc = function(data){
			var user_Config = data.result,Config_Html = '';
			for(var u=0;u<user_Config.length;u++){
				Config_Html+='<tr conData="'+JSON.stringify(user_Config[u]).replace(/"([^"]*)"/g, "'$1'")+'"><td class="center">'+user_Config[u].appKey+'</td><td class="center">'+user_Config[u].appValue+'</td><td class="center">'+user_Config[u].description+'</td><td class="center"><a href="#" class="btn btn-xs btn-blue tooltips buttonConfig_title" data-placement="top" data-original-title="编辑"><i class="fa fa-edit"></i></a></td></tr>'
			}
			$('.config_table tbody').html(Config_Html);
			runTooltips();
		}
		doPost('/sys/config/search','',configAllsuc);
		configClick();
	}
	/*点击*/
	function configClick(){
		/*点击新增*/
		$('.buttonConfig_search').on('click',function(){
			$('.config_key').val('');
			$('.config_value').val('');
			$('.config_des').val('');
			$('.butConfig_sure').attr('oid','');
			$('.configIndex').show().addClass("animated flipInX").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated flipInX");
			});
			$('.configIndex').scrollUnique();
		})
		/*点击编辑*/
		$('.buttonConfig_title').on('click',function(){
			$(this).blur();
			var conData = $(this).parent().parent().attr('conData');
				conData = JSON.parse(conData.replace(/'/g, '"'));
				$('.config_key').val(conData.appKey);
				$('.config_value').val(conData.appValue);
				$('.config_des').val(conData.description);
				sure_id = conData.id;
			$('.butConfig_sure').attr('oid',sure_id);
			$('.configIndex').show().addClass("animated flipInX").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated flipInX");
			});
			$('.configIndex').scrollUnique();
		})
		configDiv();
	}
	function configDiv(){
		$('.roleDiv_close').on('click',function(){
			$('.configIndex').hide();
		})
		$('.butConfig_sure').on('click',function(){
			var appKey= $('.config_key').val(),
				appValue= $('.config_value').val(),
				description= $('.config_des').val(),
				sure_this = $(this);
			if(!checkNotEmpty(appKey)){xcsoft.error('Key不能为空',1500);return;};
			if(!checkNotEmpty(appValue)){xcsoft.error('Value不能为空',1500);return;};
			if(!checkNotEmpty(description)){xcsoft.error('描述不能为空',1500);return;};
			var but_dat = {
				'id':sure_this.attr('oid'),
				'appKey':appKey,
				'appValue':appValue,
				'description':description
			}
			var btn_exmineClick = function(){
				var config_but = function(data){
					xcsoftTitle();
					if(data.result){
						if(sure_this.attr('oid') == ''){
							xcsoft.success('添加成功',1000);
						}else{
							xcsoft.success('修改成功',1000);
						}
						setTimeout(function(){
							window.location.reload();
						},1200)
					}else{
						xcsoft.error(data.msg,1000);
					}
				}
				doPost('/sys/config/createOrUpdate',but_dat,config_but);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
			
		})
	}
	return {
		init: function() {
			configIstation();
		}
	};
}();