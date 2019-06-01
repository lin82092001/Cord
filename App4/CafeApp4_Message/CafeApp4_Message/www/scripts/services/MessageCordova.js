angular.module('CafeApp4_Message').factory('MessageCordova',function(AccountManager,MessageProxy){
	
	var deviceType=null;
	var deviceToken=null;
	
	function initialization(){
		if(typeof cordova === "undefined")return;
		
		clearBadge();
		
		deviceType=device.platform;
		
		document.addEventListener("resume",function(){
			clearBadge();
		});
		
		var push=PushNotification.init({
			android:{
			    senderID: "356021699819",
				clearBadge:true
			},
			ios:{
				alert:true,
				badge:true,
				clearBadge:true
			}
		});
		
		push.on('registration',function(data){
			deviceToken=data.registrationId;
		});
		
		push.on('notification',function(data){
			window.plugins.toast.show(data.message,'long','center');
			clearBadge();
		});
	}
	
	function clearBadge(){
		var account=AccountManager.get();
		if(account.id)MessageProxy.clearBadge(account.id,function(){});
	}
	
	return{
		initialization:initialization,
		getDeviceType:function(){
			return deviceType || "browser";
		},
		getDeviceToken:function(){
			return deviceToken || "";
		}
	};
});