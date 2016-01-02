
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
			<br>
			<h4>Block</h4>
			<br>
				
				<div class="panel panel-default">
					<div class="panel-heading clean"></div>
					<div class="panel-body">
						<?php echo $this->renderPartial('//block/_form', 
							array(
									'model'=>$model,
									'message'=>$message,
									'list_category'=>$category,
									'language'=>$language,
									'list_blocks'=>$list_blocks,
									'lang'=>$lang,
									'edit_block'=>true
								)
							); 
						?>
					</div>
				</div>

		</div>	
	</div>
</div>
