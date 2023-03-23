jQuery(document).ready(function ($) {
  $(".auto-card-container").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: 3,
    autoplay: false,
    animateOut: "fadeIn",
    responsive: {
      0: {
        items: 1,
      },
      650: {
        items: 2,
      },
      1050: {
        items: 3,
      },
    },
  });
});
