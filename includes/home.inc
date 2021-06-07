<?php
include_once(__DIR__ . '/curl.inc');
function get_videos()
{
    $videos = request('videos');
    return json_decode($videos);
}
