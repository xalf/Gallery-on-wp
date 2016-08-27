<!DOCKTYPE HTML>
<html>
<head>
	<title>Portfolio</title>
	<link rel="stylesheet" type="text/css" href="wp-content/themes/my-gallery/focal-point.min.css">
	<link rel="stylesheet" type="text/css" href="wp-content/themes/my-gallery/style.css">
	<meta charset="utf-8">
	<script type="text/javascript" src="wp-content/themes/my-gallery/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="wp-content/themes/my-gallery/posts.js"></script>
	<script type="text/javascript" src="wp-content/themes/my-gallery/block-move.js"></script>
</head>
<body>
	<div class="mobile-menu">
		<ul>
			<?php wp_list_pages(array('title_li' => '')); ?>	
		</ul>
	</div>
	<div class="menu">
		<button class="menu-button"></button>
		<ul>
			<?php wp_list_pages(array('title_li' => '')); ?>	
		</ul>
		<h1>The Best Photographer</h1>
	</div>
	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
			<?php $post_type = get_post_type( $post_id ) ?> 
			<?php if($post_type == 'page'): ?>
				<?php the_content() ?>
			<?php endif ?>
		<?php endwhile; ?>
	<?php endif; ?>
</body>
</html>