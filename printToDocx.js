/* global $, document */

var valuesToSave = [];

function getValuesToSave(){
    valuesToSave.push();
}

function printToDocx(){
    /* data formatting */
    var startDate = new Date($('#startTime').val());
    var startDay = startDate.getDate();
    var startMonth = startDate.getMonth() + 1;
    var startYear = startDate.getFullYear();
    var endDate = new Date($('#endTime').val());
    var endDay = endDate.getDate();
    var endMonth = endDate.getMonth() + 1;
    var endYear = endDate.getFullYear();
    var todayDate = new Date();
    var todayMonth = todayDate.getMonth();
    var todayDay = todayDate.getDate();
    var todayYear = todayDate.getFullYear();
    var name = document.getElementById("name").value;
    var supervisor = document.getElementById("supervisor").value;
    var description = document.getElementById("description").value;
    var phone = document.getElementById("phone").value;
    var visitors =[];
    $(".people").each(function(index, element){
        visitors.push(element.value);
    });

/* Moderacja zmiennych skryptu */
    if(todayDay<10){
        todayDay='0'+todayDay;
    }
    if(todayMonth<10){
        todayMonth='0'+todayMonth;
    }
    if(startDay<10){
        startDay='0'+startDay;
    }
    if(endDay<10){
        endDay='0'+endDay;
    }
    if(startMonth<10){
        startMonth='0'+startMonth;
    }
    if(startMonth<10){
        endMonth='0'+endMonth;
    }

    var currentDate = todayDay+'.'+todayMonth+'.'+todayYear;
    var shortDateFrom = startDay+'.'+startMonth;
    var shortDateTo = endDay+'.'+endMonth;
    var company = name;
    var woodwardName = supervisor;
    var dateFrom = startDay+'-'+startMonth+'-'+startYear;
    var dateTo = endDay+'-'+endMonth+'-'+endYear;
    var fields = "";

    if ($("#area_1").is(':checked')){
        fields += ' • Produkcja hala B<w:br/>'; 
    }
    if ($("#area_2").is(':checked')){
        fields += ' • Produkcja hala B1<w:br/>'; 
    }
    if ($("#area_3").is(':checked')){
        fields += ' • Open space budynek A I piętro<w:br/>'; 
    }
    if ($("#area_4").is(':checked')){
        fields += ' • Open space budynek A parter<w:br/>'; 
    }
    if ($("#area_5").is(':checked')){
        fields += ' • Open space budynek A1 I piętro<w:br/>'; 
    }
    if ($("#area_6").is(':checked')){
        fields += ' • Open space budynek A1 parter<w:br/>'; 
    }
    if ($("#area_7").is(':checked')){
        fields += ' • Open space budynek B1 antresola<w:br/>'; 
    }

    /*Koordynator i skład zespołu */
    var coordinatorName = document.getElementById("coordinator").value;
    var people = "";

    var personIndex = 1;
    for(var a=0; a<visitors.length; a++){
        if(visitors[a]===""){
            continue;
        }
        else {
            people += personIndex+'. '+ visitors[a]+'<w:br/>';
            personIndex=personIndex+1;
        }
    }
    
    var risks = "";
    var specific = "";
    
    if ($("#question_1").is(':checked')){
    risks += ' • Ryzyko poparzenia części ciała - stosować ubranie ochronne, ryzyko wpadnięcia ciała obcego do oka - stosować okulary ochronne, ryzyko zaprószenia ognia - zaopatrzyć stanowisko pracy w gaśnicę i koc gaśniczy.<w:br/>'; 
}
if ($("#question_2").is(':checked')){
    risks += ' • Ryzyko upadku z wysokości - stosować środki ochrony przed upadkiem.<w:br/>'; 
}
if ($("#question_2").is(':checked')){
    risks += ' • Ryzyko upadku z wysokości - stosować środki ochrony przed upadkiem.<w:br/>'; 
}
if ($("#question_3").is(':checked')){
    risks += ' • Ryzyko interakcji z osobami postronnymi – wygrodzić i zabezpieczyć obszar wykonywanych prac.<w:br/>'; 
}
if ($("#question_4").is(':checked')){
    risks += ' • Ryzyko upadku materiałów z regałów wysokiego składowania – stosować hełm ochronny i kamizelkę odblaskową.<w:br/>'; 
}
if ($("#question_5").is(':checked')){
    risks += ' • Ryzyko związane z używaniem środków chemicznych – zapoznać pracowników z kartą charakterystyki środka chemicznego, stosować w odpowiednio oznakowanych opakowaniach, stosować odpowiednie środki ochrony indywidualnej. <w:br/>'; 
}
if ($("#question_6").is(':checked')){
    risks += ' • Stosować obuwie ochronne i kamizelki odblaskowe.<w:br/>'; 
}

if ($("#question_1").is(':checked')){
    specific += ' • Przed rozpoczęciem pracy należy otrzymać pozwolenie na prace pożarowo niebezpieczne (kontakt w dziale BHP).<w:br/> • Podczas prac pożarowo niebezpiecznych wyposażyć stanowisko w gaśnicę oraz koc gaśniczy<w:br/>'; 
}
if ($("#question_2").is(':checked')){
    specific += ' • Stosować właściwy sprzęt ochrony przed upadkiem<w:br/>'; 
}
if ($("#question_3").is(':checked')){
    specific += ' • Przed rozpoczęciem wygrodzić teren prac remontowo budowlanych i zabezpieczyć przed dostępem osób niepowołanych<w:br/>'; 
}
if ($("#question_4").is(':checked')){
    specific += ' • Na magazynie wysokiego składowania należy stosować hełmy ochronne<w:br/>'; 
}
if ($("#question_5").is(':checked')){
    specific += ' • Przed rozpoczęciem pracy dostarczyć karty charakterystyk stosowanych środków chemicznych (farby, lakiery etc.) do działu BHP.<w:br/>'; 
}
if ($("#question_6").is(':checked')){
    specific += ' • Podczas pracy na terenie produkcji należy stosować obuwie bezpieczne i kamizelki ochronne<w:br/>'; 
}
if ($("#question_7").is(':checked')){
    specific += ' • Odpady powstałe w wyniku pracy należy zabrać ze sobą i zutylizować we własnym zakresie, jeśli nie uzgodniono inaczej<w:br/>'; 
}
if ($("#question_8").is(':checked')){
    specific += ' • Przed odłączeniem mediów należy powiadomić właściciela obszaru<w:br/>'; 
}
    /* end data formatting */
    
    /* global JSZip, Docxtemplater, saveAs, JSZipUtils */
    loadFile("template.docx",function(perror,content){
        if (perror) { throw perror; }
        var zip = new JSZip(content);
        var doc=new Docxtemplater().loadZip(zip);
        doc.setData({
            currentDate: currentDate,
            shortDateFrom: shortDateFrom,
            shortDateTo: shortDateTo,
            company: company,
            woodwardName: woodwardName,
            phone: phone,
            dateFrom: dateFrom,
            dateTo: dateTo,
            description: description,
            fields: fields,
            coordinatorName: coordinatorName,
            people: people,
            risks: risks,
            specific: specific
        });

        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        }
        catch (perror) {
            var e = {
                message: perror.message,
                name: perror.name,
                stack: perror.stack,
                properties: perror.properties
            };
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw perror;
        }

        var out=doc.getZip().generate({
            type:"blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }); //Output the document using Data-URI
        saveAs(out,"output.docx");
    });
}

$().ready(function(){
    $(document).on("click",'#printButton',function(){
        printToDocx();
    });
});

function loadFile(url,callback){
    JSZipUtils.getBinaryContent(url,callback);
}
    
