<?php add_theme_support( 'post-thumbnails' ); // для всех типов постов?>

<?php function true_thumbnail_url_only( $html ){ // неиспользуемые параметры можно не указывать
	return preg_replace('#.*src="([^\"]+)".*#', '\1', $html );
}
add_filter('post_thumbnail_html', 'true_thumbnail_url_only', 10, 5);?>