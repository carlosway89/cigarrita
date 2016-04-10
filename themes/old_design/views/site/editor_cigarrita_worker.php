<!DOCTYPE html>
<?php include(Yii::app()->
    request->baseUrl."assets/init_config.php"); ?>
    <html ng-app="cigarritaWeb" >
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>title</title>
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="description" content="description"/>
            <meta name="author" lang="en" content="Cigarrita Worker"/>
            <meta name="keywords" content="keywords"/>
            <meta name="robots" content="INDEX,FOLLOW">
            <link rel="stylesheet" type="text/css" href="/themes/design/css/bootstrap.css" />
            <link rel="stylesheet" type="text/css" href="/themes/design/css/semantic.min.css" />
            <link rel="stylesheet" type="text/css" href="/themes/design/css/style.css" />
            <?php include($request."assets/css_editor.php"); ?>
                <script type="text/javascript" src="/themes/design/js/jquery-2.1.1.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
                <script type="text/javascript" src="/themes/design/js/webfont.js"></script>
                <script type="text/javascript" src="/themes/design/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="/themes/design/js/semantic.js"></script>
                <script type="text/javascript" src="/themes/design/js/outsider.js"></script>
                <?php include($request."assets/js_editor.php"); ?>
                </head>
                <body ng-controller="indexCtrl">
                    <div class="header fast-animated clearfix" >
                        <div class="line ui page grid page-gray" style="background-color:#F5F5F5">
                            <div class="column">
                                <div class="ui search selection dropdown pull-right" language-select="language">
                                    <input id="language_option" name="language" type="hidden" value="{{current}}">
                                    <div class="default text">Select Language</div>
                                    <i class="dropdown icon"></i> 
                                    <div class="menu laguage-select" style="z-index: 1000;" >
                                        <!--Languages Availables-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div id="navegador" data-spy="affix" data-offset-top="100" role="navigation" class="menu ui page grid menu-header">
                            <div class="ui horizontal list pull-left" style="margin-top: -20px;">
                                <a class="item">
                                    <h1 class="logo">
                                        Cigarrita <small>Worker</small>
                                    </h1>
                                </a>
                            </div>
                            <div class="ui secondary pull-right menu">
                                <a href="javascript:;;" class="menu-side-icon"><i class="align justify icon"></i></a>
                                <div class="menu header-options"><a class='item' ng-href="{{link.url}}" ng-repeat="link in links" menu-links="{{link.type}}" >{{link.name}}</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="content" >
                        <div ng-view="">
                            <!--content-->
                        </div>
                        <a href="https://plus.google.com/107866117296817349154" class="hidden" rel="publisher">Google+</a> 
                    </div>
                </body>
            </html>