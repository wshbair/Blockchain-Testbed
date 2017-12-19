var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractAddress='0x6d61f68f4920ffe0b03afc106460d2614a302d2a';
var abiArray=[{"constant":false,"inputs":[{"name":"clientaddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"TailAuthorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"}],"name":"GetClientInfoByAddress","outputs":[{"name":"_FirstName","type":"bytes32"},{"name":"_LastName","type":"bytes32"},{"name":"_BirthDate","type":"bytes32"},{"name":"_BirthPlace","type":"bytes32"},{"name":"_CivilCtatus","type":"bytes32"},{"name":"_PassportNumber","type":"uint256"},{"name":"_ExpirationDate","type":"bytes32"},{"name":"_IssueDate","type":"bytes32"},{"name":"_Country","type":"bytes32"},{"name":"link","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"GetClientInfoPart4","outputs":[{"name":"TransactionFrequency","type":"bytes32"},{"name":"AdditionalInfo","type":"bytes32"},{"name":"FundResource","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"GetClientInfoPart1","outputs":[{"name":"_FirstName","type":"bytes32"},{"name":"_LastName","type":"bytes32"},{"name":"_BirthDate","type":"bytes32"},{"name":"_BirthPlace","type":"bytes32"},{"name":"_CivilCtatus","type":"bytes32"},{"name":"_PassportNumber","type":"uint256"},{"name":"_ExpirationDate","type":"bytes32"},{"name":"_IssueDate","type":"bytes32"},{"name":"_Country","type":"bytes32"},{"name":"link","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"GetClientInfoPart2","outputs":[{"name":"Facta","type":"bool"},{"name":"ResidenceInUS","type":"bool"},{"name":"IsPEP","type":"bool"},{"name":"RelativeToPEP","type":"bool"},{"name":"PostalAddress","type":"bytes32"},{"name":"PhoneNumCountry","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"clientaddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"GiveAuthorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"}],"name":"GetTransaction","outputs":[{"name":"TransactionFrequency","type":"bytes32"},{"name":"AdditionalInfo","type":"bytes32"},{"name":"FundResource","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ClientAddress","type":"address"},{"name":"_TransactionFrequency","type":"bytes32"},{"name":"_AdditionalInfo","type":"bytes32"},{"name":"_FundResource","type":"bytes32"}],"name":"SetTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ClientAddress","type":"address"},{"name":"_Facta","type":"bool"},{"name":"_ResidenceInUS","type":"bool"},{"name":"_IsPEP","type":"bool"},{"name":"_RelativeToPEP","type":"bool"},{"name":"_PostalAddress","type":"bytes32"},{"name":"_PhoneNumCountry","type":"bytes32"}],"name":"SetResidence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"}],"name":"isClient","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"}],"name":"GetResidanceinfo","outputs":[{"name":"Facta","type":"bool"},{"name":"ResidenceInUS","type":"bool"},{"name":"IsPEP","type":"bool"},{"name":"RelativeToPEP","type":"bool"},{"name":"PostalAddress","type":"bytes32"},{"name":"PhoneNumCountry","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientaddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"IsAuthorized","outputs":[{"name":"result","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"},{"name":"bankaddress","type":"address"}],"name":"GetClientInfoPart3","outputs":[{"name":"CountryOfResidence","type":"bytes32"},{"name":"LinkToLuxembourg","type":"bytes32"},{"name":"DecisionJustification","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"clientAddress","type":"address"}],"name":"GetKYC","outputs":[{"name":"CountryOfResidence","type":"bytes32"},{"name":"LinkToLuxembourg","type":"bytes32"},{"name":"DecisionJustification","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ClientAddress","type":"address"},{"name":"_FirstName","type":"bytes32"},{"name":"_LastName","type":"bytes32"},{"name":"_BirthDate","type":"bytes32"},{"name":"_BirthPlace","type":"bytes32"},{"name":"_CivilCtatus","type":"bytes32"},{"name":"_PassportNumber","type":"uint256"},{"name":"_ExpirationDate","type":"bytes32"},{"name":"_IssueDate","type":"bytes32"},{"name":"_Country","type":"bytes32"},{"name":"link","type":"string"}],"name":"newClient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"s","type":"string"}],"name":"stringToBytes","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ClientAddress","type":"address"},{"name":"_CountryOfResidence","type":"bytes32"},{"name":"_LinkToLuxembourg","type":"bytes32"},{"name":"_DecisionJustification","type":"bytes32"}],"name":"SetKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ClientAddress","type":"address"},{"indexed":false,"name":"_FirstName","type":"bytes32"},{"indexed":false,"name":"_LastName","type":"bytes32"},{"indexed":false,"name":"index","type":"uint256"}],"name":"LOGNewClient","type":"event"}];
var contract = web3.eth.contract(abiArray).at(contractAddress);
clientaddresses = new Array();
delays = new Array();
var clientnumber=50;

function PerformanceTest()
{
    console.log("Test Start");
    var p = poissonProcess.create(40000, function NewClient(){
    delays.push(new Date().getTime() / 1000);     
    var FirstName='test';
    var LastName='test';
    var BirthDate='test';
    var BirthPlace='test';
    var CivilCtatus='test';
    var PassportNumber='123';
    var ExpirationDate='test';
    var IssueDate='test';
    var Country='test';
    var link='test';
    var Facta=true;
    var ResidenceInUS=true;
    var IsPEP=true;  
    var RelativeToPEP=true;   
    var PostalAddress='test';
    var PhoneNumCountry='test';
    var CountryOfResidence='test';
    var LinkToLuxembourg='test';
    var DecisionJustification='test';
    var Frequency='test';
    var addtional='test';
    var funds='test';
    //================================================
    // Blockchain Transactions
    //================================================
    let ClientAddress = web3.personal.newAccount('LUXKYC');
    clientaddresses.push(ClientAddress);
    var counter=web3.eth.accounts.length;
    web3.personal.unlockAccount(web3.eth.accounts[0],'WAZEN123456789');

    var txhash1= contract.newClient(web3.eth.accounts[counter-1],FirstName,LastName,BirthDate,BirthPlace,CivilCtatus,PassportNumber,ExpirationDate,IssueDate,Country,link, {gas: 2100000, from: web3.eth.accounts[0]});
    var txhash2= contract.SetResidence(web3.eth.accounts[counter-1],Facta,ResidenceInUS,IsPEP,RelativeToPEP,PostalAddress,PhoneNumCountry,{gas: 2100000, from: web3.eth.accounts[0]});
    var txhash3=contract.SetKYC(web3.eth.accounts[counter-1],CountryOfResidence,LinkToLuxembourg,DecisionJustification,{gas: 2100000, from: web3.eth.accounts[0]});
    var txhash4=contract.SetTransaction(web3.eth.accounts[counter-1],Frequency,addtional,funds,{gas: 2100000, from: web3.eth.accounts[0]});

    console.log('New Client sent : '+ clientaddresses)
   
    
    if(clientaddresses.length==clientnumber)
    {
        p.stop();
        console.log('stoped');
        var timer=setInterval(function() {
        var conter=0; 
		for (var i=0; i<clientaddresses.length;i++)
           {
               var resul=CheckRegistationStatus(clientaddresses[i]);
               if(resul)
               {
                   conter++;
               }
           }
           console.log('Counter value '+conter);
           if (conter==clientnumber)
                {
                    var output='';
                    for (i=0;i<clientaddresses.length;i++)
                        console.log(delays[i]);
                         
                    clearInterval(timer);	
                }
    },3000);    
    }

    });
     p.start();

}
//===============================================================================
// Check Registration Status
//===============================================================================
 
function CheckRegistationStatus(clientaddress) {

		 var clientinfo=contract.GetClientInfoByAddress.call(clientaddress, {gas: 2000000, from: web3.eth.accounts[0]});

		if(web3.toUtf8(clientinfo[1].toString()).length>2)
		 {
             return true;
		 }
         else
         return false;
		
	}


