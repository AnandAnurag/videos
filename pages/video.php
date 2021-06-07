<?php
include_once(__DIR__ . '/../includes/video.inc');
$video = get_video_detail($_REQUEST['q']);
?>
<div class="grid-container col-layout-2">
    <div class="video-primary-player grid-item">
        <iframe width="769" height="480" src="https://www.youtube.com/embed/<?php echo $video->vid ?>?autoplay=1&mute=1">
        </iframe>
    </div>
    <div class="video-primary-meta-data grid-item">
        <div class="video-primary-title"><?php echo $video->title ?></div>
        <div class="video-primary-info">
            <div class="video-primary-views"><?php echo $video->views ?? 0 ?> views</div>
            <div class="video-primary-likes"><span class="material-icons">thumb_up</span><?php echo $video->likes ?? 0 ?></div>
            <div class="video-primary-dislikes"><span class="material-icons">thumb_down</span><?php echo $video->dislikes ?? 0 ?></div>
        </div>
        <div class="channel-primary">
            <div class="channel-primary-name"><?php echo $video->name ?></div>
            <div class="channel-primary-info"><?php echo $video->subscribers ?? 0 ?> subscribers</div>
        </div>
        <div class="video-primary-description"><?php echo $video->description ?></div>
    </div>
</div>