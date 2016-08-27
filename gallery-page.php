<?php 
	/*
Template Name: Photo Album
*/
 ?>

<!DOCKTYPE HTML>
<html>
<head>
	<!--<title>Portfolio</title>-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php bloginfo('name'); ?> | <?php is_home() ? bloginfo('description') : wp_title(''); ?></title>
	<link rel="stylesheet" type="text/css" href="..//wp-content/themes/my-gallery/style.css">
	<meta charset="utf-8">
	<script type="text/javascript" src="../wp-content/themes/my-gallery/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="../wp-content/themes/my-gallery/foto-move.js"></script>
</head>
<body>
	<div class="menu">
		<a href="<?php echo get_home_url(); ?>" class="back-button"></a>	
		<h1>The Best Photographer</h1>
	</div>
	<div class="foto-wrapper">
		<div class="big-foto-wrapper">
			<div class="big-foto">
			</div>
		</div>
		<div class="small-foto-wrapper">
			<div class="small-foto">
				<?php
					$page_title2 =get_the_title(); 
			     	$category_id2 = get_cat_ID($page_title2);
			     	$q2 = 'cat=' . $category_id2;
					if ( have_posts() ) : // если имеются записи в блоге.
			  			query_posts($q2);   // указываем ID рубрик, которые необходимо вывести.
			  			while (have_posts()) : the_post();  // запускаем цикл обхода материалов блога?>		
							<img src="<?php the_post_thumbnail(); ?>">
			  			<?php endwhile;  // завершаем цикл.
					endif;
					/* Сбрасываем настройки цикла. Если ниже по коду будет идти еще один цикл, чтобы не было сбоя. */
					wp_reset_query();                
				?>
			</div>
		</div>
	</div>
	
	<div class="popup">
		<img src="">
	</div>
</body>
</html>