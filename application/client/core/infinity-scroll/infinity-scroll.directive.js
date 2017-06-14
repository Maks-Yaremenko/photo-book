'use strict';

angular.module('coreInfinityScroll')
    .directive('infinityScroll',['$window', '$document', function($window, $document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                $document.bind('scroll', throttle(function() {
                    if ($document[0].body.scrollTop + $window.innerHeight >= $document[0].body.clientHeight) {
                        scope.$apply(attrs.infinityScroll);
                    }
                }, 200));

                function throttle(func, ms) {

                    var isThrottled = false,
                        savedArgs,
                        savedThis;

                    function wrapper() {

                        if (isThrottled) {
                            savedArgs = arguments;
                            savedThis = this;
                            return;
                        }

                        func.apply(this, arguments);

                        isThrottled = true;

                        setTimeout(function() {
                            isThrottled = false;
                            if (savedArgs) {
                                wrapper.apply(savedThis, savedArgs);
                                savedArgs = savedThis = null;
                            }
                        }, ms);
                    }

                    return wrapper;
                }
            }
        }
    }])