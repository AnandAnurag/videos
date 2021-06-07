<?php
function get_title()
{
    $title = '';
    $q = $_REQUEST['q'] ?? '';
    if (preg_match('~(.+)~', $q))
        $title = "VIDEO";
    elseif ($q === '')
        $title = "HOME";
    else
        $title = '404';
    return $title;
}
$title = get_title();
?>
<html>

<head>
    <title>YT- <?php echo $title ?></title>
    <link rel="shortcut icon" href="/videosApp/favicon.png">
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
    <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
    <script type="text/javascript" src="/videos/index.js"></script>
    
</head>
</head>

<body>
    <h1><?php echo $title ?></h1>
    <nav>
        <a class="nav-link" href="/videos">Home</a>
    </nav>
    <section>
        <button onclick="refreshTrendingVideos()">Refresh</button>
        <?php include('route.php') ?>
    </section>
</body>

</html>