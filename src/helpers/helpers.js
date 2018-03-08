export function fadeInElement(element, duration) {
  element.animate({
    opacity: 1
  }, duration, function() {

  });
}