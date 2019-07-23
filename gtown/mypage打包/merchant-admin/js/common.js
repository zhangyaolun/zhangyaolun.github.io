//Evevt Bus
var bus = new Vue();

var utils = {
    pattern : {
        phone : /^[1][3,4,5,7,8][0-9]{9}$/ ,
        number : /^[1-9]\d*\,\d*|[1-9]\d*$/
    } ,
   getHashCode : function ( key ) {
       if( !Boolean( key ) ) return null;
       var search = location.search;
       var hashObj = {};
       if( search.indexOf("?") > -1 ) {
           search = search.substr( 1 , search.length - 1 );
           if( search.indexOf("&") > -1 ) {
                var items = search.split("&");

                items.forEach(function ( item , index ) {
                    var keyVal = item.split("=");
                    var key = keyVal[0];
                    var val = keyVal[1];

                    hashObj[key] = val;
                },this)
           } else {
               var keyVal = search.split("=");
               var key = keyVal[0];
               var val = keyVal[1];

               hashObj[key] = val;
           }

           return hashObj[key];
       } else {
           return null;
       }
   } ,
    jsonToString : function ( data ) {
       if( !Boolean( data ) ) return null;

       if( Object.prototype.toString.call( data ) == "[object Object]" ) {
            var str = "";
            for( var attr in data ) {
                str += attr + "=" + data[attr] + "&";
            }
            return str.substr( 0 , str.length - 1 );
       } else {
           console.wran("json参数有问题");
           return null;
       }
    } ,

    getCookie : function( name ) {
        var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if( arr = document.cookie.match(reg) )
            return unescape(arr[2]);
        else
            return null;
    }
};

Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

if( typeof new Array().indexOf === "undefined" ) {
    Array.prototype.indexOf = function ( str ) {
        if( this.length > 0 ) {
            this.forEach(function ( item , index) {
                if( item == str ) {
                    return index;
                }
            })
        } else {
            return -1;
        }
        return -1;
    }
};

Object.keys = Object.keys || function ( obj ) {
    var arr = [];
    for( var attr in obj ) {
        arr.push( attr );
    }
    return attr;
};



