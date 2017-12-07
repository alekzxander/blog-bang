



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
$('#form').submit(function(e) {
    if ($.trim($("#email").val()) === "" && $.trim($("#name").val()) === "" ) {
        e.preventDefault();
        iziToast.warning({timeout:2000,position: "topLeft", title: 'Attention', message: 'Il faut  remplir un champs au moins !!'});
        //You can return false here as well
    }
});

 

    // info
    $('#infoClick').click(function () {

    	iziToast.info({position: "center", title: 'Hello', message: 'iziToast.info()'});
    }); // ! click

    // success
    $('#successClick').click(function () {
    	iziToast.success({timeout: 2000, icon: 'fa fa-chrome', title: 'OK', message: 'iziToast.sucess() with custom icon!'});
    }); // ! .click

    // warning
    $('#warningClick').click(function () {
    	iziToast.warning({position: "bottomLeft", title: 'Caution', message: 'attention'});


    });

    // error
    $('#errorClick').click(function () {
    	iziToast.error({title: 'Error', class:'test', message: 'Illegal operation',
    		onOpening: function () {},

    	});

    });



    // custom toast
    $('#customClick').click(function () {

    	iziToast.show({
    		color: 'dark',
    		icon: 'fa fa-user',
    		title: 'Hey',
    		message: 'Custom Toast!',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
        [
        '<button>Ok</button>',
        function (instance, toast) {
        	console.log($("#name").val())

        }
        ],
        [
        '<button>Close</button>',
        function (instance, toast) {
        	instance.hide(toast,{
        		transitionOut: 'fadeOutUp'
        	});
        }
        ]
        ]
    });


    }); 

    $('#custom1Click').click(function () {

    	iziToast.show({
    		theme: 'dark',
    		icon: 'icon-person',
    		title: 'Hey',
    		message: 'Welcome!',
    		position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    		progressBarColor: 'rgb(0, 255, 184)',
    		buttons: [
    		['<button>Ok</button>', function (instance, toast) {
    		alert("Hello world!");
        	}, true], // true to focus
        	['<button>Close</button>', function (instance, toast) {
        	instance.hide({
        		transitionOut: 'fadeOutUp',
        		onClosing: function(instance, toast, closedBy){
                    console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                }
            }, toast, 'close', 'buttonName');
       	 }]
        	],
        onOpening: function(instance, toast){
        	console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
        console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
    	}



    }); 
    	}); 

    

