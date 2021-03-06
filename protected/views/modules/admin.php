<div class="container-fluid embed-panel">
	<div class="row">
		<div class="col-sm-12">
			<br>
			<h4><?=Yii::t('app','panel.modules')?></h4>
			<br>
				
				<div class="panel panel-default">
					<div class="panel-heading clean"></div>
					<div class="panel-body">
		                <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modal1"><?=Yii::t('app','panel.modules.create')?></button>
		                <br><br><br>
		                <?php 
		                	if (isset($_GET["message"])) {
								echo "<h6 id='message_updated' class='green-text light-green lighten-4 center-align alert'>".$_GET["message"]."</h6><br>";
							}
		                ?>
						<table id="postList" class="hoverable centered">
							<thead>
								<tr>
						            <th data-field="name"><?=Yii::t('app','panel.table.name')?></th>
						            <th data-field="state"><?=Yii::t('app','panel.table.state')?></th>
						            <th data-field="date"><?=Yii::t('app','panel.table.date')?></th>
						            <th><?=Yii::t('app','panel.table.options')?></th>
						        </tr>
							</thead>
							<tbody>
								<?php foreach ($list as $key => $value) {
								?>
								<tr>
									<td><?=$value->name?></td>
									<td><i class="fa fa-circle <?=$value->state?'text-success':'text-warning'?>"></i> <?=$value->state?Yii::t('app','panel.table.state.on'):Yii::t('app','panel.table.state.off')?></td>
									<td><?=$value->date_created?></td>
									<td>
										<?php if (Yii::app()->user->checkAccess("admin") || Yii::app()->user->checkAccess("webmaster")) {
                          				?>
										<a href="<?=Yii::app()->getBaseUrl(true)?>/panel/modules/<?=$value->idmodules?>" class="text-success"><i class="fa fa-pencil "></i> <?=Yii::t('app','panel.edit')?></a>&nbsp;
										<?php }
										if (Yii::app()->user->checkAccess("webmaster")) {
											?>
										<a href="<?=Yii::app()->getBaseUrl(true)?>/panel/delete/modules/<?=$value->idmodules?>" class="text-danger delete-link"><i class="fa fa-trash-o "></i> <?=Yii::t('app','panel.delete')?></a>
										<?php }?>
									</td>
								</tr>
								<?php } ?>
							</tbody>
						</table>
					</div>
				</div>

		</div>	
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index: 1000 !important;max-height: 90%;width: 80%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        <h4 class="modal-title" id="myModalLabel"><?=Yii::t('app','panel.modules.create')?></h4>
      </div>
      <div class="modal-body">
        <?php echo $this->renderPartial('//modules/_form', 
			array(
					'model'=>$model,
					'message'=>$message,
					'source'=>$source
				)
			); 
		?>
      </div>
    </div>
</div>
