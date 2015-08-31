
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
			<br>
			<h4>Web Configuration</h4>
			<br>
				
				<div class="panel panel-default">
					<div class="panel-heading clean"></div>
					<div class="panel-body">
						<?php		
							if (isset($_GET['message'])) {
								echo "<h4 id='message_updated' class='green-text light-green lighten-4 center-align alert'>".$_GET['message']."</h4><br>";
							}
						?>	
						<div class="form">
							<?php $form=$this->beginWidget('CActiveForm', array(
								'id'=>'configuration-form',
								'enableAjaxValidation'=>false,								
        						'htmlOptions' => array('enctype' => 'multipart/form-data'),
							)); ?>
								<p class="note">Fields with <span class="required">*</span> are required.</p>
								
								<?php echo $form->errorSummary($model, '', '', array('class' => 'red-text red lighten-4  alert')); ?>
								

								<div class="row">
									<?php echo $form->labelEx($model,'title'); ?>
									<?php echo $form->textField($model,'title',array('size'=>60,'maxlength'=>100)); ?>
									<?php echo $form->error($model,'title'); ?>
								</div>

								<div class="row">
									<?php echo $form->labelEx($model,'logo'); ?>
									<img class="img-responsive" width="100px" src="<?php echo Yii::app()->request->baseUrl."/".$model->logo; ?>">
									<div class="file-field input-field">
								      <input class="file-path validate" type="text" value="<?=$model->logo?>" style="padding-left: 20px;"/>
								      <div class="btn blue lighten-1">
								        <span>Logo</span>
								        <input type="file" name="Configuration[logo]" value="<?=$model->logo?>"/>
								      </div>
								    </div>
							
									<?php echo $form->error($model,'logo'); ?>
								</div>

								<div class="row">
									<?php echo $form->labelEx($model,'description'); ?>
									<?php echo $form->textField($model,'description',array('size'=>60,'length'=>'120','maxlength'=>400,'class'=>'counter_char')); ?>
									<?php echo $form->error($model,'description'); ?>
								</div>

								<div class="row">
									<?php echo $form->labelEx($model,'language Default'); ?>
									<?php echo $form->textField($model,'language',array('size'=>5,'maxlength'=>5)); ?>
									<?php echo $form->error($model,'language'); ?>
								</div>

								<div class="row">
									<?php echo $form->labelEx($model,'Google analytic'); ?>
									<?php echo $form->textField($model,'analytic_id',array('size'=>60,'maxlength'=>100)); ?>
									<?php echo $form->error($model,'analytic_id'); ?>
								</div>

								<div class="row">
									<?php echo $form->labelEx($model,'keywords'); ?>
									<?php echo $form->textField($model,'keywords',array('length'=>200,'class'=>'counter_char')); ?>
									<?php echo $form->error($model,'keywords'); ?>
								</div>

								<div class="row buttons">
									<button type="submit" class="btn btn-info">Update</button>
								</div>
							<?php $this->endWidget(); ?>

						</div>

					</div>
				</div>
		</div>
	</div>
</div>
<script type="text/javascript">
		function message() {
            setTimeout(function(){
            	document.getElementById("message_updated").remove();
			},3000);
        }
        window.onload = message;		
</script>