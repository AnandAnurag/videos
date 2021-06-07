<?php
function request($uri)
{
    $handle = curl_init();
    $url = "localhost:8000/$uri";
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($handle);
    curl_close($handle);
    return $output;
}
