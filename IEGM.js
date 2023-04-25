/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: localhost,
	prefix: prefix,
	port: 41062,
	isSecure: "False"
};
//to avoid errors in workbench: you can remove this when you have added an app
var app;
require.config({
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
	window.qlik = qlik;
	
	qlik.setOnError( function (error) {
		console.log(error);
	});

	

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('ea3a88bd-0a23-452b-a26c-89b52facf0c0', config);

	var app1 = qlik.openApp('e886588d-adf7-413b-a349-b56a89405a01', config);

	var app2 = qlik.openApp('619ef969-6483-410e-9931-215ccd4a22c9', config);


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//create cubes and lists -- inserted here --


	if (app) {
			//get objects -- inserted here --
	app.getObject('QV2-07','ZEqjEz');
	
	
	
	
	
	app.getObject('QV3-06','hDMu');
	app.getObject('QV4-04','HtPRb');
	app.getObject('QV4-03','EVqwPcJ');
	app.getObject('QV4-02','JgrNNt');
	app.getObject('QV4-01','uGsnhm');
	app.getObject('QV3-07','SJkWe');
	
	app.getObject('QV3-05','dqjMn');
	app.getObject('QV3-04','jPyVaj');
	app.getObject('QV3-03','aTaXbef');
	app.getObject('QV4-07','BYVNpa');
	app.getObject('QV4-06','MnRkHFm');
	app.getObject('QV1-04','wKHVJ');
	app.getObject('QV1-03','sNLbJj');
	app.getObject('QV1-01','aYQWpM');
	app.getObject('KPI-03','PYLvJmm');
	app.getObject('KPI-01','ndAsXr');
	app.getObject('KPI-02','zLqST');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	app.getObject('QV3-02','xVjhm');
	app.getObject('QV3-01','kJBrkC');
	
	app.getObject('QV2-06','aDpUeE');
	app.getObject('QV2-05','VZMAPJ');
	app.getObject('QV2-04','dyCd');
	app.getObject('QV2-03','jumabRF');
	app.getObject('QV2-02','mmfpb');
	
	app.getObject('QV2-01','gvpdhv');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	app.getObject('qvfilters','nKZQ');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
app.getObject('CurrentSelections','CurrentSelections');
		$(".filter-drawer-toggle, paper-menu paper-item").click(function() {
			qlik.resize();
		});
	} else {
		$(".current-selections-placeholder span").css("display", "inline-block");
	}
});
