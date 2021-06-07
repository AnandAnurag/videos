<?php
include_once(__DIR__ . '/../includes/home.inc');
$videos = get_videos();
$list = [];
foreach ($videos as $video) {
    $url = '/videos/' .  $video->vid;
    $list[] = '
    <div class="grid-item">
        <a class="video-thumbnail" href="' . $url  . '">
            <img id="img" class="style-scope yt-img-shadow" alt="' . $video->title . '" src="' . $video->thumbnail . '" href="' . $url . '">
        </a>
        <a class="video-meta-data" href="' . $url . '">
            <div class="video-title">' . $video->title . '</div>
            <div class="channel-info">' . $video->name . '</div>
            <div class="video-description">' . substr($video->description, 0, 100) . (strlen($video->description) <= 100 ? '' : '...') . '</div>
        </a>
    </div>';
}
?>
<div class="grid-container">
    <?php echo implode($list); ?>
</div>';