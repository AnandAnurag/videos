# Trending Videos

This application scraps latest trending videos from [Youtube's trending page](https://www.youtube.com/feed/trending) and displays it for user.

## Tech Stack

* AWS EC2: Linux 2 AMI
* Apache Server
* MySQL
* Maria DB Server
* PHP 7.2
* NodeJS 16.2

### PHP

Renders web page on server-side. Two routes exposed:
* `/videos`: To view of the list of Trending Videos
* `/videos/:vid`: To watch the video and go through its details

#### AJAX

* `/videos/refresh`: To request refetch of the trending videos and rerender the client


### Node JS

HOST: https://ec2-18-117-225-232.us-east-2.compute.amazonaws.com/videos/

API exposed on PORT `localhost:8000`:
* `/videos`: List trending videos as JSON
* `/videos/:vid`: `vid` is the video of id used by Youtube. It returns invidiual video JSON
* `/videos/refresh`: Refetch the trending videos and refresh the DB by merging new entries to old ones

#### Dependencies

* `"cheerio": "^1.0.0-rc.9"` For DOM extraction
* `"express": "^4.17.1"` For Node Server and Routing 
* `"jsdom": "^16.6.0"` For loading JS DOM
* `"mysql": "^2.18.1"` For client connection MySQL DB
* `"puppeteer": "^10.0.0"` Uses chromium to download client-side rendered webpages

#### Dev Dependecies

* `"nodemon": "^2.0.7"`` Autorestart of Node Server


### MySQL

#### Database

```
CREATE DATABASE `videos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */
```
#### Tables

##### Trending Videos
```
CREATE TABLE `trending` (
  `vid` varchar(50) CHARACTER SET utf8 NOT NULL,
  `title` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `thumbnail` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `description` text CHARACTER SET utf8 DEFAULT NULL,
  `views` varchar(10) CHARACTER SET utf8 DEFAULT '0',
  `likes` varchar(10) CHARACTER SET utf8 DEFAULT '0',
  `dislikes` varchar(10) CHARACTER SET utf8 DEFAULT '0',
  `cid` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stale` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```
##### Channels
```
CREATE TABLE `channels` (
  `cid` varchar(50) CHARACTER SET utf8 NOT NULL,
  `name` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `description` text CHARACTER SET utf8 DEFAULT NULL,
  `thumbnail` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `subscribers` varchar(100) CHARACTER SET utf8 DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```
