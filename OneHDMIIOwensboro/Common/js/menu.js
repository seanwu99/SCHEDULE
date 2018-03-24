	
	//alert(location.href);

	// Create the button menus
	
	var oMenuButton1 = new sap.ui.commons.MenuButton({text: "Settings", icon: "Common/img/map.png"}); 
	var oMenuButton2 = new sap.ui.commons.MenuButton({text: "Dashboards", icon: "Common/img/cloud.png"}); 
	var oMenuButton3 = new sap.ui.commons.MenuButton({text: "Reports", icon: "Common/img/list.png"});
	

	// Create meus for menu buttons

	var oMenu1 = new sap.ui.commons.Menu("menu1", {ariaDescription: "Application Setup", enabled:true});
	var oMenu2 = new sap.ui.commons.Menu("menu2", {ariaDescription: "Dashboards", enabled:true});
	var oMenu3 = new sap.ui.commons.Menu("menu3", {ariaDescription: "Reports", enabled:true});


	// Create the items and add them to the menu 1------------------	Application Setup		-------------------------------------	

		var oMenuItem110 = new sap.ui.commons.MenuItem("item1-1-0",{text: "Enterprise Hierarchy", enabled: false});
		oMenu1.addItem(oMenuItem110);
		var oMenuItem120 = new sap.ui.commons.MenuItem("item1-2-0",{text: "MES Memory Maps", enabled: false});
		oMenu1.addItem(oMenuItem120);
		var oMenuItem130 = new sap.ui.commons.MenuItem("item1-3-0",{text: "Plant Connectivity", enabled: false});
		oMenu1.addItem(oMenuItem130);
		var oMenuItem140 = new sap.ui.commons.MenuItem("item1-4-0",{text: "Master Data Setup", enabled: false});
		oMenu1.addItem(oMenuItem140);


		// Create submenu 6	----------------	Hierarchy Setup			------------------------------

		var oMenu6 = new sap.ui.commons.Menu("menu6", {ariaDescription: "Hierarchy Setup", enabled:true});
		oMenuItem110.setSubmenu(oMenu6);
		//Create the items and add them to the sub menu
		var oMenuItem111 = new sap.ui.commons.MenuItem("item1-1-1",{text: "Hierarchy Management", enabled: false});
		oMenu6.addItem(oMenuItem111);
		var oMenuItem112 = new sap.ui.commons.MenuItem("item1-1-2",{text: "Hierarchy Levels Setup", enabled: false});
		oMenu6.addItem(oMenuItem112);

		// Create  submenu  7  	--------------	Memory Maps Setup		--------------------------

		var oMenu7 = new sap.ui.commons.Menu("menu7", {ariaDescription: "Memory Maps Setup", enabled:true});
		oMenuItem120.setSubmenu(oMenu7);
		//Create the items and add them to the sub menu
		var oMenuItem121 = new sap.ui.commons.MenuItem("item1-2-1",{text: "Memory Map Tags", enabled: false});
		oMenu7.addItem(oMenuItem121);
		var oMenuItem122 = new sap.ui.commons.MenuItem("item1-2-2",{text: "Memory Map Transactions", enabled: false});
		oMenu7.addItem(oMenuItem122);
		var oMenuItem123 = new sap.ui.commons.MenuItem("item1-2-3",{text: "PLC Tag Groups", enabled: false});
		oMenu7.addItem(oMenuItem123);
		var oMenuItem124 = new sap.ui.commons.MenuItem("item1-2-4",{text: "PLC Tag Types", enabled: false});
		oMenu7.addItem(oMenuItem124);
		var oMenuItem125 = new sap.ui.commons.MenuItem("item1-2-5",{text: "PLC Tag Functions", enabled: false});
		oMenu7.addItem(oMenuItem125);

		// Create submenu  8  	--------------	Connectivity Setup	-------------------------

		var oMenu8 = new sap.ui.commons.Menu("menu8", {ariaDescription: "Connectivity Setup", enabled:true});
		oMenuItem130.setSubmenu(oMenu8);
		//Create the items and add them to the sub menu
		var oMenuItem131 = new sap.ui.commons.MenuItem("item1-3-1",{text: "Shop Floor Operators", enabled: false});
		oMenu8.addItem(oMenuItem131);
		var oMenuItem132 = new sap.ui.commons.MenuItem("item1-3-2",{text: "Shop Floor Computers", enabled: false});
		oMenu8.addItem(oMenuItem132);
		var oMenuItem133 = new sap.ui.commons.MenuItem("item1-3-3",{text: "Shop Floor Printers", enabled: false});
		oMenu8.addItem(oMenuItem133);
		var oMenuItem134 = new sap.ui.commons.MenuItem("item1-3-4",{text: "Plant Connectivity Servers", enabled: false});
		oMenu8.addItem(oMenuItem134);
		var oMenuItem135 = new sap.ui.commons.MenuItem("item1-3-5",{text: "Plant Connectivity Agents", enabled: false});
		oMenu8.addItem(oMenuItem135);

		// Create  submenu  9  	--------------	Master Data		------------------------

		var oMenu9 = new sap.ui.commons.Menu("menu9", {ariaDescription: "Master Data", enabled:true});
		oMenuItem140.setSubmenu(oMenu9);
		//Create the items and add them to the sub menu
		var oMenuItem141 = new sap.ui.commons.MenuItem("item1-4-1",{text: "Units Of Measure", enabled: false});
		oMenu9.addItem(oMenuItem141);
		var oMenuItem142 = new sap.ui.commons.MenuItem("item1-4-2",{text: "Products Management", enabled: false});
		oMenu9.addItem(oMenuItem142);
		var oMenuItem143 = new sap.ui.commons.MenuItem("item1-4-3",{text: "Bills of Materials", enabled: false});
		oMenu9.addItem(oMenuItem143);
		var oMenuItem144 = new sap.ui.commons.MenuItem("item1-4-4",{text: "Products Routing", enabled: false});
		oMenu9.addItem(oMenuItem144);
		var oMenuItem145 = new sap.ui.commons.MenuItem("item1-4-5",{text: "Plant Shifts", enabled: false});
		oMenu9.addItem(oMenuItem145);

	
		// Create the items and add them to the menu 2 ------------------	Dashboard		-------------------------------------	

		var oMenuItem201 = new sap.ui.commons.MenuItem("item2-0-1",{text: "Work Order Management", enabled:false});
		oMenu2.addItem(oMenuItem201);

		var oMenuItem210 = new sap.ui.commons.MenuItem("item2-1-0",{text: "Molding Station Dashboard", enabled:false});
		//oMenu2.addItem(oMenuItem210);

		var oMenuItem220 = new sap.ui.commons.MenuItem("item2-2-0",{text: "Weigh Up", enabled:false});
		//oMenu2.addItem(oMenuItem220);

		var oMenuItem240 = new sap.ui.commons.MenuItem("item2-4-0",{text: "Mold Management", enabled: false});
		oMenu2.addItem(oMenuItem240);



		// Create submenu  10  	--------------	Mold Management	-------------------------

		var oMenu10 = new sap.ui.commons.Menu("menu10", {ariaDescription: "Mold Management", enabled: true});
		oMenuItem240.setSubmenu(oMenu10);
		//Create the items and add them to the sub menu
		var oMenuItem241 = new sap.ui.commons.MenuItem("item2-4-1",{text: "Add Mold", enabled: false});
		oMenu10.addItem(oMenuItem241);
		var oMenuItem242 = new sap.ui.commons.MenuItem("item2-4-2",{text: "Update Mold", enabled: false});
		oMenu10.addItem(oMenuItem242);

		// Create the items and add them to the menu 3 ------------------	Reporting	-------------------------------------	

		var oMenuItem310 = new sap.ui.commons.MenuItem("item3-1-0",{text: "Production Status Report", enabled:false});
		oMenu3.addItem(oMenuItem310);
		var oMenuItem320 = new sap.ui.commons.MenuItem("item3-2-0",{text: "Molds History Report", enabled:false});
		oMenu3.addItem(oMenuItem320);
		var oMenuItem330 = new sap.ui.commons.MenuItem("item3-3-0",{text: "Production Quolity Report", enabled:false});
		oMenu3.addItem(oMenuItem330);
		var oMenuItem340 = new sap.ui.commons.MenuItem("item3-4-0",{text: "Connector Diagnostics", enabled:false});
		oMenu3.addItem(oMenuItem340);

		
	
	// ******************************************************************************************************************************************************************

	//Attach the Menu to the MenuButton
	oMenuButton1.setMenu(oMenu1);
	oMenuButton2.setMenu(oMenu2);
	oMenuButton3.setMenu(oMenu3);
	
	// ******************************************************************************************************************************************************************

	//Attach an event to raise an alert when an item is selected (Button 1)

	oMenuButton1.attachItemSelected(function (oEvent){

		//	alert( oEvent.getParameter("itemId"));

		switch( oEvent.getParameter("itemId")) {
	
			// SubMenu Settings 6

			case "item1-1-1":
				setTimeout("location.href = '" + "MgtHierarchy.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-1-2":
				setTimeout("location.href = '" + "LvlHierarchy.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SubMenu Settings 7

			case "item1-2-1":
				setTimeout("location.href = '" + "MemMapTags.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-2-2":
				setTimeout("location.href = '" + "MemMapTrxs.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-2-3":
				setTimeout("location.href = '" + "TagCommGroups.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-2-4":
				setTimeout("location.href = '" + "TagTypes.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-2-5":
				setTimeout("location.href = '" + "TagFunctions.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SubMenu Settings 8

			case "item1-3-1":
				setTimeout("location.href = '" + "Operators.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-3-2":
				setTimeout("location.href = '" + "Stations.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-3-3":
				setTimeout("location.href = '" + "Printers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-3-4":
				setTimeout("location.href = '" + "PCoServers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-3-5":
				setTimeout("location.href = '" + "PCoAgents.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SubMenu Settings 9

			case "item1-4-1":
				setTimeout("location.href = '" + "UnitsOfMeasure.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-4-2":
				setTimeout("location.href = '" + "ProductsMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-4-3":
				setTimeout("location.href = '" + "BomMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-4-4":
				setTimeout("location.href = '" +  "RoutingMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-4-5":
				setTimeout("location.href = '" + "Shifts.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			default:
				// alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
			break;

		}
	});

	//Attach an event to raise an alert when an item is selected (Button 2)

	oMenuButton2.attachItemSelected(function (oEvent){
		switch( oEvent.getParameter("itemId")) {
			
			case "item2-0-1":
				setTimeout("location.href = '" + "WorkOrders.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item2-1-0":
				setTimeout("location.href = '" + "MoldingDashBoard_new.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item2-2-0":
				setTimeout("location.href = '" + "Weigh-up.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item2-3-0":
				setTimeout("location.href = '" + "ProductionStatus.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			default:
				// alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
				break;


			// SubMenu Settings 10
			case "item2-4-1":
				setTimeout("location.href = '" + "MoldMaintenance.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item2-4-2":
				setTimeout("location.href = '" + "MoldMaintenanceUpdate.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
		}
	});

	//Attach an event to raise an alert when an item is selected. (Button 3)

	oMenuButton3.attachItemSelected(function (oEvent){
		switch( oEvent.getParameter("itemId")) {
			// Menu Reports
			case "item3-1-0":
				setTimeout("location.href = '" + "ProductionStatus.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-2-0":
				setTimeout("location.href = '" + "MoldHistoryReport.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-3-0":
				setTimeout("location.href = '" + "ProductionQualityReport.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-4-0":
				setTimeout("location.href = '" + "MESM.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			default:
				//alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
				break;
		}
	});


	function roleSecurity() {

		var myRoles = document.getElementById("user_roles").value;
		var role2Access = "Z_HD_MESM_" + document.getElementById("user_role").value;

		//	 alert(role2Access);
 		if(myRoles.indexOf(role2Access)<0) {
			window.location.assign("security.irpt");
		 } else {

			 var roleString = document.getElementById("user_role").value;
			
			var roleArray = roleString.split("_");
			level2Access = roleArray[0]; 
				 //alert("level : " + level2Access);
			plant2Access =  roleArray[1];
				 //alert("plant : " + plant2Access);

			onLoadPage();

			document.getElementById("page_title").innerHTML=role2Access;

			oMenuButton1.placeAt("app_menu");
			oMenuButton2.placeAt("app_menu");
			oMenuButton3.placeAt("app_menu");

			var role_ADM = "Z_HD_MESM_ADM_"+plant2Access;
			var role_ENG = "Z_HD_MESM_ENG_"+plant2Access;
			var role_SUP = "Z_HD_MESM_SUP_"+plant2Access;
			var role_QA = "Z_HD_MESM_QA_"+plant2Access;
			var role_OPS = "Z_HD_MESM_OPS_"+plant2Access;

			switch(role2Access) {

			case role_ADM :

				// enable Cfg Hierarchy
					oCore.byId("item1-1-0").setEnabled(true);
				// enable Cfg Memory Maps
					oCore.byId("item1-2-0").setEnabled(true);
				// enable Cfg Connectivity
					oCore.byId("item1-3-0").setEnabled(true);
				// enable Master Data
					oCore.byId("item1-4-0").setEnabled(true);

				// enable Carrier Station Dashboard
					oCore.byId("item2-1-0").setEnabled(true);
			
				// enable Production Status Shifts Report
					oCore.byId("item3-1-0").setEnabled(true);
				// enable Mold History Report
					oCore.byId("item3-2-0").setEnabled(true);
				// enable Production Quolity Report
					oCore.byId("item3-3-0").setEnabled(true);
				// enable Connection Diagnostic
					oCore.byId("item3-4-0").setEnabled(true);
			
				// enable Equipment Hierarchy
					oCore.byId("item1-1-1").setEnabled(true);
				// enable Cfg Hierarchy Levels
					oCore.byId("item1-1-2").setEnabled(true);

				// enable Cfg Memory Maps
					oCore.byId("item1-2-1").setEnabled(true);
				// enable Cfg Tag Types
					oCore.byId("item1-2-2").setEnabled(true);
				// enable Cfg Tag Functions
					oCore.byId("item1-2-3").setEnabled(true);
				// enable Cfg Tag Groups
					oCore.byId("item1-2-4").setEnabled(true);
				// enable Cfg Memory Map Transactions
					oCore.byId("item1-2-5").setEnabled(true);

				// Enable UOM Maintenance
					oCore.byId("item1-3-1").setEnabled(true);
				// Enable Product Maintenance
					oCore.byId("item1-3-2").setEnabled(true);
				// Enable BOM Maintenance
					oCore.byId("item1-3-3").setEnabled(true);
				// Enable Routing Maintenance
					oCore.byId("item1-3-4").setEnabled(true);
				// Enable Shifts
					oCore.byId("item1-3-5").setEnabled(true);

				// Enable UOM Maintenance
					oCore.byId("item1-4-1").setEnabled(true);
				// Enable Product Maintenance
					oCore.byId("item1-4-2").setEnabled(true);
				// Enable BOM Maintenance
					oCore.byId("item1-4-3").setEnabled(true);
				// Enable Routing Maintenance
					oCore.byId("item1-4-4").setEnabled(true);
				// Enable Shifts
					oCore.byId("item1-4-5").setEnabled(true);

				// Work Orders
					oCore.byId("item2-0-1").setEnabled(true);
				// dashboard
					oCore.byId("item2-1-0").setEnabled(true);
				// scheduling
					oCore.byId("item2-2-0").setEnabled(true);
				// mold
					oCore.byId("item2-4-0").setEnabled(true);
					oCore.byId("item2-4-1").setEnabled(true);
					oCore.byId("item2-4-2").setEnabled(true);
			
				// update screen
				document.getElementById("page_title").innerHTML="ADM PLANT "+plant2Access;

				break;
			case role_ENG:
				// enable Cfg Hierarchy
					oCore.byId("item1-1-0").setEnabled(true);
				// enable Cfg Memory Maps
					oCore.byId("item1-2-0").setEnabled(true);
				// enable Cfg Connectivity
					oCore.byId("item1-3-0").setEnabled(true);
				// enable Master Data
					oCore.byId("item1-4-0").setEnabled(true);

				// enable Carrier Station Dashboard
					oCore.byId("item2-1-0").setEnabled(true);
			
				// enable Production Status Shifts Report
					oCore.byId("item3-1-0").setEnabled(true);
				// enable Mold History Report
					oCore.byId("item3-2-0").setEnabled(true);
				// enable Production Quolity Report
					oCore.byId("item3-3-0").setEnabled(true);
				// enable Connection Diagnostic
					oCore.byId("item3-4-0").setEnabled(true);
			
				// enable Equipment Hierarchy
					oCore.byId("item1-2-1").setEnabled(true);
				// enable Cfg Hierarchy Levels
					oCore.byId("item1-2-2").setEnabled(true);

				// enable Cfg Memory Maps
					oCore.byId("item1-3-1").setEnabled(true);
				// enable Cfg Tag Types
					oCore.byId("item1-3-2").setEnabled(true);
				// enable Cfg Tag Functions
					oCore.byId("item1-3-3").setEnabled(true);
				// enable Cfg Tag Groups
					oCore.byId("item1-3-4").setEnabled(true);
				// enable Cfg Memory Map Transactions
					oCore.byId("item1-3-5").setEnabled(true);

				// Enable UOM Maintenance
					oCore.byId("item1-4-1").setEnabled(true);
				// Enable Product Maintenance
					oCore.byId("item1-4-2").setEnabled(true);
				// Enable BOM Maintenance
					oCore.byId("item1-4-3").setEnabled(true);
				// Enable Routing Maintenance
					oCore.byId("item1-4-4").setEnabled(true);
				// Enable Shifts
					oCore.byId("item1-4-5").setEnabled(true);

				// Work Orders
					oCore.byId("item2-0-1").setEnabled(true);			
				// dashboard
					oCore.byId("item2-1-0").setEnabled(true);
				// scheduling
					oCore.byId("item2-2-0").setEnabled(true);
				// mold
					oCore.byId("item2-4-0").setEnabled(true);
					oCore.byId("item2-4-1").setEnabled(true);
					oCore.byId("item2-4-2").setEnabled(true);
			
				// update screen
				document.getElementById("page_title").innerHTML="ENG PLANT "+plant2Access;

				break;
			case role_SUP:
				document.getElementById("page_title").innerHTML="SUP PLANT "+plant2Access;
				break;
			case role_QA:
				document.getElementById("page_title").innerHTML="QA PLANT "+plant2Access;
				break;
			case role_OPS:
				document.getElementById("page_title").innerHTML="OPS PLANT "+plant2Access;
				break;
			default:
				alert("MES Module Role Unknown: " + role2Access);
				break;
			}
		  }
	}
