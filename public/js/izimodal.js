iziToast.settings({
      timeout: 3000, // default timeout

      resetOnHover: true,
      // icon: '', // icon class
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      onOpen: function () {
        console.log('callback abriu!');
      },
      onClose: function () {
        console.log("callback fechou!");
      }
      
  });


$(function() {
  /* Instantiating iziModal */
  $("#modal-custom").iziModal({
    overlayClose: false,
    overlayColor: "rgba(0, 0, 0, 0.6)"
  });

  /*$(document).on('click', '.trigger-custom', function (event) {
      event.preventDefault();
      $('#modal-custom').iziModal('open');
  });*/

  /* JS inside the modal */

  $("#modal-custom").on("click", "header a", function(event) {
    event.preventDefault();
    var index = $(this).index();
    $(this)
      .addClass("active")
      .siblings("a")
      .removeClass("active");
    $(this)
      .parents("div")
      .find("section")
      .eq(index)
      .removeClass("hide")
      .siblings("section")
      .addClass("hide");

    if ($(this).index() === 0) {
      $("#modal-custom .iziModal-content .icon-close").css(
        "background",
        "#ddd"
      );
    } else {
      $("#modal-custom .iziModal-content .icon-close").attr("style", "");
    }
  });

  $("#formlog").on("click", ".submit", function(event) {
    if($("#logemail").val() === "" || $("#logpassword").val() === ""){
      iziToast.warning({timeout:2500,position: "center", title: 'Attention', message: 'Vous devez remplir tous les champs !!'});
    event.preventDefault();


    var fx = "wobble", //wobble shake
      $modal = $(this).closest(".iziModal");

    if (!$modal.hasClass(fx)) {
      $modal.addClass(fx);
      setTimeout(function() {
        $modal.removeClass(fx);
      }, 1500);
    }
  }
  });

  $("#formsign").on("click", ".submit", function(event) {
    if($("#signemail").val() === "" || $("#signpassword").val() === "" || $("#signname").val() === ""){
      iziToast.warning({timeout:2500,position: "center", title: 'Attention', message: 'Vous devez remplir tous les champs !!'});
    event.preventDefault();


    var fx = "wobble", //wobble shake
      $modal = $(this).closest(".iziModal");

    if (!$modal.hasClass(fx)) {
      $modal.addClass(fx);
      setTimeout(function() {
        $modal.removeClass(fx);
      }, 1500);
    }
  }
  });
});