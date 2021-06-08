<?php
include_once('curl.inc');
function get_video_detail($vid)
{
    $video = request("videos/${vid}");
    return !empty($video) ? json_decode($video)[0] : [];
}
