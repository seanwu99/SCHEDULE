
	var spc_href = location.href.substring (0, location.href.indexOf('MESM')) + "SPCMC/";

	var oMenuButton1 = new sap.ui.commons.MenuButton({text: "Settings", icon: "Common/img/map.png"}); 
	var oMenuButton2 = new sap.ui.commons.MenuButton({ text: "Dashboards", icon: "Common/img/cloud.png"}); 
	var oMenuButton3 = new sap.ui.commons.MenuButton({text: "Reports", icon: "Common/img/list.png"});

	// Create the button menus
	var oMenu1 = new sap.ui.commons.Menu("menu1", {ariaDescription: "Application Setup", enabled:true});
	var oMenu2 = new sap.ui.commons.Menu("menu2", {ariaDescription: "User Dashboards", enabled:true});
	var oMenu3 = new sap.ui.commons.Menu("menu3", {ariaDescription: "User Reports", enabled:true});

	// Create the items and add them to the menu 1------------------	Application Setup		-------------------------------------	

		var oMenuItem1 = new sap.ui.commons.MenuItem("item1-0-1",{text: "Enterprise Hierarchy", enabled: false});
		oMenu1.addItem(oMenuItem1);
		var oMenuItem2 = new sap.ui.commons.MenuItem("item1-0-2",{text: " ???", enabled: false});
		//oMenu1.addItem(oMenuItem2);
		var oMenuItem3 = new sap.ui.commons.MenuItem("item1-0-3",{text: "MES Memory Maps", enabled: false});
		oMenu1.addItem(oMenuItem3);
		var oMenuItem4 = new sap.ui.commons.MenuItem("item1-0-4",{text: "Plant Connectivity", enabled: false});
		oMenu1.addItem(oMenuItem4);
		var oMenuItem5 = new sap.ui.commons.MenuItem("item1-0-5",{text: "Master Data Setup", enabled: false});
		oMenu1.addItem(oMenuItem5);
		//----------------------SPC---------------------------------------

		oMenu1.setAriaDescription("SPC");

		var oMenuItem6 = new sap.ui.commons.MenuItem("item1-0-6",{text: "SPCM Home", enabled: false});
		oMenu1.addItem(oMenuItem6);

		var oMenuItem7 = new sap.ui.commons.MenuItem("item1-0-7",{text: "Plant Setup"});
		oMenu1.addItem(oMenuItem7);
		var oMenuItem8 = new sap.ui.commons.MenuItem("item1-0-8",{text: "Station Setup"});
		oMenu1.addItem(oMenuItem8);
		var oMenuItem9 = new sap.ui.commons.MenuItem("item1-0-9",{text: "Parts Setup"});
		oMenu1.addItem(oMenuItem9);
		var oMenuItem10 = new sap.ui.commons.MenuItem("item1-0-10",{text: "Charts Setup"});
		oMenu1.addItem(oMenuItem10);
		var oMenuItem11 = new sap.ui.commons.MenuItem("item1-0-11",{text: "Operator Setup"});
		oMenu1.addItem(oMenuItem11);
		var oMenuItem12 = new sap.ui.commons.MenuItem("item1-0-12",{text: "Subscriptions Setup"});
		oMenu1.addItem(oMenuItem12);

	//-------------------------------------------------------------------------

	// Create submenu 4 	----------------	Hierarchy Setup			------------------------------

		var oMenu4 = new sap.ui.commons.Menu("menu4", {ariaDescription: "Hierarchy Setup", enabled:true});
		oMenuItem1.setSubmenu(oMenu4);
		//Create the items and add them to the sub menu
		var oMenuItem41 = new sap.ui.commons.MenuItem("item1-4-1",{text: "Hierarchy Management", enabled: false});
		oMenu4.addItem(oMenuItem41);
		var oMenuItem42 = new sap.ui.commons.MenuItem("item1-4-2",{text: "Hierarchy Levels Setup", enabled: false});
		oMenu4.addItem(oMenuItem42);

	// Create  submenu  5  	--------------	Memory Maps Setup		--------------------------

		var oMenu5 = new sap.ui.commons.Menu("menu5", {ariaDescription: "Memory Maps Setup", enabled:true});
		oMenuItem3.setSubmenu(oMenu5);
		//Create the items and add them to the sub menu
		var oMenuItem51 = new sap.ui.commons.MenuItem("item1-5-1",{text: "Memory Map Tags", enabled: false});
		oMenu5.addItem(oMenuItem51);
		var oMenuItem52 = new sap.ui.commons.MenuItem("item1-5-2",{text: "Memory Map Transactions", enabled: false});
		oMenu5.addItem(oMenuItem52);
		var oMenuItem53 = new sap.ui.commons.MenuItem("item1-5-3",{text: "PLC Tag Groups", enabled: false});
		oMenu5.addItem(oMenuItem53);
		var oMenuItem54 = new sap.ui.commons.MenuItem("item1-5-4",{text: "PLC Tag Types", enabled: false});
		oMenu5.addItem(oMenuItem54);
		var oMenuItem55 = new sap.ui.commons.MenuItem("item1-5-5",{text: "PLC Tag Functions", enabled: false});
		oMenu5.addItem(oMenuItem55);

	// Create submenu  6  	--------------	Connectivity Setup	-------------------------

		var oMenu6 = new sap.ui.commons.Menu("menu6", {ariaDescription: "Connectivity Setup", enabled:true});
		oMenuItem4.setSubmenu(oMenu6);
		//Create the items and add them to the sub menu
		var oMenuItem61 = new sap.ui.commons.MenuItem("item1-6-1",{text: "Shop Floor Operators", enabled: false});
		oMenu6.addItem(oMenuItem61);
		var oMenuItem62 = new sap.ui.commons.MenuItem("item1-6-2",{text: "Shop Floor Computers", enabled: false});
		oMenu6.addItem(oMenuItem62);
		var oMenuItem63 = new sap.ui.commons.MenuItem("item1-6-3",{text: "Shop Floor Printers", enabled: false});
		oMenu6.addItem(oMenuItem63);
		var oMenuItem64 = new sap.ui.commons.MenuItem("item1-6-4",{text: "Plant Connectivity Servers", enabled: false});
		oMenu6.addItem(oMenuItem64);
		var oMenuItem65 = new sap.ui.commons.MenuItem("item1-6-5",{text: "Plant Connectivity Agents", enabled: false});
		oMenu6.addItem(oMenuItem65);
		var oMenuItem66 = new sap.ui.commons.MenuItem("item1-6-6",{text: "Line Side SQL Servers", enabled: false});
		oMenu6.addItem(oMenuItem66);
		var oMenuItem67 = new sap.ui.commons.MenuItem("item1-6-7",{text: "File Connectivity Servers", enabled: false});
		oMenu6.addItem(oMenuItem67);
		var oMenuItem68 = new sap.ui.commons.MenuItem("item1-6-8",{text: "File Connectivity Agents", enabled: false});
		oMenu6.addItem(oMenuItem68);

	// Create  submenu  7  	--------------	Master Data		------------------------

		var oMenu7 = new sap.ui.commons.Menu("menu7", {ariaDescription: "Master Data", enabled:true});
		oMenuItem5.setSubmenu(oMenu7);
		//Create the items and add them to the sub menu
		var oMenuItem71 = new sap.ui.commons.MenuItem("item1-7-1",{text: "Units Of Measure", enabled: false});
		oMenu7.addItem(oMenuItem71);
		var oMenuItem72 = new sap.ui.commons.MenuItem("item1-7-2",{text: "Products Management", enabled: false});
		oMenu7.addItem(oMenuItem72);
		var oMenuItem73 = new sap.ui.commons.MenuItem("item1-7-3",{text: "Bills of Materials", enabled: false});
		oMenu7.addItem(oMenuItem73);
		var oMenuItem74 = new sap.ui.commons.MenuItem("item1-7-4",{text: "Products Routing", enabled: false});
		oMenu7.addItem(oMenuItem74);

		var oMenuItem75 = new sap.ui.commons.MenuItem("item1-7-5",{text: "Plant Shifts", enabled: false});
		oMenu7.addItem(oMenuItem75);
		var oMenuItem76 = new sap.ui.commons.MenuItem("item1-7-6",{text: "Planned Downtime", enabled: false});
		oMenu7.addItem(oMenuItem76);



	// Create  submenu  8  (SPC)	--------------	Plant Data		------------------------

		var oMenu8 = new sap.ui.commons.Menu("menu8", {ariaDescription: "Plant Data"});
		oMenuItem7.setSubmenu(oMenu8);
		//Create the items and add them to the sub menu
		var oMenuItem81 = new sap.ui.commons.MenuItem("item1-8-1",{text: "Setup Plants", tooltip: "Plant  Definition", enabled: false});
		oMenu8.addItem(oMenuItem81);
		var oMenuItem82 = new sap.ui.commons.MenuItem("item1-8-2",{text: "Import Plants", tooltip: "Plants Import", enabled: false});
		oMenu8.addItem(oMenuItem82);
		var oMenuItem83 = new sap.ui.commons.MenuItem("item1-8-3",{text: "Export Plants", tooltip: "Plants Export", enabled: false});
		oMenu8.addItem(oMenuItem83);

	// Create  submenu  9  (SPC)	--------------	Station Data		-----------------------

		var oMenu9 = new sap.ui.commons.Menu("menu9", {ariaDescription: "Station Data"});
		oMenuItem8.setSubmenu(oMenu9);
		//Create the items and add them to the sub menu
		var oMenuItem91 = new sap.ui.commons.MenuItem("item1-9-1",{text: "Setup Stations", tooltip: "Shop-Floor Station Definition", enabled: false});
		oMenu9.addItem(oMenuItem91);
		var oMenuItem92 = new sap.ui.commons.MenuItem("item1-9-2",{text: "Import Stations", tooltip: "Shop-Floor Station Import", enabled: false});
		oMenu9.addItem(oMenuItem92);
		var oMenuItem93 = new sap.ui.commons.MenuItem("item1-9-3",{text: "Export Stations", tooltip: "Shop-Floor Station Export", enabled: false});
		oMenu9.addItem(oMenuItem93);

	// Create  submenu  10  (SPC)	--------------	Parts Data		-----------------------

		var oMenu10 = new sap.ui.commons.Menu("menu10", {ariaDescription: "Parts Data"});
		oMenuItem9.setSubmenu(oMenu10);
		//Create the items and add them to the sub menu
		var oMenuItem101 = new sap.ui.commons.MenuItem("item1-10-1",{text: "Setup Parts", tooltip: "Shop-Floor Parts Definition", enabled: false});
		oMenu10.addItem(oMenuItem101);
		var oMenuItem102 = new sap.ui.commons.MenuItem("item1-10-2",{text: "Import Parts", tooltip: "Shop-Floor Parts Import", enabled: false});
		oMenu10.addItem(oMenuItem102);
		var oMenuItem103 = new sap.ui.commons.MenuItem("item1-10-3",{text: "Export Parts", tooltip: "Shop-Floor Parts Export", enabled: false});
		oMenu10.addItem(oMenuItem103);

	// Create  submenu  11  (SPC)	--------------	Charts		----------------------

		var oMenu11 = new sap.ui.commons.Menu("menu11", {ariaDescription: "Charts"});
		oMenuItem10.setSubmenu(oMenu11);
		//Create the items and add them to the sub menu
		var oMenuItem111 = new sap.ui.commons.MenuItem("item1-11-1",{text: "Chart Hierarchy", tooltip: "Chart Hierarchy Definition", enabled: false});
		oMenu11.addItem(oMenuItem111);
		var oMenuItem112 = new sap.ui.commons.MenuItem("item1-11-2",{text: "Chart SPC Parameters", tooltip: "Chart SPC Parameters", enabled: false});
		oMenu11.addItem(oMenuItem112);
		var oMenuItem113 = new sap.ui.commons.MenuItem("item1-11-3",{text: "Import Chart Data", tooltip: "Chart Data Import", enabled: false});
		oMenu11.addItem(oMenuItem113);
		var oMenuItem114 = new sap.ui.commons.MenuItem("item1-11-4",{text: "Export Chart Data", tooltip: "Chart Data Export", enabled: false});
		oMenu11.addItem(oMenuItem114);

	// Create  submenu  12  (SPC)	--------------	Operator Data		---------------------

		var oMenu12 = new sap.ui.commons.Menu("menu12", {ariaDescription: "Operator Data"});
		oMenuItem11.setSubmenu(oMenu12);
		//Create the items and add them to the sub menu
		var oMenuItem121 = new sap.ui.commons.MenuItem("item1-12-1",{text: "Setup Operators", tooltip: "Shop-Floor Operator Definition", enabled: false});
		oMenu12.addItem(oMenuItem121);
		var oMenuItem122 = new sap.ui.commons.MenuItem("item1-12-2",{text: "Import Operators", tooltip: "Shop-Floor Operator Import", enabled: false});
		oMenu12.addItem(oMenuItem122);
		var oMenuItem123 = new sap.ui.commons.MenuItem("item1-12-3",{text: "Export Operators", tooltip: "Shop-Floor Operator Export", enabled: false});
		oMenu12.addItem(oMenuItem123);

	// Create  submenu  13  (SPC)	--------------	Subscriptions Data		--------------------

		var oMenu13 = new sap.ui.commons.Menu("menu13", {ariaDescription: "Subscriptions Data"});
		oMenuItem12.setSubmenu(oMenu13);
		//Create the items and add them to the sub menu
		var oMenuItem131 = new sap.ui.commons.MenuItem("item1-13-1",{text: "Setup Subscriptions", tooltip: "Alert Subscription Definition", enabled: false});
		oMenu13.addItem(oMenuItem131);
		var oMenuItem132 = new sap.ui.commons.MenuItem("item1-13-2",{text: "Import Subscriptions", tooltip: "Subscription Import", enabled: false});
		oMenu13.addItem(oMenuItem132);
		var oMenuItem133 = new sap.ui.commons.MenuItem("item1-13-3",{text: "Export Subscriptions", tooltip: "Subscription Export", enabled: false});
		oMenu13.addItem(oMenuItem133);

	//----------------------------------------------------------------------

	// Create the items and add them to the menu 2

		var oMenuItem21 = new sap.ui.commons.MenuItem("item2-0-1",{text: "Work Order Management", enabled:false});
		oMenu2.addItem(oMenuItem21);
		var oMenuItem22 = new sap.ui.commons.MenuItem("item2-0-2",{text: "Carrier Station Dashboard", enabled:false});
		oMenu2.addItem(oMenuItem22);
		var oMenuItem23 = new sap.ui.commons.MenuItem("item2-0-3",{text: "Assembly Station Dashboard", enabled:false});
		oMenu2.addItem(oMenuItem23);
		//----------------------- SPC--------------------------------------
		var oMenuItem24 = new sap.ui.commons.MenuItem("item2-0-4",{text: "SPC Dashboard", enabled:false});
		oMenu2.addItem(oMenuItem24);
		var oMenuItem25 = new sap.ui.commons.MenuItem("item2-0-5",{text: "Saved File Charts", enabled:false});
		//oMenu2.addItem(oMenuItem25);
		var oMenuItem26 = new sap.ui.commons.MenuItem("item2-0-6",{text: "SPC History Logs", enabled: false});
		//oMenu2.addItem(oMenuItem26);

	//----------------------------------------------------------------------

	// Create the items and add them to the menu 3

		var oMenuItem31 = new sap.ui.commons.MenuItem("item3-0-1",{text: "Production Status Report", enabled:false});
		oMenu3.addItem(oMenuItem31);
		var oMenuItem32 = new sap.ui.commons.MenuItem("item3-0-2",{text: "Item Traceability Report", enabled:false});
		oMenu3.addItem(oMenuItem32);
		var oMenuItem33 = new sap.ui.commons.MenuItem("item3-0-3",{text: "Connector Diagnostics", enabled:false});
		oMenu3.addItem(oMenuItem33);
		//----------------------- SPC--------------------------------------
		var oMenuItem34 = new sap.ui.commons.MenuItem("item3-0-4",{text: "Daily Activity", enabled: false});
		oMenu3.addItem(oMenuItem34);
		var oMenuItem35 = new sap.ui.commons.MenuItem("item3-0-5",{text: "Weekly Activity", enabled: false});
		oMenu3.addItem(oMenuItem35);
		var oMenuItem36 = new sap.ui.commons.MenuItem("item3-0-6",{text: "Monthly Activity", enabled: false});
		oMenu3.addItem(oMenuItem36);

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
	
			// SubMenu Settings 4

			case "item1-4-1":
				setTimeout("location.href = '" + "MgtHierarchy.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-4-2":
				setTimeout("location.href = '" + "LvlHierarchy.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SubMenu Settings 5

			case "item1-5-1":
				setTimeout("location.href = '" + "MemMapTags.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-5-2":
				setTimeout("location.href = '" + "MemMapTrxs.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-5-3":
				setTimeout("location.href = '" + "TagCommGroups.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-5-4":
				setTimeout("location.href = '" + "TagTypes.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-5-5":
				setTimeout("location.href = '" + "TagFunctions.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SubMenu Settings 6

			case "item1-6-1":
				setTimeout("location.href = '" + "Operators.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-6-2":
				setTimeout("location.href = '" + "Stations.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-6-3":
				setTimeout("location.href = '" + "Printers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-6-4":
				setTimeout("location.href = '" + "PCoServers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-6-5":
				setTimeout("location.href = '" + "PCoAgents.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-6-6":
				setTimeout("location.href = '" + "SqlServers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-6-7":
				setTimeout("location.href = '" + "PCoFileServers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
			break;
				case "item1-6-8":
				setTimeout("location.href = '" + "PCoFileAgents.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
			break;

			// SubMenu Settings 7

			case "item1-7-1":
				setTimeout("location.href = '" + "UnitsOfMeasure.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-7-2":
				setTimeout("location.href = '" + "ProductsMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-7-3":
				setTimeout("location.href = '" + "BomMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-7-4":
				setTimeout("location.href = '" +  "RoutingMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			case "item1-7-5":
				setTimeout("location.href = '" + "Shifts.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-7-6":
				setTimeout("location.href = '" +  "PlannedDowntime.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SPC Home

			case "item1-0-6":
				setTimeout("location.href = '"+spc_href + "SPCM.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// SubMenu Settings 8

			case "item1-8-1":
				// document.location.href = 'Plants.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "Plants.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-8-2":
				// document.location.href = 'ImportPlants.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ImportPlants.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-8-3":
				// document.location.href = 'ExportPlants.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ExportPlants.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
	
				// SubMenu Settings 9

			case "item1-9-1":
				// document.location.href = 'Stations.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "Stations.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-9-2":
				// document.location.href = 'ImportStations.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ImportStations.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-9-3":
				// document.location.href = 'ExportStations.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ExportStations.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

		// SubMenu Settings 10

			case "item1-10-1":
				// document.location.href = 'Parts.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "Parts.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-10-2":
				// document.location.href = 'ImportParts.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ImportParts.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-10-3":
				// document.location.href = 'ExportParts.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ExportParts.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
	
		// SubMenu Settings 11

			case "item1-11-1":
				// document.location.href = 'DatapointsHDR.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "DatapointsHDR.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-11-2":
				// document.location.href = 'DatapointsSPC.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "DatapointsSPC.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-11-3":
				// document.location.href = 'ImportDatapoints.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ImportDatapoints.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-11-4":
				// document.location.href = 'ExportDatapoints.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ExportDatapoints.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

		// SubMenu Settings 12

			case "item1-12-1":
				// document.location.href = 'Operators.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "Operators.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-12-2":
				// document.location.href = 'ImportOperators.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ImportOperators.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-12-3":
				// document.location.href = 'ExportOperators.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ExportOperators.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

		// SubMenu Settings 13

			case "item1-13-1":
				// document.location.href = 'Subscriptions.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "Subscriptions.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-13-2":
				// document.location.href = 'ImportSubscriptions.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ImportSubscriptions.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item1-13-3":
				 // document.location.href = 'ExportSubscriptions.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "ExportSubscriptions.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;

			// Menu Default
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
			case "item2-0-2":
				setTimeout("location.href = '" + "CarrierDashboard.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item2-0-3":
				setTimeout("location.href = '" + "AssemblyDashboard.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item2-0-4":
				// document.location.href = 'SPCDashboard.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "SPCDashboard.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			default:
				// alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
				break;
		}
	});

//Attach an event to raise an alert when an item is selected. (Button 3)

	oMenuButton3.attachItemSelected(function (oEvent){
		switch( oEvent.getParameter("itemId")) {
			// Menu Reports
			case "item3-0-1":
				setTimeout("location.href = '" + "ProductionStatus.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-0-2":
				setTimeout("location.href = '" + "ItemTraceability.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-0-3":
				setTimeout("location.href = '" + "MESM.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-0-4":
				// document.location.href = 'DailyReport.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "DailyReport.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-0-5":
				// document.location.href = 'WeeklyReport.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "WeeklyReport.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			case "item3-0-6":
				// document.location.href = 'MonthlyReport.irpt?ROLE=' + document.getElementById("user_role").value;
				setTimeout("location.href = '"+spc_href + "MonthlyReport.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
				break;
			default:
				//alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
				break;
		}
	});

