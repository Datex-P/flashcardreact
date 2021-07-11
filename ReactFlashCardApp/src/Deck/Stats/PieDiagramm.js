import React, {useEffect, useRef, useContext} from 'react'
import Chart from "chart.js";
import {Context} from '../../Context'

export default function ChartComp() {

  const { dataBase} = useContext(Context);
  let ctx = useRef(null)




 var config = {
  type: 'doughnut',
  data: {
    labels: [
      // "Red",
      // "Green",
      // "Yellow"
    ],
    datasets: [{
      data: [
        //  300, 50, 100
      ],
      backgroundColor: [
        //  "#FF6384",
        // "#36A2EB",
        // "#FFCE56"
      ],
      borderColor: [
        //  'rgba(184, 156, 110, 0.95)',
        // 'rgba(184, 156, 110, 0.95)',
        // 'rgba(184, 156, 110, 0.95)'
      ],
       borderWidth: 0,
      hoverBackgroundColor: [
      //  "#FF6384",
        // "#36A2EB",
        // "#FFCE56"
      ]
    }]
  },
  options: {
    elements: {

    // center:{
    //  display: true,
    //   text: null,
    //   // !dataBase.openedToday ? 'No cards studied today'
    //   //       //<div style='font-size:12px'>No data</div> 
    //   //       :
    //   //       `Data from ${todayDate.toLocaleString('de-DE', {
    //   //         day: 'numeric',
    //   //         month: 'numeric',
    //   //         year: 'numeric',
    //   //       })}`
            
    //   color: 'black',
    //   fontStyle: 'Arial', // Default is Arial
    //   sidePadding: 2, // Default is 20 (as a percentage)
    //   minFontSize: 16, // Default is 20 (in px), set to false and text will not wrap.
    //   lineHeight: 19,
    
     
    // }
  },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'black'
      }

    },
    cutoutPercentage: 81,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10
      },
      border: 'none'
    }
  }
};



  useEffect(() => {



    new Chart(ctx.current, config);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  let date = new Date().toDateString()

  for (let deck in dataBase.DeckNames) {

    let deckItem = dataBase.DeckNames[deck]
    if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString() === new Date().toDateString())) {
      // todayCardsStudiedCounter++
      console.log('yes a deck was opened today')
      config.data.labels.push(deckItem.name)
    }
    if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString())) {


    //  cardsStudiedCounter += deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() == date)).length


    console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')


     config.data.labels.push(deckItem.name)
      //arr.push(deckItem.name)
      
      //config.data.datasets[0].data.push(10)
      config.data.datasets[0].data.push(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length)
      //config.data.datasets[0].backgroundColor.push('yellow')
       config.data.datasets[0].backgroundColor.push(deckItem.color)
      config.data.datasets[0].borderColor.push(deckItem.color)
      config.data.datasets[0].hoverBackgroundColor.push(deckItem.color)
    }
  }

 


  Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || "Arial";
        var txt = centerConfig.text;
        var color = centerConfig.color || "#000";
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated =
          (sidePadding / 100) * (chart.innerRadius * 2);
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = chart.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(
          newFontSize,
          elementHeight,
          maxFontSize
        );
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(" ");
        var line = "";
        var lines = [];

        // Break words up into multiple lines if necessary
        for (let n = 0; n < words.length; n++) {
          var testLine = line + words[n] + " ";
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + " ";
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (let n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    },
  });



  return (
    <canvas 
        ref={ctx} 
        className='pieChart'
        style={{ width: '270px', height: '200px', overflow: 'hidden', borderRadius: '5px' }} 
    >

    </canvas>

  )
}

