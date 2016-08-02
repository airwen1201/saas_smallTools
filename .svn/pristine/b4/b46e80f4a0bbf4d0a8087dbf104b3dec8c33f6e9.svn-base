/**
 * Created by PAVEI on 30/09/2014.
 * Updated by Ross Martin on 12/05/2014
 * Updated by Davide Pastore on 04/14/2015
 * Updated by Michel Vidailhet on 05/12/2015
 */
var img;
angular.module('ionicLazyLoad', []);

angular.module('ionicLazyLoad')

.directive('lazyScroll', ['$rootScope', '$timeout', 
    function($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {

                var scrollTimeoutId = 0;

                $scope.invoke = function () {
                    $rootScope.$broadcast('lazyScrollEvent');
                };

                $element.bind('scroll', function () {

                    $timeout.cancel(scrollTimeoutId);

                    // wait and then invoke listeners (simulates stop event)
                    scrollTimeoutId = $timeout($scope.invoke, 0);

                });


            }
        };
}])

.directive('imageLazySrc', ['$document', '$timeout', '$ionicScrollDelegate', '$compile',
    function ($document, $timeout, $ionicScrollDelegate, $compile) {
        return {
            restrict: 'A',
            scope: {
                lazyScrollResize: "@lazyScrollResize",
                imageLazyBackgroundImage: "@imageLazyBackgroundImage"
            },
            link: function ($scope, $element, $attributes) {
                if (!$attributes.imageLazyDistanceFromBottomToLoad) {
                    $attributes.imageLazyDistanceFromBottomToLoad = 0;
                }
                if (!$attributes.imageLazyDistanceFromRightToLoad) {
                    $attributes.imageLazyDistanceFromRightToLoad = 0;
                }

                if ($attributes.imageLazyLoader) {
                    var loader = $compile('<div class="image-loader-container"><ion-spinner class="image-loader" icon="' + $attributes.imageLazyLoader + '"></ion-spinner></div>')($scope);
                    $element.after(loader);
                }

                var deregistration = $scope.$on('lazyScrollEvent', function () {
                        //console.log('scroll');
                        if (isInView()) {
                            loadImage();
                            deregistration();
                        }
                    }
                );

                function loadImage() {
                    //Bind "load" event
                    $element.bind("load", function (e) {
                        if ($attributes.imageLazyLoader) {
                            loader.remove();
                        }
                        if ($scope.lazyScrollResize == "true") {
                            //Call the resize to recalculate the size of the screen
                            $ionicScrollDelegate.resize();
                        }
                    });

                    if ($scope.imageLazyBackgroundImage == "true") {
                        var bgImg = new Image();
                        bgImg.onload = function () {
                            if ($attributes.imageLazyLoader) {
                                loader.remove();
                            }
                            $element[0].style.backgroundImage = 'url(' + $attributes.imageLazySrc + ')'; // set style attribute on element (it will load image)
                            if ($scope.lazyScrollResize == "true") {
                                //Call the resize to recalculate the size of the screen
                                $ionicScrollDelegate.resize();
                            }
                        };
                        bgImg.src = $attributes.imageLazySrc;
                    } else {
						$element[0].src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==";
						img = new Image();
						if($attributes.imageLazySrc){
							 img.src = $attributes.imageLazySrc;
							 angular.element(img).bind('load', function () {
								 $element[0].src =$attributes.imageLazySrc;
							 });
						 }
                    }
                }

                function isInView() {
                    var clientHeight = $document[0].documentElement.clientHeight;
                    var clientWidth = $document[0].documentElement.clientWidth;
                    var imageRect = $element[0].getBoundingClientRect();
                    return (imageRect.top >= 0 && imageRect.top <= clientHeight + parseInt($attributes.imageLazyDistanceFromBottomToLoad))
                        && (imageRect.left >= 0 && imageRect.left <= clientWidth + parseInt($attributes.imageLazyDistanceFromRightToLoad));
                }

                // bind listener
                // listenerRemover = scrollAndResizeListener.bindListener(isInView);

                // unbind event listeners if element was destroyed
                // it happens when you change view, etc
                $element.on('$destroy', function () {
                    deregistration();
                });

                // explicitly call scroll listener (because, some images are in viewport already and we haven't scrolled yet)
                $timeout(function () {
                    if (isInView()) {
                        loadImage();
                        deregistration();
                    }
                }, 500);
            }
        };
    }])	
	.directive('actualSrc', function () {
		return{
			link: function postLink(scope, element, attrs) {
				attrs.$observe('actualSrc', function(newVal, oldVal){
					 element.attr("src","data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==");
					 if(newVal){
						 img = new Image();
						 img.src = newVal;
						 angular.element(img).bind('load', function () {
							 element.attr("src", newVal);
						 });
					 }
				});
	
			}
		}
	})
	.directive('resettingImg', function() {
	  return {
		restrict: 'A',
		link: function(scope, element, attr) {
		  var currentElement = element;
		  attr.$observe('src', function(src) {
			 if(src){
				 img = new Image();
				 img.src = src;
				 element.css("display", "none");
				 angular.element(img).bind('load', function () {
					 element.css("display", "block");
					 element.attr("src", src);
				 });
			 }
		  });
		}
	  };
	});