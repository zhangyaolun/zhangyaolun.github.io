// var area = {
function getArea () {
  var area = [];
    var res = function (data) {
      if(data.result) {
        var result = data.result;
        // 省
        if(result&&result.length>0){
          result.forEach(function (_) {
            if(_.parentid==1){
              area.push(_);
              _['children']=[];
              _['parentName']=''
            }
          })
        }
        // 地区
        area.forEach(function (province) {
          result.forEach(function (_) {
            if(province.id == _.parentid){
              province['children'].push(_);
              _['children']=[];
              _['parentName']=province.name
            }

          })
        });
        // 县级
        area.forEach(function (province) {
          province.children.forEach(function (city) {
            result.forEach(function (_) {
              if (city.id == _.parentid) {
                city['children'].push(_);
                _['parentName'] = city.name
              }
            })
          })
        });
      }
    };
    commonScript.getArea(res);
    return area;
  }
// };