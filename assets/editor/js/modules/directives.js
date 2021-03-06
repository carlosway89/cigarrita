'use strict';

/* Directives */

var cigarritaDirective = angular.module('cigarritaDirective', ['ngResource']);


cigarritaDirective
.directive('elementContenido', function ($compile) {
  return {
    terminal: true, // prevent ng-repeat from compiled twice
    priority: 1003, // must higher than ng-repeat
    link: function (scope, element, attrs) {

      var type=attrs.elementContenido;

        
        var temp=element[0].innerHTML;

        if (type!="source") {          
          var model= temp.replace('{{','');
          model=model.replace('}}','');
        }
        else{
          model="post.source";
        }

        if (type=="non-editor") {
          temp="<span element-editable  class='fr-view' ng-model='"+model+"' ng-bind-html='"+model+" | sanitize' >"+temp+"</span>";
        
        }else{          
          temp="<textarea element-editable  class='fr-view' froala ng-model='"+model+"' ng-bind-html='"+model+" | sanitize' >"+temp+"</textarea>";
        }

        $(element).html(temp);
    
      
      attrs.$set('elementContenido', null);

      $compile(element)(scope);
      

    }
  };
})
.directive('elementBlock', function ($compile) {
  return {
    terminal: true, // prevent ng-repeat from compiled twice
    priority: 1002, // must higher than ng-repeat
    link: function (scope, element, attrs) {
      var repeat="block in page | filter:{category:'"+attrs.elementBlock+"'}:true | limitTo:1 as results";
      
      if (attrs.elementBlock!='slider') {
        element.attr('id',attrs.elementBlock);
      }

      attrs.$set('ngRepeat', repeat);
      attrs.$set('elementBlock', null);

      // $(element).find('#subheader,#header').attr("contenteditable",true);
      // scope.counter = scope.block.length; 
      $compile(element)(scope);


      

    }
  };
})
.directive('elementPost', function ($compile,$rootScope) {
  return {
    terminal: true, // prevent ng-repeat from compiled twice
    priority: 1001, // must higher than ng-repeat
    link: function (scope, element, attrs) {

      var val_limit=element.attr('data-limit');
      var val_orderby=element.attr('data-order');
      var limiting="";
      var ording="";
      // console.log(val_limit);
      if (val_limit!=undefined) {
        limiting=" | limitTo:"+val_limit;
      }
      if (val_orderby!=undefined) {
        ording=" | orderBy: '"+val_orderby+"'";
      }

      var repeat="post in block.posts"+ ording +limiting;
      
      attrs.$set('ngRepeat', repeat);
      attrs.$set('elementPost', null);
      if (element.parent(".element-sortable").length) {
        attrs.$set('data-item-sortable', "{{post.idpost}}");
      }
      
      var classes=$(element).attr('class');

      var show=element.attr('data-add-hide');

      var type=element.attr('data-type');

      if (type=="slider") {
        show=true;
      }

      if (!show) {
        $('<div class="'+classes+' text-center inline-add"><a id="new" data-category="'+scope.block.category+'" href="javascript:;;" class="plus-gray" ><span>+</span><label>'+$editor_buttons_add+'</label></a></div>').insertAfter(element);
      }
      
      $compile(element)(scope);
      
      $('a#new').on('click',function(event){
          event.stopImmediatePropagation();
          var category=$(event.currentTarget).attr('data-category');

          // var model={
          //   category:category,
          //   language:beans.readCookie('language.initial')
          // }

          if (category=="slider") {
            var source=$base_url+"/assets/editor/images/default-image.jpg";
          }else{
            var source="<img src='"+$base_url+"/assets/editor/images/default-image.jpg' alt='default image' />";
          }
          var model={
            category:category,
            header:"[Text header]",
            subheader:"[Text subheader]",
            teaser:"[Text teaser]",
            source:source,
            url_source:$base_url+"/assets/editor/images/default-image.jpg",
            language:beans.readCookie('language.initial')
          }

          $rootScope.$broadcast('inline.saving.post',model);
          // $rootScope.$broadcast('show.modal',model);
      });

      
      

    }
  };
})
.directive('elementObject', function ($compile,$rootScope) {
  return {
    link: function (scope, element, attrs) {
      
      // console.log(element);
      var $data_model=[];
      scope.$watch(attrs.elementObject,function(data){
        if(angular.isObject(data)){ 
          $data_model=data;
        }
      });
      var type=element.attr('data-type');

      // console.log(scope);
        
        
        
      element.find('a[href="https://froala.com/wysiwyg-editor"]').remove();


      element.hover(
        function() {

          if (type=='slider') {
            // console.log(scope, element, attrs);
            var $data_scope=scope;
            element.append("<div id='inline-editors'><span class='tooling tooling-top editing-external' data-tool='"+$editor_tooltip_details+"'><i class='fa fa-cogs'></i></span><span class='tooling tooling-top deleting-item' data-tool='"+$editor_tooltip_delete+"'><i class='fa fa-trash-o'></i></span></div>");
          
          }else{
            if (type!="none-editor") {

              if (attrs.elementObject=="block") {
                element.append("<div id='inline-editors'><span class='tooling tooling-top editing-inline' data-tool='"+$editor_tooltip_edit+"'><i class='fa fa-pencil'></i></span></div>");
            
              }else{
                element.append("<div id='inline-editors'><span class='tooling tooling-top editing-inline' data-tool='"+$editor_tooltip_edit+"'><i class='fa fa-pencil'></i></span><span class='tooling tooling-top deleting-item' data-tool='"+$editor_tooltip_delete+"'><i class='fa fa-trash-o'></i></span></div>");
                
              }
            }
            
          }

          if (element.parent(".element-sortable").length) {
            element.append("<span class='tooling tooling-top sort-item' data-tool='"+$editor_tooltip_sort+"'><i class='fa fa-arrows-alt'></i></span>");
          }
          
          // $compile(document.getElementById('inline-editors'))(scope);

          // setTimeout(function(){
              
              element.find(".editing-inline").on('click',function(event){

                event.stopImmediatePropagation();

                $('#inline-saver').remove();
                element.addClass('editable-mode');
                // element.find('[element-editable]').attr('contenteditable','true');
                // element.find('[element-editable]:last-child').focus();
                  
                element.append("<div id='inline-saver'><span class='inline-saving'>"+$editor_buttons_save+"</span><span class='inline-closing'>x</span></div>");
                
                $compile(document.getElementById('inline-saver'))(scope);

                // console.log(element.height());

                // var plus=element.height() - 200;

                // if (attrs.elementObject=="block") {
                //   var new_position=element.offset().top - 100;
                // }else{
                //   var new_position=element.offset().top + plus;
                // }


                $rootScope.$broadcast('init.editor.inline',element);

                // $('html, body').animate({
                //     scrollTop: new_position
                // }, 1500);
                
              });
              
              element.find(".deleting-item").on('click',function(event){

                  if (confirm($editor_popout_delete)) {
                        // console.log("event trigger",scope.post,element,attrs,$data_model);
                       $rootScope.$broadcast('delete.item',scope.post,element);
                  }else{
                    return false;
                  }
                 

              });

              element.find(".editing-external").on('click',function(event){

                  $rootScope.$broadcast('show.modal',$data_model,$data_scope);

              });

              element.find(".inline-closing").on('click',function(event){

                event.stopImmediatePropagation();

                element.removeClass('editable-mode');

                element.find('[element-editable]').attr('contenteditable','false');
                                               

                $('#inline-saver').remove();

                element.find('[element-editable]').froalaEditor('edit.off');

              });

              element.find(".inline-saving").on('click',function(event){

                event.stopImmediatePropagation();

                var type=attrs.elementObject;
                var urls=[];

                element.find("img").each(function(){
                  urls.push($(this).attr("src"));
                });
                
                if (urls.length!=0) {
                  if (urls.length==1) {
                    $data_model.url_source=urls[0]?urls[0]:"";
                  }else{
                    $data_model.url_source=JSON.stringify(urls);
                  }
                }

                
                $rootScope.$broadcast('inline.saving.'+type,$data_model);                

                $(".inline-saving").addClass('success').html('&#x2713;');
                $(".inline-closing").remove();

                element.find('[element-editable]').froalaEditor('edit.off');

                setTimeout(function(){
                  element.removeClass('editable-mode');
                  
                  element.find('[element-editable]').attr('contenteditable','false');
                  

                  $('#inline-saver').remove();

                },2000);                
              });
          // },100);

      }, function() {
          element.find( "div#inline-editors" ).remove();
          element.find( ".sort-item" ).remove();
        }
      );

    }
  };
})
.directive('elementEditable', function() {
  return {
    restrict: 'EA',
    require: '^?ngModel',
    link: function(scope, element, attrs, ctrl) {

      scope.$on('init.editor.inline',function(event,elem){


        elem.find('[element-editable]').froalaEditor('edit.on');
        //elem.find('[element-editable]').froalaEditor('events.focus');

      });
     
      
      setTimeout(function(){
        element.froalaEditor('edit.off');
        element.find('a[href="https://froala.com/wysiwyg-editor"]').remove();
      });
      
    }
  };
})
.directive('imageUpload',function($parse){ //Step 1

    return {
          // require : 'ngModel',            //Step 2
          link: function (scope, element, attrs, ngModel) {

              var collection = attrs.imageUpload,
                    model = attrs.selectModel,
                    getter= $parse(model),
                    setter= getter.assign;

            $(element).fileinput();
            

            $(element).find('#input').on('change',function(event){
                  
                event.stopImmediatePropagation();
                var files = event.target.files || event.dataTransfer.files;
              
                var img=files[0];
                
                var data = new FormData();

                data.append('images',img);

                // var serverUrl = 'https://api.parse.com/1/files/' + img.name;
                var serverUrl = 'api/upload'; 
                var imagen=$(element).find('.fileinput-new.thumbnail');

                 // scope.$parent[attrs.ngModel] = 'prueba'; 
                 // $scope.$parent.$eval(attr.ngModel)
                 // scope.$parent.$apply();

                // console.debug(scope.attrs.ngModel);
                    $.ajax({
                      type: "POST",
                      beforeSend: function(request) {
                        imagen.addClass('ui btn loading');
                      },
                      url: serverUrl,
                      data: data,
                      processData: false,
                      contentType: false,
                      xhr: function(){
                        // get the native XmlHttpRequest object
                        var xhr = $.ajaxSettings.xhr() ;
                        // set the onprogress event handler
                        xhr.upload.onprogress = function(evt){ 
                          
                          if (imagen.find('#counter_loader').length) {
                            imagen.find('#counter_loader').empty();
                            imagen.find('#counter_loader').html(evt.loaded/evt.total*100+'%');
                          }else{
                            imagen.append('<span id="counter_loader" style="position: absolute;font-weight: bold;color:#337AB7;top: 67px;right: 106px;font-size: 17px;">'+evt.loaded/evt.total*100+'%</span>');
                          }        

                          console.log('progress:', evt.loaded/evt.total*100) 
                        } ;
                        // set the onload event handler
                        xhr.upload.onload = function(){ 
                          setTimeout(function(){
                            imagen.find('#counter_loader').remove();
                          });                          
                          console.log('DONE!');
                        } ;
                        // return the customized object
                        return xhr ;
                      },
                      success: function(data) { 
                        if (data.error) {
                          if (!imagen.find('#alert_error_upload').length) {
                            imagen.append('<span id="alert_error_upload" class="alert alert-danger" style="top: 0px;position: absolute;">'+data.error+'</span>');
                          }
                        }else{
                          imagen.find('#alert_error_upload').remove();
                          scope['posting']['source'] = data.url;                 
                          // scope.$parent[attrs.ngModel] = data.url; 
                          // scope.$parent.$apply();
                          $(element).find('img').attr('src',data.url);
                          $(element).find('img').removeClass('ng-hide');
                        }    
                        
                        imagen.removeClass('ui btn loading');           
                      }
                    });


          });


              
          }
    }
});