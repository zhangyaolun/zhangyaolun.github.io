  function getTreeClassify () {
    var tree=[],level1 = [],level2 = [],level3=[];
    var res = function (data) {
      if(data.result) {
        var res = data.result;
        if (res && res.length > 0) {
          // 一级
          res.forEach(function (_) {
            if (_.pid == null||_.pid == "") {
              tree.push(_);
              _.children=[];
              _['parentName']=''
            }
          });

          // 二级
          if(tree.length>0){
            tree.forEach(function (_) {
              res.forEach(function (second) {
                if (second.pid == _.id) {
                  _['children'].push(second);
                  second['children']=[];
                  second['parentName']=_.name;
                }
              });
            });
          }


          // 三级
          if(tree.length>0) {
            tree.forEach(function (_) {
              if(_.children&&_.children.length>0) {
                _.children.forEach(function (second) {
                  res.forEach(function (third) {
                    if (third.pid === second.id) {
                      second['children'].push(third);
                      third['parentName'] = second.name
                    }
                  })
                })
              }
            });
          }
        }
      }
    };
    commonScript.doGet('/productInfo/queryCategoryInfo','',res);
    return tree;
  }

  function upLoadFile(e) {
    var file = e.target.files[0];
    if(file!==undefined){
      var formData = new FormData();
      var oXHRHeadrs = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      formData.append('file', file);
      formData.append('sellerId', '1111');
      formData.append('picGroupId', '2222');
      var ajax = new XMLHttpRequest();
      ajax.open("post","/settingsInfo/uploadimg",true);
      ajax.send( formData );
      ajax.onload = function () {
        console.log( this.responseText )
      };
      // commonScript.doPost('/settingsInfo/uploadPicture',formData,oXHRHeadrs,res)
      return ('aa');
    }
    
  }
