
<?php		
	if (isset($message)) {
		echo "<h6 id='message_updated' class='green-text light-green lighten-4 center-align alert'>".$message."</h6><br>";
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

	<p class="note">Fields with <span class="required">*</span> are required.</p>
	<?php echo $form->errorSummary($model, '', '', array('class' => 'red-text red lighten-4  alert')); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'category'); ?>
		<select name="Post[category]" class="browser-default">
		<?php foreach ($category as $val_cat) {
		 ?>			 
		 	<option <?=$model->category==$val_cat->category?'selected':''?> value="<?=$val_cat->category?>"><?=$val_cat->category?></option>	 
		<?php	
		}?>
		</select>
		<?php echo $form->error($model,'category'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'header'); ?>
		<?php echo $form->textField($model,'header',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'header'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'subheader'); ?>
		<textarea  class="summernote materialize-textarea" name="Post[subheader]"><?=$model->subheader?></textarea>
		<?php //echo $form->textField($model,'subheader',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'subheader'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'source'); ?>
		<?php echo $form->textField($model,'source',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'source'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'language'); ?>
		<select name="Menu[language]" class="browser-default">
		<?php foreach ($language as $key => $value) {
		?>
		<option <?=$model->language==$value->min?'selected':''?> value="<?=$value->min?>" ><?=$value->name?></option>
		<?php
		}?>
		</select>
		<?php echo $form->error($model,'language'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'state'); ?>
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

	<div class="row buttons">
		<button class="btn btn-info" type="submit">Save</button>
		<a class="btn grey lighten-1" href="<?=Yii::app()->getBaseUrl(true)?>/panel/posts">Back</a>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->