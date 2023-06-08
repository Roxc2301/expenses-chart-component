var xmlhttp = new XMLHttpRequest();
var url = "data.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        const totalMonth = document.getElementById('total-month');
        //Values of total month + % from last month
        var data = JSON.parse(this.responseText);
        day = data.map(function (elem){
            return elem.day;
        });
        amount = data.map(function (elem){
            return elem.amount;
        });
        // console.log(amount);
        totalMonth.textContent = "$" +amount.reduce((x, y) => x + y); //The sum of spent on the last 7 days
        const ctx = document.getElementById('canvas');
        //Chart element.
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: day,
                datasets: [{
                    data: amount,
                    backgroundColor: 'hsl(10, 79%, 65%)',
                    borderColor: 'hsl(10, 79%, 65%)',
                    borderWidth: 0,
                    borderRadius: 5,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    //This is to change the tooltip just to show $+amount[i]
                    tooltip: {
                        callbacks: {
                            title: function(context){
                            return '';
                           },
                           label: function(context){return '';},
                        
                           afterLabel: function(context){
                            var datasetLabel = '$' + context.dataset.data[context.dataIndex];
                            return datasetLabel;
                           },                          
                        },
                    }            
                },             
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            padding: 10,
                            color: 'gray'
                        }
                    },

                    y: {
                        display: false
                    },           
                },
            }
        });
    }
};
