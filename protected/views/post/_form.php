
<style type="text/css">
	.chosen-container {
	    width: 300px !important;
	}
</style>
<?php


	if (isset($_GET["message"]) && !$model->isNewRecord) {
		echo "<h6 id='message_updated' class='green-text light-green lighten-4 center-align alert'>".$_GET["message"]."</h6><br>";
	}

	if (isset($lang)) {
		$model->language=$lang;
	}
?>	

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'post-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note"><?=Yii::t('app','panel.required')?></p>
	<?php echo $form->errorSummary($model, '', '', array('class' => 'red-text red lighten-4  alert')); ?>

	<div class="row">
		
		
		<?php			
		if ($model->isNewRecord) {
		?>
		<input type="hidden" name="Post[category]" value="<?=$post_page?>">
		<?php 
		}else{
			if (Yii::app()->user->checkAccess("webmaster")){

		?>
		<?php echo $form->labelEx($model,Yii::t('app','panel.table.category')); ?>
		<select name="Post[category]" class="browser-default">
		<?php foreach ($category as $val_cat) {
		 ?>			 
		 	<option <?=$model->category==$val_cat->category?'selected':''?> value="<?=$val_cat->category?>"><?=$val_cat->category?></option>	 
		<?php	
		}?>
		</select>
		<?php }
		}?>
		<?php echo $form->error($model,'category'); ?>
	</div>

	<?php if ($post_config->has_header) {		
	?>
	<div class="row">
		<?php echo $form->labelEx($model,Yii::t('app','panel.posts.cabecera')); ?>
		<?php echo $form->textField($model,'header',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'header'); ?>
	</div>
	<?php }?>
	<?php if ($post_config->has_teaser) {		
	?>
	<div class="row">
		<?php echo $form->labelEx($model,Yii::t('app','panel.posts.teaser')); ?>
		<textarea  class="materialize-textarea" height="200" name="Post[teaser]"><?=$model->teaser?></textarea>
		<?php echo $form->error($model,'teaser'); ?>
	</div>
	<?php }?>
	<?php if ($post_config->has_subheader) {		
	?>
	<div  class="row">
		<?php echo $form->labelEx($model,Yii::t('app','panel.posts.container')); ?>
		<textarea  class="froala-editor" name="Post[subheader]"><?=$model->subheader?></textarea>
		<?php //echo $form->textField($model,'subheader',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'subheader'); ?>
	</div>
	<?php }?>
	<?php if ($post_config->has_source) {		
	?>
	<div id="row_source" class="row">
		<?php echo $form->labelEx($model,Yii::t('app','panel.posts.source')); ?>

		<?php 
			if ($post_config->type_source=="embed") {
				$class_source="";
				$id_source="codemirror";
			}else{
				$id_source="";
				$class_source="froala-editor-source";
			}
		?>		
		<textarea  id="<?=$id_source?>" class="<?=$class_source?>" name="Post[source]"><?=$model->isNewRecord?'<img style="width:200px" src="/assets/editor/images/default-image.jpg" alt="default image">':$model->source?></textarea>
		<?php echo $form->hiddenField($model,'url_source',array()); ?>
		<?php echo $form->error($model,'source'); ?>
	</div>
	<?php }?>
	<div class="row">
		<?php echo $form->labelEx($model,Yii::t('app','panel.posts.language')); ?>
		<select name="Post[language]" class="browser-default">
		<?php foreach ($language as $key => $value) {
		?>
		<option <?=$model->language==$value->min?'selected':''?> value="<?=$value->min?>" ><?=$value->name?></option>
		<?php
		}?>
		</select>
		<?php echo $form->error($model,'language'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,Yii::t('app','panel.table.state')); ?>
		<div class="switch">
          <label>
            Off
            <input name="Post[state]" <?=$model->state?'checked="1"':''?> type="checkbox">
            <span class="lever"></span>
            On
          </label>
        </div>
		<?php echo $form->error($model,'state'); ?>
	</div>
	<div id="attributes_post">
		<?php echo $this->renderPartial('//post/attributes', array('attr'=>$attr,'variables'=>$variables,'model'=>$model,'post_config'=>$post_config)); ?>
	</div>

	<div class="row buttons">
		<button class="btn btn-info" type="submit"><?=Yii::t('app','panel.save')?></button>
		<a class="btn grey lighten-1" href="<?=Yii::app()->getBaseUrl(true)?>/panel/posts/<?=$model->category?$model->category:$post_page?>/<?=isset($lang)?$lang:$model->language?>"><?=Yii::t('app','panel.back')?></a>
	</div>
	<br><br>

<?php $this->endWidget(); ?>

</div><!-- form -->
<script type="text/javascript">
	
	window.onload = function(){ 
		

		$('.froala-editor-source').froalaEditor({
              toolbarInline: true,
              width: '1000',
              imageDefaultWidth: '<?=$post_config->max_width?>',
              imageOutputSize: true,
              enter: $.FroalaEditor.ENTER_BR,
              language: '<?=Yii::app()->language?>',
              charCounterCount: false,
              imageUploadURL: "<?=Yii::app()->getBaseUrl(true)?>/api/upload",
              imageUploadParam: 'images',              
			  fileUploadURL: '<?=Yii::app()->getBaseUrl(true)?>/api/upload',
			  fileUploadParam: 'images',
              imageManagerLoadURL:"<?=Yii::app()->getBaseUrl(true)?>/api/images",
              imageManagerDeleteURL:"<?=Yii::app()->getBaseUrl(true)?>/api/deleteImage/files",
              linkAttributes: {
                'title':'Titulo'
              },
              <?php if ($post_config->type_source=="image" || $post_config->type_source=="galery" || $post_config->type_source=="background" ) { ?>
              imageUploadParams: {
				width: '<?=$post_config->max_width?>',
				crop: '<?=$post_config->crop?>',
				height: '<?=$post_config->max_height?>',
				quality: '<?=$post_config->quality?>',
				is_image:true
			  },
              imageStyles: {
                "lightboxImage": 'lightboxImage',
              },              
              imageEditButtons: ['imageReplace', 'imageRemove', 'imageStyle', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', 'imageSize'],
              toolbarButtons:['insertImage']
              <?php }?>
              <?php if ($post_config->type_source=="video") { ?>
              toolbarButtons:['insertVideo'],
              videoDefaultDisplay: 'inline'
              <?php } ?>
              <?php if ($post_config->type_source=="file") { ?>
              toolbarButtons:['insertFile']
              <?php } ?>

      	})
		<?php if ($post_config->type_source=="image" || $post_config->type_source=="galery" || $post_config->type_source=="background" ) { ?>
	      .on('froalaEditor.image.loaded', function (e, editor, $img) {
	        	var urls=[];

                $("#row_source").find("img").each(function(){
                  urls.push($(this).attr("src"));
                });
                
                if (urls.length==1 || urls.length==0) {                
                  var url_source=urls[0]?urls[0]:"";
                  $("#Post_url_source").val(url_source);
                }else{
                  var url_source=JSON.stringify(urls);
                  $("#Post_url_source").val(url_source);
                }
	      });
	    <?php }?>
	    <?php if ($post_config->type_source=="file") { ?>
	      .on('froalaEditor.file.inserted', function (e, editor, $file, response) {
	      	var url_source=$file[0].href;
	      	$("#Post_url_source").val(url_source);
	      });
	    <?php } ?>
	    <?php if ($post_config->type_source=="video") { ?>
	      .on('froalaEditor.video.inserted', function (e, editor, $video) {
	      	var url_source=$file[0].firstChild.src;
	      	$("#Post_url_source").val(url_source);
	      });
	    <?php } ?>
		
		setTimeout(function(){
	        $("body").find('a[href="https://froala.com/wysiwyg-editor"]').remove();
	      },100)
	};
	
</script>