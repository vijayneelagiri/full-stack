jQuery(function($) {
	
	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status text-center"></div>');
		$.ajax({
			//url: $(this).attr('action'),
			url: 'admin/index.php/book-service-request',
            type: "post",
            data: $(this).serializeArray() ,
			beforeSend: function(){
				form.prepend( form_status.html('<p class="text-center alert alert-info"><i class="fa fa-spinner fa-spin"></i> Service Request is sending...</p>').fadeIn() );
			}
		}).done(function(data){
		    //alert(data);
			form_status.html('<p class="alert alert-success text-center">' + data.message + '</p>');
            form_status.focus();
            $('.form-control').val('');
		});
	});

	
	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
    
     
    
    $("#state > option").remove();
    $("#city > option").remove(); 
            
            $('#city').append($('<option />', { 
                value: '',
                text : 'Select City' 
            }));
    
    
    
    
    $('#state').append($('<option />', { 
                value: '',
                text : 'Select State' 
            }));
     $.ajax({
                url: 'admin/index.php/get-data',
                type: "post",
                data: { tbl : 'state_list', id: 0  },
                success: function(d) {                                 
                    $.each(d,function(i){
                           
                            $('#state').append($('<option />', { 
                                value: d[i].state,
                                text : d[i].state 
                            }));
                           
                      });
                }
     }); 
     
     $("#state").change(function() { 
                    
            $("#city > option").remove(); 
            
            $('#city').append($('<option />', { 
                value: '',
                text : 'Select City' 
            }));
            //alert($(this).val());
            $.ajax({
                    url: 'admin/index.php/get-data',
                    type: "post",
                    data: { tbl : 'city_list', id: $(this).val()  },
                    success: function(d) {                                 
                        $.each(d,function(i){
                               
                                $('#city').append($('<option />', { 
                                    value: d[i].city,
                                    text : d[i].city 
                                }));
                               
                          });
                    }
            });  

    });
    
    
    //$('#property_type_id option').remove();
    
    $.ajax({ 
                url:  'admin/index.php/get-data'  ,            
                type: "post",
                data: { tbl : 'property_type_list', id: '' },
                success: function(d) {      
                   // alert(d);
                      $.each(d,function(i){     
                        //alert(d[i].value);
                           $('#property_type_id').append($('<option />', { 
                                value: d[i].id,
                                text : d[i].value 
                            }));
                           
                      }); 
                      
                     
                }
    }); 
    
    $.ajax({ 
                url:  'admin/index.php/get-data'  ,            
                type: "post",
                data: { tbl : 'service_type_list', id: '' },
                success: function(d) {      
                   // alert(d);
                      $.each(d,function(i){     
                        //alert(d[i].value);
                           $('#service_type_id').append($('<option />', { 
                                value: d[i].id,
                                text : d[i].value 
                            }));
                           
                      }); 
                      
                     
                }
    }); 
    
    
    
});