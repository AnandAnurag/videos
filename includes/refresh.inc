<?php
include_once(__DIR__ . '/curl.inc');
function refresh()
{
    return request('videos/refresh');
}
