/**
 * Required JQuery and HandleBars
 */
(function( $ ) {

  /*
   * JQuery Support
   */
  $.fn.carouselGallery = function( options ) {
    var selectorId = ($(this).prop ? $(this).prop("id") : $(this).attr("id"));
    var settings = $.extend({
      targetDiv: "#" + selectorId
    }, options );

    CarouselGallery.init(settings);
    return this;  
  };

  CarouselGallery = {

    init: function(config) {   
      if (! this.configure.call(this,config)) {
        throw new Error('Wrong configuration!');
      }
      this.generateTemplate.call(this);
    },

    configure: function(config) {
      if (this.validate(config)) {
        this.config = {};
        this.config.imgs = config.imgs;
        this.config.targetDiv = config.targetDiv || 'body'
        this.config.carouselId = config.carouselId || 'carousel-area';
        this.config.carouselClass = config.carouselClass || 'carousel-container';
        this.config.miniThumbClass = config.miniThumbClass || 'carousel-mini-thumb';
        this.config.indicatorClass = config.indicatorClass || 'carousel-indicators';
        this.config.showIndicators = config.showIndicators || true;
        this.config.showControls = config.showIndicators || false;
        this.config.useBootstrapStyle = config.useBootstrapStyle || true;

        if (this.config.useBootstrapStyle) {
          this.config.boostrapSpanClass = function (){
            var spanSize = config.bootstrapSpan || 6;
            var offsetSize = config.bootstrapOffset || 3;
            var classPrefixArray = ['col-md-','col-xs-','col-sm-']
            
            Array.prototype.appendSuffix = function (suffix) {
              var res = []
              this.forEach(function (elem) {
                res.push(elem + suffix);
              });
              return res.join(" ");
            }            
            return 'span' + spanSize + ' ' + classPrefixArray.appendSuffix(spanSize) 
                  + ' offset' + offsetSize + ' ' + classPrefixArray.appendSuffix('offset-' + offsetSize);
          }();
        }

        this.config.startCarousel = config.startCarousel || false;
        this.config.slideCallback = config.slideCallback || function() {};
        this.config.templateId = config.templateId;
        this.config.carouselConfig = config.carouselConfig || (function (config) {
          var interval = config.startCarousel ? 3000 : false;
          return {
            interval: interval,
            pause:"hover" 
          };
        })(this.config);

        return true;
      }
      return false;
    },

    validate: function(config) {
      var isTypeof = function (value, type) {
        if (value) {
          return typeof value === type;
        }
        // if not defined is valid field
        return true;
      };

      return config.imgs && config.imgs.length > 0 && isTypeof(config.imgs,'object') 
            && isTypeof(config.targetDiv,'string')
            && isTypeof(config.carouselId,'string')
            && isTypeof(config.carouselClass,'string')
            && isTypeof(config.miniThumbClass,'string')
            && isTypeof(config.indicatorClass,'string')
            && isTypeof(config.showIndicators,'boolean')
            && isTypeof(config.showControls,'boolean')
            && isTypeof(config.useBootstrapStyle,'boolean')
            && isTypeof(config.bootstrapSpan,'number')
            && isTypeof(config.bootstrapOffset,'number')
            && isTypeof(config.startCarousel,'boolean')
            && isTypeof(config.carouselConfig,'object')
            && isTypeof(config.slideCallback,'object')
            && isTypeof(config.templateId,'string');
    },

    generateTemplate: function() {
      var templateId = this.config.templateId;
      var templateSelector = ( templateId && templateId.charAt(0) === '#' ) ? 
        templateId : '#' + templateId;

      var source = ( templateId && $(templateSelector).length > 0 ) ? 
          $(templateSelector).html() : CarouselGallery.templateSrc;
      var template = Handlebars.compile(source);
      this.doAppend.call(this, template);
    },

    doAppend: function(template) {
      var carouselAreaSelector = this.config.carouselId.charAt(0) === '#' ? 
                this.config.carouselId : '#' + this.config.carouselId;
      
      var thumSelector = this.config.miniThumbClass.charAt(0) === '.' ?
              this.config.miniThumbClass : '.' + this.config.miniThumbClass;
      var thumbSelectorItem = thumSelector + ' .carousel-mini-thumb-item';

      var targetSelector = this.config.targetDiv.charAt(0) === '#' 
              || this.config.targetDiv === 'body' ? 
              this.config.targetDiv : '#' + this.config.targetDiv;

      $(targetSelector).append( template(this.config) );

      var slider = function(e) {
        var newIndex = $(carouselAreaSelector +' .active').index(carouselAreaSelector +' .item');
        $(thumbSelectorItem).removeClass('carousel-mini-thumb-active');
        $(thumbSelectorItem).eq(newIndex).addClass('carousel-mini-thumb-active');
      };

      $(carouselAreaSelector).carousel(this.config.carouselConfig)
          .on('slid', slider)
          .on('slid.bs.carousel', slider);

      $(thumbSelectorItem).on('click', function() {
	      $(carouselAreaSelector).carousel(
		      $(thumbSelectorItem).index($(this))
 	      );
      });
    }
  };
  
  CarouselGallery.config;
  CarouselGallery.templateSrc = '\
<div class="{{#if useBootstrapStyle}} row row-fluid {{/if}}"> \
  <div id="carousel-area" data-ride="carousel" \
    class="carousel slide carousel-container {{#if useBootstrapStyle}} {{boostrapSpanClass}}  {{/if}}>">\
  {{#if showIndicators}}\
    <ol class="carousel-indicators">\
        {{#each imgs}}\
          <li data-target="#carousel-area" data-slide-to="{{@index}}" {{#ifiszero @index }}class="active"{{/ifiszero}}></li>\
        {{/each}}\
    </ol>\
  {{/if}}\
    <div class="carousel-inner">\
      {{#each imgs}}\
        <div class="{{#ifiszero @index }}active{{/ifiszero}} item"><img src="{{this}}" /></div>\
      {{/each}}\
    </div>\
  {{#if showControls}}\
    <a class="carousel-control left" href="#carousel-area" data-slide="prev">&lsaquo;</a>\
    <a class="carousel-control right" href="#carousel-area" data-slide="next">&rsaquo;</a>\
  {{/if}}\
  </div>\
</div>\
<div class="{{#if useBootstrapStyle}} row row-fluid {{/if}}">\
  <div class="carousel-mini-thumb {{#if useBootstrapStyle}} {{boostrapSpanClass}}  {{/if}}">\
    {{#each imgs}}\
      <img class="carousel-mini-thumb-item {{#ifiszero @index }}carousel-mini-thumb-active{{/ifiszero}}" src="{{this}}" /> \
    {{/each}}\
  </div>\
</div>';

  Handlebars.registerHelper('ifiszero', function(conditional, options) {
    if(conditional == 0) {
      return options.fn(this);
    }
  });
}( jQuery ));

