
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
			<br>
			<h4><?=Yii::t('app','panel.pages.update')?></h4>
			<br>
				
				<div class="panel panel-default">
					<div class="panel-heading clean"></div>
					<div class="panel-body">
						<?php echo $this->renderPartial('//page/_form', 
							array(
									'model'=>$model,
									'message'=>$message
								)
							); 
						?>
					</div>
				</div>

		</div>	
	</div>
</div>
