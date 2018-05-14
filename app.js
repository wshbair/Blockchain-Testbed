





var web3 = new Web3(new Web3.providers.HttpProvider("http://18.217.255.194:8545")); //   http://localhost:8545

var contractAddress;
var contract; 
var CurrentClientAddress=""; 

$(document).ready(function() {
var number = web3.eth.blockNumber;
var balanceWei = web3.eth.getBalance("0x9fc3d36c008acdb4f1aa15046850050478a988a1").toNumber();
var balance = web3.fromWei(balanceWei, 'ether');

$("#owner_account").html(balance);
$("#blocknumber").html(number);
setBlockchain();

var numberProjects=contract.numProjects.call({from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
console.log(numberProjects);
var path = window.location.pathname;
var page = path.split("/").pop();
if(page=='donor.html')
{
	
	var select = document.getElementById('projectid');
	while ( select.childNodes.length >= 1 )
	{
		select.removeChild(select.firstChild);       
	}
	var opt = document.createElement('option');
	opt.text="Select project";
	opt.value="non";
	select.appendChild(opt);


	for(var i=1;i<=numberProjects;i++)
	 {
		let ID=i; 
		var opt = document.createElement('option');
		var v=contract.projectData.call(ID,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"}) ;
		var fundingGoal=parseInt(v[2]);
		var amount=parseInt(v[3]);
		if (amount!=fundingGoal)
		{
			opt.text = v[0].toString();
			opt.value = v[8].toString();
			select.appendChild(opt);
		}
	}
}

if(page=='charity.html')
{
	
	var select = document.getElementById('ProjectIDImpact');
	while ( select.childNodes.length >= 1 )
	{
		select.removeChild(select.firstChild);       
	}

	for(var i=1;i<=numberProjects;i++)
	 {
		let ID=i; 
		var opt = document.createElement('option');
		var v=contract.projectData.call(ID,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"}) ;
		var fundingGoal=parseInt(v[2]);
		var amount=parseInt(v[3]);
		if (amount==fundingGoal)
		{
			opt.text = v[0].toString();
			opt.value = v[8].toString();
			select.appendChild(opt);
		}
	}

//ProjectIDCash
var select = document.getElementById('ProjectIDCash');
	while ( select.childNodes.length >= 1 )
	{
		select.removeChild(select.firstChild);       
	}

	for(var i=1;i<=numberProjects;i++)
	 {
		let ID=i; 
		var opt = document.createElement('option');
		var v=contract.projectData.call(ID,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"}) ;
		var fundingGoal=parseInt(v[2]);
		var amount=parseInt(v[3]);
		if (amount==fundingGoal)
		{
			opt.text = v[0].toString();
			opt.value = v[8].toString();
			select.appendChild(opt);
		}
	}

}





});

function myFunction()
{
	console.log("jjjjjjjjjjjjjjjjjjj");
	var projectID= document.getElementById("projectid").value;
	if(projectID!="non")
	{
		var v=contract.projectData.call(projectID,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"}) ;
		console.log(v);
		$("#FundingGoal").html(v[2].toString()+" Zakat coin");
		$("#Collecteddonation").html(v[3].toString()+" Zakat coin");
	}
	else
	{
		$("#FundingGoal").html(" 0 Zakat coin");
		$("#Collecteddonation").html("0 Zakat coin");
	}
}

function login()
	{
		var useraddress=document.getElementById("address").value;
		var Password=document.getElementById("password").value;
		var check=web3.personal.unlockAccount(useraddress,Password);
		if(check)
		{
			console.log('Good User');
		}
		else
		console.log('invalid address or passport');
	}
//======================================================================================================================
// Generate Address 
//====================================================================================================================== 
function GenerateAddress()
	{
		var Password=document.getElementById("password").value;
		let ClientAddress = web3.personal.newAccount(Password);
		CurrentClientAddress=ClientAddress;
		$("#newclientaddress").val(ClientAddress); 		  
	} 

//======================================================================================================================
//  New Donor Registration
//======================================================================================================================
function NewDonor() {
	$("#summary").html('' );
	$("#spinner").show();
	var password=document.getElementById("password").value; 
	var newclientaddress=document.getElementById("newclientaddress").value; 
	var username=document.getElementById("username").value;
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	contract.newDonor(username,newclientaddress, {gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

	///Event 
	var NewDonorEvent=contract.DonorEvt();
	NewDonorEvent.watch(function(error, result){
				if (!error)
					{
						$("#spinner").hide();
						$("#summary").html('Transaction Results <br>'+
										'Donor ID: '+result.args.donorID+'<br>'+
										'User Name: '+ web3.toUtf8(result.args.username)+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#summary").show();				 
					} else {
						$("#spinner").hide();
						console.log(error);
						$("#summary").html('Error : Transaction not commited' );
					}
			});
	
	}
//======================================================================================================================
// Get Donor information 
//====================================================================================================================== 
function GetDonorInfo()
	{
		$("#GetData").html('');
		CurrentClientAddress=document.getElementById("newclientaddress").value; 
		if (CurrentClientAddress.length==0)
		{
		CurrentClientAddress=document.getElementById("newclientaddress").value; 
		console.log(CurrentClientAddress);
		}
		
		var donerinfo=contract.donorData.call(CurrentClientAddress, {gas: 2000000, from:CurrentClientAddress});
	
 		if(donerinfo[2]!=0) {
			$("#donorID").html(donerinfo[2].toString());
			$("#donorusername").html(web3.toUtf8(donerinfo[0].toString()));
			$("#donoraddress").html(donerinfo[1].toString());
			$("#balance").html(donerinfo[3].toString()+' coins');
		}
		else
				$("#GetData").html('You are not allowed to view this info');

	//var view=contract.Donorviewr.call(CurrentClientAddress, {gas: 2000000, from:CurrentClientAddress});
	//console.log(view);			
	}
//======================================================================================================================
// Buy Zakat Coins 
//====================================================================================================================== 
function BuyCoins() {
	$("#BuyinCoinsgSummary").html('' );
	$("#spinner3").show();
	$("#DonateCoinsgSummary").hide();
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	var amount=document.getElementById("CoinsAmount").value;
	if (CurrentClientAddress.length==0)
	{
	CurrentClientAddress=document.getElementById("newclientaddress").value; 
	}
	contract.buyCoins(CurrentClientAddress, amount, {gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

	//Event 
	var Buyevent = contract.BuyZakatEvt();
	Buyevent.watch(function(error, result){
				if (!error)
					{
						$("#spinner3").hide();
						$("#BuyinCoinsgSummary").html('Buy Coins Transaction Results <br>'+
										'Donor Address: '+result.args.donoraddr+'<br>'+
										'Amount: '+ result.args.amount+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#BuyinCoinsgSummary").show();				 
					} else {
						$("#spinner3").hide();
						console.log(error);
						$("#BuyinCoinsgSummary").html('Error : Transaction not commited' );
					}
			});

	}
//======================================================================================================================
// Donate Zakat Coins 
//====================================================================================================================== 
function Donate(){
	$("#DonateCoinsgSummary").html('' );
	$("#BuyinCoinsgSummary").hide();
	var amount=document.getElementById("zCoins").value;
	var projectID= document.getElementById("projectid").value;
	console.log(projectID);
	if (CurrentClientAddress.length==0)
	{
	CurrentClientAddress=document.getElementById("newclientaddress").value; 
	}
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	
	if(projectID != "non")
	{
		contract.donate(CurrentClientAddress, projectID, amount, {gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
		$("#spinner4").show();	
    }
	else
	{
		$("#DonateCoinsgSummary").show();
		$("#DonateCoinsgSummary").html('Error : Select project' );
	}

	//Event 
	var donationEvnt = contract.DonationEvt();
	donationEvnt.watch(function(error, result){
				if (!error)
					{
						$("#spinner4").hide();
						$("#DonateCoinsgSummary").html('Donate Coins Transaction Results <br>'+
										'Donor Address: '+result.args.fromaddr+'<br>'+
										'Amount: '+ result.args.c+'<br>'+
										'Project ID: '+result.args.projectid+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#DonateCoinsgSummary").show();	
						
						if(result.args.c=="0")
							$("#DonateCoinsgSummary").html('Error : Transaction not commited' );
						
											
					} 
					
					else
					{
						$("#spinner4").hide();
						$("#DonateCoinsgSummary").html('Error : Transaction not commited' );
					}
					
					
			});
	}

//======================================================================================================================
// Add New Charity 
//====================================================================================================================== 
function NewCharity(){
	$("#newCharitySummary").html('' );
	$("#spinner5").show();	
	var name = document.getElementById("CharityName").value;
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	contract.newCharity(name, {gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
	//Event
	var newCharityEvnt=contract.NewCharityEvt();
	newCharityEvnt.watch(function(error, result){
				if (!error)
					{
						$("#spinner5").hide();
						$("#newCharitySummary").html('New Charity Transaction Results <br>'+
										'Charity Name: '+web3.toUtf8(result.args.charityname)+'<br>'+
										'Charity ID: '+ result.args.charityid+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#newCharitySummary").show();				 
					} else {
						$("#spinne5").hide();
						console.log(error);
						$("#newCharitySummary").html('Error : Transaction not commited' );
					}
			});

	}

//======================================================================================================================
// Add New Project 
//====================================================================================================================== 
function AddNewProject(){
	$("#newProjectSummary").html('' );
	$("#spinner6").show();
	$("#newCharitySummary").hide();	
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	var charityid = document.getElementById("CharityID").value;
	var projectname=document.getElementById("ProjectName").value;
	var fundingGoal =document.getElementById("FundingGoal").value;
	var category=document.getElementById("category").value;
	contract.newProject(projectname,charityid, fundingGoal,category, {gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

	//Event
	var NewProjectEvt=contract.NewProjectEvt();
	NewProjectEvt.watch(function(error, result){
				if (!error)
					{
						$("#spinner6").hide();
						$("#newProjectSummary").html('New Project Transaction Results <br>'+
										'Project Name: '+web3.toUtf8(result.args.projectname)+'<br>'+
										'Project ID: '+ result.args.projectid+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#newProjectSummary").show();				 
					} else {
						$("#spinne6").hide();
						console.log(error);
						$("#newProjectSummary").html('Error : Transaction not commited' );
					}
			});
	}

//======================================================================================================================
// Get All Projects 
//======================================================================================================================
function GetAllProjects(){
	var table = document.getElementById("projectTable"),  row,r, col,  c;
	for(var i = 1;i<table.rows.length;)
	{
				table.deleteRow(i);
	}

	// Get total number of project
	var numberProjects=contract.numProjects.call({from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
	for(var i=1;i<=numberProjects;i++){         
		let ID=i;
		var v=contract.projectData.call(ID,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"}) ;
		row = table.insertRow(-1); 
		col= row.insertCell(-1);
		col.innerHTML=v[0].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[1].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[2].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[3].toString();
		col= row.insertCell(-1);
		col.innerHTML=v[4].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[5].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[6].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[7].toString();
		col= row.insertCell(-1);
		col.innerHTML= v[8].toString();
		}
 }

//======================================================================================================================
// Give Impact
//======================================================================================================================
function Impact()
 {
	$("#ImpactSummary").html('' );
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	var id = document.getElementById("ProjectIDImpact").value;
	var projectimpact=document.getElementById("ProjectImpact").value;
	contract.impact(id,projectimpact, {gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
	$("#spinner7").show();
	//Event
	var impactEvt=contract.GiveImpactEvt();
	impactEvt.watch(function(error, result){
				if (!error)
					{
						$("#spinner7").hide();
						$("#ImpactSummary").html('Give Impact Transaction Results <br>'+
										'Project ID: '+ result.args.projectid+'<br>'+
										'Project Impact: '+web3.toUtf8(result.args.impact)+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#ImpactSummary").show();				 
					} else {
						$("#spinner7").hide();
						$("#ImpactSummary").html('Error : Transaction not commited' );
					}
			});

 }     

//======================================================================================================================
// Request Cash 
//======================================================================================================================
function RequestCash() {
  $("#RequstCashSummary").html('');	
  $("#spinner8").show()
  var id = document.getElementById("ProjectIDCash").value;
  web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
  contract.requestCash(id, {gas: 290000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});


  //Event
	var RequestEvt=contract.RequestCashEvt();
	RequestEvt.watch(function(error, result){
				if (!error)
					{
						$("#spinner8").hide();
						$("#RequstCashSummary").html('Request Cash Transaction <br>'+
										'Project ID: '+ result.args.projectid+'<br>'+
										'Stat: '+result.args.flag+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#RequstCashSummary").show();				 
					} else {
						$("#spinner8").hide();
						$("#RequstCashSummary").html('Error : Transaction not commited <br>'+'Stat: '+result.args.flag);
					}
			});

 }
//======================================================================================================================
// Get All Transactions 
//======================================================================================================================
function AllTransaction(){
	$('#transTable >tr').remove();
	var table = document.getElementById("transTable"), row,  r,  col,  c;
	for(var i = 1;i<table.rows.length;)
	{
				table.deleteRow(i);
	}
    var txnumber=contract.numTransactions.call({from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
	for(var i=1;i<=txnumber;i++){ 
		let ID=i;
 		var tx=contract.transactions.call(ID,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
		 
		row = table.insertRow(-1); 
		col= row.insertCell(-1);
		col.innerHTML=tx[0].toString();
		col= row.insertCell(-1);
		col.innerHTML= tx[1].toString();
		col= row.insertCell(-1)
		col.innerHTML= tx[2].toString();
		col= row.insertCell(-1);
		col.innerHTML= tx[3].toString();
		col= row.insertCell(-1);
		col.innerHTML=tm(tx[4]);
		}
 }
function tm(unix_tm) {
    var dt = new Date(unix_tm*1000);
    return(dt);
	}


//======================================================================================================================
// Update Zakat Coins
//======================================================================================================================	
function updateZakaahcoins(){
	$("#spinner11").show();
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
	var amount = document.getElementById("UpdateZakahCoins").value;
	contract.updateZakaahcoins(amount,{gas: 2100000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

	//Event
	var Evt=contract.updatecoins();
	Evt.watch(function(error, result){
				if (!error)
					{
						$("#spinner11").hide();
						$("#UpdateCoinsSummary").html('Update Coins Transaction <br>'+
										'Amount: '+ result.args.amount+'<br>'+
										'State: '+result.args.flag+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#UpdateCoinsSummary").show();				 
					} else {
						$("#spinner11").hide();
						$("#UpdateCoinsSummary").html('Error : Transaction not commited' );
					}
			});

 }

//======================================================================================================================
// Get Charity Information
//======================================================================================================================
function GetCharityinfo()
	{
		$("#charityinfo").html('');
		var id = document.getElementById("chairtyid").value;
		var chairtyinfo=contract.charityData.call(id, {gas: 2000000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
		if (chairtyinfo[0].length!=0)
		{
			$("#charityinfo").html( ' <b>Name</b>: '+chairtyinfo[0]+'<br>'+'<b>Address</b>:'+ chairtyinfo[1]);
		}
		else
			$("#charityinfo").html('Not Found');
	}	

//======================================================================================================================
// Get project Impact
//======================================================================================================================
function GetImpact()
	{
		$("#impacttexoutput").html('');
		var id = document.getElementById("projectid").value;
		var impact=contract.getImpact.call(id, {gas: 2000000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
		var n = impact.length;
		if (n!=0){
		$("#impacttexoutput").html(" The Impact: " + impact.toString());
		}
		else{
		$("#impacttexoutput").html(" Not available");
		} 
	}	

//======================================================================================================================
// Get Charity's projects
//======================================================================================================================
function charityProjects(){
	var id = document.getElementById("projectschairtyid").value;
	$('#charityProjects >tr').remove();
	var table = document.getElementById("charityProjects"), row,r, col,  c;
	for(var i = 1;i<table.rows.length;)
	{
		table.deleteRow(i);
	}
	projectsnum= contract.charityProjects.call(id,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
	 

	for(var i=0;i<=projectsnum.length;i++){         
		let ID=i;
			var v=contract.projectData.call(projectsnum[ID],{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
			row = table.insertRow(-1); 
			col= row.insertCell(-1);
			col.innerHTML=v[0].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[1].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[2].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[3].toString();
			col= row.insertCell(-1);
			col.innerHTML=v[4].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[5].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[6].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[7].toString();
			col= row.insertCell(-1);
			col.innerHTML= v[8].toString();
		}
 }

 
 
//======================================================================================================================
// Get Charity's Request
//======================================================================================================================
function charityRequests()
	{
		var id = document.getElementById("Charityidforrequest").value;
		$("#charityRequeststable tr>td").remove(); 
		var table = document.getElementById("charityRequeststable"),row,r, col,  c;
		for(var i = 1;i<table.rows.length;)
		{
					table.deleteRow(i);
		}
		var reqnum= contract.charityRequests(id,{from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
		if (reqnum.length>=1)
		{
			for(var i=0;i<=reqnum.length;i++){
				let ID=i; 
				var data= contract.Requestdata(reqnum[ID], {from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});
				row=table.insertRow(-1);
				col= row.insertCell(-1);
				col.innerHTML=data[0].toString();

				col= row.insertCell(-1);
				col.innerHTML=data[1].toString();

				col= row.insertCell(-1);
				col.innerHTML=data[2].toString();

				col= row.insertCell(-1);
				col.innerHTML=data[3].toString();

		}



	}
	}

//======================================================================================================================
// Give Approval  
//======================================================================================================================
function RegisterApproval(){
	$("#spinner10").show();
	requestID= $("#requestID").val();
	clear= $("#approvedcheckbox").is(":checked");
	web3.personal.unlockAccount("0x9fc3d36c008acdb4f1aa15046850050478a988a1",'WAZEN123456789');
    contract.giveApproval(requestID,clear, {gas:290000, from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

	//Event
	var Evt=contract.giveApprovalEvt();
	Evt.watch(function(error, result){
				if (!error)
					{
						$("#spinner10").hide();
						$("#Registersummary").html('Give Approval Transactions <br>'+
										'ApproveID: '+ result.args.ApproveID+'<br>'+
										'State: '+result.args.flag+'<br>'+
										'Block Number: '+result.blockNumber+'<br>'+
										'Transaction Hash: '+ result.transactionHash);
						$("#Registersummary").show();				 
					} else {
						$("#spinner10").hide();
						$("#Registersummary").html('Error : Transaction not commited' );
					}
			});

	}

//======================================================================================================================
// Get Approved Projects  
//====================================================================================================================== 
function GetApprovedProjects(){

	var table = document.getElementById("getApprovedprojects"),row,r, col,  c;
	for(var i = 1;i<table.rows.length;)
	{
				table.deleteRow(i);
	}
	var reqNum=contract.numapprovedRequests.call({from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

	for(var i=1;i<=reqNum;i++){
        let ID=i; 
        z=contract.approves.call(ID, {from: "0x9fc3d36c008acdb4f1aa15046850050478a988a1"});

        row=table.insertRow(-1);
        col= row.insertCell(-1);
        col.innerHTML=z[0].toString();

        col= row.insertCell(-1);
        col.innerHTML=z[1].toString();

        col= row.insertCell(-1);
        col.innerHTML=z[2].toString();
        }
	} 
//======================================================================================================================
// Set Blockchain 
//======================================================================================================================
function setBlockchain(){
 //contractAddress='0x366307fce88cb4b51a9f42a7f21ec6ff50eae245';
 contractAddress='0x43a2dae58af26c1ebacb0c2ba7103c76a7fc4117';
 $("#contractaddr").html(contractAddress);
 var abiArray=[
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "approves",
		"outputs": [
			{
				"name": "ApproveID",
				"type": "uint256"
			},
			{
				"name": "requestID",
				"type": "uint256"
			},
			{
				"name": "clear",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "doneraddr",
				"type": "address"
			}
		],
		"name": "newDonor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "zakaahCoins",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "charityID",
				"type": "uint256"
			}
		],
		"name": "charityProjects",
		"outputs": [
			{
				"name": "listProjects",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "projectID",
				"type": "uint256"
			},
			{
				"name": "impact",
				"type": "bytes32"
			}
		],
		"name": "impact",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numCharities",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "updateZakaahcoins",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "donoraddr",
				"type": "address"
			}
		],
		"name": "donorData",
		"outputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "donorID",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "projectID",
				"type": "uint256"
			}
		],
		"name": "requestCash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectID",
				"type": "uint256"
			}
		],
		"name": "transProjects",
		"outputs": [
			{
				"name": "transactionList",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
			}
		],
		"name": "newCharity",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectID",
				"type": "uint256"
			}
		],
		"name": "donorsProjects",
		"outputs": [
			{
				"name": "listDonors",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numapprovedRequests",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numProjects",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "donoraddr",
				"type": "address"
			}
		],
		"name": "donorTrans",
		"outputs": [
			{
				"name": "transactionID",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "charityID",
				"type": "uint256"
			}
		],
		"name": "charityRequests",
		"outputs": [
			{
				"name": "requests",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "requestID",
				"type": "uint256"
			}
		],
		"name": "exchangeCoins",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "requestID",
				"type": "uint256"
			},
			{
				"name": "clear",
				"type": "bool"
			}
		],
		"name": "giveApproval",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectID",
				"type": "uint256"
			}
		],
		"name": "projectData",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "charityID",
				"type": "uint256"
			},
			{
				"name": "fundingGoal",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "cash",
				"type": "uint256"
			},
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "category",
				"type": "string"
			},
			{
				"name": "impact",
				"type": "string"
			},
			{
				"name": "pID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "requestID",
				"type": "uint256"
			}
		],
		"name": "Requestdata",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "projectid",
				"type": "uint256"
			},
			{
				"name": "requstcash",
				"type": "uint256"
			},
			{
				"name": "charityid",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numDonors",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numTransactions",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "x",
				"type": "bytes32"
			}
		],
		"name": "bytes32ToString",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "donoraddr",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyCoins",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactions",
		"outputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "receiverID",
				"type": "uint256"
			},
			{
				"name": "ID",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numRequests",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "charityID",
				"type": "uint256"
			},
			{
				"name": "goal",
				"type": "uint256"
			},
			{
				"name": "categoryID",
				"type": "uint256"
			}
		],
		"name": "newProject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "donoraddr",
				"type": "address"
			}
		],
		"name": "Donorviewr",
		"outputs": [
			{
				"name": "viwers",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getApproved",
		"outputs": [
			{
				"name": "approveRequests",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "donoraddress",
				"type": "address"
			},
			{
				"name": "projectID",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "donate",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "charityID",
				"type": "uint256"
			}
		],
		"name": "charityData",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "ID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectID",
				"type": "uint256"
			}
		],
		"name": "getImpact",
		"outputs": [
			{
				"name": "impact",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "categoryID",
				"type": "uint256"
			}
		],
		"name": "getCategory",
		"outputs": [
			{
				"name": "category",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "username",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "donorID",
				"type": "uint256"
			}
		],
		"name": "DonorEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "donoraddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BuyZakatEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "fromaddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "projectid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "c",
				"type": "uint256"
			}
		],
		"name": "DonationEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "done",
				"type": "bool"
			}
		],
		"name": "Contribute",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "charityname",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "charityid",
				"type": "uint256"
			}
		],
		"name": "NewCharityEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "projectname",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "NewProjectEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "impact",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "GiveImpactEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "flag",
				"type": "bool"
			}
		],
		"name": "updatecoins",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "requestID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "flag",
				"type": "bool"
			}
		],
		"name": "exchangecoinsEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ApproveID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "flag",
				"type": "bool"
			}
		],
		"name": "giveApprovalEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "flag",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "RequestCashEvt",
		"type": "event"
	}
];
 contract = web3.eth.contract(abiArray).at(contractAddress);
}


 
