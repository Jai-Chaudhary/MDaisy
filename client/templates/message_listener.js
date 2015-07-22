var message_handler = undefined;

Template.message_listener.onRendered(
	function(){
		//console.log("ALIVE!");
		var appointment = Session.get("client.tab.appointment_object");
		var message_list = messages.find({'appointment_id':appointment._id}, {sort:{date:1}});
		var ignore = true;
		message_handler = message_list.observeChanges({
					added : function(id, u){
						if(!ignore){
							//alert("new message!");
							/*if(u.from_id != Meteor.userId() && Router.current().route.getName() != "client_message_tab"){
								var drip = new Audio(DRIP_LINK);
								drip.onplay = function(){alert("you have received a new message!");
									Router.go("/client_message_tab");};
								drip.play();
							}*/
							
							if(u.from_id != Meteor.userId()){
								var drip = new Audio(KNOCK_LINK);
								drip.onplaying = function ()
								{
									if(Router.current().route.getName() != "client_message_tab"){
										alert("you have received a new message!");
										Router.go("/client_message_tab");
									}
									
								};
								drip.play();
								
								/*var drip = new Audio(DRIP_LINK);
								drip.onplay = function(){alert("you have received a new message!");
									Router.go("/staff_message_tab");};
								drip.play();*/
							}
						}
					}
		});
		ignore = false;
	});

Template.message_listener.onDestroyed(function(){
	//console.log("DEAD!");
	message_handler.stop();
});