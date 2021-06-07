<?php
$q = $_REQUEST['q'] ?? '';
if (preg_match('~(.+)~', $q)) {
    if ($q === 'refresh') {
        include('./includes/refresh.inc');
        refresh();
    } else
        include('./pages/video.php');
} elseif ($q === '')
    include('./pages/home.php');
else
    include('./pages/404.php');
return $title;
