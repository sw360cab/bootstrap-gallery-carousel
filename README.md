Bootstrap Gallery Carousel
==========================
This plugin aims to add a gallery feature to the existing Carousel of Bootstrap. Checkout [Demo](https://rawgithub.com/sw360cab/bootstrap-gallery-carousel/master/demo/index.html) to see how it works.

It simply generates a snippet of HTML given a list of image URIs as JSON Array.

#Dependencies
The plugin depends on:
* JQuery (required in turn by Bootstrap)
* Bootstrap (of course)
* Handlebars (for templating)

#Compatibility
The plugin is compatible both with version 2 and 3 of **Bootstrap** since *carousel* feature has not been changed among different versions.

#Quick Install
##Prerequisites Check
 
Check where you have all the prerequisites on your page or add them:

###JS
 
```
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
 <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
 <script src="http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min.js"></script>
```
 
###CSS

```
 <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
```

##Gallery install
Append the following to your HTML page.

###JS

```
 <script src="bootstrap-carousel-gallery.min.js"></script>
```
###CSS

```
 <link href="bootstrap-carousel-gallery.min.css" rel="stylesheet">
```

##Configure and Let it work!
Just use the following script:

    CarouselGallery.init({ /*configuration*/ });
    
or

    $( /* target elem */ ).carouselGallery({ /*configuration*/ });

### Example 

    $('#demoTarget').carouselGallery({
		imgs: [
		    'http://upload.wikimedia.org/wikipedia/commons/9/9c/Incense_sticks_in_bangalore.jpg',
		    'http://upload.wikimedia.org/wikipedia/commons/2/22/VAZ-2110_as_a_police_car_in_Moscow.jpg',
		    'http://upload.wikimedia.org/wikipedia/commons/f/fc/Kintamani_dog_white.jpg',
		    'http://upload.wikimedia.org/wikipedia/commons/e/ed/Gibson_Les_Paul%28sg%29_1962.jpg',
		    'http://upload.wikimedia.org/wikipedia/commons/4/43/Geese_In_the_snow_at_Kirkandrews_on_Eden_-_geograph.org.uk_-_1695163.jpg',
		    'http://upload.wikimedia.org/wikipedia/commons/b/b4/Torino-mole10.jpg'

		],
		carouselId: 'carouselArea',
		startCarousel: true,
		slideCallback: function () {
			// do smt
		}
    });

### Configuration

Here is a list of configuration parameters that has to be passed as JSON object (whether not specified as *required*, the parameter has to be considered as op optional)

* **imgs** [Object/Array] (required): array containing uris pointing to images
* **targetDiv** [String]: id of element which code should be appended to
* **carouselId** [String]: id of carousel area
* **carouselClass** [String]: carousel class
* **miniThumbClass** [String]: class associated with mini thumb area
* **indicatorClass** [String]: class associated with indicators
* **showIndicators** [Boolean] (default: true): Whether *bootstrap* carousel default indicators should be showed
* **showControls** [Boolean] (default: false): Whether *bootstrap* carousel default controls should be showed
* **useBootstrapStyle** [Boolean] (default: true): Whether given HTML should have a *bootstrap* aspect (using row and spans)
* **bootstrapSpan** [number] (default: 6): column span for *bootstrap* div
* **bootstrapOffset** [number] (default: 6): column span for *bootstrap* div
* **startCarousel** [Boolean] (default: false): Whether carousel should be started or kept static
* **carouselConfig** [Object]: JSON object keeping carousel configuration
* **slideCallback** [Object/Function]: callback function to be called after a slide in carousel
* **templateId** [String]: id where *Handlebars* template is retrieved from
 
####Notes on CSS customization

* carousel area can be customized by specifing *carouselClass* param and specifing layout of area using CSS selector like **&lt;carouselClass&gt; .item > img**
* mini thumbs can be customized via *miniThumbClass* param and specifing layout of area using CSS selector **&lt;miniThumbClass&gt; .carousel-mini-thumb-item** and **&lt;miniThumbClass&gt; .carousel-mini-thumb-active**
* indicators can be customized via *indicatorClass* param and specifing layout of area using CSS selectors like **&lt;indicatorClass&gt; li** an **&lt;indicatorClass&gt; .active** 

For further info checkout [Demo](https://rawgithub.com/sw360cab/bootstrap-gallery-carousel/master/demo/index.html)

##Future developments
* Control nav issues
* Mini thumb horiziontal scroll
* Video Gallery based on jwPlayer
