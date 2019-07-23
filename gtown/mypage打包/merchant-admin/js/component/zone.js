Vue.component("zone" , {
    props : ["checkData","trueData","index"] ,
    data : function () {
        return {
            curr : -1 ,
            zone : [] ,
            currName : "" ,
            dataOrigin : []
        };
    } ,

    methods : {
        getMore : function ( evt , idx , name ) {
            var $ = layui.jquery;
            var target = $( evt.target );
            var add_min = target.parents(".provs").find(".add_min");

            if( idx == this.curr ) {
                this.curr = -1;
            } else {
                this.curr = idx;
                this.currName = name;


                var t = setTimeout(function () {
                    var citys = add_min.find(".city");
                    var prov = target.parents(".provs").find(".prov");

                    citys.each(function (index,item) {
                        item.checked = prov.get(0).checked;
                    })
                    clearTimeout( t );
                })

            }
        } ,
        //查询区域列表
        queryZone : function ( lev ) {
            var layer = layui.layer,that = this;

            this.loading2 = true;
            http.Get( http.urls.logistics.zoneMore , lev ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.filterZoneTemplate( result , lev );
                            if( lev != 2 ) {
                                that.queryZone( ++lev );
                            }

                            break;
                        default :
                            layer.msg( data.msg );

                    }
                } catch ( e ) {
                    console.error("ERROR: " , e );
                }
                that.loading2 = false;
            })
        } ,
        //选中地区
        posiData : function () {
            var $ = layui.jquery;
            var input = $("#zone").find("input[type=checkbox]");
            var data = eval(this.trueData.transportArea) || [];


            for(var i = 0 ; i < data.length; i ++ ) {
                for(var j = 0 ;j < data[i].area.length; j ++ ) {
                    for(var k = 0 ; k < input.size(); k ++ ) {
                        if( input.eq(k).val() == data[i].area[j] || input.eq(k).val() == data[i].province ) {
                            var ins = $( input[k] ).parents(".provs").find(".ins");
                            ins.text("( "+ data[i].area.length +" )").show();
                            input[k].checked = true;
                        }
                    }
                }
            };
        } ,
        //筛选地区
        filterZoneTemplate : function ( data , lev ) {
            var that = this;
            switch( lev ) {
                case 1 :                //省数据
                    var o = {};
                    data.forEach(function (item,index) {
                        if( !o[item.region] ) {
                            o[item.region] = true;
                            that.zone.push( { region : item.region , provs : [] , num : 0 } );
                        }
                    })
                    data.forEach(function (item,index) {
                        that.zone.forEach(function (val,key) {
                            if( item.region == val.region ) {
                                val.provs.push( item );
                            }
                        })
                    })
                    break;
                case 2 :                //市数据
                    this.zone.forEach(function (item,index) {
                        item.provs.forEach(function (val,key) {
                            val.citys = [];
                            data.forEach(function ( v , k ) {
                                if( v.parentId == val.zoneId ) {
                                    val.citys.push( v );
                                }
                            })
                        })
                    })
                    break;
                default :
            }

            var t = setTimeout(function () {
                that.posiData();
                clearTimeout( t );
            });

        } ,
        //选城市
        checkAll : function ( evt  , item , par ) {
            var $ = layui.jquery;
            var target = evt.target.nodeName.toLowerCase() == "input" ? evt.target : $( evt.target ).find("input[type=checkbox]");
            var span = $( target ).parents(".provs");
            var ins = span.find(".ins");
            var children = span.find(".add_min").find("input[type=checkbox]");
            var areaInput = $( target ).parents("address").find(".area");

            //console.log(span.find(".add_min").css("display"))
            if( $(target)[0].checked ) {
                ins.text( "( " + item.citys.length + " )" ).show();
                par.num ++;
                span.find(".add_min").css("display","none");
                this.curr = -1;
                //areaInput[0].checked = true;

            } else {
                ins.text( "" ).hide();
                par.num --;
            }
            if( par.num == par.provs.length ) {
                areaInput[0].checked = true;
            } else {
                areaInput[0].checked = false;
            }
        } ,
        //选大区
        checkArea : function ( evt , item ) {
            var $ = layui.jquery;
            var target = evt.target.nodeName.toLowerCase() == "input" ? evt.target : $( evt.target ).find("input[type=checkbox]");
            var children = $( target ).parents(".address").find(".provs");

            item.num = $(target)[0].checked ? item.provs.length : 0;
            for( var i = 0, len = children.length; i < len; i ++ ) {
                children.eq(i).find(".prov").get(0).checked = $(target)[0].checked;
            }
            if( $(target)[0].checked ) {
                for( var i = 0, len = children.length; i < len; i ++ ) {
                    var ins = children.eq(i).find(".ins");
                    ins.text( "( " + item.provs[ i].citys.length + " )" ).show();
                }
            } else {
                for( var i = 0, len = children.length; i < len; i ++ ) {
                    var ins = children.eq(i).find(".ins");
                    ins.text( "" ).hide();
                }
            }
        } ,
        //确定选择区域
        getAreas : function () {
            var $ = layui.jquery;
            var data = [];
            var that = this;

            var prov = $("address input");
            prov.each(function (idx , elem ) {
                if( elem.checked ) {
                    var o = new Object();
                    o.province = elem.value;
                    o.area = [];
                    for( var i = 0,len = that.zone.length; i < len ; i++ ) {
                        for( var j = 0, len2 = that.zone[i].provs.length;  j < len2; j ++ ) {
                            if( that.zone[i].provs[j].name == elem.value ) {
                                var citys = that.zone[i].provs[j].citys;

                                citys.forEach(function (val,key) {
                                    o.area.push( val.name );
                                })
                            }
                        }
                    }
                    data.push( o );
                }
            });
            console.log( data )
            that.checkData( data , this.index );

        }
    } ,
    mounted : function () {
        this.queryZone( 1 );
    } ,
    template : "<div id='zone'>" +
    "   <address class='address' v-for=\"item in zone\">" +
    "        <div class=\"left\">" +
    "           <span>" +
    "               <label @change='checkArea( $event, item )'><input class='area' :value='item.name' type=\"checkbox\" /><b>{{ item.region }}</b></label>" +
    "           </span>" +
    "        </div>" +
    "        <div class=\"left\">" +
    "           <span class='provs' v-for=\"(prov,index) in item.provs\" :class=\"{ 'curr' : curr == index && item.region == currName }\">" +
    "               <label><input type=\"checkbox\" class='prov' @change='checkAll($event, prov , item )' :value='prov.name' />{{ prov.name }}</label>" +
    "               <i class=\"layui-icon\" @click=\"getMore($event,index,prov.name)\">&#xe61a;</i>" +
    "               <ins class='ins' :style='{ display : \"none\" }'></ins>" +
    "               <div class=\"add_min\" v-show=\"curr == index && prov.name == currName\">" +
    "                   <label v-for=\"reg in prov.citys\">" +
    "                       <input type=\"checkbox\" class='city' :value='reg.name' />{{ reg.name }}" +
    "                   </label>" +
    "               </div>" +
    "            </span>" +
    "        </div>" +
    "    </address>" +
    "    <div class='btn-group' @click='getAreas'><button type='button' class='layui-btn'>确定</button></div>" +
    "</div>"
});