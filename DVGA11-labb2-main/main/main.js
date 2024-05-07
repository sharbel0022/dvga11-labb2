'use strict'

// jquery glöm inte document ready , dålig programmering
 $(document).ready(()=>{


    // bordskartan objekt
    let TableMap = 
    {
        tables: [
            
            {
                'id': '01', 
                'name' : 'table-01', 
                'partCount': 6,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },

           {
                'id': '02', 
                'name' : 'table-02', 
                'partCount': 6,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },
            
            
            {
                'id': '03', 
                'name' : 'table-03', 
                'partCount': 2,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },

            {
                'id': '04', 
                'name' : 'table-04', 
                'partCount': 4,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },

            {
                'id': '05', 
                'name' : 'table-05', 
                'partCount': 4,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            }, 

            {
                'id': '06', 
                'name' : 'table-06', 
                'partCount': 4,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            }, 

            {
                'id': '07', 
                'name' : 'table-07', 
                'partCount': 4,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },
            
            {
                'id': '08', 
                'name' : 'table-08', 
                'partCount': 6,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },

            {
                'id': '09', 
                'name' : 'table-09', 
                'partCount': 8,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },

            {
                'id': '10', 
                'name' : 'table-10', 
                'partCount': 2,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },
            
            {
                'id': '11', 
                'name' : 'table-11', 
                'partCount': 2,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            }, 
            
            {
                'id': '12', 
                'name' : 'table-12', 
                'partCount': 2,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            },
            
            {
                'id': '13', 
                'name' : 'table-13', 
                'partCount': 4,
                'available' : true,
                'guestName' : '',
                'guestCount' : ''
            }, 
        ]
    }

    // 
    var Model = {
        waitingList: Array(),
    
        init: function(){
            Controller.command('drawMap', TableMap.tables)
            //console.log(TableMap.tables[0])
        },  

        // bookTable : function(data){
        //     this.currentBookings.push(data)
        //     Controller.command('reserveTables', this.currentBookings)
        // },
        
        // bookTable: function(){
        //     Controller.command('openTable', TableMap.tables)
        // }, 

        removeTable: function(){
            console.log('remove table')
        },     
    }
    
    // View 
    var View = {

        init: function(){
            console.log('init function started')
           
            //boka alla bord
            // $.each(TableMap.tables, function(key, value) {
            //     value.available = false
            //     if(!value.available) {
            //         setTimeout(()=> {
            //             $('#table-' + value.id + ' > div').css('background', '#DC4C64')
            //         }, 1000);
            //     }
            // })

            // lägg in buttons och allt som redan finns i DOM-en kolla alexander kod
        },


        // ritar kartan,  behövs dessa vara i separata funktioner? här ritas bordskartan
        drawMap: function(data){
            
            let kitchen = $('<div></div>', {class: 'kitchen'});
            let bar = $('<div></div>', {class: 'bar'});

            $.each(data, function(key, value){
                let tableHolder = document.createElement('div');
                $('.grid-container').append(kitchen, bar, tableHolder)

                tableHolder.setAttribute('id', 'table-' + value.id);
                tableHolder.setAttribute('class', 'table table-for-' + value.partCount);
                
                View.drawTables(tableHolder, value.partCount);
            })
            
            View.openTable(data);
        },
        // Borden byggs ihop
        drawTables: function(tableH, partC){
            
            let left = document.createElement('div');
            let center = document.createElement('div');
            let centerForEight = document.createElement('div');
            let right = document.createElement('div');
            
            left.setAttribute('class', 'table-part left');
            right.setAttribute('class', 'table-part right');
            center.setAttribute('class', 'table-part center');
            centerForEight.setAttribute('class', 'table-part center');
            
            partC === 2 ? tableH.append(center): 0;
            partC === 4 ? tableH.append(left, right) : 0;
            partC === 6 ? tableH.append(left, center, right) : 0;
            partC === 8 ? tableH.append(left, center, centerForEight, right) : 0;

        },
        
        createBookingForm : function(val, mc, bfr){

            let formRef;
            let counter;
            let tableNumberRef = $('<div></div>', {class: 'form-table-number'}).html('<span>Bord: ' + val.id + '</span><span>Max ' + val.partCount + ' personer</span>');
            let closeBtn = $('<div></div>', {class: 'close-btn'}).html('&#10005;')
            let bookingList = $('.current-res');
            let inputFieldLabel = $('<label></label>', {for: 'guest-name'}).text('Ange gästens namn:')
            let nameInputField = $('<input>', {type: 'text', id:'guest-name', name: 'guestName', value: '', required: ''})
            let countFieldLabel = $('<label></label>', {for: 'guest-count'}).text('Ange antal personer:')
            let guestCountField = $('<input>', {type: 'number', id:'guest-count', name: 'guestCount', min: '1', max: '', required: ''})
            let submitButton = $('<button></button>', {type: 'submit', class:'submit-btn'}).text('Reservera bord')       
            
            
            formRef=  $('<form></form>', {class: 'form'}).appendTo(bfr)
            formRef.append(closeBtn, tableNumberRef, inputFieldLabel, nameInputField, countFieldLabel, guestCountField, submitButton)
            document.getElementById('guest-name').focus();

            
            const getCountField = document.getElementById("guest-count")  

            
            switch(val.partCount) {
                case 2:                 
                getCountField.setAttribute('max', '2') 
                break
                case 4:                 
                getCountField.setAttribute('max', '4')
                break
                case 6:                 
                getCountField.setAttribute('max', '6')
                break
                case 8:                 
                getCountField.setAttribute('max', '8')

                break
            }

            //  close form ska den in i Model?
            closeBtn.on('click', function(){
                mc.first().fadeOut(100);
                bfr.first().fadeOut(100);
                formRef.remove();
                val.available = true;
            })

            // Boka bord, lägg info i sidofältet, ska den anropas i Model?
            formRef.on('submit', function (e){
                //no refresh, remove blocking div, counter
                e.preventDefault();
                
                // counter for availability
                counter = Number($('.header-counter-occupied').text());
                counter++;
                View.tableCounter(counter);

                // färga borden
                $('#table-' + val.id + ' > div').css('background', '#DC4C64');  

                // ta emot det som är i input value och lägga in det in TablesMap array under guest name
                let guestNameFormInput = document.getElementById('guest-name').value;
                let guestCountFormInput = document.getElementById('guest-count').value;
                val.guestName = guestNameFormInput;
                val.guestCount = guestCountFormInput;
                let removeTableBtn = $('<div></div>', {class: 'remove-table-btn'}).html('Ta bort')

                // bygg elementerna i sidofältet, hållare för bokningen
                let reservationField = $('<div></div>', {class: 'reservation-field', id: val.id})
                let tableIdField =  $('<div></div>', {class: 'table-number'})
                let guestNameField = $('<div></div>', {class: 'guest-name'})
                let guestCountField = $('<div></div>', {class: 'guest-count'})
                
                // lägg alla element i dom
                bookingList.after(reservationField)
                reservationField.append(tableIdField, guestNameField, guestCountField, removeTableBtn)
                guestNameField.html(val.guestName)
                guestCountField.html('Antal personer: ' + val.guestCount)
                tableIdField.html(val.id)
                
                // knappen för att ta bort bordet i sidofältet// ska den anropas i Model?
                removeTableBtn.on('click', function(){
                    console.log(val.available)
                    counter = Number($('.header-counter-occupied').text());
                    counter--;
                    View.tableCounter(counter);
                    
                    if(tableIdField.html() === val.id) {
                        $.when(reservationField.fadeOut(400)).done(function(){this.remove()});
                        val.guestName = '';
                        val.available = true; 
                        console.log(val.available)
                        $('#table-' + val.id + ' > div').css('background', '#54b4d3');
                    }
                })
                
                // animation och borttagning av formuläret, counter function
                mc.first().fadeOut(100);
                bfr.first().fadeOut(100);
                formRef.remove();
            })

        },
        CreateKöList : function(val, mc, bfr){

            let formRef;
            let counter;
            let tableNumberRef = $('<div></div>', {class: 'form-table-number'}).html('<span>Bord: ' + val.id + '</span><span>Max ' + val.partCount + ' personer</span>');
            let closeBtn = $('<div></div>', {class: 'close-btn'}).html('&#10005;')
            let pending = $('.pending-res');
            let inputFieldLabel = $('<label></label>', {for: 'guest-name'}).text('Ange gästens namn:')
            let nameInputField = $('<input>', {type: 'text', id:'guest-name', name: 'guestName', value: '', required: ''})
            let countFieldLabel = $('<label></label>', {for: 'guest-count'}).text('Ange antal personer:')
            let guestCountField = $('<input>', {type: 'number', id:'guest-count', name: 'guestCount', min: '1', max: '', required: ''})
            let submitButton = $('<button></button>', {type: 'submit', class:'submit-btn-kö'}).text('lägg i kölist')       
            
            
            formRef=  $('<form></form>', {class: 'form'}).appendTo(bfr)
            formRef.append(closeBtn, tableNumberRef, inputFieldLabel, nameInputField, countFieldLabel, guestCountField, submitButton)
            document.getElementById('guest-name').focus();

            
            const getCountField = document.getElementById("guest-count")  

            
            switch(val.partCount) {
                case 2:                 
                getCountField.setAttribute('max', '2') 
                break
                case 4:                 
                getCountField.setAttribute('max', '4')
                break
                case 6:                 
                getCountField.setAttribute('max', '6')
                break
                case 8:                 
                getCountField.setAttribute('max', '8')

                break
            }

            //  close form ska den in i Model?
            closeBtn.on('click', function(){
                mc.first().fadeOut(100);
                bfr.first().fadeOut(100);
                formRef.remove();
                val.available = true;
            })

            // Boka bord, lägg info i sidofältet, ska den anropas i Model?
            formRef.on('submit', function (e){
                //no refresh, remove blocking div, counter
                e.preventDefault();
                
                // counter for availability
                counter = Number($('.header-counter-occupied').text());
                counter++;
                View.tableCounter(counter);

                // färga borden
                $('#table-' + val.id + ' > div').css('background', '#DC4C64');  

                // ta emot det som är i input value och lägga in det in TablesMap array under guest name
                let guestNameFormInput = document.getElementById('guest-name').value;
                let guestCountFormInput = document.getElementById('guest-count').value;
                val.guestName = guestNameFormInput;
                val.guestCount = guestCountFormInput;
                let removeTableBtn = $('<div></div>', {class: 'remove-table-btn'}).html('Ta bort')

                // bygg elementerna i sidofältet, hållare för bokningen
                let reservationField = $('<div></div>', {class: 'reservation-field', id: val.id})
                let tableIdField =  $('<div></div>', {class: 'table-number'})
                let guestNameField = $('<div></div>', {class: 'guest-name'})
                let guestCountField = $('<div></div>', {class: 'guest-count'})
                
                // lägg alla element i dom
                pending.after(reservationField)
                reservationField.append(tableIdField, guestNameField, guestCountField, removeTableBtn)
                guestNameField.html(val.guestName)
                guestCountField.html('Antal personer: ' + val.guestCount)
                tableIdField.html(val.id)
                
                // knappen för att ta bort bordet i sidofältet// ska den anropas i Model?
                removeTableBtn.on('click', function(){
                    console.log(val.available)
                    counter = Number($('.header-counter-occupied').text());
                    counter--;
                    View.tableCounter(counter);
                    
                    if(tableIdField.html() === val.id) {
                        $.when(reservationField.fadeOut(400)).done(function(){this.remove()});
                        val.guestName = '';
                        val.available = true; 
                        console.log(val.available)
                        $('#table-' + val.id + ' > div').css('background', '#54b4d3');
                    }
                })
                
                // animation och borttagning av formuläret, counter function
                mc.first().fadeOut(100);
                bfr.first().fadeOut(100);
                formRef.remove();
            })

        },

        createBookingInfo : function(val, mc, bfr){
            
            let infoRef = $('<div></div>', {class: 'info-ruta'});
            let tableNumberRef = $('<span></span>', {class: 'form-table-number'}).html('Bord ' + val.id);
            let closeBtn = $('<div></div>', {class: 'close-btn'}).html('&#10005;')
            let guestInfo = $('<span></span>', {class: 'guest-info'}).html(val.guestName);
            let guestCount = $('<span></span>', {class: 'guest-count-info'}).html(val.guestCount + ' personer');
            let removeResBtn = $('<div></div>', {class:'remove-res-btn'}).text('Ta bort reservationen')
            let divIdSearch = document.getElementById(val.id)
            let brakeRow = $('<br>')
            let counter;
            
            infoRef.appendTo(bfr)
            infoRef.append(closeBtn, tableNumberRef, guestInfo, brakeRow,  guestCount, removeResBtn)

            //  close form ska den anropas i Model?
            closeBtn.on('click', function(){
                mc.first().fadeOut(100);
                bfr.first().fadeOut(100);
                val.available = false; 
                infoRef.remove();
            })
            // knappen för att ta bort bordet i sidofältet// ska den anropas i Model?
            removeResBtn.on('click', function(){
                if (val.available == true) {
                    counter = Number($('.header-counter-occupied').text());
                    counter--;
                    View.tableCounter(counter);
                }
                divIdSearch.remove();
                val.guestName = '';
                $('#table-' + val.id + ' > div').css('background', '#54b4d3');  
                mc.first().fadeOut(100);
                bfr.first().fadeOut(100);
                infoRef.remove();
                val.available = true; 
            })

        },

        tableCounter: function (counterOcc) {
            let counterOccupied = counterOcc;
            let counterAvailable = 13 - counterOccupied;
            let headerCounterAvailable = $(".header-counter-available");
            let headerCounterOccupied = $(".header-counter-occupied");
            let headerCounterWaitList = $(".header-counter-waitList");
      
      
            headerCounterOccupied.text(counterOccupied);
            headerCounterAvailable.text(counterAvailable);
            headerCounterWaitList.text(counterOccupied);
          },

        openTable : function(data){
            
            let bookingFormRef = $('.booking-form')
            let mapCover = $('<div></div>', {class: 'map-cover'})
            mapCover.appendTo('.row');
            
            $.each(data, function(key, val){
                
                $('#table-' + val.id).on('click', function(e){   
                    mapCover.first().fadeIn(100);
                    if(val.available){
                        bookingFormRef.first().fadeIn(100);
                        View.createBookingForm(val, mapCover, bookingFormRef)
                       
                        val.available = false;
                    } else {
                        bookingFormRef.first().fadeIn(100);
                        
                        View.CreateKöList(val, mapCover, bookingFormRef)
                        val.available = true;
                    }

                    const ages = [32, 33, 16, 40];

                    ages.every(checkAge)

                    function checkAge(age) {
                    console.log(age > 18)
                    }

                })
            })
        } 
    }

    //Controller | koppla ihop model och view, initiera funktioner
    var Controller = {
        
        init: function(){
            Model.init();
            View.init();
        },
        // initiera funktioner här, command, styrning   
        // command tar emot parametrar c och data 
        // Parametrar skickas med som argument (data) som exekveras i Model, View
        command: function(c, data = null){
            if(c == 'drawMap'){
                View.drawMap(data);
            }
            // else if(c == 'bookTable'){
            //     Model.bookTable(data);
            // } 
        },
        
        
        
        // Funktion för att boka ett bord och uppdatera kölistan
        bookTable: function(tableId) {
    
            let table = TableMap.tables.find(table => table.id === tableId);

            if (table && table.available) {
        
                table.available = false;
        
                View.createBookingForm(table);

                this.updatePendingList();
            }
        },


        removeBooking: function(tableId) {
    
            let table = TableMap.tables.find(table => table.id === tableId);

            if (table && !table.available) {
    
                table.available = true;
        
                View.removeBookingInfo(tableId);
            
                this.updatePendingList();
            }
        },

        // Funktion för att uppdatera kölistan
        updatePendingList: function() {
            let pendingList = $('.pending-res');

            // Rensa befintlig kölista
            pendingList.empty();

            // Loopa igenom alla bord för att hitta de som är upptagna
            TableMap.tables.forEach(table => {
                if (!table.available) {
                    // Lägg till bordet i kölistan
                    $('<li></li>', { text: 'Bord ' + table.id }).appendTo(pendingList);
                }
            });
        }
        }
        
    Controller.init();


//tidfunktion

    function uppdateraTid() {
        // Skapa ett nytt Date-objekt för aktuell tid
        var nu = new Date();

        // Arrayer för att konvertera månads- och veckodagsindex till textrepresentationer
        var veckodagar = ['sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör'];
        var månader = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

        // Hämta veckodag, dag och månad
        var veckodagIndex = nu.getDay();
        var dag = nu.getDate();
        var månadIndex = nu.getMonth();

        // Konvertera indexen till textrepresentationer
        var veckodag = veckodagar[veckodagIndex];
        var månad = månader[månadIndex];

        // Hämta tid i timmar och minuter
        var timmar = nu.getHours();
        var minuter = nu.getMinutes();

        // Formatera tid i 12-timmarsformat med ledande nollar
        var tid = (timmar < 10 ? '0' : '') + timmar + ':' + (minuter < 10 ? '0' : '') + minuter;

        // Skapa den önskade texten för datum och tid
        var text = veckodag + ' ' + dag + ' ' + månad + ', ' + tid;

        document.getElementById("tid").textContent = text;
    }

    // anropa funktionen
    setInterval(uppdateraTid,1000);
});
